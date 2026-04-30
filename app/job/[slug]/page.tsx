import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import jobs from "../../jobs-data.json";

export async function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);
  if (!job) return {};
  return {
    title: `${job.title} | Devonshire Recruiting & Consulting Partners`,
    description: `${job.title} – ${job.location}`,
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);
  if (!job) notFound();

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
          <h1>{job.title}</h1>
        </div>
      </div>

      <section className="job-detail">
        <div className="container">
          <Link href="/jobs" className="back-link">
            ← Back to All Jobs
          </Link>

          <div className="job-detail-inner">
            <div className="job-detail-main">
              {/* Company / job info header */}
              <div className="job-company-info">
                <Image
                  src="/wp-content/uploads/2017/01/fulltime.png"
                  alt={job.title}
                  width={80}
                  height={80}
                  className="job-company-logo"
                />
                <div>
                  {job.salary && (
                    <div className="job-company-name">{job.salary}</div>
                  )}
                  <ul className="job-meta-list">
                    <li>
                      <span
                        className={`job-type-label ${job.jobType
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {job.jobType}
                      </span>
                    </li>
                    {job.location && (
                      <li>
                        📍{" "}
                        <a
                          href={`https://maps.google.com/maps?q=${encodeURIComponent(
                            job.location
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#f38131" }}
                        >
                          {job.location}
                        </a>
                      </li>
                    )}
                    {job.datePosted && (
                      <li>Posted {job.datePosted}</li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Description */}
              {job.description ? (
                <div
                  className="job-description"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              ) : (
                <div className="job-description">
                  <p>
                    Devonshire Recruiting &amp; Consulting Partners is actively
                    seeking candidates for the <strong>{job.title}</strong>{" "}
                    position. Please contact us for full job details.
                  </p>
                </div>
              )}

              {/* Apply box */}
              <div className="apply-box">
                <a
                  href={`mailto:${job.email}?subject=Application via ${job.title} listing`}
                  className="btn btn-primary btn-large"
                >
                  Apply for job
                </a>
                <p>
                  To apply for this job <strong>email your details to</strong>{" "}
                  <a
                    className="job-application-email"
                    href={`mailto:${job.email}?subject=Application via ${job.title} listing`}
                  >
                    {job.email}
                  </a>
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <aside>
              <div
                style={{
                  background: "#f9f9f9",
                  border: "1px solid #e5e5e5",
                  padding: 24,
                  borderRadius: 4,
                  marginBottom: 20,
                }}
              >
                <h3
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontSize: 20,
                    marginBottom: 16,
                    fontWeight: 700,
                  }}
                >
                  Job Overview
                </h3>
                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  {job.jobType && (
                    <li style={{ fontSize: 14, color: "#555" }}>
                      <strong>Job Type:</strong> {job.jobType}
                    </li>
                  )}
                  {job.location && (
                    <li style={{ fontSize: 14, color: "#555" }}>
                      <strong>Location:</strong> {job.location}
                    </li>
                  )}
                  {job.salary && (
                    <li style={{ fontSize: 14, color: "#555" }}>
                      <strong>Salary:</strong> {job.salary}
                    </li>
                  )}
                  {job.datePosted && (
                    <li style={{ fontSize: 14, color: "#555" }}>
                      <strong>Posted:</strong> {job.datePosted}
                    </li>
                  )}
                </ul>
              </div>

              <div
                style={{
                  background: "#f38131",
                  padding: 24,
                  borderRadius: 4,
                  color: "white",
                  textAlign: "center",
                }}
              >
                <h3
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontSize: 20,
                    color: "white",
                    marginBottom: 12,
                  }}
                >
                  Post Your Resume
                </h3>
                <p style={{ fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>
                  Let employers find you. Post your resume today.
                </p>
                <Link
                  href="/post-a-resume"
                  className="btn"
                  style={{
                    background: "white",
                    color: "#f38131",
                    fontWeight: 700,
                    width: "100%",
                    display: "block",
                  }}
                >
                  Post a Resume
                </Link>
              </div>

              <div style={{ marginTop: 20 }}>
                <Link
                  href="/jobs"
                  style={{
                    display: "block",
                    textAlign: "center",
                    fontSize: 14,
                    color: "#f38131",
                    fontWeight: 700,
                  }}
                >
                  ← Browse All Jobs
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
