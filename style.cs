
/* ==============================================
   TRANSITEASE - PROFESSIONAL WEBSITE DESIGN
   ============================================== */

:root {
    --green: #176b4b;
    --green-dark: #104b35;
    --green-light: #e9f3ed;
    --accent: #b9e7c8;
    --bg: #f7f9f7;
    --white: #ffffff;
    --text: #1e2923;
    --muted: #68766d;
    --border: #e5ebe6;
    --shadow: 0 12px 35px rgba(21, 63, 42, 0.07);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: "DM Sans", sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.7;
}

a {
    text-decoration: none;
    color: inherit;
}

button,
input {
    font-family: inherit;
}

button {
    cursor: pointer;
}

.section-padding {
    padding: 100px 8%;
}


/* ==============================================
   NAVBAR
   ============================================== */

.navbar {
    height: 82px;
    padding: 0 8%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--white);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: "Manrope", sans-serif;
    font-size: 23px;
    font-weight: 800;
    color: var(--green-dark);
}

.logo-icon {
    background: var(--green);
    color: white;
    width: 35px;
    height: 35px;
    display: grid;
    place-items: center;
    border-radius: 11px;
    font-size: 20px;
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 34px;
}

.nav-links a {
    font-size: 14px;
    color: var(--muted);
    font-weight: 600;
    transition: 0.25s;
}

.nav-links a:hover {
    color: var(--green);
}

.nav-button {
    padding: 12px 19px;
    background: var(--green);
    color: white;
    border-radius: 9px;
    font-size: 14px;
    font-weight: 700;
    transition: 0.25s;
}

.nav-button:hover {
    background: var(--green-dark);
    transform: translateY(-2px);
}


/* ==============================================
   HERO SECTION
   ============================================== */

.hero {
    padding: 95px 8% 85px;
    background:
        radial-gradient(circle at 80% 20%, #dcefe3 0, transparent 35%),
        linear-gradient(120deg, #f5f8f5, #edf5ee);
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 65px;
    align-items: center;
    overflow: hidden;
}

.hero-content {
    max-width: 650px;
}

.eyebrow,
.section-tag {
    font-size: 12px;
    letter-spacing: 2px;
    color: var(--green);
    font-weight: 800;
}

.eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #e5f2e8;
    padding: 10px 15px;
    border-radius: 30px;
}

.status-dot {
    width: 8px;
    height: 8px;
    background: #2ca36b;
    border-radius: 50%;
}

.hero h1 {
    font-family: "Manrope", sans-serif;
    font-size: clamp(43px, 5.5vw, 76px);
    line-height: 1.13;
    letter-spacing: -3px;
    margin: 27px 0;
    font-weight: 800;
}

.hero h1 span {
    color: var(--green);
}

.hero-description {
    color: var(--muted);
    font-size: 17px;
    max-width: 520px;
    margin-bottom: 30px;
}

.hero-actions {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
}

.primary-btn,
.secondary-btn {
    padding: 15px 22px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: 0.25s;
}

.primary-btn {
    background: var(--green);
    color: white;
}

.primary-btn:hover {
    background: var(--green-dark);
    transform: translateY(-2px);
}

.secondary-btn {
    border: 1px solid #d5dfd7;
    background: white;
    color: var(--text);
}

.secondary-btn:hover {
    border-color: var(--green);
    color: var(--green);
}

.hero-stats {
    display: flex;
    gap: 35px;
    margin-top: 50px;
    padding-top: 25px;
    border-top: 1px solid #dce6dd;
}

.hero-stats div {
    display: flex;
    flex-direction: column;
}

.hero-stats strong {
    font-size: 14px;
    color: var(--green-dark);
}

.hero-stats span {
    color: var(--muted);
    font-size: 12px;
}


/* ==============================================
   HERO VISUAL
   ============================================== */

.hero-visual {
    position: relative;
    padding: 20px;
}

.visual-card {
    background: white;
    border-radius: 24px;
    padding: 30px;
    box-shadow: 0 25px 60px rgba(25, 77, 48, 0.12);
    border: 1px solid #e7eee8;
    max-width: 460px;
    margin: auto;
}

.visual-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 11px;
    letter-spacing: 1.4px;
    color: var(--muted);
    font-weight: 800;
    padding-bottom: 22px;
    border-bottom: 1px solid var(--border);
}

