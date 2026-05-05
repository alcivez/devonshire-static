import Link from "next/link";
import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import jobs from "./jobs-data.json";

function StatCircle({
  value,
  label,
  description,
}: {
  value: number;
  label: string;
  description: string;
}) {
  const r = 50;
  const circ = 2 * Math.PI * r;
  const filled = (value / 100) * circ;

  return (
    <div className="stat-item">
      <div className="stat-circle-wrap">
        <svg width="110" height="110" viewBox="0 0 110 110">
          <circle
            cx="55"
            cy="55"
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="10"
          />
          <circle
            cx="55"
            cy="55"
            r={r}
            fill="none"
            stroke="#f38131"
            strokeWidth="10"
            strokeDasharray={`${filled} ${circ}`}
            strokeLinecap="round"
            transform="rotate(-90 55 55)"
          />
        </svg>
        <div className="stat-circle-text">{value}%</div>
      </div>
      <div className="stat-desc">
        <h5>{label}</h5>
        <p>{description}</p>
      </div>
    </div>
  );
}

const recentJobs = jobs.slice(0, 6);

const companyLogos = [
  {
    src: "/wp-content/uploads/2017/01/cq5dam.web_.370.344-e1484342265416.png",
    alt: "State Street",
  },
  { src: "/wp-content/uploads/2017/01/Sunovion.png", alt: "Sunovion" },
  {
    src: "/wp-content/uploads/2017/01/Avery-e1484341840457.jpeg",
    alt: "Avery",
  },
  { src: "/wp-content/uploads/2017/01/tomtom-logo.jpg", alt: "TomTom" },
  { src: "/wp-content/uploads/2017/01/Bigoen-logo.jpg", alt: "Biogen" },
  {
    src: "/wp-content/uploads/2017/01/Macmillan_Logo-180x180.jpg",
    alt: "MacMillan",
  },
  {
    src: "/wp-content/uploads/2017/03/Staples-e1489764309810.png",
    alt: "Staples",
  },
  { src: "/wp-content/uploads/2017/01/Cogo-labs-logo.jpg", alt: "CoGoLabs" },
  { src: "/wp-content/uploads/2017/01/logo-puma.jpg", alt: "Puma" },
  {
    src: "/wp-content/uploads/2017/01/Best-Doctors-Logo.jpg",
    alt: "BestDoctors",
  },
  {
    src: "/wp-content/uploads/2017/01/logo-brookfield.jpg",
    alt: "Brookfield",
  },
  {
    src: "/wp-content/uploads/2017/01/duck-creek-crop-600x338-e1485885234314.png",
    alt: "Blackduck",
  },
];

const serviceBoxes = [
  {
    icon: "/wp-content/themes/theme52547/images/icon-white-cubes.png",
    title: "Temporary Staffing Services",
    desc: "Our temporary staffing solutions are tailored to each employer's requirements and span the services spectrum. We realize your organization's hiring demands vary based upon your fiscal calendar, departmental budgets, and your management preferences.",
  },
  {
    icon: "/wp-content/themes/theme52547/images/icon-white-street-view.png",
    title: "Consulting Services",
    desc: "Whether it's a six or twelve month project deliverable or your organization is in need of an extra set of hands, our Consulting Service's team can deliver a uniquely tailored set of consultants to meet your specific hiring objectives.",
  },
  {
    icon: "/wp-content/themes/theme52547/images/icon-white-laptop.png",
    title: "Retained & Confidential Searches",
    desc: 'When hiring on a confidential basis, selecting a search firm that you can trust is critical. Working with an organization who knows "how" to confidentially locate your next full-time hire is even more critical.',
  },
  {
    icon: "/wp-content/themes/theme52547/images/icon-white-user-plus.png",
    title: "Contingent Direct Hires",
    desc: "Not finding what you are looking for? Or you don't have the resources to begin a lengthy hiring process? Devonshire knows how to strategically navigate your local marketplace for top talent.",
  },
  {
    icon: "/wp-content/themes/theme52547/images/icon-white-random.png",
    title: "Virtual Recruitment Assistance",
    desc: "This cost effective and productive means of hiring is quickly growing among organizations that choose to remain very active in the hiring process. Hire one of our Recruiters on a weekly or monthly basis.",
  },
  {
    icon: "/wp-content/themes/theme52547/images/icon-white-users.png",
    title: "HR & Payroll Outsourcing",
    desc: "Minimize workloads associated with HR Administration and Payroll by organizing your temporary workforce under one simple monthly billing process.",
  },
];

