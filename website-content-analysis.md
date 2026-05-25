# Website Content Analysis

**Project:** ACEC — Arab Charter Engineering Consultants  
**Domain:** https://ac-ec.com.sa  
**Analysis Date:** May 20, 2026  
**Current State:** Production-ready bilingual corporate website

---

# 1. Website Overview

- **Business Type:** Engineering Consultancy & Safety Engineering Firm (Saudi Arabia)
- **Full Name:** مكتب الميثاق العربي للاستشارات الهندسية وهندسة السلامة / Arab Charter Engineering Consultants (ACEC)
- **Owner/Founder:** Eng. Majid Al Thubaity

## General Structure
- **Frontend:** Next.js (App Router) with TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Laravel 12+ (PHP) with Filament Admin Panel
- **Database:** MySQL/SQLite via Eloquent ORM (20+ tables)
- **Deployment:** Frontend on Vercel, Backend on separate server
- **Languages Supported:** Arabic (default, RTL) and English (LTR)
- **Responsive:** Fully responsive with mobile-first design
- **Theme System:** Dynamic light/dark mode with admin-customizable themes (colors, typography, layout)
- **Design Aesthetic:** Dark-themed luxury engineering brand with gold (#C9A84C) accent color, architectural grid motifs, parallax backgrounds, glassmorphism cards

## Technologies Detected
| Layer | Technologies |
|---|---|
| Frontend Framework | Next.js 15+ (App Router), React 19 |
| Styling | Tailwind CSS, CSS-in-JS (inline styles), CSS custom properties |
| Animations | Framer Motion (page transitions, scroll animations, parallax, counters) |
| i18n | next-intl (messages/en.json, messages/ar.json) |
| HTTP Client | Native fetch API |
| Backend | Laravel 12+, PHP 8.x |
| Admin Panel | Filament PHP v3+ |
| Database | Eloquent ORM (20+ tables) |
| Auth (backend) | Laravel Sanctum |
| CORS | Manual config at backend/config/cors.php |

## Languages Detected
- Arabic (ar-SA) — default locale, RTL layout
- English (en) — LTR layout

## Multilingual Strategy
- Route-based: `/{locale}/...` with middleware detecting `Accept-Language` header
- Cookie-based persistence: `NEXT_LOCALE` cookie (1 year expiry)
- Locale switcher button in navbar ("EN" / "عربي")
- Static translations via `next-intl` JSON message files (121 keys each)
- Backend API: `{lang}` parameter in URL (`/api/v1/{module}/{lang}`)

---

# 2. Global Layout Structure

## Navbar

**File:** `src/components/layout/Navbar.tsx`  
**Behavior:** Sticky/fixed top, transparent → backdrop-blur on scroll (50px threshold)  
**Z-index:** 50 (header), 65 (mobile menu overlay)

### Desktop Nav Structure
| Element | Type | Behavior |
|---|---|---|
| **Logos** | Logo component | sm (mobile), md (desktop) — links to `/{locale}` |
| **Main Nav Links** | 5 links | Services, Projects, About, Team, Clients |
| **More Dropdown** | Dropdown button | Blog, Company Profile, Certifications, Careers, Contact |
| **Locale Switcher** | Button | Toggles `ar` ↔ `en`, redirects to same path with new locale |
| **Theme Toggle** | Button | Toggles dark/light mode (☀️/🌙 icons) |
| **CTA Button** | `magnetic-btn-primary` | "Book Consultation" — links to `/{locale}/contact` |
| **Mobile Toggle** | Hamburger icon (3 bars) | Opens fullscreen mobile menu |

### Mobile Menu (Fullscreen Overlay)
- 10 navigation items with emoji icons
- Sticky header with close button
- Sticky bottom CTA: "Book Consultation"
- 3-bar hamburger → animated X on open
- Body scroll locked when open

### Nav Items (from i18n)
| Key | English Label | Arabic Label |
|---|---|---|
| services | Services | خدماتنا |
| projects | Projects | مشاريعنا |
| about | About | من نحن |
| team | Team | فريقنا |
| clients | Clients | عملاؤنا |
| blog | Blog | المدونة |
| certifications | Certifications | شهاداتنا |
| profile | Company Profile | ملف المكتب التعريفي |
| career | Careers | الوظائف |
| contact | Contact | تواصل معنا |
| consultation | Book Consultation | احجز استشارة |
| more | More | المزيد |

## Footer

**File:** `src/components/layout/Footer.tsx`  
**Layout:** 4-column responsive grid (stacks on mobile)

### Column 1: Logo + Description
- Logo component (md size, links to home)
- Description text: "Specialized engineering consultancy in Saudi Arabia" / "استشارات هندسية متخصصة في المملكة العربية السعودية"
- 3 social icons: WhatsApp (+966500037049), Email (info@ac-ec.com.sa), Phone (+966500037049)

### Column 2: Quick Links
- Services, Projects, About, Team, Clients
- Animated hover arrow indicators

### Column 3: Services
- Engineering Consultancy / الاستشارات الهندسية
- Safety Engineering / هندسة السلامة
- Engineering Supervision / الإشراف الهندسي
- Interior Design / التصميم الداخلي
- Factory Design / تصميم المصانع
- All link to `/{locale}/services`

### Column 4: Contact Info
| Icon | Label | Value | Link |
|---|---|---|---|
| 📍 | Address | Omar Bin Abdulaziz St, Al Zahraa, Riyadh, KSA | — |
| 📞 | Phone | +966 500 037 049 | `tel:+966500037049` |
| 💬 | WhatsApp | +966 500 037 049 | `https://wa.me/966500037049` |
| 📧 | Email | info@ac-ec.com.sa | `mailto:info@ac-ec.com.sa` |

### Bottom Bar
- Copyright: `© {year} Arab Charter Engineering Consultants — All Rights Reserved`
- Credit: "Designed & Developed" / "تصميم وتطوير"

## Shared Components

### Custom Cursor
- Architectural crosshair/diamond shape
- Replaces default cursor
- Dynamic import (SSR disabled)

### Page Loader
- Full-screen loading animation with SVG grid pattern
- Dynamic import (SSR disabled)

### Page Transition
- Framer Motion AnimatePresence
- Fade + slide (10px Y) transitions between routes
- Cubic-bezier easing

### Section Label
- Gold-colored, small uppercase label with accent styling
- Used across all sections as heading prefix

### Magnetic Button
- Two variants: `magnetic-btn-primary` (gold gradient) and `magnetic-btn-secondary` (outlined)
- Used for all CTAs across the site

### Gradient Border
- Glassmorphism card with subtle gradient border effect
- Used on Team member cards, Blog cards, Project cards, Certification cards

### Container
- `container-custom` class — max-width constrained centered wrapper

### Section Padding
- `section-padding` class — consistent vertical padding

---

# 3. Detailed Pages Analysis

---

# Page: Home
URL: `/{locale}` (ar/en)

## Purpose
Primary landing page. Serve as a portfolio overview and brand introduction. Generate leads through CTAs.

## Sections

### Hero Section
| Element | Details |
|---|---|
| **Headline** | "نبني مستقبلاً أفضل بهندسة استثنائية" / "Building the Future with Exceptional Engineering" |
| **Subheading** | Arabic: "شركاؤكم الموثوقون في تحقيق مشاريعكم الهندسية بأعلى معايير الجودة والسلامة" / English: "Comprehensive engineering consultancy and safety engineering across Saudi Arabia" |
| **CTA Primary** | "تعرف على خدماتنا" / "Explore Services" — links to `/{locale}/services` |
| **CTA Secondary** | "تواصل معنا" / "Contact Us" — links to `/{locale}/contact` |
| **Background** | SVG illustration (`/images/hero-architecture.svg`) with parallax + breathing animation + dark overlay + gold accent radial gradients + grid lines overlay |
| **Floating Stats** | 3 desktop-only stats: +50 Projects, +15 Years, +30 Clients |
| **Scroll Indicator** | "Scroll Down" / "اسحب للأسفل" with animated gradient line |
| **Source** | Static i18n (hero keys in messages files) + hardcoded stat values |
| **Data Source** | i18n translations (JSON) |

### Stats Section
| Element | Details |
|---|---|
| **Layout** | 4-column grid with animated count-up numbers |
| **Stat 1** | 50+ Projects Completed / مشروع منجز |
| **Stat 2** | 15+ Years of Experience / سنة خبرة |
| **Stat 3** | 30+ Satisfied Clients / عميل |
| **Stat 4** | 100% Saudi Code Compliant / خدمات متخصصة |
| **Animation** | Spring-based count-up on scroll into view |
| **Source** | i18n translations + hardcoded numbers in component |

### Services Section
| Element | Details |
|---|---|
| **Section Label** | "خدماتنا" / "Our Services" |
| **Heading** | "حلول هندسية شاملة تغطي جميع احتياجات مشروعك" / "Comprehensive engineering solutions covering all your project needs" |
| **Cards** | Dynamic grid from API (auto-fill, min 300px) |
| **Each Card** | SVG icon, title, description, "Learn More" link |
| **Loading State** | "جاري التحميل..." / "Loading..." |
| **Source** | **Dynamic** — fetched from `GET /api/v1/services/{locale}` |
| **Icons** | 6 hardcoded SVG icons mapped by slug (`consulting`, `safety`, `supervision`, `interior`, `factory`, `modon`) |

### Projects Section
| Element | Details |
|---|---|
| **Section Label** | "مشاريع مميزة" / "Featured Projects" |
| **Heading** | "مجموعة مختارة من أعمالنا في أنحاء المملكة" / "A selection of our work across Saudi Arabia" |
| **Description** | "استعرض أحدث المشاريع الهندسية" / "Explore our latest engineering projects" |
| **View All CTA** | "عرض جميع المشاريع" / "View All Projects" (+ count) |
| **Category Filters** | 7 filter tabs: All, Residential, Commercial, Industrial, Education, Healthcare, Interior |
| **Project Cards** | Image, category badge, title, location, year, "View Details" link |
| **Loading State** | Spinner + "جاري التحميل..." |
| **Empty State** | "لا توجد مشاريع في هذا التصنيف" / "No projects in this category" |
| **Source** | **Dynamic** — fetched from `GET /api/v1/projects/{locale}` |

### About Section
| Element | Details |
|---|---|
| **Section Label** | "استشارات هندسية متخصصة" / "Specialized Engineering Consultancy" |
| **Heading** | "عن مكتبنا" / "About Our Office" |
| **Description** | Full company description (i18n — about.description) |
| **Feature Points** | 3 bullet items: experience in gov/private projects, certified engineers team, Saudi Building Code compliance |
| **CTA** | "اعرف المزيد عنا" / "Learn More About Us" — links to `/{locale}/about` |
| **Image** | SVG illustration (`/images/about-architecture.svg`) with parallax + overlay + floating badge |
| **Floating Badge** | "+15 Years in Service" / "+15 سنة في الخدمة" |
| **Source** | i18n translations + hardcoded bilingual feature points |

### Why Choose Us Section
| Element | Details |
|---|---|
| **Section Label** | "لماذا نحن؟" / "Why Choose Us?" |
| **Heading** | "ما يجعلنا الخيار الأمثل لمشروعك" / "What makes us the ideal choice for your project" |
| **Cards (4)** | |
| | 1. **Experience:** "+15 Years Experience" — extensive project experience |
| | 2. **Compliance:** "Full Compliance" — Saudi Code adherence |
| | 3. **Quality:** "High Standards" — quality at every stage |
| | 4. **Team:** "Specialized Team" — certified engineers |
| **Icons** | 4 hand-crafted SVG icons (clock, shield, star, users) |
| **Source** | i18n translations (why.items.*) |

### Clients Section
| Element | Details |
|---|---|
| **Section Label** | "عملاؤنا" / "Our Clients" |
| **Heading** | "عملاؤنا بفخر" / "Our Clients" |
| **Description** | "نفخر بشراكتنا مع أكبر وأبرز الشركات والمؤسسات في المملكة" / "We are proud to partner with leading companies and organizations in Saudi Arabia" |
| **Marquee** | Infinite horizontal scroll of client logos (3x repeated for seamless loop) |
| **Each Client** | Logo image + name, clickable card linking to client website |
| **Loading State** | Spinner |
| **Empty State** | "لا يوجد عملاء مضافين في قاعدة البيانات حالياً." / "No clients added in the database yet." |
| **Bottom CTA** | "احجز استشارة" / "Book Consultation" — links to `/{locale}/contact` |
| **Source** | **Dynamic** — fetched from `GET /api/v1/clients` |

### CTA Section
| Element | Details |
|---|---|
| **Heading** | "مستعد لبدء مشروعك؟" / "Ready to Start Your Project?" |
| **Subtitle** | "تواصل معنا اليوم واحصل على استشارة مجانية" / "Contact us today and get a free consultation" |
| **Button** | "تواصل معنا الآن" / "Contact Us Now" — links to `/{locale}/contact` |
| **Background** | SVG illustration (`/images/cta-architecture.svg`) with parallax + gold radial gradient overlay |
| **Icon** | Shield/checkmark SVG icon in gold circle |
| **Source** | i18n translations (cta.*) |

## Dynamic Content Detected on Home
| Section | API Endpoint | Cache Strategy |
|---|---|---|
| Services | `GET /api/v1/services/{locale}` | Fetched client-side on mount |
| Projects | `GET /api/v1/projects/{locale}` | Fetched client-side on mount |
| Clients | `GET /api/v1/clients` | Fetched client-side on mount |

## SEO Metadata
| Field | Value |
|---|---|
| Default Title | "ACEC — مكتب الميثاق العربي للاستشارات الهندسية" |
| Title Template | `%s | ACEC` |
| Description | Arabic only — company description |
| Keywords | 7 bilingual keywords |
| OG Type | website |
| OG Locale | ar_SA |
| OG URL | https://ac-ec.com.sa |
| Twitter Card | summary_large_image |
| Metadata Base | https://ac-ec.com.sa |

## Content Replacement Priority: **HIGH** (primary landing page, all key messaging)

---

# Page: Services
URL: `/{locale}/services`

## Purpose
Showcase all engineering services offered by ACEC with details and CTAs.

## Sections

### Page Hero
| Element | Details |
|---|---|
| **Section Label** | ACEC |
| **Heading** | "خدماتنا الهندسية" / "Our Services" |
| **Subtitle** | (none — only heading) |
| **Background** | Gradient overlay |
| **Source** | Hardcoded bilingual text |

### Services Grid
Same `ServicesSection` component used on the home page. Reuses the same dynamic API fetch. See Home > Services Section for details.

## SEO Metadata
| Locale | Title | Description |
|---|---|---|
| **ar** | "خدماتنا \| ACEC" | "خدماتنا الهندسية المتكاملة — استشارات، سلامة، إشراف، تصميم داخلي، وتصميم مصانع" |
| **en** | "Our Services \| ACEC" | "Our comprehensive engineering services — consultancy, safety, supervision, interior design, and factory design" |

## Content Replacement Priority: **HIGH**

---

# Page: Service Detail
URL: `/{locale}/services/[slug]`

## Purpose
Display detailed information about a specific engineering service.

## Sections (Server-Rendered)

### Page Hero
| Element | Details |
|---|---|
| **Label** | "ACEC SERVICE" |
| **Title** | Dynamic from API (service.title) |
| **Meta Title** | Dynamic from API if available (service.meta_title) |
| **Image** | Large hero image from API (`{API_BASE}/storage/{service.image}`) |
| **Source** | **Dynamic** — `GET /api/v1/services/{slug}/{locale}` |

### Content Section
| Element | Details |
|---|---|
| **Article** | HTML content rendered via `dangerouslySetInnerHTML` from `service.content` (fallback: `service.description`) |
| **Source** | Dynamic from API |

### Back Link
- "العودة للخدمات" / "Back to Services" — links to `/{locale}/services`

## Additional Client-Side Component (Alternative Rendering)
**File:** `src/app/[locale]/services/[slug]/ServiceDetailClient.tsx`

When the API returns rich structured data, this component renders:

| Section | Heading | Content Source |
|---|---|---|
| **Hero** | Dynamic title with gold last word | service.title, service.subtitle, service.image |
| **Description** | — | service.description |
| **Service Features** | "ميزات الخدمة" / "Service Features" | service.features (bilingual array) |
| **Deliverables** | "المخرجات والتسليمات" / "Deliverables" | service.deliverables (bilingual array) |
| **Areas of Expertise** | "مجالات الخبرة" / "Areas of Expertise" | service.expertise (bilingual array) |
| **CTA** | "هل أنت مهتم بهذه الخدمة؟" / "Interested in this service?" | Hardcoded bilingual text |
| **CTA Button** | "احجز استشارة" / "Book Consultation" | Static CTA |

## SEO Metadata
| Field | Value |
|---|---|
| Title | `{service.title} | ACEC` (dynamic from API) |
| Description | `service.description` (dynamic from API) |

## Content Replacement Priority: **HIGH** (all service content is dynamic from API — replace via Filament admin)

---

# Page: Projects
URL: `/{locale}/projects`

## Purpose
Portfolio showcase of completed engineering projects with filtering.

## Sections

### Page Hero
| Element | Details |
|---|---|
| **Section Label** | ACEC |
| **Heading** | "مشاريعنا المميزة" / "Our Projects" |
| **Source** | Hardcoded bilingual text |

### Projects Grid
Same `ProjectsSection` component used on the home page. Includes category filter tabs.

See Home > Projects Section for full details.

## SEO Metadata
| Locale | Title | Description |
|---|---|---|
| **ar** | "المشاريع \| ACEC" | "مشاريعنا المميزة في المملكة العربية السعودية" |
| **en** | "Projects \| ACEC" | "Our featured projects across Saudi Arabia" |

## Content Replacement Priority: **HIGH**

---

# Page: Project Detail
URL: `/{locale}/projects/[slug]`

## Purpose
Display full details of a single engineering project.

## Sections

### Hero
| Element | Details |
|---|---|
| **Label** | "ACEC PROJECT" |
| **Title** | Dynamic from API (project.title_ar / project.title_en) |
| **Category** | Gold uppercase badge |
| **Source** | **Dynamic** — `GET /api/v1/projects/{slug}/{locale}` |

### Project Image
- Full-width image: `{API_BASE}/storage/{project.image}`
- 400px height (responsive)

### Project Description
- `project.description_ar` / `project.description_en`

### Project Info Grid
| Info Field | Label AR | Label EN |
|---|---|---|
| Location | الموقع | Location |
| Client | العميل | Client |
| Year | السنة | Year |
| Area | المساحة | Area |

## SEO Metadata
| Field | Value |
|---|---|
| Title | `{project.title} | ACEC` (dynamic) |
| Description | `project.description` (dynamic) |

## Content Replacement Priority: **HIGH**

---

# Page: About
URL: `/{locale}/about`

## Purpose
Introduce the company, its history, values, and expertise.

## Sections

### Page Hero
| Element | Details |
|---|---|
| **Section Label** | ACEC |
| **Heading** | "عن مكتبنا" / "About Us" |
| **Source** | Hardcoded bilingual text |

### About Section
Same `AboutSection` component used on the home page. See Home > About Section for details.

### Why Choose Us Section
Same `WhySection` component used on the home page. See Home > Why Choose Us Section for details.

## SEO Metadata
| Locale | Title | Description |
|---|---|---|
| **ar** | "عن المكتب \| ACEC" | "مكتب الميثاق العربي للاستشارات الهندسية وهندسة السلامة — تعرف على مكتبنا وفريقنا" |
| **en** | "About Us \| ACEC" | "Arab Charter Engineering Consultants — learn about our office and team" |

## Content Replacement Priority: **HIGH**

---

# Page: Team
URL: `/{locale}/team`

## Purpose
Display all team members with their profiles.

## Sections

### Hero
| Element | Details |
|---|---|
| **Section Label** | "فريقنا" / "Our Team" |
| **Heading** | "فريق من المتخصصين" / "A Team of Specialists" |
| **Description** | "فريق من المهندسين المتخصصين ذوي الخبرة العالية في مختلف التخصصات الهندسية" / "A team of highly experienced specialized engineers across various engineering disciplines" |
| **Source** | Hardcoded bilingual text |

### Team Grid
| Element | Details |
|---|---|
| **Layout** | Auto-fill grid (min 280px) |
| **Each Card** | Circular photo/initial, name, position (gold), bio, LinkedIn link, Email link |
| **Photo Fallback** | First character of name |
| **Empty State** | "قريباً..." / "Coming Soon..." |
| **Back link** | "العودة للرئيسية" / "Back to Home" |
| **Source** | **Dynamic** — `GET /api/v1/team/{locale}` (server-fetched with 5min revalidation) |

## SEO Metadata
| Locale | Title | Description |
|---|---|---|
| **ar** | "فريقنا \| مكتب الميثاق العربي" | "فريق من المهندسين المتخصصين ذوي الخبرة العالية" |
| **en** | "Our Team \| ACEC" | "A team of highly experienced specialized engineers" |

## Content Replacement Priority: **HIGH**

---

# Page: Clients
URL: `/{locale}/clients`

## Purpose
Display all client/partner logos in a grid layout.

## Sections

### Hero
| Element | Details |
|---|---|
| **Section Label** | "عملاؤنا" / "Our Clients" |
| **Heading** | "شركاؤنا المميزون" / "Our Valued Clients" |
| **Description** | "نفخر بشراكتنا مع أكبر وأبرز الشركات والمؤسسات في المملكة" / "We are proud to partner with leading companies and organizations in Saudi Arabia" |
| **Source** | Hardcoded bilingual text |

### Clients Grid
| Element | Details |
|---|---|
| **Layout** | Auto-fit grid (min 200px) |
| **Each Card** | Logo image + bilingual name, glassmorphism hover effect, clickable to website |
| **Empty State** | "قريباً..." / "Coming Soon..." |
| **Bottom CTA** | "احجز استشارة" / "Book Consultation" — gold gradient button to `/{locale}/contact` |
| **Source** | **Dynamic** — `GET /api/v1/clients` (server-fetched with 5min revalidation) |

## SEO Metadata
| Locale | Title | Description |
|---|---|---|
| **ar** | "عملاؤنا \| ACEC" | "شركاؤنا ومكلؤنا في المملكة العربية السعودية" |
| **en** | "Our Clients \| ACEC" | "Our clients and partners across Saudi Arabia" |

## Content Replacement Priority: **MEDIUM**

---

# Page: Blog
URL: `/{locale}/blog`

## Purpose
Display company news and blog posts.

## Sections

### Hero
| Element | Details |
|---|---|
| **Section Label** | "المدونة" / "Blog" |
| **Heading** | "آخر الأخبار" / "Latest News" |
| **Source** | Hardcoded bilingual text |

### Blog Grid
| Element | Details |
|---|---|
| **Layout** | Auto-fill grid (min 350px) |
| **Each Card** | Featured image, category label, title, excerpt, full card linked to detail page |
| **Empty State** | "قريباً..." / "Coming Soon..." |
| **Back link** | "العودة للرئيسية" / "Back to Home" |
| **Source** | **Dynamic** — `GET /api/v1/blog/{locale}` (server-fetched with 5min revalidation) |

## SEO Metadata
| Locale | Title | Description |
|---|---|---|
| **ar** | "المدونة \| مكتب الميثاق العربي" | (none — no meta description set) |
| **en** | "Blog \| ACEC" | (none — no meta description set) |

## Content Replacement Priority: **HIGH**

---

# Page: Blog Detail
URL: `/{locale}/blog/[slug]`

## Purpose
Display full blog post content.

## Sections

### Hero
| Element | Details |
|---|---|
| **Category** | Gold uppercase label |
| **Title** | Dynamic from API (post.title) |
| **Published Date** | Formatted with `toLocaleDateString` |
| **Source** | **Dynamic** — `GET /api/v1/blog/{slug}/{locale}` |

### Featured Image
- `{API_BASE}/storage/{post.image}` — 400px height

### Content
- HTML rendered via `dangerouslySetInnerHTML` from `post.content`

### Back Link
- "العودة للمدونة" / "Back to Blog"

## SEO Metadata
| Field | Value |
|---|---|
| Title | `{post.title} | ACEC` (dynamic) |
| Description | `post.excerpt` (dynamic) |

## Content Replacement Priority: **HIGH**

---

# Page: Contact
URL: `/{locale}/contact`

## Purpose
Provide contact information and a contact form for inquiries.

## Sections

### Left Column — Contact Info
| Element | Details |
|---|---|
| **Section Label** | ACEC |
| **Heading** | "تواصل معنا" / "Contact Us" |
| **Subtitle** | i18n — contact.subtitle |
| **Contact Items** | 3 items: Email, Website, Location |

#### Contact Items Detail
| Icon | Title | Value | Link |
|---|---|---|---|
| 📧 | البريد الإلكتروني / Email | info@ac-ec.com.sa | mailto |
| 🌐 | الموقع الإلكتروني / Website | ac-ec.com.sa | https://ac-ec.com.sa |
| 📍 | الموقع / Location | المملكة العربية السعودية / Saudi Arabia | — |

### Right Column — Contact Form
See Forms Section below for detailed field analysis.

### Source
- Contact info: Hardcoded bilingual values
- Heading/Subtitle: Hardcoded + i18n
- Form: Client component with i18n labels

## SEO Metadata
| Locale | Title | Description |
|---|---|---|
| **ar** | "تواصل معنا \| ACEC" | "تواصل مع مكتب الميثاق العربي للاستشارات الهندسية — نحن هنا للإجابة على جميع استفساراتك" |
| **en** | "Contact Us \| ACEC" | "Contact Arab Charter Engineering Consultants — we are here to answer all your inquiries" |

## Content Replacement Priority: **HIGH**

---

# Page: Company Profile
URL: `/{locale}/profile`

## Purpose
Display/Download the official company profile PDF.

## Sections

### Hero
| Element | Details |
|---|---|
| **Section Label** | "ملف المكتب" / "Company Profile" |
| **Heading** | "ملف تعريفي" / "Company Profile" |
| **Description** | "تعرف على مكتب الميثاق العربي للاستشارات الهندسية — رؤيتنا، رسالتنا، خدماتنا، ومشاريعنا" / "Discover Arab Charter Engineering Consultants (ACEC) — our vision, mission, services, and projects" |
| **Source** | Hardcoded bilingual text |

### PDF Viewer
| Element | Details |
|---|---|
| **Iframe** | Full-height PDF viewer (85vh) with toolbar enabled |
| **Fallback Download** | "لا يعمل العرض؟" / "Having trouble viewing?" + "تحميل الملف" / "Download PDF" button |
| **Empty State** | 📄 icon + "لا يوجد ملف تعريف بعد" / "No Profile PDF Yet" + "سيتم إضافة الملف التعريفي للمكتب قريبًا" / "The company profile PDF will be available soon" |
| **Back Link** | "العودة للرئيسية" / "Back to Home" |
| **Source** | **Dynamic** — `GET /api/v1/profile-pdf/active` (server-fetched with 60s revalidation) |

## SEO Metadata
| Locale | Title | Description |
|---|---|---|
| **ar** | "ملف المكتب التعريفي \| ACEC" | "الملف التعريفي لمكتب الميثاق العربي للاستشارات الهندسية وهندسة السلامة" |
| **en** | "Company Profile \| ACEC" | "Arab Charter Engineering Consultants (ACEC) — official company profile" |

## Content Replacement Priority: **HIGH** (this page exists to host the PDF that will be replaced)

---

# Page: Certifications
URL: `/{locale}/certifications`

## Purpose
Display company certifications and accreditations.

## Sections

### Hero
| Element | Details |
|---|---|
| **Section Label** | "الشهادات" / "Certifications" |
| **Heading** | "شهادات معتمدة" / "Accredited Certifications" |
| **Source** | Hardcoded bilingual text |

### Certifications Grid
| Element | Details |
|---|---|
| **Layout** | Auto-fill grid (min 320px) |
| **Each Card** | Image/icon (64px), name, issuer (gold), description |
| **Empty State** | "قريباً..." / "Coming Soon..." |
| **Back Link** | "العودة للرئيسية" / "Back to Home" |
| **Source** | **Dynamic** — `GET /api/v1/certifications/{locale}` (server-fetched with 5min revalidation) |

## SEO Metadata
| Locale | Title | Description |
|---|---|---|
| **ar** | "الشهادات \| مكتب الميثاق العربي" | (none — no meta description) |
| **en** | "Certifications \| ACEC" | (none — no meta description) |

## Content Replacement Priority: **HIGH**

---

# Page: Careers
URL: `/{locale}/career`

## Purpose
Display job openings and allow applications.

## Sections

### Hero
| Element | Details |
|---|---|
| **Section Label** | "انضم لفريقنا" / "Join Our Team" |
| **Heading** | "فرص وظيفية" / "Career Opportunities" |
| **Description** | "نحن نبحث دائماً عن المواهب المتميزة للانضمام إلى فريقنا" / "We are always looking for exceptional talent to join our team" |
| **Source** | Hardcoded bilingual text |

### Job Listings
| Element | Details |
|---|---|
| **Layout** | Vertical stack of job cards |
| **Each Card** | Title, type badge (gold), location, description, requirements section, "Apply Now" button |
| **Type Labels** | full-time: "دوام كامل/Full-time", part-time: "دوام جزئي/Part-time", contract: "عقد/Contract", remote: "عن بعد/Remote" |
| **Apply Button** | `mailto:info@ac-ec.com.sa?subject={job.title}` |
| **Empty State** | "لا توجد وظائف متاحة حالياً" / "No positions available at the moment" |
| **Back Link** | "العودة للرئيسية" / "Back to Home" |
| **Source** | **Dynamic** — `GET /api/v1/jobs/{locale}` (server-fetched with 5min revalidation) |

## SEO Metadata
| Locale | Title | Description |
|---|---|---|
| **ar** | "الوظائف \| مكتب الميثاق العربي" | (none — no meta description) |
| **en** | "Careers \| ACEC" | (none — no meta description) |

## Content Replacement Priority: **HIGH**

---

# Page: Dashboard (Theme Management)
URL: `/{locale}/dashboard`

## Purpose
Admin interface for managing visual themes (colors). Note: This is a client-side only page.

## Sections
| Element | Details |
|---|---|
| **Heading** | "إدارة الثيمات" / "Theme Management" |
| **Theme List** | Displays themes with active/inactive status |
| **Action** | "تفعيل" / "Activate" button to switch theme |
| **Loading State** | "جاري التحميل..." / "Loading..." |
| **Source** | **Dynamic** — `GET /api/themes` (list), `POST /api/themes/{id}/activate` (activate) |

---

# 4. Backend/Dynamic Content Mapping

| Module | Dynamic? | API Endpoint | Admin Panel | Cache |
|---|---|---|---|---|
| **Hero Section** | Static via i18n + API available | `GET /api/v1/hero/{lang}` | — | — |
| **Services** | ✅ Yes | `GET /api/v1/services/{lang}` | ✅ Filament CRUD | Client: on mount |
| **Service Detail** | ✅ Yes | `GET /api/v1/services/{slug}/{lang}` | ✅ Filament CRUD | Server: no-store |
| **Projects** | ✅ Yes | `GET /api/v1/projects/{lang}` | ✅ Filament CRUD | Client: on mount |
| **Project Detail** | ✅ Yes | `GET /api/v1/projects/{slug}/{lang}` | ✅ Filament CRUD | Server: no-store |
| **Team Members** | ✅ Yes | `GET /api/v1/team/{lang}` | ✅ Filament CRUD | Server: 5min revalidate |
| **Clients** | ✅ Yes | `GET /api/v1/clients` | ✅ Filament CRUD | Server: 5min revalidate |
| **Blog Posts** | ✅ Yes | `GET /api/v1/blog/{lang}` | ✅ Filament CRUD | Server: 5min revalidate |
| **Blog Post Detail** | ✅ Yes | `GET /api/v1/blog/{slug}/{lang}` | ✅ Filament CRUD | Server: no-store |
| **Certifications** | ✅ Yes | `GET /api/v1/certifications/{lang}` | ✅ Filament CRUD | Server: 5min revalidate |
| **Jobs** | ✅ Yes | `GET /api/v1/jobs/{lang}` | ✅ Filament CRUD | Server: 5min revalidate |
| **Profile PDF** | ✅ Yes | `GET /api/v1/profile-pdf/active` | ✅ Filament CRUD | Server: 60s revalidate |
| **Why Us Items** | API available (not used on pages?) | `GET /api/v1/why-us/{lang}` | — | — |
| **Contact Messages** | POST only | `POST /api/v1/contact` (rate: 5/min) | ✅ Filament (read-only) | — |
| **Job Applications** | POST only | `POST /api/v1/job-apply` (rate: 5/min) | ✅ Filament (read-only) | — |
| **Settings** | API available | `GET /api/v1/settings` | — | — |
| **Section Visibility** | API available | `GET /api/v1/sections/{lang}` | — | — |
| **Themes** | ✅ Yes | `GET /api/themes/active` | ✅ Filament CRUD | Server: 60s revalidate |
| **Theme Management** | ✅ Yes | `GET/POST/PUT/DELETE /api/themes` | ✅ Filament CRUD | — |

## Database Tables
| Table | Content Type | Bilingual? |
|---|---|---|
| `services` | Engineering services | ✅ (_ar/_en columns) |
| `projects` | Completed projects | ✅ (_ar/_en columns) |
| `team_members` | Staff profiles | ✅ (_ar/_en columns) |
| `clients` | Client companies | ✅ (_ar/_en columns) |
| `blog_posts` | News/articles | ✅ (_ar/_en columns) |
| `certifications` | Certifications | ✅ (_ar/_en columns) |
| `job_postings` | Job openings | ✅ (_ar/_en columns) |
| `messages` | Contact form submissions | Only `lang` column |
| `profile_pdfs` | Company profile PDF files | ✅ (name bilingual) |
| `hero_sections` | Hero content | ✅ (lang-based rows) |
| `why_us_items` | Why-choose-us cards | ✅ (_ar/_en columns) |
| `settings` | Key-value settings | No |
| `themes` | Color/typography themes | ✅ (name bilingual) |
| `sections_config` | Section visibility | ✅ (_ar/_en columns) |
| `page_views` | Analytics tracking | `lang` column only |
| `users` | Admin users | No |

---

# 5. Forms & Inputs Inventory

## Contact Form

**File:** `src/components/forms/ContactForm.tsx`  
**Endpoint:** `POST /api/v1/contact` (rate limited: 5 requests per minute)  
**Submit Service:** `src/lib/contactFormService.ts`  
**Validation:** Client-side + server-side

### Field Details
| Field Name | Input Type | Required | Placeholder | Max Length | Notes |
|---|---|---|---|---|---|
| `name` | text | ✅ Yes | Translated label | — | Client-side validation: non-empty |
| `email` | email | ✅ Yes | Translated label | — | Client-side: regex validation `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| `phone` | tel | No | `+966 5x xxx xxxx` | — | Optional field |
| `subject` | text | ✅ Yes | Translated label | — | Required |
| `service_interest` | select | No | "اختر الخدمة" / "Select Service" | — | 6 options + empty default |
| `message` | textarea | ✅ Yes | Translated label | Min 10 chars | Client-side min-length validation |

### Select Options (service_interest)
| Value | English Label | Arabic Label |
|---|---|---|
| `""` (empty) | Select Service | اختر الخدمة |
| `consulting` | Engineering Consultancy | الاستشارات الهندسية |
| `safety` | Safety Engineering | هندسة السلامة |
| `supervision` | Engineering Supervision | الإشراف الهندسي |
| `interior` | Interior Design | التصميم الداخلي |
| `factory` | Factory Design | تصميم المصانع |
| `modon` | MODON Compliance | التوافق مع MODON |

### Submit States
| State | Display |
|---|---|
| **idle** | "إرسال الرسالة" / "Send Message" |
| **loading** | "جاري الإرسال..." / "Sending..." (button disabled) |
| **success** | ✅ "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً." / "Message sent successfully! We'll contact you soon." (auto-resets after 5s) |
| **error** | ✕ Error message (from API or client-side) |

## Career Application
No form component exists. Instead, clicking "Apply Now" opens:
- `mailto:info@ac-ec.com.sa?subject={job.title}` — opens user's default email client
- Backend endpoint: `POST /api/v1/job-apply` (rate limited: 5/min) exists but not connected to frontend

### Missing Form for Job Applications
The `POST /api/v1/job-apply` endpoint exists in the backend but the frontend does NOT use it. Applications are sent via email link only. This should be noted as a potential future enhancement.

---

# 6. SEO & Metadata Analysis

## Global Default Metadata (Root Layout)
| Property | Value |
|---|---|
| Title Template | `%s | ACEC` |
| Default Title | "ACEC — مكتب الميثاق العربي للاستشارات الهندسية" |
| Description | Arabic description of the company |
| Keywords | 7 bilingual keywords |
| OG Site Name | ACEC |
| OG Locale | ar_SA |
| OG URL | https://ac-ec.com.sa |
| Twitter Card | summary_large_image |
| Metadata Base | https://ac-ec.com.sa |
| Icons | /favicon.svg |

## Per-Page Metadata Coverage
| Page | Meta Title | Meta Description | OG/Twitter |
|---|---|---|---|
| Home | ✅ Default only | ✅ | ✅ Open Graph + Twitter |
| About | ✅ Bilingual | ✅ Bilingual | Inherits default |
| Services | ✅ Bilingual | ✅ Bilingual | Inherits default |
| Projects | ✅ Bilingual | ✅ Bilingual | Inherits default |
| Contact | ✅ Bilingual | ✅ Bilingual | Inherits default |
| Blog | ✅ Bilingual | ❌ None | Inherits default |
| Blog Detail | ✅ Dynamic from API | ✅ Dynamic excerpt | Inherits default |
| Clients | ✅ Bilingual | ✅ Bilingual | Inherits default |
| Certifications | ✅ Bilingual | ❌ None | Inherits default |
| Careers | ✅ Bilingual | ❌ None | Inherits default |
| Team | ✅ Bilingual | ✅ Bilingual | Inherits default |
| Profile | ✅ Bilingual | ✅ Bilingual | Inherits default |
| Service Detail | ✅ Dynamic from API | ✅ Dynamic description | Inherits default |
| Project Detail | ✅ Dynamic from API | ✅ Dynamic description | Inherits default |

## Issues Found
1. **Blog, Certifications, Careers pages** — no meta description set, only title
2. **No hreflang tags detected** — multilingual site missing alternate language links
3. **No structured data / JSON-LD** — no schema.org markup detected
4. **No sitemap.xml detected** — no sitemap generation configured
5. **Open Graph fallback** — all subpages inherit the root Arabic OG title/description, no per-page OG tags

---

# 7. Content Migration Notes

## Areas Needing Manual Review
1. **Hardcoded bilingual content** — Many pages have hardcoded Arabic/English strings that will need manual replacement:
   - `page.tsx` files for Services, Projects, About, Contact, Team, Clients, Blog, Certifications, Careers, Profile
   - `AboutSection.tsx` — 3 feature points are hardcoded
   - `ClientsSection.tsx` — heading and description are hardcoded
   - `ServiceDetailClient.tsx` — section headings are hardcoded
   - `ProjectsSection.tsx` — category filter labels are hardcoded
   - `StatsSection.tsx` — stat values (50, 15, 30, 100) are hardcoded
   - `HeroSection.tsx` — floating stat values (+50, +15, +30) are hardcoded

2. **Translation files** — `messages/en.json` and `messages/ar.json` (121 lines each) contain all i18n strings. These need updating to replace current messaging.

3. **Company Profile PDF** — This is managed via Filament admin (ProfilePdf CRUD). The new PDF should be uploaded there.

## Repeated Content
| Content | Appears On |
|---|---|
| Services cards (API-driven) | Home page + Services page |
| Projects grid (API-driven) | Home page + Projects page |
| About section | Home page + About page |
| Why Choose Us section | Home page + About page |
| Clients section (API-driven) | Home page + Clients page |
| Contact Form | Contact page (and potentially reusable elsewhere) |
| "Book Consultation" CTA | Navbar, Home CTA, Clients section, Clients page, Service Detail, Footer |
| "Back to Home" links | Team, Blog, Certifications, Careers, Profile pages |
| Contact info (email, phone, WhatsApp) | Footer, Contact page |

## Missing Content
| Item | Missing? | Detail |
|---|---|---|
| hreflang tags | ❌ Missing | Essential for multilingual SEO |
| JSON-LD structured data | ❌ Missing | No Organization/Breadcrumb/LocalBusiness schema |
| Sitemap | ❌ Missing | No sitemap.xml |
| 404 page | ❌ Missing | No custom not-found page |
| Privacy Policy | ❌ Missing | No privacy/legal pages |
| Terms of Service | ❌ Missing | No terms page |
| FAQ section | ❌ Missing | Not present anywhere on site |
| Testimonials section | ❌ Missing | No testimonials/case studies |
| Job application form | ❌ Missing | Backend endpoint exists but frontend uses mailto link only |
| Blog search/filter | ❌ Missing | No search or category filtering for blog posts |
| Blog pagination | ❌ Missing | No pagination on blog listing |
| Newsletter signup | ❌ Missing | No newsletter/subscribe form |

## Placeholder/Mock Content
| Where | Content | Status |
|---|---|---|
| Hero floating stats | "+50 Projects, +15 Years, +30 Clients" | Hardcoded placeholders — not connected to actual DB |
| Stats section | 50+ Projects, 15+ Years, 30+ Clients, 100% Compliance | Hardcoded numbers — not connected to DB |
| Service images (ProjectCard) | Fallback SVG: `/images/project-architecture-1.svg` | Placeholder when no image in DB |
| Client logos | Fallback: `/images/client-logo.svg` | Placeholder when no logo in DB |
| Service icons | 6 SVG icons hardcoded by slug | Static SVGs, not editable via admin |
| "Coming Soon" / "قريباً..." | Team, Clients, Blog, Certifications empty states | Placeholder when DB is empty |

## Risks Before Migration
1. **Hardcoded + i18n mixed content** — Some text is in translation files, some is hardcoded in components. Any replacement must update BOTH locations.
2. **Stat numbers are fake** — The 50/15/30/100 stats are hardcoded and do NOT reflect actual database counts. Any migration should decide whether to keep these as marketing claims or connect them to real data.
3. **Bilingual content spread across 3 layers** — Translation files (JSON), component hardcode (TSX), and database (API). Content changes need to be coordinated across all three.
4. **No 404 page** — If slugs change during migration, users will see Next.js default 404.
5. **Section visibility is configurable** — The `sections_config` table controls which sections are visible. Check this before assuming all sections render.
6. **Theme system affects visual presentation** — The theme (colors, typography) is dynamic and admin-customizable. Brand color changes via migration would also need theme updates.

---

# 8. Final Recommendations

## Immediate Actions
1. **Replace translation files** (`messages/en.json`, `messages/ar.json`) with new messaging from Word/PDF
2. **Update hardcoded bilingual strings** in all component/page TSX files listed in Section 7
3. **Upload new Company Profile PDF** via Filament admin → Profile PDFs
4. **Populate database** via Filament admin or seeders for: Services, Projects, Team, Clients, Blog, Certifications, Jobs
5. **Update SEO metadata** — add missing descriptions for Blog, Certifications, Careers pages

## Post-Migration Enhancements
1. Add hreflang tags for Arabic/English pages
2. Add JSON-LD structured data (Organization, LocalBusiness, BreadcrumbList)
3. Generate sitemap.xml
4. Create custom 404 page
5. Connect stat counters to real database counts (or keep as configurable settings)

## Content Replacement Priority Matrix
| Priority | Pages | Reason |
|---|---|---|
| **HIGH** | Home, Services, About, Blog, Profile, Certifications, Careers | Primary content pages with direct messaging |
| **HIGH** | Translation files (en.json, ar.json) | All i18n content flows from these files |
| **HIGH** | Database content (Services, Projects, Team, etc.) | All API-driven content |
| **MEDIUM** | Clients, Contact | Less narrative content, operational info |
| **LOW** | Dashboard | Admin-only, not visible to public |
