import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Press Room | Devonshire Recruiting & Consulting Partners",
};

const pressItems = [
  { slug: "devonshire-welcomes-a-new-brand-and-new-service-offering", title: "Devonshire Welcomes a New Brand and New Service Offering", date: "2022-06-01", image: "/wp-content/uploads/2022/06/devonshire-header-logo.png" },
  { slug: "devonshire-recruiting-consulting-partners-receives-its-first-trademark-approval", title: "Devonshire Recruiting & Consulting Partners Receives Its First Trademark Approval", date: "2022-01-01", image: "/wp-content/uploads/2022/06/devonshire-header-logo.png" },
  { slug: "devonshire-welcomes-a-new-office-in-woburn-ma", title: "Devonshire Welcomes a New Office in Woburn, MA", date: "2021-01-01", image: "/wp-content/uploads/2022/06/devonshire-header-logo.png" },
  { slug: "devonshire-recruiting-consulting-partners-is-expanding-into-san-diego-ca", title: "Devonshire Recruiting & Consulting Partners is Expanding into San Diego, CA", date: "2020-01-01", image: "/wp-content/uploads/2022/06/devonshire-header-logo.png" },
  { slug: "bay-colony-search-officially-joins-devonshire-as-newly-established-devonshire-finance", title: "Bay Colony Search Officially Joins Devonshire as Newly Established Devonshire Finance", date: "2019-01-01", image: "/wp-content/uploads/2022/06/devonshire-header-logo.png" },
  { slug: "devonshire-arrives", title: "Devonshire Arrives", date: "2018-01-01", image: "/wp-content/uploads/2022/06/devonshire-header-logo.png" },
  { slug: "devonshire-recruitment-celebrates-10-year-anniversary", title: "Devonshire Recruitment Celebrates 10 Year Anniversary", date: "2017-01-01", image: "/wp-content/uploads/2022/06/devonshire-header-logo.png" },
];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function PressRoomPage() {
  return (
    <>
      <Header />

      <div
        className="page-header"
        style={{
          backgroundImage: "url(/wp-content/uploads/2022/12/AdobeStock_174847508-copy.jpeg)",
        }}
      >
        <div className="container page-header-content">
          <h1>Press Room</h1>
        </div>
      </div>

      <section style={{ padding: "60px 0" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {pressItems.map((item) => (
              <div
                key={item.slug}
                style={{
                  display: "flex",
                  gap: 24,
                  padding: 24,
                  border: "1px solid #e0e0e0",
                  background: "white",
                  borderRadius: 4,
                  alignItems: "center",
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={100}
                  height={60}
                  style={{ objectFit: "contain", flexShrink: 0 }}
                />
                <div>
                  <p style={{ fontSize: 12, color: "#999", marginBottom: 6 }}>{formatDate(item.date)}</p>
                  <h3
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#323232",
                      lineHeight: 1.4,
                    }}
                  >
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
