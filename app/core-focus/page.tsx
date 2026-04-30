import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Core Focus | Devonshire Recruiting & Consulting Partners",
  description:
    "Tech, Scientific, and Finance recruitment expertise from Devonshire Recruiting & Consulting Partners.",
};

const techRoles = [
  ["Director / VP / CIO", "Technical Architect", "Cisco Engineer/Analyst", "Web Services Engineer"],
  ["Development / QA / Infrastructure", "Software Developer", "Data Architect", "Web Developer"],
  ["Product Management", "Cloud Storage/Engineering", "Project Management", "Business Analyst"],
  ["Database Administrator", "Storage Architect", "Business Systems Analyst", "Release Engineering"],
  ["ERP Developer", "Quality Assurance", "Compliance & Security", "Disaster Recovery"],
  ["Mobile Developer", "Systems Administrator", "Implementation Consultant", "Business Transformation"],
];

const sciIndustries = ["Medical", "Life Science & Biotech", "Environmental", "Forensic", "Pharmaceutical"];
const sciInstrumentation = ["Spectrometry", "Chromatography", "Data Systems", "Thermal", "X-ray"];
const sciPositions = ["Sales Managers, Directors, VP", "Service Engineers", "Design Engineers", "Technical & Application Engineers", "Product Specialist"];

const financeRoles = [
  ["Director/ VP / CFO", "SEC / Public Readiness", "Certified Public Accountants", "Cost Accountant"],
  ["ERP Systems Analyst", "S-1, S-4 Consultants", "Senior Staff Accountants", "Revenue Accountants"],
  ["Certified Project Managers", "Reporting Managers", "Tax Leadership", "Fix Asset Accountant"],
  ["Functional Leads", "Certified Internal Audits", "Treasury Leadership", "FP&A Managers and Director"],
  ["Audit and Internal Controls", "Sarbanes Oxley Testing", "Compliance Directors", "Mergers & Acquisitions"],
  ["Analysis, Budgeting, Forecasting", "Senior Accounting", "Controller", "Cost/Inventory"],
];

export default function CoreFocusPage() {
  return (
    <>
      <Header />

      <div
        className="page-header"
        style={{
          backgroundImage: "url(/wp-content/uploads/2022/12/New-Approach-Shade.jpg)",
        }}
      >
        <div className="container page-header-content">
          <h1>Core Focus</h1>
        </div>
      </div>

      {/* TECH */}
      <section
        id="focusTech"
        style={{ padding: "60px 0", background: "#f5f5f5" }}
      >
        <div className="container">
          <div className="title-box">
            <h2>Tech Recruitment</h2>
          </div>
          <p style={{ textAlign: "center", maxWidth: 800, margin: "0 auto 32px", fontSize: 16, lineHeight: 1.8, color: "#555" }}>
            Devonshire's Technical Recruitment Team is focused on bringing the best and brightest talent directly to our
            Clients' doorsteps. It is our specialized knowledge and experience that sets us apart from much of our
            competition. We consistently deliver impactful and measurable hiring results to each of our Clients during
            and after a hire is made. Our service and delivery model produces tangible hiring results within demanding
            timeframes. When it is all said and done, we pride ourselves in putting our clients at the heart of
            everything we do.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "8px 24px",
              maxWidth: 900,
              margin: "0 auto",
            }}
          >
            {techRoles.flat().map((role) => (
              <div key={role} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 14, color: "#444", padding: "4px 0" }}>
                <span style={{ color: "#f38131", fontWeight: 700, flexShrink: 0 }}>•</span> {role}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCIENTIFIC */}
      <section id="focusScientific" style={{ padding: "60px 0", background: "#2cb9c0" }}>
        <div className="container">
          <div className="title-box white">
            <h2 style={{ color: "white" }}>Scientific Recruitment</h2>
          </div>
          <p style={{ textAlign: "center", maxWidth: 800, margin: "0 auto 32px", fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.9)" }}>
            As a new leader in providing Scientific &amp; Lab professional services and solutions, Devonshire's Scientific
            Recruitment Team is focused on bringing the best and brightest talent directly to our Client's doorsteps. It
            is our specialized knowledge and experience that sets us apart from much of our competition. Together we
            consistently deliver impactful and measurable hiring results to each of our clients.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", maxWidth: 800, margin: "0 auto" }}>
            {[
              { title: "Industries Served", items: sciIndustries },
              { title: "Instrumentation", items: sciInstrumentation },
              { title: "Positions", items: sciPositions },
            ].map((col) => (
              <div key={col.title}>
                <h4 style={{ color: "white", fontFamily: "Raleway, sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>
                  {col.title}
                </h4>
                {col.items.map((item) => (
                  <div key={item} style={{ display: "flex", gap: 8, fontSize: 14, color: "rgba(255,255,255,0.9)", padding: "3px 0" }}>
                    <span style={{ flexShrink: 0 }}>•</span> {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINANCE */}
      <section id="focusFinance" style={{ padding: "60px 0", background: "#4a7c59" }}>
        <div className="container">
          <div className="title-box white">
            <h2 style={{ color: "white" }}>Finance Recruitment</h2>
          </div>
          <p style={{ textAlign: "center", maxWidth: 800, margin: "0 auto 32px", fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.9)" }}>
            As a proven leader in providing Finance &amp; Accounting professional services and solutions, Devonshire's
            Finance &amp; Accounting Recruitment Team is focused on bringing the best and brightest talent directly to our
            Client's doorsteps. It is our specialized knowledge and experience that sets us apart from much of our
            competition.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px 24px", maxWidth: 900, margin: "0 auto" }}>
            {financeRoles.flat().map((role) => (
              <div key={role} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 14, color: "rgba(255,255,255,0.9)", padding: "4px 0" }}>
                <span style={{ flexShrink: 0, fontWeight: 700 }}>•</span> {role}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "50px 0", textAlign: "center" }}>
        <div className="container">
          <Link href="/jobs" className="btn btn-primary btn-large" style={{ marginRight: 16 }}>
            View Open Positions
          </Link>
          <Link href="/#contactsPage" className="btn btn-outline btn-large">
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
