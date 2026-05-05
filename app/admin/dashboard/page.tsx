"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCurrentAuthUser, logout } from '@/lib/auth';
import { jobsApi, type Job } from '@/lib/api';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AdminButton from '../components/AdminButton';
import AdminCard from '../components/AdminCard';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogLoading, setBlogLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'jobs' | 'blog' | 'account'>('jobs');
  const [usingWorker, setUsingWorker] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'local' | 'error'>('connected');

  useEffect(() => {
    // Load user data
    setUser(getCurrentAuthUser());

    // Load jobs data
    loadJobs();

    // Load blog posts
    loadBlogPosts();
  }, []);

  const loadJobs = async () => {
    try {
      const response = await jobsApi.list();
      setJobs(response.jobs);
      setConnectionStatus('connected');
      setUsingWorker(true);
    } catch (error) {
      console.error('Failed to load jobs from worker, using local data:', error);
      // Fallback to local data
      try {
        const localResponse = await fetch('/jobs-data.json');
        if (!localResponse.ok) {
          throw new Error('Failed to fetch local jobs data');
        }
        const localData = await localResponse.json();
        const jobsArray = Object.values(localData).map((job: any) => ({
          id: job.slug,
          slug: job.slug,
          title: job.title,
          location: job.location,
          job_type: job.jobType,
          salary: job.salary || null,
          apply_email: job.email || 'careers@devonshirerecruitment.com',
          description_md: job.description || '',
          status: 'active' as const,
          date_posted: new Date().toISOString().split('T')[0],
        }));
        setJobs(jobsArray);
        setConnectionStatus('local');
        setUsingWorker(false);
      } catch (localError) {
        console.error('Failed to load local jobs data:', localError);
        setConnectionStatus('error');
        setJobs([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadBlogPosts = async () => {
    try {
      const response = await fetch('/blog-data.json');
      if (!response.ok) {
        throw new Error('Failed to fetch blog data');
      }
      const data = await response.json();
      const postsArray = Object.keys(data).map(key => ({
        id: key,
        slug: key,
        title: data[key].title,
        content: data[key].content,
        excerpt: data[key].excerpt,
        featuredImage: data[key].image,
        date: data[key].date,
        status: 'published' as const
      }));
      setBlogPosts(postsArray.reverse());
    } catch (error) {
      console.error('Failed to load blog posts:', error);
      setBlogPosts([]);
    } finally {
      setBlogLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job?')) {
      return;
    }

    try {
      await jobsApi.delete(id);
      // Reload the jobs list
      loadJobs();
    } catch (error) {
      console.error('Failed to delete job:', error);
      alert('Failed to delete job. Please try again.');
    }
  };

  if (loading) {
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
            <h1>Admin Dashboard</h1>
          </div>
        </div>
        <main className="container" style={{ padding: "60px 0", minHeight: "calc(100vh - 300px)" }}>
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
            <p style={{ color: "#666", fontFamily: "Lato, sans-serif" }}>Loading dashboard...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Calculate stats
  const activeJobs = jobs.filter(job => job.status === 'active').length;
  const pausedJobs = jobs.filter(job => job.status === 'paused').length;
  const archivedJobs = jobs.filter(job => job.status === 'archived').length;

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
          <h1>Admin Dashboard</h1>
        </div>
      </div>

      <main className="container" style={{ padding: "60px 0" }}>
        {/* User Info Bar */}
        <div style={{
          backgroundColor: "#f5f5f5",
          padding: "16px 24px",
          borderRadius: "4px",
          marginBottom: "32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ color: "#323232", fontSize: "14px", fontFamily: "Lato, sans-serif" }}>
              Welcome, <strong>{user?.name || 'Admin'}</strong>
            </span>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 12px",
              borderRadius: "9999px",
              fontSize: "12px",
              fontWeight: "500",
              fontFamily: "Lato, sans-serif",
              backgroundColor: connectionStatus === 'connected' ? "#dcfce7" : connectionStatus === 'local' ? "#fef9c3" : "#fee2e2",
              color: connectionStatus === 'connected' ? "#166534" : connectionStatus === 'local' ? "#854d0e" : "#991b1b"
            }}>
              <div style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: connectionStatus === 'connected' ? "#22c55e" : connectionStatus === 'local' ? "#eab308" : "#ef4444"
              }}></div>
              {connectionStatus === 'connected' ? 'Connected to Worker' : connectionStatus === 'local' ? 'Using Local Data' : 'Connection Error'}
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: "500",
              fontFamily: "Lato, sans-serif",
              cursor: "pointer",
              transition: "background-color 0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#dc2626"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#ef4444"}
          >
            Logout
          </button>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          borderBottom: "2px solid #e5e7eb",
          marginBottom: "32px"
        }}>
          <div style={{ display: "flex", gap: "32px" }}>
            <button
              onClick={() => setActiveTab('jobs')}
              style={{
                padding: "12px 0",
                borderBottom: activeTab === 'jobs' ? "2px solid #f38131" : "2px solid transparent",
                color: activeTab === 'jobs' ? "#323232" : "#6b7280",
                fontSize: "14px",
                fontWeight: "500",
                fontFamily: "Lato, sans-serif",
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              Jobs
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              style={{
                padding: "12px 0",
                borderBottom: activeTab === 'blog' ? "2px solid #f38131" : "2px solid transparent",
                color: activeTab === 'blog' ? "#323232" : "#6b7280",
                fontSize: "14px",
                fontWeight: "500",
                fontFamily: "Lato, sans-serif",
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              Blog
            </button>
            <button
              onClick={() => setActiveTab('account')}
              style={{
                padding: "12px 0",
                borderBottom: activeTab === 'account' ? "2px solid #f38131" : "2px solid transparent",
                color: activeTab === 'account' ? "#323232" : "#6b7280",
                fontSize: "14px",
                fontWeight: "500",
                fontFamily: "Lato, sans-serif",
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              Account
            </button>
          </div>
        </div>

        {activeTab === 'jobs' && (
          <div>
            {/* Stats Cards */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "24px",
              marginBottom: "32px"
            }}>
              <AdminCard title="Active Jobs" subtitle={`${activeJobs} total`}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{
                    fontSize: "48px",
                    fontWeight: "700",
                    color: "#f38131",
                    fontFamily: "Raleway, sans-serif"
                  }}>
                    {activeJobs}
                  </div>
                  <div style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#22c55e",
                    fontFamily: "Lato, sans-serif"
                  }}>
                    Live
                  </div>
                </div>
              </AdminCard>

              <AdminCard title="Paused Jobs" subtitle={`${pausedJobs} total`}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{
                    fontSize: "48px",
                    fontWeight: "700",
                    color: "#eab308",
                    fontFamily: "Raleway, sans-serif"
                  }}>
                    {pausedJobs}
                  </div>
                  <div style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#eab308",
                    fontFamily: "Lato, sans-serif"
                  }}>
                    Paused
                  </div>
                </div>
              </AdminCard>

              <AdminCard title="Archived Jobs" subtitle={`${archivedJobs} total`}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{
                    fontSize: "48px",
                    fontWeight: "700",
                    color: "#9ca3af",
                    fontFamily: "Raleway, sans-serif"
                  }}>
                    {archivedJobs}
                  </div>
                  <div style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#9ca3af",
                    fontFamily: "Lato, sans-serif"
                  }}>
                    Archived
                  </div>
                </div>
              </AdminCard>
            </div>

            {/* Job Management */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h2 style={{
                fontSize: "32px",
                fontWeight: "400",
                color: "#323232",
                fontFamily: "Raleway, sans-serif",
                margin: 0
              }}>
                Job Management
              </h2>
              <Link href="/admin/edit-job">
                <AdminButton variant="primary">Add New Job</AdminButton>
              </Link>
            </div>

            <AdminCard>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f9fafb" }}>
                      <th style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#6b7280",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        fontFamily: "Lato, sans-serif",
                        borderBottom: "1px solid #e5e7eb"
                      }}>
                        Title
                      </th>
                      <th style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#6b7280",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        fontFamily: "Lato, sans-serif",
                        borderBottom: "1px solid #e5e7eb"
                      }}>
                        Location
                      </th>
                      <th style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#6b7280",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        fontFamily: "Lato, sans-serif",
                        borderBottom: "1px solid #e5e7eb"
                      }}>
                        Type
                      </th>
                      <th style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#6b7280",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        fontFamily: "Lato, sans-serif",
                        borderBottom: "1px solid #e5e7eb"
                      }}>
                        Status
                      </th>
                      <th style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#6b7280",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        fontFamily: "Lato, sans-serif",
                        borderBottom: "1px solid #e5e7eb"
                      }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => (
                      <tr key={job.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                        <td style={{ padding: "16px" }}>
                          <div style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#323232",
                            fontFamily: "Raleway, sans-serif"
                          }}>
                            {job.title}
                          </div>
                        </td>
                        <td style={{ padding: "16px" }}>
                          <div style={{ fontSize: "14px", color: "#6b7280", fontFamily: "Lato, sans-serif" }}>
                            {job.location}
                          </div>
                        </td>
                        <td style={{ padding: "16px" }}>
                          <div style={{ fontSize: "14px", color: "#6b7280", fontFamily: "Lato, sans-serif" }}>
                            {job.job_type}
                          </div>
                        </td>
                        <td style={{ padding: "16px" }}>
                          <span style={{
                            padding: "4px 12px",
                            fontSize: "12px",
                            fontWeight: "500",
                            borderRadius: "9999px",
                            fontFamily: "Lato, sans-serif",
                            backgroundColor: job.status === 'active' ? "#dcfce7" : job.status === 'paused' ? "#fef9c3" : "#f3f4f6",
                            color: job.status === 'active' ? "#166534" : job.status === 'paused' ? "#854d0e" : "#6b7280"
                          }}>
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </span>
                        </td>
                        <td style={{ padding: "16px" }}>
                          <Link
                            href={`/admin/edit-job?id=${job.id}`}
                            style={{
                              color: "#f38131",
                              fontSize: "14px",
                              fontWeight: "500",
                              textDecoration: "none",
                              marginRight: "16px",
                              fontFamily: "Lato, sans-serif"
                            }}
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteJob(job.id)}
                            style={{
                              color: "#ef4444",
                              fontSize: "14px",
                              fontWeight: "500",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              fontFamily: "Lato, sans-serif",
                              padding: 0
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AdminCard>
          </div>
        )}

        {activeTab === 'blog' && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h2 style={{
                fontSize: "32px",
                fontWeight: "400",
                color: "#323232",
                fontFamily: "Raleway, sans-serif",
                margin: 0
              }}>
                Blog Management
              </h2>
              <Link href="/admin/blog">
                <AdminButton variant="primary">New Blog Post</AdminButton>
              </Link>
            </div>

            {blogLoading ? (
              <div style={{ textAlign: "center", padding: "48px 24px" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  border: "3px solid #f38131",
                  borderTop: "3px solid transparent",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  margin: "0 auto 16px"
                }}></div>
                <p style={{ color: "#666", fontFamily: "Lato, sans-serif" }}>Loading blog posts...</p>
              </div>
            ) : (
              <AdminCard>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ backgroundColor: "#f9fafb" }}>
                        <th style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#6b7280",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          fontFamily: "Lato, sans-serif",
                          borderBottom: "1px solid #e5e7eb"
                        }}>
                          Title
                        </th>
                        <th style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#6b7280",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          fontFamily: "Lato, sans-serif",
                          borderBottom: "1px solid #e5e7eb"
                        }}>
                          Date
                        </th>
                        <th style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#6b7280",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          fontFamily: "Lato, sans-serif",
                          borderBottom: "1px solid #e5e7eb"
                        }}>
                          Status
                        </th>
                        <th style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#6b7280",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          fontFamily: "Lato, sans-serif",
                          borderBottom: "1px solid #e5e7eb"
                        }}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogPosts.map((post) => (
                        <tr key={post.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                          <td style={{ padding: "16px" }}>
                            <div style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#323232",
                              fontFamily: "Raleway, sans-serif"
                            }}>
                              {post.title}
                            </div>
                          </td>
                          <td style={{ padding: "16px" }}>
                            <div style={{ fontSize: "14px", color: "#6b7280", fontFamily: "Lato, sans-serif" }}>
                              {new Date(post.date).toLocaleDateString()}
                            </div>
                          </td>
                          <td style={{ padding: "16px" }}>
                            <span style={{
                              padding: "4px 12px",
                              fontSize: "12px",
                              fontWeight: "500",
                              borderRadius: "9999px",
                              fontFamily: "Lato, sans-serif",
                              backgroundColor: "#dcfce7",
                              color: "#166534"
                            }}>
                              Published
                            </span>
                          </td>
                          <td style={{ padding: "16px" }}>
                            <Link
                              href={`/admin/blog`}
                              style={{
                                color: "#f38131",
                                fontSize: "14px",
                                fontWeight: "500",
                                textDecoration: "none",
                                marginRight: "16px",
                                fontFamily: "Lato, sans-serif"
                              }}
                            >
                              Edit
                            </Link>
                            <a
                              href={`/devonshire-blog/${post.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "#6b7280",
                                fontSize: "14px",
                                fontWeight: "500",
                                textDecoration: "none",
                                fontFamily: "Lato, sans-serif"
                              }}
                            >
                              View
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </AdminCard>
            )}
          </div>
        )}

        {activeTab === 'account' && (
          <div>
            <h2 style={{
              fontSize: "32px",
              fontWeight: "400",
              color: "#323232",
              marginBottom: "24px",
              fontFamily: "Raleway, sans-serif"
            }}>
              Account Management
            </h2>

            <AdminCard title="Profile Information">
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "4px",
                    fontFamily: "Lato, sans-serif"
                  }}>
                    Name
                  </label>
                  <p style={{ fontSize: "14px", color: "#323232", fontFamily: "Lato, sans-serif", margin: 0 }}>
                    {user?.name || 'N/A'}
                  </p>
                </div>
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "4px",
                    fontFamily: "Lato, sans-serif"
                  }}>
                    Email
                  </label>
                  <p style={{ fontSize: "14px", color: "#323232", fontFamily: "Lato, sans-serif", margin: 0 }}>
                    {user?.email || 'N/A'}
                  </p>
                </div>
              </div>

              <div style={{
                marginTop: "24px",
                paddingTop: "24px",
                borderTop: "1px solid #e5e7eb"
              }}>
                <Link href="/admin/account">
                  <AdminButton variant="primary">Manage Account Settings</AdminButton>
                </Link>
              </div>
            </AdminCard>
          </div>
        )}
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