export default function HomePage() {
  return (
    <>
      <Header transparent />

      {/* HERO */}
      <div id="homePage" className="hero-slider">
        <div
          className="hero-slide"
          style={{
            backgroundImage: "url(/wp-content/uploads/2022/12/AdobeStock_196044089.jpeg)",
          }}
        >
          <div className="hero-content">
            <h2>
              Starting something
              <br />
              <strong>NEW</strong> starts here
            </h2>
            <div className="hero-buttons">
              <Link href="/jobs" className="btn btn-primary btn-hero">
                Search Jobs
              </Link>
              <Link href="/post-a-resume" className="btn btn-primary btn-hero">
                Post Resume
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Preload critical images */}
      <link rel="preload" as="image" href="/wp-content/uploads/2022/12/AdobeStock_196044089.jpeg" />

      {/* HOT SPOT */}
      <section className="dark-section">
        <div className="container">
          <div className="two-col">
            <div>
              <h1 style={{ textAlign: "right", color: "white" }}>
                Hot spot for
                <br />
                <span style={{ color: "#2cb9c0" }}>
                  <strong>job seekers </strong>
                </span>
                and
                <br />
                employers
              </h1>
            </div>
            <div>
              <p style={{ fontSize: 21, lineHeight: 1.7, color: "white" }}>
                Our achievements as a firm are founded on a set of core values
                and ethics that mirror how we behave with clients and with each
                other. Our relationships are based on trust and mutual respect,
                and we are passionate about delivering value. Whether taking the
                lead on the hiring process, working as a co-employment partner
                or as an integrated piece of your Human Resources team, we have
                a shared commitment to exceed your expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* JOBS */}
      <section id="jobsPage" className="job-search-section">
        <div className="container">
          <div className="title-box">
            <h2>
              Find a <strong>Job</strong>
            </h2>
          </div>

          <div className="job-search-form">
            <form action="/jobs">
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
                {["Freelance", "Full Time", "Internship", "Part Time", "Temporary"].map(
                  (t) => (
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
                  )
                )}
              </ul>
            </form>
          </div>

          <div className="job-listings">
            {recentJobs.map((job) => (
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
                  loading="lazy"
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
                    {job.datePosted && (
                      <span className="job-date">Posted {job.datePosted}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="see-all-wrap">
            <Link href="/jobs" className="btn btn-default">
              See all
            </Link>
          </div>
        </div>
      </section>

      {/* HIRING STATS */}
      <section
        className="parallax-section"
        style={{
          backgroundImage:
            "url(/wp-content/uploads/2011/09/Office-Pic.jpg)",
        }}
      >
        <div className="parallax-content container">
          <div className="title-box white">
            <h2>
              Hiring <strong>Stats</strong>
            </h2>
          </div>
          <div className="stats-grid">
            <div>
              <StatCircle
                value={77}
                label="Staff Augmentation"
                description="Whether a project-based assignment or critical staffing coverage, our Temporary Consulting team can help. From quick turnaround times to pre-project meetings, our service delivery model is uniquely tailored to meet your hiring objectives. Come experience why 77% of our clients successfully hire after reviewing less than five resumes."
              />
              <StatCircle
                value={84}
                label="Direct Hires"
                description="Not finding what you are looking for? Don't have the resources to begin a lengthy candidate search? Devonshire knows how to strategically navigate your local marketplace for top talent. 84% of our permanent placements come from Candidates who have never posted their resume."
              />
            </div>
            <div>
              <StatCircle
                value={25}
                label="Retained Search"
                description="Working with an organization that you can trust is important. Working with an organization who knows how to locate your next direct-hire is even more important. Devonshire understands your need to minimize disruption and will work with your organization in strict confidentiality. 25% of our Employers often hold first round interviews in our offices."
              />
              <StatCircle
                value={39}
                label="CoRecruitment"
                description="This cost effective and productive means of hiring is quickly growing among organizations that choose to remain very active in the hiring process. Employers have seen a 39% increase in communication between HR and Hiring Managers. Devonshire has an elite team of proven Recruiters available to work on-site to help augment your internal recruiting efforts."
              />
            </div>
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section
        className="approach-section"
        style={{
          backgroundImage: "url(/wp-content/uploads/2011/07/Carousel3.jpg)",
        }}
      >
        <div className="approach-content container">
          <div className="title-box white">
            <h2>
              Our <strong>Approach</strong> to Recruiting
            </h2>
          </div>
          <div className="two-col">
            <div>
              <h6
                style={{ textAlign: "right", color: "white", lineHeight: 1.7 }}
              >
                Devonshire is a Boston Recruiting Agency that brings teams
                together and has the depth and breadth of consulting, technical
                and business experience to attract, select and deliver top
                talent into mission critical vacancies. Our experience extends
                from the initial evaluation and technical screening, all the way
                through candidate acceptance.
              </h6>
            </div>
            <div>
              <p style={{ color: "#f38131", fontSize: 22, lineHeight: "1.8" }}>
                Understanding your specific industry is equally important to us
                as understanding your specific hiring needs. Our highly trained
                Search Consultants understand many of the State and Federal
                requirements that your organization faces on a daily basis and
                can assist with searching for candidates within certain sectors
                and sub-sectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section id="aboutPage" style={{ padding: "60px 0" }}>
        <div className="container">
          <div className="spacer" />
          <div className="title-box">
            <h2>
              <strong>Expert</strong>ise
            </h2>
          </div>
          <div className="services-grid">
            {serviceBoxes.map((s, i) => (
              <div key={i} className="service-box">
                <div className="service-icon">
                  <Image src={s.icon} alt="" width={52} height={52} loading="lazy" />
                </div>
                <div className="service-body">
                  <h2>
                    <strong>{s.title}</strong>
                  </h2>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMPLOYMENT OPPORTUNITIES */}
      <section
        className="video-cta"
        style={{
          backgroundImage:
            "url(/wp-content/uploads/2016/04/Meeting-Room.jpg)",
        }}
      >
        <div className="video-cta-content container">
          <div className="title-box white">
            <h2>
              Employment
              <br />
              <strong>Opportunities</strong> for Professionals
            </h2>
          </div>
          <Link href="/post-a-resume" className="btn btn-primary btn-large">
            Apply Online
          </Link>
        </div>
      </section>

      {/* COMPANIES */}
      <section id="companiesPage" style={{ padding: "40px 0 0" }}>
        <div className="container">
          <div className="title-box">
            <h2>
              Companies We've <strong>Helped</strong>
            </h2>
          </div>
          <div className="companies-grid">
            {companyLogos.map((c) => (
              <div key={c.alt} className="company-logo-wrap">
                <Image
                  src={c.src}
                  alt={c.alt}
                  width={267}
                  height={120}
                  style={{ objectFit: "contain", width: "267px", height: "120px" }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contactsPage" style={{ padding: "35px 0 60px" }}>
        <div className="container">
          <div className="title-box">
            <h2>
              <strong>Contact Us</strong>
            </h2>
          </div>
          <div className="contact-grid">
            <div className="contact-info">
              <address>
                <h6>
                  <span className="contact-label">Address:</span>
                  <br />
                  133 Clarendon Street (Suite 171441), Boston, MA 02116
                  <br />
                  600 B Street, San Diego, CA 92101
                </h6>
                <h6>
                  <span className="contact-label">Free Phone:</span>
                  <br />
                  <span className="phone-number">888-243-3313</span>
                </h6>
                <h6>
                  <span className="contact-label">Hours:</span>
                  <br />
                  <strong>M-F 8:30 AM - 6:00 PM</strong>
                </h6>
              </address>
            </div>
            <div>
              <form className="contact-form">
                <div>
                  <label>Your Name (required)</label>
                  <input type="text" name="your-name" required />
                </div>
                <div>
                  <label>Your Email (required)</label>
                  <input type="email" name="your-email" required />
                </div>
                <div>
                  <label>Subject</label>
                  <input type="text" name="your-subject" />
                </div>
                <div>
                  <label>Your Message</label>
                  <textarea name="your-message" />
                </div>
                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
