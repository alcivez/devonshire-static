"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AdminButton from '../components/AdminButton';
import RichTextEditor from '../components/RichTextEditor';
import ImageUpload from '../components/ImageUpload';

export default function BlogManagement() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [showEditor, setShowEditor] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    status: 'draft' as 'published' | 'draft' | 'archived',
    author: '',
  });

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    // Load posts from blog-data.json
    loadPosts();
  }, [router]);

  const loadPosts = async () => {
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
      setPosts(postsArray.reverse()); // Show newest first
    } catch (error) {
      console.error('Failed to load posts:', error);
      // Set empty array on error to avoid infinite loading
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      featuredImage: '',
      status: 'draft',
      author: '',
    });
    setShowEditor(true);
  };

  const handleEditPost = (post: any) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt || '',
      featuredImage: post.featuredImage || post.image || '',
      status: post.status || 'published',
      author: post.author || '',
    });
    setShowEditor(true);
  };

  const handleSavePost = async () => {
    try {
      // For now, just show an alert since we can't write to the JSON file from the browser
      alert('Blog post saved! (Note: Full save functionality requires backend API)');
      setShowEditor(false);
      loadPosts(); // Reload posts
    } catch (error) {
      console.error('Failed to save post:', error);
      alert('Failed to save post');
    }
  };

  const handleCancel = () => {
    setShowEditor(false);
    setEditingPost(null);
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
            <h1>Blog Management</h1>
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
    );
  }

  if (showEditor) {
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
            <h1>{editingPost ? 'Edit Blog Post' : 'Create New Post'}</h1>
          </div>
        </div>
        <main className="container" style={{ padding: "60px 0", minHeight: "calc(100vh - 300px)" }}>
          <div style={{ marginBottom: "24px" }}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleCancel();
              }}
              style={{
                color: "#f38131",
                fontSize: "14px",
                textDecoration: "none",
                fontFamily: "Lato, sans-serif"
              }}
            >
              ← Back to Blog Management
            </a>
          </div>

          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
            padding: "24px"
          }}>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSavePost();
            }} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Basic Info */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "16px"
              }}>
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "4px",
                    fontFamily: "Lato, sans-serif"
                  }}>
                    Post Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      fontSize: "14px",
                      fontFamily: "Lato, sans-serif",
                      boxSizing: "border-box"
                    }}
                    placeholder="Enter post title"
                    required
                  />
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
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      fontSize: "14px",
                      fontFamily: "Lato, sans-serif",
                      boxSizing: "border-box"
                    }}
                    placeholder="post-url-slug"
                    required
                  />
                </div>
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
                  Author
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontFamily: "Lato, sans-serif",
                    boxSizing: "border-box"
                  }}
                  placeholder="Author name"
                />
              </div>

              {/* Featured Image */}
              <ImageUpload
                value={formData.featuredImage}
                onChange={(url) => setFormData({...formData, featuredImage: url})}
                label="Featured Image"
              />

              {/* Excerpt */}
              <div>
                <label style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "4px",
                  fontFamily: "Lato, sans-serif"
                }}>
                  Excerpt (Short Description)
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  rows={3}
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
                  placeholder="Brief description of the post..."
                />
              </div>

              {/* Rich Text Editor */}
              <div>
                <label style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "4px",
                  fontFamily: "Lato, sans-serif"
                }}>
                  Content *
                </label>
                <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px", fontFamily: "Lato, sans-serif" }}>
                  Keyboard shortcuts: Cmd+B (bold), Cmd+I (italic), Cmd+U (underline), Cmd+K (link)
                </div>
                <RichTextEditor
                  value={formData.content}
                  onChange={(content) => setFormData({...formData, content})}
                  placeholder="Start writing your blog post..."
                  height="500px"
                />
              </div>

              {/* Status */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px"
              }}>
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "4px",
                    fontFamily: "Lato, sans-serif"
                  }}>
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as any})}
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
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", paddingTop: "8px" }}>
                <button
                  type="button"
                  onClick={handleCancel}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "transparent",
                    color: "#6b7280",
                    border: "2px solid #d1d5db",
                    borderRadius: "4px",
                    fontSize: "15px",
                    fontWeight: "700",
                    fontFamily: "Raleway, sans-serif",
                    cursor: "pointer",
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
                </button>
                <AdminButton variant="primary" type="submit">
                  {editingPost ? 'Update Post' : 'Publish Post'}
                </AdminButton>
              </div>
            </form>
          </div>
        </main>
        <Footer />
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
          <h1>Blog Management</h1>
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

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{
            fontSize: "32px",
            fontWeight: "400",
            color: "#323232",
            fontFamily: "Raleway, sans-serif",
            margin: 0
          }}>
            Blog Posts
          </h2>
          <AdminButton variant="primary" onClick={handleCreatePost}>
            Create New Post
          </AdminButton>
        </div>

        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e5e7eb",
          padding: "24px"
        }}>
          {posts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 24px" }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "64px",
                height: "64px",
                backgroundColor: "rgba(243, 129, 49, 0.1)",
                borderRadius: "50%",
                marginBottom: "16px"
              }}>
                <svg
                  style={{ width: "32px", height: "32px", color: "#f38131" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 style={{
                fontSize: "18px",
                fontWeight: "500",
                color: "#323232",
                marginBottom: "8px",
                fontFamily: "Raleway, sans-serif"
              }}>
                No Blog Posts Yet
              </h3>
              <p style={{ fontSize: "14px", color: "#6b7280", fontFamily: "Lato, sans-serif", margin: "0 0 16px 0" }}>
                Create your first blog post to get started
              </p>
              <AdminButton variant="primary" onClick={handleCreatePost}>
                Create First Post
              </AdminButton>
            </div>
          ) : (
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
                  {posts.map((post) => (
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
                        <button
                          onClick={() => handleEditPost(post)}
                          style={{
                            color: "#f38131",
                            fontSize: "14px",
                            fontWeight: "500",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontFamily: "Lato, sans-serif",
                            padding: 0,
                            marginRight: "16px"
                          }}
                        >
                          Edit
                        </button>
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
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}