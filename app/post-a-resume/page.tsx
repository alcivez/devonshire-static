import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Post a Resume | Devonshire Recruiting & Consulting Partners",
};

export default function PostResumePage() {
  return (
    <>
      <Header />

      <div
        className="page-header"
        style={{
          backgroundImage:
            "url(/wp-content/uploads/2016/04/Meeting-Room.jpg)",
        }}
      >
        <div className="container page-header-content">
          <h1>Post Your Resume</h1>
        </div>
      </div>

      <section style={{ padding: "60px 0" }}>
        <div className="container" style={{ maxWidth: 700 }}>
          <div className="title-box">
            <h2>
              Employment <strong>Opportunities</strong>
            </h2>
          </div>
          <p style={{ textAlign: "center", fontSize: 16, color: "#555", marginBottom: 40, lineHeight: 1.8 }}>
            Ready to take the next step? Submit your resume to Devonshire and let our specialized recruiters match you
            with the right opportunity. We place candidates across Tech, Finance, and Scientific sectors.
          </p>

          <form
            className="contact-form"
            action="mailto:careers@devonshirerecruitment.com"
            method="post"
            encType="text/plain"
          >
            <div>
              <label>Your Name (required)</label>
              <input type="text" name="name" required />
            </div>
            <div>
              <label>Your Email (required)</label>
              <input type="email" name="email" required />
            </div>
            <div>
              <label>Phone Number</label>
              <input type="tel" name="phone" />
            </div>
            <div>
              <label>Current Title / Position</label>
              <input type="text" name="title" />
            </div>
            <div>
              <label>Years of Experience</label>
              <input type="text" name="experience" />
            </div>
            <div>
              <label>Area of Expertise</label>
              <select
                name="expertise"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1px solid #ccc",
                  borderRadius: 3,
                  fontSize: 14,
                  fontFamily: "Lato, sans-serif",
                  background: "#fafafa",
                }}
              >
                <option value="">Select one...</option>
                <option>Technology / IT</option>
                <option>Finance &amp; Accounting</option>
                <option>Scientific / Life Sciences</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label>Cover Letter / Message</label>
              <textarea name="message" style={{ height: 140 }} />
            </div>
            <button type="submit" className="btn btn-primary btn-large btn-block">
              Submit Resume
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
