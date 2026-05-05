import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import jobs from "../jobs-data.json";

export const metadata = {
  title: "Jobs | Devonshire Recruiting & Consulting Partners",
  description: "Browse all open positions at Devonshire Recruiting & Consulting Partners.",
};

export default function JobsPage() {
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
          <h1>Start Something New</h1>
        </div>
      </div>

      <section style={{ padding: "50px 0" }}>
        <div className="container">
          {/* Search form */}
          <div className="job-search-form">
            <form>
              <div className="search-row">
                <div className="search-field">
                  <label htmlFor="search_keywords">Keywords</label>
                  <input
                    type="text"
                    name="keywords"
                    id="search_keywords"
                    placeholder="Keywords"
                  />
                </div>
                <div className="search-field">
                  <label htmlFor="search_location">Location</label>
                  <input
                    type="text"
                    name="location"
                    id="search_location"
                    placeholder="Location"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Search Jobs
                </button>
              </div>
              <div className="remote-check">
                <input type="checkbox" name="remote" id="remote_position" />
                <label htmlFor="remote_position">Remote positions only</label>
              </div>
              <ul className="job-types">
                {[
                  "Freelance",
                  "Full Time",
                  "Internship",
                  "Part Time",
                  "Temporary",
                ].map((t) => (
                  <li key={t}>
                    <label>
                      <input
                        type="checkbox"
                        name="job_type[]"
                        value={t.toLowerCase().replace(" ", "-")}
                        defaultChecked
                      />{" "}
                      {t}
                    </label>
                  </li>
                ))}
              </ul>
            </form>
          </div>

          <p style={{ fontSize: 14, color: "#777", marginBottom: 16 }}>
            Showing {jobs.length} jobs
          </p>

          <div className="job-listings">
            {jobs.map((job) => (
              <Link
                key={job.slug}
                href={`/job/${job.slug}`}
                className="job-card"
              >
                <Image
                  src={
                    job.jobType.toLowerCase() === "full time"
                      ? "/wp-content/uploads/2017/01/fulltime.png"
                      : "/wp-content/uploads/2017/01/hourly.png"
                  }
                  alt=""
                  width={55}
                  height={55}
                  className="job-card-logo"
                />
                <div className="job-card-body">
                  <div className="job-card-title">{job.title}</div>
                  <div className="job-card-meta">
                    <span
                      className={`job-type-label ${job.jobType
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {job.jobType}
                    </span>
                    {job.location && (
                      <span className="job-location">📍 {job.location}</span>
                    )}
                    {job.salary && (
                      <span
                        style={{
                          fontSize: 13,
                          color: "#f38131",
                          fontWeight: 700,
                        }}
                      >
                        {job.salary}
                      </span>
                    )}
                    {job.datePosted && (
                      <span className="job-date">Posted {job.datePosted}</span>
                    )}
                  </div>
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