.live-pill {
    color: var(--green);
    background: #eaf5ec;
    padding: 7px 12px;
    border-radius: 20px;
    letter-spacing: 0;
}

.visual-route {
    padding: 28px 10px;
}

.route-point {
    display: flex;
    align-items: center;
    gap: 17px;
}

.route-icon {
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--green-light);
    color: var(--green);
    font-size: 13px;
}

.end-point .route-icon {
    background: #fff0db;
    color: #c78a33;
}

.route-point div {
    display: flex;
    flex-direction: column;
}

.route-point small {
    font-size: 10px;
    letter-spacing: 1.5px;
    color: var(--muted);
    font-weight: 700;
}

.route-point strong {
    font-size: 15px;
    margin-top: 4px;
}

.route-line {
    height: 36px;
    border-left: 2px dashed #c8d8cc;
    margin-left: 17px;
}

.visual-bottom {
    background: #f5f8f5;
    border-radius: 15px;
    padding: 17px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.mini-icon {
    width: 38px;
    height: 38px;
    display: grid;
    place-items: center;
    border-radius: 11px;
    background: white;
}

.visual-caption {
    display: flex;
    flex-direction: column;
    margin-left: 5px;
}

.visual-caption strong {
    font-size: 12px;
}

.visual-caption span {
    font-size: 10px;
    color: var(--muted);
}

.floating-badge {
    position: absolute;
    bottom: -12px;
    left: 0;
    background: white;
    border-radius: 14px;
    box-shadow: var(--shadow);
    padding: 13px 18px;
    display: flex;
    align-items: center;
    gap: 12px;
}

.floating-badge > span {
    background: #e9f5e9;
    padding: 10px;
    border-radius: 10px;
}

.floating-badge div {
    display: flex;
    flex-direction: column;
}

.floating-badge strong {
    font-size: 12px;
}

.floating-badge small {
    font-size: 10px;
    color: var(--muted);
}


/* ==============================================
   SECTION HEADINGS
   ============================================== */

.section-heading {
    text-align: center;
    margin-bottom: 45px;
}

.section-heading h2 {
    font-family: "Manrope", sans-serif;
    font-size: clamp(30px, 4vw, 44px);
    letter-spacing: -1.5px;
    margin: 13px 0;
    font-weight: 800;
}

.section-heading p {
    color: var(--muted);
    font-size: 15px;
}


/* ==============================================
   ROUTE PLANNER
   ============================================== */

.route-section {
    background: white;
}

.search-card {
    max-width: 800px;
    margin: auto;
    background: white;
    padding: 35px;
    border-radius: 20px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    display: grid;
    grid-template-columns: 1fr 40px 1fr auto;
    align-items: end;
    gap: 18px;
}

.search-field label {
    display: block;
    font-size: 11px;
    letter-spacing: 1.5px;
    font-weight: 800;
    color: var(--muted);
    margin-bottom: 10px;
}

.field-box {
    height: 55px;
    border: 1px solid var(--border);
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 14px;
    transition: 0.2s;
}

.field-box:focus-within {
    border-color: var(--green);
    box-shadow: 0 0 0 3px #e8f3eb;
}

.field-icon {
    font-size: 12px;
}

.field-icon.start {
    color: #2e9d66;
}

.field-icon.destination {
    color: #d19b43;
}

.field-box input {
    width: 100%;
    outline: none;
    border: none;
    background: transparent;
    font-size: 14px;
    color: var(--text);
}

.field-box input::placeholder {
    color: #a0aaa2;
}

.search-divider {
    display: grid;
    place-items: center;
    height: 55px;
    color: #8a978e;
}

.search-divider span {
    background: var(--green-light);
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: grid;
    place-items: center;
}

.search-btn {
    height: 55px;
    border: none;
    padding: 0 22px;
    border-radius: 10px;
    background: var(--green);
    color: white;
    font-weight: 700;
    font-size: 14px;
    white-space: nowrap;
    transition: 0.25s;
}

.search-btn:hover {
    background: var(--green-dark);
    transform: translateY(-2px);
}

.search-btn span {
    margin-left: 8px;
}


/* ==============================================
   RESULT CARDS
   ============================================== */

#route-result,
#transport-result {
    max-width: 1000px;
    margin: 25px auto 0;
}

