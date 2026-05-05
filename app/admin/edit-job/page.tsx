"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { jobsApi, type Job } from '@/lib/api';
import { isAuthenticated } from '@/lib/auth';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AdminButton from '../components/AdminButton';

function EditJobContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get('id');
  const isEditing = !!jobId;

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    location: '',
    job_type: 'Full Time',
    salary: '',
    apply_email: 'careers@devonshirerecruitment.com',
    description_md: '',
    status: 'active' as 'active' | 'paused' | 'archived',
    date_posted: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    // Load job data if editing
    if (isEditing) {
      loadJob();
    }
  }, [jobId, isEditing, router]);

  const loadJob = async () => {
    try {
      const response = await jobsApi.getBySlug(jobId!);
      const job = response.job;
      setFormData({
        slug: job.slug,
        title: job.title,
        location: job.location,
        job_type: job.job_type,
        salary: job.salary || '',
        apply_email: job.apply_email,
        description_md: job.description_md,
        status: job.status,
        date_posted: job.date_posted.split('T')[0],
      });
    } catch (err) {
      console.warn('Failed to load from worker, trying local data:', err);
      // Fallback to local JSON
      try {
        const localResponse = await fetch('/jobs-data.json');
        if (!localResponse.ok) {
          throw new Error('Failed to fetch local jobs data');
        }
        const localData = await localResponse.json();
        const localJob = Object.values(localData).find((job: any) => job.slug === jobId);
        if (localJob) {
          setFormData({
            slug: localJob.slug,
            title: localJob.title,
            location: localJob.location,
            job_type: localJob.jobType,
            salary: localJob.salary || '',
            apply_email: localJob.email || 'careers@devonshirerecruitment.com',
            description_md: localJob.description || '',
            status: 'active',
            date_posted: new Date().toISOString().split('T')[0],
          });
        } else {
          setError('Job not found');
        }
      } catch (localErr) {
        console.error('Failed to load local job data:', localErr);
        setError('Failed to load job data. Please try again.');
      }
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEditing) {
        await jobsApi.update(jobId!, formData);
      } else {
        await jobsApi.create(formData);
      }
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save job');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (fetchLoading) {
    return (
      <>
        <Header />
        <div
          className="page-header"
          style={{
            backgroundImage: "url(/wp-content/uploads/2014/12/Fotolia_95249632_Subscription_Monthly_M.jpg)",
          }}
        >
          <div className="container page-header-content">
            <h1>{isEditing ? 'Edit Job' : 'Create New Job'}</h1>
          </div>
        </div>
        <main className="container" style={{ padding: "60px 0" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "48px",
              height: "48px",
              border: "3px solid #f38131",
              borderTop: "3px solid transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 16px"
            }}></div>
            <p style={{ color: "#666", fontFamily: "Lato, sans-serif" }}>Loading job data...</p>
          </div>
        </main>
        <Footer />
        <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <Header />

      <div
        className="page-header"
        style={{
          backgroundImage: "url(/wp-content/uploads/2014/12/Fotolia_95249632_Subscription_Monthly_M.jpg)",
        }}
      >
        <div className="container page-header-content">
          <h1>{isEditing ? 'Edit Job' : 'Create New Job'}</h1>
        </div>
      </div>

      <main className="container" style={{ padding: "60px 0" }}>
        <div style={{ marginBottom: "24px" }}>
          <a
            href="/admin/dashboard"
            style={{
              color: "#f38131",
              fontSize: "14px",
              textDecoration: "none",
              fontFamily: "Lato, sans-serif"
            }}
          >
            ← Back to Dashboard
          </a>
        </div>

        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e5e7eb",
          padding: "24px"
        }}>
          <h1 style={{
            fontSize: "32px",
            fontWeight: "400",
            color: "#323232",
            marginBottom: "24px",
            fontFamily: "Raleway, sans-serif"
          }}>
            {isEditing ? 'Edit Job' : 'Create New Job'}
          </h1>

          {error && (
            <div style={{
              backgroundColor: "#fee2e2",
              border: "1px solid #fca5a5",
              color: "#991b1b",
              padding: "12px 16px",
              borderRadius: "4px",
              marginBottom: "24px",
              fontSize: "14px",
              fontFamily: "Lato, sans-serif"
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <label htmlFor="title" style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "4px",
                fontFamily: "Lato, sans-serif"
              }}>
                Job Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontFamily: "Lato, sans-serif",
                  boxSizing: "border-box"
                }}
                placeholder="e.g., Senior Software Engineer"
              />
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px"
            }}>
              <div>
                <label htmlFor="slug" style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "4px",
                  fontFamily: "Lato, sans-serif"
                }}>
                  URL Slug *
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  required
                  value={formData.slug}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontFamily: "Lato, sans-serif",
                    boxSizing: "border-box"
                  }}
                  placeholder="e.g., senior-software-engineer"
                />
                <p style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  marginTop: "4px",
                  fontFamily: "Lato, sans-serif",
                  margin: "4px 0 0 0"
                }}>
                  Used in the URL: devonshire-recruitment.pages.dev/job/{formData.slug}
                </p>
              </div>

              <div>
                <label htmlFor="job_type" style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "4px",
                  fontFamily: "Lato, sans-serif"
                }}>
                  Job Type *
                </label>
                <select
                  id="job_type"
                  name="job_type"
                  required
                  value={formData.job_type}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontFamily: "Lato, sans-serif",
                    boxSizing: "border-box",
                    backgroundColor: "white"
                  }}
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px"
            }}>
              <div>
                <label htmlFor="location" style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "4px",
                  fontFamily: "Lato, sans-serif"
                }}>
                  Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontFamily: "Lato, sans-serif",
                    boxSizing: "border-box"
                  }}
                  placeholder="e.g., Boston, MA or Remote"
                />
              </div>

              <div>
                <label htmlFor="salary" style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "4px",
                  fontFamily: "Lato, sans-serif"
                }}>
                  Salary Range
                </label>
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontFamily: "Lato, sans-serif",
                    boxSizing: "border-box"
                  }}
                  placeholder="e.g., $80,000 - $120,000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="apply_email" style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "4px",
                fontFamily: "Lato, sans-serif"
              }}>
                Application Email *
              </label>
              <input
                type="email"
                id="apply_email"
                name="apply_email"
                required
                value={formData.apply_email}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontFamily: "Lato, sans-serif",
                  boxSizing: "border-box"
                }}
                placeholder="e.g., careers@devonshirerecruitment.com"
              />
            </div>

            <div>
              <label htmlFor="description_md" style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "4px",
                fontFamily: "Lato, sans-serif"
              }}>
                Job Description *
              </label>
              <textarea
                id="description_md"
                name="description_md"
                required
                value={formData.description_md}
                onChange={handleChange}
                rows={15}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontFamily: "Lato, sans-serif",
                  boxSizing: "border-box",
                  resize: "vertical"
                }}
                placeholder="Enter job description in Markdown format..."
              />
              <p style={{
                fontSize: "12px",
                color: "#6b7280",
                marginTop: "4px",
                fontFamily: "Lato, sans-serif",
                margin: "4px 0 0 0"
              }}>
                Supports Markdown formatting. Use ## for headings, ** for bold, etc.
              </p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px"
            }}>
              <div>
                <label htmlFor="status" style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "4px",
                  fontFamily: "Lato, sans-serif"
                }}>
                  Status *
                </label>
                <select
                  id="status"
                  name="status"
                  required
                  value={formData.status}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontFamily: "Lato, sans-serif",
                    boxSizing: "border-box",
                    backgroundColor: "white"
                  }}
                >
                  <option value="active">active</option>
                  <option value="paused">paused</option>
                  <option value="archived">archived</option>
                </select>
              </div>

              <div>
                <label htmlFor="date_posted" style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "4px",
                  fontFamily: "Lato, sans-serif"
                }}>
                  Date Posted *
                </label>
                <input
                  type="date"
                  id="date_posted"
                  name="date_posted"
                  required
                  value={formData.date_posted}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontFamily: "Lato, sans-serif",
                    boxSizing: "border-box"
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", paddingTop: "8px" }}>
              <a
                href="/admin/dashboard"
                style={{
                  padding: "12px 24px",
                  backgroundColor: "transparent",
                  color: "#6b7280",
                  border: "2px solid #d1d5db",
                  borderRadius: "4px",
                  fontSize: "15px",
                  fontWeight: "700",
                  fontFamily: "Raleway, sans-serif",
                  textDecoration: "none",
                  display: "inline-block",
                  transition: "all 0.2s"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#f3f4f6";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Cancel
              </a>
              <AdminButton variant="primary" type="submit" disabled={loading}>
                {loading ? 'Saving...' : isEditing ? 'Update Job' : 'Create Job'}
              </AdminButton>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function EditJobPage() {
  return (
    <Suspense fallback={
      <>
        <Header />
        <div
          className="page-header"
          style={{
            backgroundImage: "url(/wp-content/uploads/2014/12/Fotolia_95249632_Subscription_Monthly_M.jpg)",
          }}
        >
          <div className="container page-header-content">
            <h1>Loading...</h1>
          </div>
        </div>
        <main className="container" style={{ padding: "60px 0" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "48px",
              height: "48px",
              border: "3px solid #f38131",
              borderTop: "3px solid transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 16px"
            }}></div>
            <p style={{ color: "#666", fontFamily: "Lato, sans-serif" }}>Loading...</p>
          </div>
        </main>
        <Footer />
        <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </>
    }>
      <EditJobContent />
    </Suspense>
  );
}