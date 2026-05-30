from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm, cm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, HRFlowable, KeepTogether
)
from reportlab.platypus.flowables import Flowable
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
import os

# Colors
NAVY = HexColor('#1A2B4A')
ORANGE = HexColor('#E85D04')
LIGHT_GRAY = HexColor('#F5F5F5')
MID_GRAY = HexColor('#888888')
DARK_GRAY = HexColor('#333333')
WHITE = colors.white
LIGHT_BLUE = HexColor('#EAF0FB')

PAGE_W, PAGE_H = A4
MARGIN = 2 * cm

OUTPUT = '/Users/kazoobasimon/Claude/Zoe/output/proposals/mobile-makanika-proposal.pdf'


class ColorBlock(Flowable):
    def __init__(self, w, h, color, radius=0):
        super().__init__()
        self.w = w
        self.h = h
        self.color = color
        self.radius = radius

    def draw(self):
        self.canv.setFillColor(self.color)
        if self.radius:
            self.canv.roundRect(0, 0, self.w, self.h, self.radius, fill=1, stroke=0)
        else:
            self.canv.rect(0, 0, self.w, self.h, fill=1, stroke=0)

    def wrap(self, *args):
        return (self.w, self.h)


def cover_page(canvas_obj, doc):
    w, h = A4
    # Full navy background
    canvas_obj.setFillColor(NAVY)
    canvas_obj.rect(0, 0, w, h, fill=1, stroke=0)

    # Orange accent bar on left
    canvas_obj.setFillColor(ORANGE)
    canvas_obj.rect(0, 0, 8*mm, h, fill=1, stroke=0)

    # Bottom accent strip
    canvas_obj.setFillColor(ORANGE)
    canvas_obj.rect(0, 0, w, 6*mm, fill=1, stroke=0)

    # Large decorative circle (top right, subtle)
    canvas_obj.setFillColor(HexColor('#243B62'))
    canvas_obj.circle(w + 30*mm, h - 10*mm, 90*mm, fill=1, stroke=0)

    # Small circle bottom left
    canvas_obj.setFillColor(HexColor('#243B62'))
    canvas_obj.circle(-20*mm, 40*mm, 60*mm, fill=1, stroke=0)

    # "PROPOSAL" label
    canvas_obj.setFillColor(ORANGE)
    canvas_obj.setFont('Helvetica-Bold', 10)
    canvas_obj.drawString(22*mm, h - 36*mm, 'PROJECT PROPOSAL')

    # Horizontal rule under label
    canvas_obj.setStrokeColor(ORANGE)
    canvas_obj.setLineWidth(1.5)
    canvas_obj.line(22*mm, h - 40*mm, 120*mm, h - 40*mm)

    # Product name
    canvas_obj.setFillColor(WHITE)
    canvas_obj.setFont('Helvetica-Bold', 48)
    canvas_obj.drawString(22*mm, h - 80*mm, 'MOBILE')
    canvas_obj.setFillColor(ORANGE)
    canvas_obj.drawString(22*mm, h - 110*mm, 'MAKANIKA')

    # Tagline
    canvas_obj.setFillColor(WHITE)
    canvas_obj.setFont('Helvetica', 14)
    canvas_obj.drawString(22*mm, h - 128*mm, "Uganda's Trusted Roadside Rescue Network")

    # Divider line
    canvas_obj.setStrokeColor(HexColor('#2E4A7A'))
    canvas_obj.setLineWidth(1)
    canvas_obj.line(22*mm, h - 140*mm, w - 22*mm, h - 140*mm)

    # Description block
    canvas_obj.setFillColor(HexColor('#B0BED4'))
    canvas_obj.setFont('Helvetica', 10)
    lines = [
        'A mobile-first roadside assistance and verified mechanic marketplace',
        'designed specifically for Uganda.'
    ]
    y = h - 154*mm
    for line in lines:
        canvas_obj.drawString(22*mm, y, line)
        y -= 5.5*mm

    # Bottom info block
    canvas_obj.setFillColor(HexColor('#243B62'))
    canvas_obj.roundRect(22*mm, 28*mm, w - 44*mm, 28*mm, 4, fill=1, stroke=0)

    canvas_obj.setFillColor(WHITE)
    canvas_obj.setFont('Helvetica-Bold', 10)
    canvas_obj.drawString(30*mm, 48*mm, 'Prepared by:')
    canvas_obj.setFont('Helvetica', 10)
    canvas_obj.drawString(62*mm, 48*mm, 'Elastic Technologies Ltd')

    canvas_obj.setFont('Helvetica-Bold', 10)
    canvas_obj.drawString(30*mm, 38*mm, 'Contact:')
    canvas_obj.setFont('Helvetica', 10)
    canvas_obj.drawString(62*mm, 38*mm, 'smkabz@gmail.com')

    canvas_obj.setFont('Helvetica-Bold', 10)
    canvas_obj.drawString(30*mm, 33*mm, 'Date:')
    canvas_obj.setFont('Helvetica', 10)
    canvas_obj.drawString(62*mm, 33*mm, 'May 2026')

    # Confidential tag top right
    canvas_obj.setFillColor(HexColor('#2E4A7A'))
    canvas_obj.roundRect(w - 60*mm, h - 20*mm, 40*mm, 10*mm, 2, fill=1, stroke=0)
    canvas_obj.setFillColor(HexColor('#B0BED4'))
    canvas_obj.setFont('Helvetica', 7)
    canvas_obj.drawCentredString(w - 40*mm, h - 16*mm, 'CONFIDENTIAL')