.result-card {
    background: white;
    border: 1px solid var(--border);
    padding: 25px;
    margin-top: 20px;
    border-radius: 16px;
    box-shadow: var(--shadow);
}

.result-card h3 {
    margin-bottom: 14px;
    color: var(--green-dark);
}

.result-card p {
    margin-bottom: 10px;
    color: var(--muted);
}

.result-card ul {
    margin: 15px 0 0 22px;
}

.result-card li {
    margin-bottom: 8px;
}

.route-note {
    background: #f0f6f1;
    color: #4d6855;
    border-radius: 10px;
    padding: 14px;
    margin: 15px 0;
    font-size: 13px;
}


/* ==============================================
   NEARBY TRANSPORT
   ============================================== */

.nearby-section {
    background: #f4f7f4;
}

.transport-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
}

.transport-card {
    background: white;
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 30px;
    transition: 0.3s;
}

.transport-card:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow);
    border-color: #d1e3d5;
}

.transport-card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
}

.transport-icon {
    width: 55px;
    height: 55px;
    display: grid;
    place-items: center;
    border-radius: 15px;
    font-size: 25px;
}

.bus-icon {
    background: #eaf4e9;
}

.metro-icon {
    background: #e9f0fa;
}

.train-icon {
    background: #fff2e3;
}

.transport-label {
    font-size: 10px;
    font-weight: 800;
    color: #87938a;
    letter-spacing: 1px;
}

.transport-card h3 {
    font-family: "Manrope", sans-serif;
    font-size: 23px;
    margin: 22px 0 10px;
}

.transport-card p {
    color: var(--muted);
    font-size: 14px;
    min-height: 75px;
}

.transport-button {
    width: 100%;
    margin-top: 20px;
    padding: 14px 16px;
    background: white;
    border: 1px solid #dce5de;
    border-radius: 10px;
    font-weight: 700;
    color: var(--green);
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: 0.25s;
}

.transport-button:hover {
    background: var(--green);
    color: white;
    border-color: var(--green);
}


/* ==============================================
   MAP SECTION
   ============================================== */

.map-section {
    background: white;
}

.map-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
}

.map-heading .section-heading {
    text-align: left;
    margin-bottom: 25px;
}

.map-legend {
    font-size: 13px;
    color: var(--muted);
    padding-bottom: 28px;
}

.legend-dot {
    display: inline-block;
    height: 10px;
    width: 10px;
    background: var(--green);
    border-radius: 50%;
    margin-right: 6px;
}

.map-container {
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
}

#map {
    width: 100%;
    height: 500px;
    z-index: 1;
}

.map-note {
    font-size: 11px;
    color: var(--muted);
    margin-top: 12px;
}


/* ==============================================
   ABOUT
   ============================================== */

.about-section {
    background: var(--green-dark);
    color: white;
}

.about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 75px;
    align-items: center;
}

.about-text .section-tag {
    color: #b6e5c3;
}

.about-text h2 {
    font-family: "Manrope", sans-serif;
    font-size: clamp(32px, 4vw, 49px);
    line-height: 1.2;
    letter-spacing: -1.5px;
    margin: 20px 0;
}

.about-text p {
    color: #c8d9ce;
    margin-bottom: 18px;
    font-size: 15px;
}

