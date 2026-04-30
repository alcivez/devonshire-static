import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Blog | Devonshire Recruiting & Consulting Partners",
  description: "Recruiting and career insights from the Devonshire team.",
};

const posts = [
  { slug: "ethical-recruiting-in-a-fast-paced-evolving-ai-world", title: "Ethical Recruiting in a fast-paced evolving AI world", date: "2025-04-25", image: "/wp-content/uploads/2025/03/Grok-Image-AI-During-Job-Interviews.jpg" },
  { slug: "how-long-should-a-job-search-take", title: "How Long Should a Job Search Take", date: "2025-06-12", image: "/wp-content/uploads/2025/06/AD_4nXeIrjA8KwwLby_686FYicnoYoBsxythLeceVUGHBfbGsTs7GV0uvRj8zXqC8kVpnuyeO90dwekICO1cWQWlmmiZiF7MVg1NIK5x9rnOruJRCdb_aBQLL0pv8lEP83Ah5xhC2EVn.png" },
  { slug: "big-federal-job-cuts-shake-up-the-us-job-market", title: "Big Federal Job Cuts Shake Up the US Job Market", date: "2025-03-10", image: "/wp-content/uploads/2025/03/Grok-Image-AI-During-Job-Interviews.jpg" },
  { slug: "deepseeks-disruptive-impact-on-the-tech-industry", title: "DeepSeek's disruptive impact on the Tech Industry", date: "2025-02-04", image: "/wp-content/uploads/2022/12/AdobeStock_196044089.jpeg" },
  { slug: "can-people-expect-to-work-fewer-hours-when-using-ai-tools", title: "Can People Expect to Work Fewer Hours When Using AI Tools", date: "2025-01-13", image: "/wp-content/uploads/2022/12/AdobeStock_196044089.jpeg" },
  { slug: "will-ai-mean-less-hiring-in-2025", title: "Will AI Mean Less Hiring in 2025", date: "2025-01-08", image: "/wp-content/uploads/2023/04/AC-Job-Loss-due-to-AI.png" },
  { slug: "are-immigrants-taking-american-jobs-away-the-debate-over-foreign-hiring", title: "Are Immigrants taking American jobs away? – The Debate Over Foreign Hiring", date: "2025-01-06", image: "/wp-content/uploads/2025/01/Immigrants-working.jpg" },
  { slug: "7-steps-for-successful-job-interviews", title: "7 Steps for Successful Job Interviews", date: "2024-04-26", image: "/wp-content/uploads/2024/04/7-Steps-for-Succesful-Interviews.jpeg" },
  { slug: "8-recruiting-trends-for-q2-of-2024", title: "8 Recruiting Trends for Q2 of 2024", date: "2024-02-23", image: "/wp-content/uploads/2024/02/Devonshire-Evolution.jpeg" },
  { slug: "top-10-skills-to-succeed-in-the-tech-industry", title: "Top 10 Skills to Succeed in the Tech Industry", date: "2023-08-07", image: "/wp-content/uploads/2023/08/Skills-for-Success-2023.png" },
  { slug: "has-hiring-leveled-up-in-may-2023", title: "Has hiring leveled up in May 2023?", date: "2023-06-06", image: "/wp-content/uploads/2023/06/Hiring-speed-up-job-search.jpeg" },
  { slug: "employment-in-the-us-as-of-2023-statistics-facts", title: "Employment in the US as of 2023 — Statistics & Facts", date: "2023-05-18", image: "/wp-content/uploads/2023/05/Employees-in-the-US.jpeg" },
  { slug: "job-growth-and-recruiting-trends-in-q2-2023", title: "Job Growth and Recruiting Trends in Q2 – 2023", date: "2023-04-26", image: "/wp-content/uploads/2023/04/Job-Growth.jpeg" },
  { slug: "will-ai-ultimately-result-in-everyone-losing-their-jobs", title: "Will AI Ultimately Result in Everyone Losing Their Jobs?", date: "2023-04-13", image: "/wp-content/uploads/2023/04/AC-Job-Loss-due-to-AI.png" },
  { slug: "ai-in-the-recruiting-industry", title: "AI in the Recruiting Industry?", date: "2023-04-10", image: "/wp-content/uploads/2023/03/AI-in-Recruiting.jpeg" },
  { slug: "top-5-websites-for-tech-job-seekers", title: "Top 5 websites for tech job-seekers.", date: "2023-04-10", image: "/wp-content/uploads/2022/12/AdobeStock_196044089.jpeg" },
  { slug: "reskilling-upskilling-flexible-development-opportunities-for-employees", title: "ReSkilling, UpSkilling & Flexible Development Opportunities for Employees", date: "2023-03-07", image: "/wp-content/uploads/2023/03/improvement-development-opportunity-enjoy.jpeg" },
  { slug: "the-cost-of-mis-hire-during-the-great-resignation", title: "The Cost of mis-hire during The Great Resignation", date: "2023-03-07", image: "/wp-content/uploads/2023/03/mis-hire-man-leaving-work.jpeg" },
  { slug: "how-to-be-confident-during-a-job-interview", title: "How to be confident during a job interview", date: "2023-03-07", image: "/wp-content/uploads/2023/03/happy-male-candidate-greeting-member-human-resource-team-job-interview-office.jpeg" },
  { slug: "how-to-enhance-your-exposure-on-linkedin", title: "How to Enhance your Exposure on LinkedIn", date: "2023-02-28", image: "/wp-content/uploads/2023/02/magnet-me-LDcC7aCWVlo-unsplash-1.jpeg" },
];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPage() {
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
          <h1>Devonshire Blog</h1>
        </div>
      </div>

      <section style={{ padding: "60px 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/devonshire-blog/${post.slug}`}
                style={{
                  border: "1px solid #e0e0e0",
                  background: "white",
                  overflow: "hidden",
                  borderRadius: 4,
                  display: "block",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <div style={{ width: "100%", height: 200, position: "relative", overflow: "hidden" }}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: 20 }}>
                  <p style={{ fontSize: 12, color: "#999", marginBottom: 8 }}>{formatDate(post.date)}</p>
                  <h3
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontSize: 17,
                      fontWeight: 700,
                      color: "#323232",
                      lineHeight: 1.4,
                    }}
                  >
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
