#!/usr/bin/env python3
"""
Fetch and analyze a website for the website-audit-outreach skill.
Usage: python3 audit_website.py <url> [--output <file.json>]
"""
import sys
import json
import time
import argparse
import urllib.request
import urllib.parse
import ssl
from html.parser import HTMLParser


class WebsiteParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.meta = {}
        self.h1s = []
        self.h2s = []
        self.images = []
        self.links = []
        self.social_links = []
        self.contact_info = {}
        self.forms_count = 0
        self._in_title = False
        self._in_h1 = False
        self._in_h2 = False
        self._h1_buf = ""
        self._h2_buf = ""

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        tag = tag.lower()

        if tag == "title":
            self._in_title = True
        elif tag == "h1":
            self._in_h1 = True
            self._h1_buf = ""
        elif tag == "h2":
            self._in_h2 = True
            self._h2_buf = ""
        elif tag == "meta":
            name = attrs_dict.get("name", attrs_dict.get("property", "")).lower()
            content = attrs_dict.get("content", "")
            if name and content:
                self.meta[name] = content
        elif tag == "img":
            self.images.append({
                "src": attrs_dict.get("src", ""),
                "alt": attrs_dict.get("alt", None),
            })
        elif tag == "a":
            href = attrs_dict.get("href", "")
            if href:
                self.links.append(href)
                if any(s in href for s in [
                    "facebook.com", "twitter.com", "instagram.com",
                    "linkedin.com", "youtube.com", "tiktok.com", "x.com"
                ]):
                    self.social_links.append(href)
                if href.startswith("mailto:"):
                    self.contact_info["email"] = href[7:].split("?")[0]
                if href.startswith("tel:"):
                    self.contact_info["phone"] = href[4:]
        elif tag == "form":
            self.forms_count += 1

    def handle_endtag(self, tag):
        tag = tag.lower()
        if tag == "title":
            self._in_title = False
        elif tag == "h1":
            self._in_h1 = False
            if self._h1_buf.strip():
                self.h1s.append(self._h1_buf.strip())
        elif tag == "h2":
            self._in_h2 = False
            if self._h2_buf.strip():
                self.h2s.append(self._h2_buf.strip())

    def handle_data(self, data):
        if self._in_title:
            self.title += data
        if self._in_h1:
            self._h1_buf += data
        if self._in_h2:
            self._h2_buf += data


def normalize_url(url):
    url = url.strip()
    if not url.startswith(("http://", "https://")):
        url = "https://" + url
    return url


def audit_website(url):
    url = normalize_url(url)
    result = {
        "url": url,
        "ssl": url.startswith("https://"),
        "accessible": False,
        "load_time_ms": None,
        "status_code": None,
        "title": "",
        "meta": {},
        "h1s": [],
        "h2s": [],
        "images_total": 0,
        "images_missing_alt": 0,
        "links_total": 0,
        "social_links": [],
        "contact_info": {},
        "forms_count": 0,
        "html_length": 0,
        "error": None,
    }

    try:
        # Try verified SSL first; fall back to unverified if cert store unavailable (common on macOS).
        # SSL grade is determined from URL scheme, not cert validation.
        try:
            ctx = ssl.create_default_context()
        except Exception:
            ctx = ssl._create_unverified_context()
        req = urllib.request.Request(
            url,
            headers={"User-Agent": "Mozilla/5.0 (compatible; ElasticAuditBot/1.0)"},
        )
        start = time.time()
        try:
            resp_ctx = urllib.request.urlopen(req, context=ctx, timeout=15)
        except urllib.error.URLError as e:
            reason = getattr(e, "reason", None)
            if isinstance(reason, ssl.SSLError) or "CERTIFICATE_VERIFY_FAILED" in str(e):
                ctx = ssl._create_unverified_context()
                resp_ctx = urllib.request.urlopen(req, context=ctx, timeout=15)
            else:
                raise
        with resp_ctx as resp:
            result["load_time_ms"] = round((time.time() - start) * 1000)
            result["status_code"] = resp.status
            html = resp.read().decode("utf-8", errors="ignore")
            result["accessible"] = True
            result["html_length"] = len(html)

        parser = WebsiteParser()
        parser.feed(html)

        result["title"] = parser.title.strip()
        result["meta"] = parser.meta
        result["h1s"] = parser.h1s[:5]
        result["h2s"] = parser.h2s[:10]
        result["images_total"] = len(parser.images)
        result["images_missing_alt"] = sum(
            1 for img in parser.images if img["alt"] is None or img["alt"].strip() == ""
        )
        result["links_total"] = len(set(parser.links))
        result["social_links"] = list(set(parser.social_links))
        result["contact_info"] = parser.contact_info
        result["forms_count"] = parser.forms_count

    except urllib.error.HTTPError as e:
        result["status_code"] = e.code
        result["error"] = f"HTTP {e.code}: {e.reason}"
    except urllib.error.URLError as e:
        result["error"] = f"Connection failed: {e.reason}"
    except Exception as e:
        result["error"] = str(e)

    return result


def main():
    parser = argparse.ArgumentParser(description="Audit a website and output JSON findings")
    parser.add_argument("url", help="Website URL to audit")
    parser.add_argument("--output", help="Output JSON file path (default: stdout)")
    args = parser.parse_args()

    data = audit_website(args.url)

    output = json.dumps(data, indent=2)
    if args.output:
        with open(args.output, "w") as f:
            f.write(output)
        print(f"Audit saved to {args.output}")
    else:
        print(output)


if __name__ == "__main__":
    main()
