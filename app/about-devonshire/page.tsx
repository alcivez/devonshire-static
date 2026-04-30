import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "About Devonshire | Devonshire Recruiting & Consulting Partners",
  description:
    "Learn about Devonshire Recruiting & Consulting Partners, headquartered in Boston, MA with a global footprint.",
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <div
        className="page-header"
        style={{
          backgroundImage:
            "url(/wp-content/uploads/2014/12/Fotolia_95249632_Subscription_Monthly_M.jpg)",
        }}
      >
        <div className="container page-header-content">
          <h1>About Devonshire</h1>
        </div>
      </div>

      <section style={{ padding: "60px 0" }}>
        <div className="container">
          <div className="two-col" style={{ alignItems: "flex-start" }}>
            <div>
              <h2 style={{ marginBottom: 32 }}>Why Choose Us</h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {[
                  {
                    n: "1",
                    label: "Our Approach",
                    text: "Devonshire brings recruitment teams together that have the depth and breadth of consulting, technical and business experience to attract, select and deliver top talent into mission critical vacancies.",
                  },
                  {
                    n: "2",
                    label: "Expertise",
                    text: "Temporary Staffing, Retained Confidential Search, Virtual Recruitment, HR Payroll Outsourcing, Contingent Hires, and Consulting Services.",
                  },
                  {
                    n: "3",
                    label: "Core Focus",
                    text: "Technical Staffing, Finance & Accounting, and Scientific.",
                  },
                ].map((item) => (
                  <div key={item.n} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: "#f38131",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "Raleway, sans-serif",
                        fontSize: 22,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {item.n}
                    </div>
                    <div>
                      <h4
                        style={{
                          fontFamily: "Raleway, sans-serif",
                          fontSize: 20,
                          fontWeight: 700,
                          color: "#f38131",
                          marginBottom: 6,
                        }}
                      >
                        {item.label}
                      </h4>
                      <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7 }}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 style={{ marginBottom: 24 }}>Our Mission</h2>
              <h4
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontSize: 22,
                  fontWeight: 400,
                  color: "#444",
                  lineHeight: 1.6,
                  marginBottom: 32,
                }}
              >
                Headquartered in Boston, Massachusetts we have a global footprint in more than 5 countries around the
                world. It is our specialized knowledge and experience that sets us apart from much of our competition.
                Together we consistently deliver impactful and measurable results to each of our clients. Our service
                and delivery model produces tangible hiring results within demanding timeframes. When it is all said and
                done, we pride ourselves in putting our clients at the heart of everything we do.
              </h4>
              <Link href="/jobs" className="btn btn-primary">
                View Open Positions
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