def header_footer(canvas_obj, doc):
    w, h = A4
    if doc.page == 1:
        cover_page(canvas_obj, doc)
        return

    # Header bar
    canvas_obj.setFillColor(NAVY)
    canvas_obj.rect(0, h - 14*mm, w, 14*mm, fill=1, stroke=0)
    canvas_obj.setFillColor(ORANGE)
    canvas_obj.rect(0, h - 14*mm, 6*mm, 14*mm, fill=1, stroke=0)

    canvas_obj.setFillColor(WHITE)
    canvas_obj.setFont('Helvetica-Bold', 9)
    canvas_obj.drawString(12*mm, h - 9*mm, 'MOBILE MAKANIKA')
    canvas_obj.setFont('Helvetica', 8)
    canvas_obj.setFillColor(HexColor('#B0BED4'))
    canvas_obj.drawRightString(w - 12*mm, h - 9*mm, 'Project Proposal | Elastic Technologies Ltd')

    # Footer
    canvas_obj.setFillColor(LIGHT_GRAY)
    canvas_obj.rect(0, 0, w, 10*mm, fill=1, stroke=0)
    canvas_obj.setFillColor(ORANGE)
    canvas_obj.rect(0, 0, 6*mm, 10*mm, fill=1, stroke=0)
    canvas_obj.setFillColor(MID_GRAY)
    canvas_obj.setFont('Helvetica', 7)
    canvas_obj.drawString(12*mm, 3.5*mm, 'Mobile Makanika | Confidential | May 2026')
    canvas_obj.drawRightString(w - 12*mm, 3.5*mm, f'Page {doc.page - 1}')


def build_styles():
    styles = getSampleStyleSheet()

    styles.add(ParagraphStyle(
        'DocTitle',
        fontName='Helvetica-Bold',
        fontSize=22,
        textColor=NAVY,
        spaceAfter=6,
        spaceBefore=0,
        leading=28,
    ))
    styles.add(ParagraphStyle(
        'SectionTitle',
        fontName='Helvetica-Bold',
        fontSize=15,
        textColor=NAVY,
        spaceAfter=4,
        spaceBefore=16,
        leading=20,
    ))
    styles.add(ParagraphStyle(
        'SubTitle',
        fontName='Helvetica-Bold',
        fontSize=11,
        textColor=ORANGE,
        spaceAfter=3,
        spaceBefore=10,
        leading=15,
    ))
    styles.add(ParagraphStyle(
        'Body',
        fontName='Helvetica',
        fontSize=9.5,
        textColor=DARK_GRAY,
        spaceAfter=4,
        spaceBefore=0,
        leading=15,
    ))
    styles.add(ParagraphStyle(
        'BulletItem',
        fontName='Helvetica',
        fontSize=9.5,
        textColor=DARK_GRAY,
        spaceAfter=2,
        spaceBefore=0,
        leading=14,
        leftIndent=12,
        bulletIndent=0,
    ))
    styles.add(ParagraphStyle(
        'SmallLabel',
        fontName='Helvetica-Bold',
        fontSize=8,
        textColor=ORANGE,
        spaceAfter=2,
        spaceBefore=0,
        leading=12,
        letterSpacing=1,
    ))
    styles.add(ParagraphStyle(
        'TableCell',
        fontName='Helvetica',
        fontSize=9,
        textColor=DARK_GRAY,
        leading=13,
    ))
    styles.add(ParagraphStyle(
        'TableHeader',
        fontName='Helvetica-Bold',
        fontSize=9,
        textColor=WHITE,
        leading=13,
    ))
    return styles