.about-text .primary-btn {
    background: #b9e7c8;
    color: var(--green-dark);
    margin-top: 15px;
}

.about-text .primary-btn:hover {
    background: white;
}

.about-cards {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.about-card {
    padding: 22px 25px;
    border: 1px solid #32644c;
    background: #194f38;
    border-radius: 15px;
}

.about-card > span {
    color: #a8d9b7;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 1px;
}

.about-card h3 {
    margin: 6px 0;
    font-size: 18px;
}

.about-card p {
    color: #c5d8cc;
    font-size: 13px;
}


/* ==============================================
   FOOTER
   ============================================== */

.footer {
    background: #0b3524;
    color: white;
    padding: 55px 8% 25px;
}

.footer-main {
    display: flex;
    justify-content: space-between;
    gap: 40px;
    padding-bottom: 40px;
}

.footer-logo {
    color: white;
}

.footer-main > div:first-child p {
    color: #aac4b4;
    font-size: 13px;
    margin-top: 15px;
}

.footer-links {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.footer-links strong {
    font-size: 11px;
    letter-spacing: 1.5px;
    color: #a8d9b7;
    margin-bottom: 5px;
}

.footer-links a {
    color: #c3d4c8;
    font-size: 13px;
    transition: 0.2s;
}

.footer-links a:hover {
    color: white;
}

.footer-bottom {
    border-top: 1px solid #28523b;
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    gap: 15px;
    color: #91ad9b;
    font-size: 11px;
}


/* ==============================================
   RESPONSIVE DESIGN
   ============================================== */

@media (max-width: 1050px) {

    .hero {
        grid-template-columns: 1fr 1fr;
        gap: 30px;
    }

    .search-card {
        grid-template-columns: 1fr 30px 1fr;
    }

    .search-btn {
        grid-column: 1 / -1;
    }

}

@media (max-width: 800px) {

    .navbar {
        padding: 0 5%;
    }

    .nav-links {
        gap: 15px;
    }

    .nav-links a {
        font-size: 12px;
    }

    .nav-button {
        display: none;
    }

    .hero {
        grid-template-columns: 1fr;
        padding: 70px 6%;
    }

    .hero-visual {
        margin-top: 20px;
    }

    .transport-grid {
        grid-template-columns: 1fr 1fr;
    }

    .about-content {
        grid-template-columns: 1fr;
        gap: 40px;
    }

    .section-padding {
        padding: 75px 6%;
    }

}

@media (max-width: 560px) {

    .navbar {
        height: auto;
        min-height: 72px;
        padding: 15px 5%;
        flex-wrap: wrap;
        gap: 15px;
    }

    .logo {
        font-size: 20px;
    }

    .nav-links {
        width: 100%;
        justify-content: space-between;
        gap: 8px;
        overflow-x: auto;
    }

    .nav-links a {
        white-space: nowrap;
        font-size: 11px;
    }

    .hero h1 {
        font-size: 45px;
        letter-spacing: -2px;
    }

    .hero-description {
        font-size: 15px;
    }

    .hero-stats {
        gap: 20px;
    }

    .hero-stats strong {
        font-size: 12px;
    }

    .hero-stats span {
        font-size: 10px;
    }

    .visual-card {
        padding: 20px;
    }

    .floating-badge {
        left: 0;
        bottom: -20px;
    }

    .section-padding {
        padding: 65px 5%;
    }

    .search-card {
        grid-template-columns: 1fr;
        gap: 15px;
        padding: 22px;
    }

    .search-divider {
        height: 20px;
    }

    .search-btn {
        grid-column: auto;
        width: 100%;
    }

    .transport-grid {
        grid-template-columns: 1fr;
    }

    .transport-card p {
        min-height: auto;
    }

    .map-heading {
        align-items: start;
    }

    #map {
        height: 370px;
    }

    .footer-main {
        flex-direction: column;
    }

    .footer-bottom {
        flex-direction: column;
    }

}
 