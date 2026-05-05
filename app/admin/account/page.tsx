"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getCurrentAuthUser, logout } from '@/lib/auth';
import { authApi, usersApi } from '@/lib/api';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AdminButton from '../components/AdminButton';

export default function AccountManagement() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [emailData, setEmailData] = useState({
    newEmail: '',
    password: '',
  });
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'editor' as 'admin' | 'editor' | 'viewer',
  });
  const [users, setUsers] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    setUser(getCurrentAuthUser());
    setLoading(false);
  }, [router]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    try {
      const response = await authApi.changePassword(passwordData.currentPassword, passwordData.newPassword);
      if (response.success) {
        setMessage('Password updated successfully!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setShowPasswordForm(false);
      } else {
        setError(response.error || 'Failed to update password');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update password');
    }
  };

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!emailData.newEmail || !emailData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (!emailData.newEmail.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      const response = await authApi.updateEmail(emailData.newEmail, emailData.password);
      if (response.success) {
        setMessage('Email updated successfully!');
        setEmailData({
          newEmail: '',
          password: '',
        });
        setShowEmailForm(false);
        // Update user data
        setUser({ ...user, email: emailData.newEmail });
      } else {
        setError(response.error || 'Failed to update email');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update email');
    }
  };

  const loadUsers = async () => {
    try {
      const response = await usersApi.list();
      setUsers(response.users);
    } catch (err) {
      console.error('Failed to load users:', err);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!newUserData.name || !newUserData.email || !newUserData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (newUserData.password !== newUserData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newUserData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    try {
      const response = await usersApi.create(
        newUserData.email,
        newUserData.password,
        newUserData.name,
        newUserData.role
      );
      if (response.user) {
        setMessage('User created successfully!');
        setNewUserData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'editor',
        });
        loadUsers();
      } else {
        setError(response.error || 'Failed to create user');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user');
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await usersApi.delete(userId);
      if (response.success) {
        setMessage('User deleted successfully!');
        loadUsers();
      } else {
        setError(response.error || 'Failed to delete user');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
    }
  };

  const handleLogout = () => {
    logout();
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
            <h1>Account Settings</h1>
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
          <h1>Account Settings</h1>
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

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Profile Information */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
            padding: "24px"
          }}>
            <h2 style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#323232",
              marginBottom: "24px",
              fontFamily: "Raleway, sans-serif"
            }}>
              Account Information
            </h2>

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
              <div>
                <label style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "4px",
                  fontFamily: "Lato, sans-serif"
                }}>
                  Account Created
                </label>
                <p style={{ fontSize: "14px", color: "#323232", fontFamily: "Lato, sans-serif", margin: 0 }}>
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Email Change */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
            padding: "24px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h3 style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#323232",
                fontFamily: "Raleway, sans-serif",
                margin: 0
              }}>
                Update Email
              </h3>
              <button
                onClick={() => setShowEmailForm(!showEmailForm)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "transparent",
                  color: "#f38131",
                  border: "2px solid #f38131",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontWeight: "500",
                  fontFamily: "Lato, sans-serif",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#f38131";
                  e.currentTarget.style.color = "white";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#f38131";
                }}
              >
                {showEmailForm ? 'Cancel' : 'Update Email'}
              </button>
            </div>

            {showEmailForm && (
              <form onSubmit={handleEmailChange} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {message && (
                  <div style={{
                    backgroundColor: "#dcfce7",
                    border: "1px solid #86efac",
                    color: "#166534",
                    padding: "12px 16px",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontFamily: "Lato, sans-serif"
                  }}>
                    {message}
                  </div>
                )}
                {error && (
                  <div style={{
                    backgroundColor: "#fee2e2",
                    border: "1px solid #fca5a5",
                    color: "#991b1b",
                    padding: "12px 16px",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontFamily: "Lato, sans-serif"
                  }}>
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="newEmail" style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "4px",
                    fontFamily: "Lato, sans-serif"
                  }}>
                    New Email Address
                  </label>
                  <input
                    type="email"
                    id="newEmail"
                    value={emailData.newEmail}
                    onChange={(e) => setEmailData({...emailData, newEmail: e.target.value})}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      fontSize: "14px",
                      fontFamily: "Lato, sans-serif",
                      boxSizing: "border-box"
                    }}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="emailPassword" style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "4px",
                    fontFamily: "Lato, sans-serif"
                  }}>
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="emailPassword"
                    value={emailData.password}
                    onChange={(e) => setEmailData({...emailData, password: e.target.value})}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      fontSize: "14px",
                      fontFamily: "Lato, sans-serif",
                      boxSizing: "border-box"
                    }}
                    required
                  />
                </div>

                <AdminButton variant="primary" type="submit">
                  Update Email
                </AdminButton>
              </form>
            )}
          </div>

          {/* User Management */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
            padding: "24px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h3 style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#323232",
                fontFamily: "Raleway, sans-serif",
                margin: 0
              }}>
                User Management
              </h3>
              <button
                onClick={() => {
                  setShowUserManagement(!showUserManagement);
                  if (!showUserManagement) loadUsers();
                }}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "transparent",
                  color: "#f38131",
                  border: "2px solid #f38131",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontWeight: "500",
                  fontFamily: "Lato, sans-serif",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#f38131";
                  e.currentTarget.style.color = "white";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#f38131";
                }}
              >
                {showUserManagement ? 'Close' : 'Manage Users'}
              </button>
            </div>

            {showUserManagement && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {/* Add New User Form */}
                <div style={{
                  padding: "16px",
                  backgroundColor: "#f9fafb",
                  borderRadius: "4px",
                  border: "1px solid #e5e7eb"
                }}>
                  <h4 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#323232",
                    marginBottom: "16px",
                    fontFamily: "Raleway, sans-serif"
                  }}>
                    Add New User
                  </h4>
                  <form onSubmit={handleAddUser} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
                      <input
                        type="text"
                        value={newUserData.name}
                        onChange={(e) => setNewUserData({...newUserData, name: e.target.value})}
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          fontSize: "14px",
                          fontFamily: "Lato, sans-serif",
                          boxSizing: "border-box"
                        }}
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
                        Email
                      </label>
                      <input
                        type="email"
                        value={newUserData.email}
                        onChange={(e) => setNewUserData({...newUserData, email: e.target.value})}
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          fontSize: "14px",
                          fontFamily: "Lato, sans-serif",
                          boxSizing: "border-box"
                        }}
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
                        Password
                      </label>
                      <input
                        type="password"
                        value={newUserData.password}
                        onChange={(e) => setNewUserData({...newUserData, password: e.target.value})}
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          fontSize: "14px",
                          fontFamily: "Lato, sans-serif",
                          boxSizing: "border-box"
                        }}
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
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        value={newUserData.confirmPassword}
                        onChange={(e) => setNewUserData({...newUserData, confirmPassword: e.target.value})}
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          fontSize: "14px",
                          fontFamily: "Lato, sans-serif",
                          boxSizing: "border-box"
                        }}
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
                        Role
                      </label>
                      <select
                        value={newUserData.role}
                        onChange={(e) => setNewUserData({...newUserData, role: e.target.value as 'admin' | 'editor' | 'viewer'})}
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          fontSize: "14px",
                          fontFamily: "Lato, sans-serif",
                          boxSizing: "border-box"
                        }}
                      >
                        <option value="editor">Editor</option>
                        <option value="admin">Admin</option>
                        <option value="viewer">Viewer</option>
                      </select>
                    </div>
                    <AdminButton variant="primary" type="submit">
                      Add User
                    </AdminButton>
                  </form>
                </div>

                {/* Users List */}
                <div>
                  <h4 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#323232",
                    marginBottom: "16px",
                    fontFamily: "Raleway, sans-serif"
                  }}>
                    Existing Users
                  </h4>
                  {users.length === 0 ? (
                    <p style={{ fontSize: "14px", color: "#6b7280", fontFamily: "Lato, sans-serif" }}>
                      No users found. Add your first user above.
                    </p>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {users.map((u) => (
                        <div
                          key={u.id}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "12px 16px",
                            backgroundColor: "#ffffff",
                            border: "1px solid #e5e7eb",
                            borderRadius: "4px"
                          }}
                        >
                          <div>
                            <div style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#323232",
                              fontFamily: "Raleway, sans-serif"
                            }}>
                              {u.name}
                            </div>
                            <div style={{ fontSize: "13px", color: "#6b7280", fontFamily: "Lato, sans-serif" }}>
                              {u.email}
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <span style={{
                              padding: "4px 12px",
                              fontSize: "12px",
                              fontWeight: "500",
                              borderRadius: "9999px",
                              fontFamily: "Lato, sans-serif",
                              backgroundColor: u.role === 'admin' ? "#dcfce7" : u.role === 'editor' ? "#dbeafe" : "#f3f4f6",
                              color: u.role === 'admin' ? "#166534" : u.role === 'editor' ? "#1e40af" : "#6b7280"
                            }}>
                              {u.role}
                            </span>
                            {u.id !== user?.id && (
                              <button
                                onClick={() => handleDeleteUser(u.id)}
                                style={{
                                  padding: "6px 12px",
                                  backgroundColor: "#fee2e2",
                                  color: "#991b1b",
                                  border: "1px solid #fecaca",
                                  borderRadius: "4px",
                                  fontSize: "13px",
                                  fontWeight: "500",
                                  fontFamily: "Lato, sans-serif",
                                  cursor: "pointer",
                                  transition: "all 0.2s"
                                }}
                                onMouseOver={(e) => {
                                  e.currentTarget.style.backgroundColor = "#fecaca";
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.backgroundColor = "#fee2e2";
                                }}
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
            padding: "24px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h3 style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#323232",
                fontFamily: "Raleway, sans-serif",
                margin: 0
              }}>
                Change Password
              </h3>
              <button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "transparent",
                  color: "#f38131",
                  border: "2px solid #f38131",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontWeight: "500",
                  fontFamily: "Lato, sans-serif",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#f38131";
                  e.currentTarget.style.color = "white";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#f38131";
                }}
              >
                {showPasswordForm ? 'Cancel' : 'Change Password'}
              </button>
            </div>

            {showPasswordForm && (
              <form onSubmit={handlePasswordChange} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {message && (
                  <div style={{
                    backgroundColor: "#dcfce7",
                    border: "1px solid #86efac",
                    color: "#166534",
                    padding: "12px 16px",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontFamily: "Lato, sans-serif"
                  }}>
                    {message}
                  </div>
                )}
                {error && (
                  <div style={{
                    backgroundColor: "#fee2e2",
                    border: "1px solid #fca5a5",
                    color: "#991b1b",
                    padding: "12px 16px",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontFamily: "Lato, sans-serif"
                  }}>
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="currentPassword" style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "4px",
                    fontFamily: "Lato, sans-serif"
                  }}>
                    Current Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      id="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      style={{
                        width: "100%",
                        padding: "12px",
                        paddingRight: "40px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        fontSize: "14px",
                        fontFamily: "Lato, sans-serif",
                        boxSizing: "border-box"
                      }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                      aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                    >
                      {showCurrentPassword ? (
                        <svg style={{ width: "20px", height: "20px", color: "#6b7280" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg style={{ width: "20px", height: "20px", color: "#6b7280" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="newPassword" style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "4px",
                    fontFamily: "Lato, sans-serif"
                  }}>
                    New Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      style={{
                        width: "100%",
                        padding: "12px",
                        paddingRight: "40px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        fontSize: "14px",
                        fontFamily: "Lato, sans-serif",
                        boxSizing: "border-box"
                      }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                      aria-label={showNewPassword ? "Hide password" : "Show password"}
                    >
                      {showNewPassword ? (
                        <svg style={{ width: "20px", height: "20px", color: "#6b7280" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg style={{ width: "20px", height: "20px", color: "#6b7280" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "4px",
                    fontFamily: "Lato, sans-serif"
                  }}>
                    Confirm New Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      style={{
                        width: "100%",
                        padding: "12px",
                        paddingRight: "40px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        fontSize: "14px",
                        fontFamily: "Lato, sans-serif",
                        boxSizing: "border-box"
                      }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? (
                        <svg style={{ width: "20px", height: "20px", color: "#6b7280" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg style={{ width: "20px", height: "20px", color: "#6b7280" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <AdminButton variant="primary" type="submit">
                  Update Password
                </AdminButton>
              </form>
            )}
          </div>

          {/* Danger Zone */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            border: "1px solid #fecaca",
            padding: "24px"
          }}>
            <h3 style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#991b1b",
              marginBottom: "16px",
              fontFamily: "Raleway, sans-serif"
            }}>
              Danger Zone
            </h3>
            <p style={{
              fontSize: "14px",
              color: "#b91c1c",
              marginBottom: "16px",
              fontFamily: "Lato, sans-serif"
            }}>
              These actions are irreversible. Please be certain.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button
                onClick={handleLogout}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "2px solid #ef4444",
                  borderRadius: "4px",
                  fontSize: "15px",
                  fontWeight: "700",
                  fontFamily: "Raleway, sans-serif",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  width: "100%"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#dc2626";
                  e.currentTarget.style.borderColor = "#dc2626";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#ef4444";
                  e.currentTarget.style.borderColor = "#ef4444";
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}