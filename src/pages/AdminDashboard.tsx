import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Briefcase,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Trash2,
  EyeOff,
  Send,
  LogOut,
  Shield,
  Calendar,
  TrendingUp,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  department?: string;
  experience?: string;
  salary?: string;
  requirements?: string[];
  responsibilities?: string[];
  createdAt: string;
}

interface Application {
  _id: string;
  name: string;
  email: string;
  position?: string; // ✅ Added position field
  message?: string;
  resume?: string;
  status: string;
  appliedAt: string;
  jobId?: {
    title: string;
    _id: string;
  };
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"applications" | "jobs">("applications");
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    location: "",
    type: "",
    department: "",
    experience: "",
    salary: "",
    requirements: [""],
    responsibilities: [""],
  });

  useEffect(() => {
    // Check for admin token in localStorage
    const token = localStorage.getItem("admin_token");
    const user = localStorage.getItem("admin_user");
    
    if (!token || !user) {
      // No admin session, redirect to admin login
      navigate("/admin-login");
      return;
    }

    try {
      const parsedUser = JSON.parse(user);
      
      // Verify user is admin
      if (parsedUser.role !== "admin") {
        alert("Access denied. Admin privileges required.");
        navigate("/");
        return;
      }

      setAdminUser(parsedUser);
      setAuthToken(token);
      fetchData(token);
    } catch (error) {
      console.error("Error parsing admin user:", error);
      navigate("/admin-login");
    }
  }, [navigate]);

  const fetchData = async (token?: string) => {
    const tokenToUse = token || authToken;
    if (!tokenToUse) return;

    try {
      // Fetch all applications
      const appsResponse = await fetch(`${API_URL}/applications/all`, {
        headers: {
          Authorization: `Bearer ${tokenToUse}`,
        },
      });

      if (appsResponse.ok) {
        const appsData = await appsResponse.json();
        setApplications(appsData);
      }

      // Fetch all jobs
      const jobsResponse = await fetch(`${API_URL}/jobs`);
      if (jobsResponse.ok) {
        const jobsData = await jobsResponse.json();
        setJobs(jobsData);
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (appId: string, status: string) => {
    if (!authToken) return;

    const statusMessages = {
      Shortlisted: "✅ Application shortlisted! Applicant will receive a congratulations email.",
      Rejected: "❌ Application rejected. Applicant will receive a polite rejection email.",
      Ignored: "⚠️ Application ignored. No email will be sent to the applicant."
    };

    try {
      const response = await fetch(`${API_URL}/applications/${appId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        // Refresh applications
        fetchData();
        alert(statusMessages[status as keyof typeof statusMessages] || `Application status updated to ${status}`);
      } else {
        alert("Failed to update application status. Please try again.");
      }
    } catch (error) {
      console.error("Error updating application:", error);
      alert("Failed to update application status. Please check your connection.");
    }
  };

  const deleteJob = async (jobId: string) => {
    if (!authToken) return;
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      const response = await fetch(`${API_URL}/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        fetchData();
        alert("Job deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job");
    }
  };

  const deleteApplication = async (appId: string) => {
    if (!authToken) return;
    if (!confirm("Are you sure you want to delete this application? This action cannot be undone.")) return;

    try {
      const response = await fetch(`${API_URL}/applications/${appId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        fetchData();
        alert("Application deleted successfully");
      } else {
        alert("Failed to delete application");
      }
    } catch (error) {
      console.error("Error deleting application:", error);
      alert("Failed to delete application");
    }
  };

  const createJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authToken) return;

    if (!newJob.title || !newJob.description || !newJob.location || !newJob.type) {
      alert("Please fill in all required fields");
      return;
    }

    // Filter out empty requirements and responsibilities
    const filteredJob = {
      ...newJob,
      requirements: newJob.requirements.filter(r => r.trim() !== ""),
      responsibilities: newJob.responsibilities.filter(r => r.trim() !== ""),
    };

    try {
      const response = await fetch(`${API_URL}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(filteredJob),
      });

      if (response.ok) {
        fetchData();
        setShowJobModal(false);
        setNewJob({ 
          title: "", 
          description: "", 
          location: "", 
          type: "",
          department: "",
          experience: "",
          salary: "",
          requirements: [""],
          responsibilities: [""],
        });
        alert("Job created successfully!");
      } else {
        alert("Failed to create job");
      }
    } catch (error) {
      console.error("Error creating job:", error);
      alert("Failed to create job");
    }
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      localStorage.removeItem("user_uid");
      localStorage.removeItem("user_email");
      localStorage.removeItem("user_name");
      localStorage.removeItem("user_role");
      navigate("/admin-login");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-orange-50/30">
      {/* Admin Navbar */}
      <nav className="bg-white shadow-lg border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <img src="/logo.png" alt="SYNNECTIFY Logo" className="w-10 h-10 object-contain" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-xs text-gray-500">SYNNECTIFY Management</p>
              </div>
            </div>

            {/* User Info and Actions */}
            <div className="flex items-center space-x-4">
              {adminUser && (
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-900">{adminUser.name}</p>
                  <p className="text-xs text-gray-500">{adminUser.email}</p>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 pt-24">
        {/* Welcome Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-1">
                Welcome back, {adminUser?.name?.split(' ')[0] || 'Admin'}! 👋
              </h2>
              <p className="text-gray-600">
                Manage your job postings and review candidate applications efficiently
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active Jobs</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  {jobs.length}
                </p>
                <p className="text-xs text-gray-500 mt-1">Open positions</p>
              </div>
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl">
                <Briefcase className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Applications</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  {applications.length}
                </p>
                <p className="text-xs text-gray-500 mt-1">Total received</p>
              </div>
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Pending Review</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">
                  {applications.filter((a) => a.status === "Pending").length}
                </p>
                <p className="text-xs text-gray-500 mt-1">Awaiting action</p>
              </div>
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-2xl border border-gray-200 shadow-lg">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("applications")}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-all relative ${
                activeTab === "applications"
                  ? "text-orange-600 bg-orange-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {activeTab === "applications" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-t"></div>
              )}
              <FileText className="w-5 h-5 inline-block mr-2" />
              Applications
              <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                {applications.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("jobs")}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-all relative ${
                activeTab === "jobs"
                  ? "text-orange-600 bg-orange-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {activeTab === "jobs" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-t"></div>
              )}
              <Briefcase className="w-5 h-5 inline-block mr-2" />
              Job Postings
              <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
                {jobs.length}
              </span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-2xl border-x border-b border-gray-200 p-6 shadow-lg min-h-[400px]">
          {activeTab === "applications" ? (
            <div className="space-y-4">
              {applications.length === 0 ? (
                <p className="text-center text-gray-600 py-8">
                  No applications received yet.
                </p>
              ) : (
                applications.map((app) => (
                  <div
                    key={app._id}
                    className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-orange-300 transition-all bg-gradient-to-br from-white to-gray-50"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {app.name}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              app.status === "Shortlisted"
                                ? "bg-green-100 text-green-700"
                                : app.status === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : app.status === "Ignored"
                                ? "bg-gray-100 text-gray-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {app.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p className="flex items-center">
                            <Mail className="w-4 h-4 mr-2" />
                            {app.email}
                          </p>
                          <p>
                            <strong>Position:</strong> {app.position || app.jobId?.title || "N/A"}
                          </p>
                          <p>
                            <strong>Applied:</strong>{" "}
                            {new Date(app.appliedAt).toLocaleDateString()}
                          </p>
                          {app.message && (
                            <p className="mt-2">
                              <strong>Message:</strong> {app.message}
                            </p>
                          )}
                          {app.resume && (
                            <a
                              href={`${API_URL.replace("/api", "")}${app.resume}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline inline-block mt-2"
                            >
                              View Resume →
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4 lg:mt-0 lg:ml-6">
                        <button
                          onClick={() =>
                            updateApplicationStatus(app._id, "Shortlisted")
                          }
                          disabled={app.status === "Shortlisted"}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Shortlist and send congratulations email"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Shortlist
                        </button>
                        <button
                          onClick={() =>
                            updateApplicationStatus(app._id, "Rejected")
                          }
                          disabled={app.status === "Rejected"}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Reject and send polite rejection email"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </button>
                        <button
                          onClick={() =>
                            updateApplicationStatus(app._id, "Ignored")
                          }
                          disabled={app.status === "Ignored"}
                          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Ignore application (no email sent)"
                        >
                          <EyeOff className="w-4 h-4 mr-1" />
                          Ignore
                        </button>
                        <button
                          onClick={() => deleteApplication(app._id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center"
                          title="Delete application permanently"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setShowJobModal(true)}
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-lg transition-all flex items-center gap-2 shadow-md hover:shadow-lg font-semibold"
                >
                  <Briefcase className="w-5 h-5" />
                  Add New Job
                </button>
              </div>
              {jobs.length === 0 ? (
                <p className="text-center text-gray-600 py-8">
                  No jobs posted yet.
                </p>
              ) : (
                jobs.map((job) => (
                  <div
                    key={job._id}
                    className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-orange-300 transition-all bg-gradient-to-br from-white to-gray-50"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {job.title}
                          </h3>
                          {job.department && (
                            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                              {job.department}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{job.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <span className="mr-1">📍</span> {job.location}
                          </span>
                          <span className="flex items-center">
                            <span className="mr-1">⏰</span> {job.type}
                          </span>
                          {job.experience && (
                            <span className="flex items-center">
                              <span className="mr-1">💼</span> {job.experience}
                            </span>
                          )}
                          {job.salary && (
                            <span className="flex items-center">
                              <span className="mr-1">💰</span> {job.salary}
                            </span>
                          )}
                          <span className="flex items-center">
                            <span className="mr-1">📅</span> Posted: {new Date(job.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 lg:mt-0 lg:ml-6">
                        <button
                          onClick={() => deleteJob(job._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm flex items-center"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Job Creation Modal */}
      {showJobModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Briefcase className="w-6 h-6" />
                Create New Job Position
              </h2>
            </div>
            
            <form onSubmit={createJob} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="e.g., Senior Software Engineer"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Brief job description..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newJob.location}
                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., Hyderabad, India"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newJob.type}
                    onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    value={newJob.department}
                    onChange={(e) => setNewJob({ ...newJob, department: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., Engineering"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Experience
                  </label>
                  <input
                    type="text"
                    value={newJob.experience}
                    onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., 3-5 years"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Salary
                  </label>
                  <input
                    type="text"
                    value={newJob.salary}
                    onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., ₹8-15 LPA"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Requirements (one per line)
                </label>
                <textarea
                  value={newJob.requirements.join('\n')}
                  onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value.split('\n') })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter each requirement on a new line..."
                  rows={5}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Responsibilities (one per line)
                </label>
                <textarea
                  value={newJob.responsibilities.join('\n')}
                  onChange={(e) => setNewJob({ ...newJob, responsibilities: e.target.value.split('\n') })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter each responsibility on a new line..."
                  rows={5}
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowJobModal(false);
                    setNewJob({ 
                      title: "", 
                      description: "", 
                      location: "", 
                      type: "",
                      department: "",
                      experience: "",
                      salary: "",
                      requirements: [""],
                      responsibilities: [""],
                    });
                  }}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg font-semibold"
                >
                  Create Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