def section_header(title, styles):
    items = []
    items.append(Spacer(1, 4*mm))
    items.append(HRFlowable(width='100%', thickness=2, color=ORANGE, spaceAfter=4))
    items.append(Paragraph(title.upper(), styles['SectionTitle']))
    return items


def bullet(text, styles):
    return Paragraph(f'<bullet>•</bullet> {text}', styles['BulletItem'])


def feature_table(headers, rows, col_widths, styles):
    data = [[Paragraph(h, styles['TableHeader']) for h in headers]]
    for row in rows:
        data.append([Paragraph(str(c), styles['TableCell']) for c in row])

    t = Table(data, colWidths=col_widths)
    ts = TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), NAVY),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, LIGHT_BLUE]),
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor('#DDDDDD')),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ])
    t.setStyle(ts)
    return t


def info_box(label, content_lines, styles, bg=LIGHT_BLUE):
    inner = [Paragraph(label, styles['SmallLabel'])]
    for line in content_lines:
        inner.append(Paragraph(line, styles['Body']))
    data = [[inner]]
    t = Table(data, colWidths=[PAGE_W - 2*MARGIN])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), bg),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('ROUNDEDCORNERS', [4, 4, 4, 4]),
    ]))
    return t


def build_pdf():
    doc = SimpleDocTemplate(
        OUTPUT,
        pagesize=A4,
        topMargin=MARGIN + 6*mm,
        bottomMargin=MARGIN,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
    )
    styles = build_styles()
    story = []

    # ---- COVER PAGE (blank page — drawn entirely by header_footer) ----
    story.append(PageBreak())

    # ---- EXECUTIVE SUMMARY ----
    for el in section_header('1. Executive Summary', styles):
        story.append(el)
    story.append(Paragraph(
        'Mobile Makanika is a mobile-first roadside assistance and verified mechanic marketplace '
        'designed specifically for Uganda. The platform helps drivers quickly find trusted nearby '
        'mechanics, towing services, and emergency roadside assistance across the country.',
        styles['Body']
    ))
    story.append(Spacer(1, 3*mm))
    story.append(Paragraph('Key Problems Solved:', styles['SubTitle']))
    for prob in [
        'Difficulty finding reliable mechanics',
        'Slow roadside rescue response times',
        'Lack of trusted and verified service providers',
        'Poor visibility of nearby mechanics',
        'Absence of emergency vehicle assistance infrastructure',
    ]:
        story.append(bullet(prob, styles))
    story.append(Spacer(1, 3*mm))
    story.append(info_box('MISSION', [
        'Become Uganda\'s trusted roadside rescue network by connecting customers with verified '
        'mechanics and service providers through a seamless mobile experience.'
    ], styles))

    # ---- PROJECT OBJECTIVES ----
    for el in section_header('2. Project Objectives', styles):
        story.append(el)
    objectives = [
        'Build a trusted roadside assistance ecosystem',
        'Help users quickly find nearby mechanics',
        'Digitize mechanic discovery and bookings',
        'Improve trust through mechanic verification',
        'Enable emergency roadside support nationwide',
        'Create a scalable technology platform for vehicle assistance services',
        'Build a marketplace for verified mechanics and roadside providers',
    ]
    for obj in objectives:
        story.append(bullet(obj, styles))

    # ---- CORE SERVICES ----
    for el in section_header('3. Core Services — Phase 1', styles):
        story.append(el)
    story.append(Paragraph('The MVP will focus on emergency roadside and mechanic discovery services.', styles['Body']))
    story.append(Spacer(1, 3*mm))

    services_data = [
        ['Service Category', 'Included Services'],
        ['Emergency Roadside Assistance', 'Vehicle breakdown support, Battery issues, Overheating, Engine problems, Tire punctures'],
        ['Mechanic Services', 'General repairs, Engine repair, Vehicle wiring, Vehicle diagnostics, General servicing'],
        ['Recovery Services', 'Towing requests'],
    ]
    rows = services_data[1:]
    story.append(feature_table(
        services_data[0],
        rows,
        [7*cm, PAGE_W - 2*MARGIN - 7*cm],
        styles
    ))

    # ---- PRODUCT ECOSYSTEM ----
    for el in section_header('4. Product Ecosystem', styles):
        story.append(el)
    story.append(Paragraph('The platform consists of four interconnected systems:', styles['Body']))
    story.append(Spacer(1, 3*mm))

    systems = [
        ('1', 'Customer Mobile Application', 'iOS & Android app for customers and drivers to request roadside assistance and discover nearby verified mechanics.'),
        ('2', 'Mechanic Mobile Application', 'iOS & Android app for mechanics to manage bookings, availability, profiles, and customer requests.'),
        ('3', 'Admin Dashboard', 'Web-based management portal for platform administration, analytics, moderation, and mechanic verification.'),
        ('4', 'Marketing & Landing Website', 'Modern website for brand awareness, app downloads, mechanic onboarding, and public information.'),
    ]
    sys_data = [['#', 'System', 'Description']]
    for num, name, desc in systems:
        sys_data.append([num, name, desc])
    story.append(feature_table(
        sys_data[0],
        sys_data[1:],
        [1*cm, 5.5*cm, PAGE_W - 2*MARGIN - 6.5*cm],
        styles
    ))

    # ---- CUSTOMER APP FEATURES ----
    story.append(PageBreak())
    for el in section_header('5. Customer Mobile App Features', styles):
        story.append(el)

    cust_features = [
        ('Authentication & Accounts', ['Phone number OTP authentication', 'Optional email registration', 'Profile management']),
        ('Mechanic Discovery', ['Find nearby mechanics', 'Distance-based listings', 'Last active status', 'Verified mechanic badges', 'Ratings and reviews']),
        ('Booking System', ['Emergency roadside requests', 'Future appointment booking', 'Booking fee payment', 'Mechanic contact unlock after payment']),
        ('Vehicle Management', ['Add multiple vehicles', 'Vehicle information management', 'Vehicle photos', 'Service history tracking']),
        ('Communication', ['In-app messaging', 'Direct phone call access after payment', 'Push notifications', 'SMS alerts']),
        ('Media Uploads', ['Upload photos of vehicle issues', 'Upload videos', 'Voice note support']),
        ('Reviews & Ratings', ['Customer ratings', 'Written reviews', 'Complaint reporting']),
    ]

    feat_data = [['Feature Area', 'Capabilities']]
    for area, caps in cust_features:
        feat_data.append([area, '\n'.join([f'• {c}' for c in caps])])
    story.append(feature_table(feat_data[0], feat_data[1:], [5*cm, PAGE_W - 2*MARGIN - 5*cm], styles))

    # ---- MECHANIC APP FEATURES ----
    for el in section_header('6. Mechanic Mobile App Features', styles):
        story.append(el)

    mech_features = [
        ('Registration', ['Mechanic onboarding', 'Profile setup', 'Garage details', 'Specialty selection', 'Document uploads']),
        ('Verification', ['Verification submission', 'Garage inspection management', 'Identity verification']),
        ('Booking Management', ['View customer requests', 'Accept/reject bookings', 'Contact customers', 'Booking history']),
        ('Availability', ['Online/offline status toggle', 'Availability controls']),
        ('Profile', ['Services offered', 'Experience information', 'Work samples', 'Garage photos']),
        ('Performance', ['Ratings and reviews', 'Request history', 'Customer feedback']),
    ]
    mech_data = [['Feature Area', 'Capabilities']]
    for area, caps in mech_features:
        mech_data.append([area, '\n'.join([f'• {c}' for c in caps])])
    story.append(feature_table(mech_data[0], mech_data[1:], [5*cm, PAGE_W - 2*MARGIN - 5*cm], styles))

    # ---- ADMIN DASHBOARD ----
    story.append(PageBreak())
    for el in section_header('7. Admin Dashboard Features', styles):
        story.append(el)

    admin_features = [
        ('User Management', ['Customer management', 'Mechanic management', 'Role permissions']),
        ('Verification', ['Approval workflows', 'Document review', 'Suspension and moderation']),
        ('Booking Management', ['View all bookings', 'Booking monitoring', 'Refund management']),
        ('Analytics', ['Active users', 'Mechanic activity', 'Revenue insights', 'Most requested services', 'Breakdown hotspot analytics']),
        ('Content Management', ['Service category management', 'Notification management', 'Landing page content management']),
    ]
    adm_data = [['Module', 'Capabilities']]
    for area, caps in admin_features:
        adm_data.append([area, '\n'.join([f'• {c}' for c in caps])])
    story.append(feature_table(adm_data[0], adm_data[1:], [5*cm, PAGE_W - 2*MARGIN - 5*cm], styles))

    # ---- LANDING WEBSITE ----
    for el in section_header('8. Landing Website', styles):
        story.append(el)

    web_data = [
        ['Pages', 'Homepage, About Us, Services, Become a Mechanic, FAQs, Contact'],
        ['Marketing Features', 'App download section, Call-to-action sections, Service coverage information, Lead collection forms'],
    ]
    story.append(feature_table(['Component', 'Details'], web_data, [5*cm, PAGE_W - 2*MARGIN - 5*cm], styles))

    # ---- VERIFICATION SYSTEM ----
    for el in section_header('9. Mechanic Verification System', styles):
        story.append(el)
    story.append(Paragraph(
        'To ensure trust and reliability, every mechanic undergoes a structured verification process before '
        'appearing publicly on the platform. Only approved mechanics are listed.',
        styles['Body']
    ))
    story.append(Spacer(1, 3*mm))
    for req in ['Physical garage inspection', 'Reference checks', 'Garage verification', 'Identity verification', 'Mechanic skill assessment']:
        story.append(bullet(req, styles))

    # ---- BUSINESS MODEL ----
    story.append(PageBreak())
    for el in section_header('10. Business Model', styles):
        story.append(el)
    story.append(Paragraph('Phase 1 Monetization', styles['SubTitle']))
    story.append(info_box('BOOKING ACCESS FEE', [
        'UGX 10,000 per booking — customers pay before unlocking mechanic contact details.',
        'Refundable booking fee policy applies.',
    ], styles, bg=LIGHT_BLUE))
    story.append(Spacer(1, 4*mm))
    story.append(Paragraph('Future Revenue Streams', styles['SubTitle']))
    future_rev = ['Mechanic subscriptions', 'Featured mechanic listings', 'Fleet partnerships', 'Insurance partnerships', 'Priority emergency services']
    for r in future_rev:
        story.append(bullet(r, styles))

    # ---- TECHNOLOGY STACK ----
    for el in section_header('11. Technology Stack', styles):
        story.append(el)
    tech_data = [
        ['Layer', 'Technology'],
        ['Mobile Apps', 'Flutter (iOS & Android)'],
        ['Backend API', 'Laravel'],
        ['Database', 'PostgreSQL'],
        ['Cloud Infrastructure', 'AWS / DigitalOcean'],
        ['Push Notifications', 'Firebase Cloud Messaging'],
        ['SMS', 'SMS Gateway Integration'],
        ['Maps & Location', 'Google Maps API'],
        ['Payments', 'MTN Mobile Money, Airtel Money'],
    ]
    story.append(feature_table(tech_data[0], tech_data[1:], [6*cm, PAGE_W - 2*MARGIN - 6*cm], styles))

    # ---- MVP STRATEGY ----
    for el in section_header('12. Recommended MVP Strategy', styles):
        story.append(el)
    story.append(Paragraph('Phase 1 Priorities', styles['SubTitle']))
    for f in ['Verified mechanic listings', 'Nearby mechanic discovery', 'Booking fee system', 'Emergency roadside requests', 'Ratings and reviews', 'Admin verification workflow']:
        story.append(bullet(f, styles))
    story.append(Paragraph('Deferred to Future Phases', styles['SubTitle']))
    for f in ['Live GPS tracking', 'Insurance integration', 'Spare parts marketplace', 'Fleet management', 'Real-time dispatch optimization', 'AI-powered recommendations']:
        story.append(bullet(f, styles))

    # ---- DELIVERABLES ----
    story.append(PageBreak())
    for el in section_header('13. Deliverables', styles):
        story.append(el)

    deliverables = [
        ('Product Strategy', ['Product strategy documentation', 'Feature planning', 'MVP roadmap', 'User flow planning']),
        ('Design', ['Brand identity and logo', 'UI/UX design system', 'Mobile app UI designs', 'Admin dashboard designs', 'Landing page designs']),
        ('Development', ['Customer mobile app', 'Mechanic mobile app', 'Admin dashboard', 'Backend API system', 'Database architecture', 'Payment integrations', 'Push notification integrations']),
        ('Website', ['Responsive landing website', 'SEO optimization', 'Contact forms', 'App download sections']),
        ('Infrastructure', ['Cloud deployment', 'Database setup', 'Hosting configuration', 'API deployment', 'Security configuration']),
        ('Deployment', ['Android Play Store submission', 'Apple App Store submission', 'Production environment setup']),
        ('Post-Launch', ['Analytics integration', 'Monitoring setup', 'Basic maintenance support', 'Bug fixing support']),
    ]
    del_data = [['Category', 'Deliverables']]
    for cat, items in deliverables:
        del_data.append([cat, '\n'.join([f'• {i}' for i in items])])
    story.append(feature_table(del_data[0], del_data[1:], [4.5*cm, PAGE_W - 2*MARGIN - 4.5*cm], styles))

    # ---- TIMELINE ----
    for el in section_header('14. Proposed Project Timeline', styles):
        story.append(el)

    timeline_data = [
        ['Phase', 'Duration', 'Key Activities'],
        ['Phase 1\nDiscovery & Planning', '1 Week', 'Requirements gathering, product planning, architecture planning, wireframes'],
        ['Phase 2\nUI/UX Design', '2 Weeks', 'Branding, UI design, UX flows, prototypes'],
        ['Phase 3\nDevelopment', '4 – 6 Weeks', 'Mobile app development, backend development, admin dashboard, API integrations'],
        ['Phase 4\nTesting & Deployment', '1 – 2 Weeks', 'QA testing, bug fixing, deployment, App Store submission'],
    ]
    story.append(feature_table(timeline_data[0], timeline_data[1:], [3.5*cm, 3*cm, PAGE_W - 2*MARGIN - 6.5*cm], styles))
    story.append(Spacer(1, 3*mm))
    story.append(info_box('TOTAL ESTIMATED TIMELINE', ['8 – 11 weeks from project kickoff to production launch.'], styles))

    # ---- FUTURE EXPANSION ----
    story.append(PageBreak())
    for el in section_header('15. Future Expansion Opportunities', styles):
        story.append(el)
    story.append(Paragraph('Mobile Makanika has strong long-term growth potential beyond the initial MVP:', styles['Body']))
    for opp in [
        'Nationwide towing partnerships',
        'Fleet management services',
        'Insurance integrations',
        'Spare parts marketplace',
        'Vehicle maintenance subscriptions',
        'Driver membership programs',
        'Emergency rescue subscriptions',
        'Regional East African expansion',
    ]:
        story.append(bullet(opp, styles))

    # ---- COMPETITIVE ADVANTAGE ----
    for el in section_header('16. Competitive Advantage', styles):
        story.append(el)

    adv_data = [['Advantage', 'Details']]
    advantages = [
        ('Verified Mechanics', 'Only verified, inspected mechanics appear on the platform — building trust from day one.'),
        ('Emergency-First UX', 'Designed around the urgent roadside breakdown scenario, not just casual discovery.'),
        ('Uganda-First Strategy', 'Built for Uganda\'s roads, payment systems (MTN/Airtel), and mechanic market.'),
        ('Trust-Based Marketplace', 'Booking fee system ensures commitment from both parties before contact is made.'),
        ('Localized Discovery', 'Proximity-based mechanic search with real last-active status.'),
        ('Scalable Foundation', 'Architecture designed for regional expansion across East Africa.'),
    ]
    for adv, detail in advantages:
        adv_data.append([adv, detail])
    story.append(feature_table(adv_data[0], adv_data[1:], [5*cm, PAGE_W - 2*MARGIN - 5*cm], styles))

    # ---- CONCLUSION ----
    for el in section_header('17. Conclusion', styles):
        story.append(el)
    story.append(Paragraph(
        'Mobile Makanika has the potential to become Uganda\'s leading roadside assistance and '
        'verified mechanic marketplace. By focusing on trust, accessibility, verification, and '
        'emergency roadside support, the platform solves a major transportation challenge while '
        'building a scalable nationwide service network.',
        styles['Body']
    ))
    story.append(Spacer(1, 3*mm))
    story.append(Paragraph(
        'The proposed MVP focuses on simplicity, operational efficiency, and rapid market validation '
        'while creating a strong foundation for future expansion.',
        styles['Body']
    ))

    # ---- NEXT STEPS ----
    for el in section_header('Next Steps', styles):
        story.append(el)
    story.append(Spacer(1, 2*mm))

    steps = [
        ('01', 'Review & Approve', 'Review this proposal and confirm requirements.'),
        ('02', 'Sign Agreement', 'Sign the project agreement to formalise the engagement.'),
        ('03', 'Pay Deposit', 'Pay the project deposit to commence work.'),
        ('04', 'Kickoff Session', 'Attend the discovery and planning kickoff session.'),
    ]
    step_rows = []
    for num, title, desc in steps:
        cell_content = [
            Paragraph(f'<font color="#E85D04"><b>{num}</b></font>', styles['Body']),
            Paragraph(f'<b>{title}</b>', styles['Body']),
            Paragraph(desc, styles['Body']),
        ]
        step_rows.append(cell_content)

    ns_data = [[Paragraph('<b>Step</b>', styles['TableHeader']), Paragraph('<b>Action</b>', styles['TableHeader']), Paragraph('<b>Details</b>', styles['TableHeader'])]]
    for s in step_rows:
        ns_data.append(s)

    ns_table = Table(ns_data, colWidths=[1.5*cm, 5*cm, PAGE_W - 2*MARGIN - 6.5*cm])
    ns_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), NAVY),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, LIGHT_BLUE]),
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor('#DDDDDD')),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ALIGN', (0, 0), (0, -1), 'CENTER'),
    ]))
    story.append(ns_table)

    story.append(Spacer(1, 6*mm))
    cta_data = [[
        [
            Paragraph('<font color="#E85D04"><b>READY TO GET STARTED?</b></font>', styles['Body']),
            Paragraph('<font color="#FFFFFF">Contact: smkabz@gmail.com</font>', styles['Body']),
            Paragraph('<font color="#B0BED4">Elastic Technologies Ltd | May 2026</font>', styles['Body']),
        ]
    ]]
    cta_table = Table(cta_data, colWidths=[PAGE_W - 2*MARGIN])
    cta_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), NAVY),
        ('LEFTPADDING', (0, 0), (-1, -1), 14),
        ('RIGHTPADDING', (0, 0), (-1, -1), 14),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(cta_table)

    # Build
    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
    print(f'PDF saved: {OUTPUT}')


if __name__ == '__main__':
    build_pdf()
