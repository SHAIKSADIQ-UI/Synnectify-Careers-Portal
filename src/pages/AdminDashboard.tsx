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
  UserCheck,
  UserX,
  UserMinus,
  CalendarCheck,
  Edit3,
  Link as LinkIcon,
  Download,
  Eye,
  School,
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
  position?: string;
  message?: string;
  resume?: string;
  status: string;
  note?: string;
  interviewDetails?: {
    date?: string;
    time?: string;
    meetingLink?: string;
    comments?: string;
  };
  appliedAt: string;
  phone?: string;
  dob?: string;
  gender?: string;
  address?: string;
  country?: string;
  state?: string;
  city?: string;
  zipCode?: string;
  currentPosition?: string;
  currentCompany?: string;
  totalExperience?: string;
  skills?: string;
  expertise?: string;
  education?: string;
  experience?: string;
  portfolio?: string;
  github?: string;
  linkedin?: string;
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
  const [activeApplicationTab, setActiveApplicationTab] = useState<"all" | "shortlisted" | "rejected" | "ignored" | "interview" | "completed">("all");
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [showCompleteConfirmation, setShowCompleteConfirmation] = useState(false); // For confirmation popup
  const [applicationToComplete, setApplicationToComplete] = useState<Application | null>(null); // For tracking which application to complete
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [adminNote, setAdminNote] = useState("");
  const [interviewDetails, setInterviewDetails] = useState({
    date: "",
    time: "",
    meetingLink: "",
    comments: ""
  });
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
    // Add event listener for beforeunload to handle auto-logout
    const handleBeforeUnload = () => {
      // Clear admin session
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

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
        // Removed alert popup - silently redirect
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

    // Cleanup event listener
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
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

  const updateApplicationStatus = async (appId: string, status: string, note?: string) => {
    if (!authToken) return;

    try {
      const requestBody: any = { status };
      if (note !== undefined) {
        requestBody.note = note;
      }

      const response = await fetch(`${API_URL}/applications/${appId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // Refresh applications
        fetchData();
        // Removed alert popup - status updates silently now
        
        // Close modal if it's open
        if (showApplicationModal) {
          setShowApplicationModal(false);
          setSelectedApplication(null);
        }
      } else {
        // Silently handle error without popup
        console.error("Failed to update application status");
      }
    } catch (error) {
      console.error("Error updating application:", error);
      // Silently handle error without popup
    }
  };

  const scheduleInterview = async (appId: string) => {
    if (!authToken) return;

    // Validate required fields before sending request
    if (!interviewDetails.date) {
      console.error("Interview date is required");
      return;
    }
    
    if (!interviewDetails.time) {
      console.error("Interview time is required");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/applications/${appId}/schedule-interview`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          status: "Interview",
          interviewDetails,
          note: adminNote
        }),
      });

      if (response.ok) {
        // Refresh applications
        fetchData();
        // Removed alert popup - interview scheduling happens silently now
        
        // Close modals
        setShowInterviewModal(false);
        setShowApplicationModal(false);
        setSelectedApplication(null);
        setInterviewDetails({
          date: "",
          time: "",
          meetingLink: "",
          comments: ""
        });
        setAdminNote("");
      } else {
        // Handle validation errors from backend
        const errorData = await response.json();
        console.error("Failed to schedule interview:", errorData.error);
      }
    } catch (error) {
      console.error("Error scheduling interview:", error);
      // Silently handle error without popup
    }
  };

  const deleteJob = async (jobId: string) => {
    if (!authToken) return;

    try {
      const response = await fetch(`${API_URL}/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        fetchData();
        // Removed alert popup - job deletion happens silently now
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      // Silently handle error without popup
    }
  };

  const deleteApplication = async (appId: string) => {
    if (!authToken) return;

    try {
      const response = await fetch(`${API_URL}/applications/${appId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        fetchData();
        // Removed alert popup - application deletion happens silently now
      } else {
        // Silently handle error without popup
        console.error("Failed to delete application");
      }
    } catch (error) {
      console.error("Error deleting application:", error);
      // Silently handle error without popup
    }
  };

  // Function to mark an application as completed
  const markAsCompleted = async (appId: string) => {
    if (!authToken) {
      console.error("No auth token available");
      return;
    }

    try {
      console.log("Attempting to mark application as completed:", appId);
      console.log("API URL:", `${API_URL}/applications/${appId}`);
      console.log("Auth token present:", !!authToken);
      
      const response = await fetch(`${API_URL}/applications/${appId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          status: "Completed"
        }),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);
      
      const responseText = await response.text();
      console.log("Response text:", responseText);

      if (response.ok) {
        console.log("Successfully marked application as completed");
        // Refresh applications
        fetchData();
        // Close confirmation popup
        setShowCompleteConfirmation(false);
        setApplicationToComplete(null);
        // Close modals if open
        setShowApplicationModal(false);
        setSelectedApplication(null);
      } else {
        console.error("Failed to mark application as completed. Status:", response.status, "Response:", responseText);
      }
    } catch (error) {
      console.error("Error marking application as completed:", error);
    }
  };

  const createJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authToken) return;

    if (!newJob.title || !newJob.description || !newJob.location || !newJob.type) {
      // Silently handle validation without popup
      console.error("Please fill in all required fields");
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
        // Removed alert popup - job creation happens silently now
      } else {
        // Silently handle error without popup
        console.error("Failed to create job");
      }
    } catch (error) {
      console.error("Error creating job:", error);
      // Silently handle error without popup
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    localStorage.removeItem("user_uid");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_role");
    navigate("/admin-login");
  };

  const openApplicationModal = (application: Application) => {
    setSelectedApplication(application);
    setAdminNote(application.note || "");
    setShowApplicationModal(true);
  };

  // Function to open the confirmation popup for marking as completed
  const openCompleteConfirmation = (application: Application) => {
    setApplicationToComplete(application);
    setShowCompleteConfirmation(true);
  };

  const openInterviewModal = (application?: Application) => {
    // If an application is provided, set it as selected
    if (application) {
      setSelectedApplication(application);
      setAdminNote(application.note || "");
    }
    setShowInterviewModal(true);
  };

  const filteredApplications = applications.filter(app => {
    if (activeApplicationTab === "all") return app.status === "Pending";
    if (activeApplicationTab === "shortlisted") return app.status === "Shortlisted";
    if (activeApplicationTab === "rejected") return app.status === "Rejected";
    if (activeApplicationTab === "ignored") return app.status === "Ignored";
    if (activeApplicationTab === "interview") return app.status === "Interview";
    if (activeApplicationTab === "completed") return app.status === "Completed";
    return true;
  });

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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
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

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Shortlisted</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  {applications.filter((a) => a.status === "Shortlisted").length}
                </p>
                <p className="text-xs text-gray-500 mt-1">For next round</p>
              </div>
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl">
                <UserCheck className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Interviews</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  {applications.filter((a) => a.status === "Interview").length}
                </p>
                <p className="text-xs text-gray-500 mt-1">Scheduled</p>
              </div>
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl">
                <CalendarCheck className="w-8 h-8 text-purple-600" />
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
            <div className="space-y-6">
              {/* Application Tabs */}
              <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
                <button
                  onClick={() => setActiveApplicationTab("all")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeApplicationTab === "all"
                      ? "bg-orange-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  ⏳ Pending Applications ({applications.filter(a => a.status === "Pending").length})
                </button>
                <button
                  onClick={() => setActiveApplicationTab("shortlisted")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeApplicationTab === "shortlisted"
                      ? "bg-green-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  ✅ Shortlisted Applications ({applications.filter(a => a.status === "Shortlisted").length})
                </button>
                <button
                  onClick={() => setActiveApplicationTab("rejected")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeApplicationTab === "rejected"
                      ? "bg-red-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  ❌ Rejected Applications ({applications.filter(a => a.status === "Rejected").length})
                </button>
                <button
                  onClick={() => setActiveApplicationTab("ignored")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeApplicationTab === "ignored"
                      ? "bg-gray-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  ⚙️ Ignored Applications ({applications.filter(a => a.status === "Ignored").length})
                </button>
                <button
                  onClick={() => setActiveApplicationTab("interview")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeApplicationTab === "interview"
                      ? "bg-purple-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  📅 Interview Scheduled ({applications.filter(a => a.status === "Interview").length})
                </button>
                <button
                  onClick={() => setActiveApplicationTab("completed")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeApplicationTab === "completed"
                      ? "bg-green-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  ✅ Completed Applications ({applications.filter(a => a.status === "Completed").length})
                </button>
              </div>

              {filteredApplications.length === 0 ? (
                <p className="text-center text-gray-600 py-8">
                  No applications found in this category.
                </p>
              ) : (
                <div className="space-y-4">
                  {filteredApplications.map((app) => (
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
                                  : app.status === "Interview"
                                  ? "bg-purple-100 text-purple-700"
                                  : app.status === "Completed"
                                  ? "bg-green-100 text-green-700"
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
                              <strong>Current Company:</strong> {app.currentCompany || "N/A"}
                            </p>
                            <p>
                              <strong>Applied:</strong>{" "}
                              {new Date(app.appliedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4 lg:mt-0 lg:ml-6">
                          <button
                            onClick={() => openApplicationModal(app)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm flex items-center"
                            title="View Application Details"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </button>
                          
                          {/* Render buttons based on application status */}
                          {app.status === "Pending" && (
                            <>
                              <button
                                onClick={() =>
                                  updateApplicationStatus(app._id, "Shortlisted", adminNote)
                                }
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm flex items-center"
                                title="Shortlist and send congratulations email"
                              >
                                <UserCheck className="w-4 h-4 mr-1" />
                                Shortlist
                              </button>
                              <button
                                onClick={() =>
                                  updateApplicationStatus(app._id, "Rejected", adminNote)
                                }
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm flex items-center"
                                title="Reject and send polite rejection email"
                              >
                                <UserX className="w-4 h-4 mr-1" />
                                Reject
                              </button>
                              <button
                                onClick={() =>
                                  updateApplicationStatus(app._id, "Ignored", adminNote)
                                }
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm flex items-center"
                                title="Ignore application (no email sent)"
                              >
                                <UserMinus className="w-4 h-4 mr-1" />
                                Ignore
                              </button>
                            </>
                          )}
                          
                          {app.status === "Shortlisted" && (
                            <>
                              <button
                                onClick={() =>
                                  updateApplicationStatus(app._id, "Rejected", adminNote)
                                }
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm flex items-center"
                                title="Reject and send polite rejection email"
                              >
                                <UserX className="w-4 h-4 mr-1" />
                                Reject
                              </button>
                              <button
                                onClick={() =>
                                  updateApplicationStatus(app._id, "Ignored", adminNote)
                                }
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm flex items-center"
                                title="Ignore application (no email sent)"
                              >
                                <UserMinus className="w-4 h-4 mr-1" />
                                Ignore
                              </button>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  openInterviewModal(app);
                                }}
                                className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-semibold flex items-center"
                              >
                                <Calendar className="w-4 h-4 mr-2" />
                                Schedule Interview
                              </button>
                            </>
                          )}
                          
                          {app.status === "Interview" && (
                            <>
                              <button
                                onClick={() =>
                                  updateApplicationStatus(app._id, "Rejected", adminNote)
                                }
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm flex items-center"
                                title="Reject and send polite rejection email"
                              >
                                <UserX className="w-4 h-4 mr-1" />
                                Reject
                              </button>
                              <button
                                onClick={() =>
                                  updateApplicationStatus(app._id, "Ignored", adminNote)
                                }
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm flex items-center"
                                title="Ignore application (no email sent)"
                              >
                                <UserMinus className="w-4 h-4 mr-1" />
                                Ignore
                              </button>
                              <button
                                onClick={() => openCompleteConfirmation(app)}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm flex items-center"
                                title="Mark as Completed"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Mark as Completed
                              </button>
                            </>
                          )}
                          
                          {(app.status === "Rejected" || app.status === "Ignored") && (
                            <>
                              {/* No additional action buttons for rejected or ignored applications */}
                            </>
                          )}
                          
                          {/* Delete button is always available */}
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
                  ))}
                </div>
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

      {/* Application Details Modal */}
      {showApplicationModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <FileText className="w-6 h-6" />
                Application Details
              </h2>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Candidate Details */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <UserCheck className="w-5 h-5 mr-2 text-orange-600" />
                  Candidate Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{selectedApplication.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{selectedApplication.phone || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{selectedApplication.dob || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium">{selectedApplication.gender || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Position Applied</p>
                    <p className="font-medium">{selectedApplication.position || selectedApplication.jobId?.title || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-orange-600" />
                  Professional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Current Position</p>
                    <p className="font-medium">{selectedApplication.currentPosition || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Current Company</p>
                    <p className="font-medium">{selectedApplication.currentCompany || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Experience</p>
                    <p className="font-medium">{selectedApplication.totalExperience || "N/A"}</p>
                  </div>
                </div>
                
                {selectedApplication.skills && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Technical Skills</p>
                    <p className="font-medium">{selectedApplication.skills}</p>
                  </div>
                )}
                
                {selectedApplication.expertise && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Areas of Expertise</p>
                    <p className="font-medium">{selectedApplication.expertise}</p>
                  </div>
                )}
              </div>

              {/* Education & Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedApplication.education && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <School className="w-5 h-5 mr-2 text-orange-600" />
                      Education
                    </h3>
                    <p className="font-medium">{selectedApplication.education}</p>
                  </div>
                )}
                
                {selectedApplication.experience && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <Briefcase className="w-5 h-5 mr-2 text-orange-600" />
                      Work Experience
                    </h3>
                    <p className="font-medium">{selectedApplication.experience}</p>
                  </div>
                )}
              </div>

              {/* Links */}
              {(selectedApplication.portfolio || selectedApplication.github || selectedApplication.linkedin) && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <LinkIcon className="w-5 h-5 mr-2 text-orange-600" />
                    Additional Links
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {selectedApplication.portfolio && (
                      <a 
                        href={selectedApplication.portfolio} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:underline"
                      >
                        <LinkIcon className="w-4 h-4 mr-1" />
                        Portfolio
                      </a>
                    )}
                    {selectedApplication.github && (
                      <a 
                        href={selectedApplication.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:underline"
                      >
                        <LinkIcon className="w-4 h-4 mr-1" />
                        GitHub
                      </a>
                    )}
                    {selectedApplication.linkedin && (
                      <a 
                        href={selectedApplication.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:underline"
                      >
                        <LinkIcon className="w-4 h-4 mr-1" />
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Resume */}
              {selectedApplication.resume && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-orange-600" />
                    Resume
                  </h3>
                  <a
                    href={`${API_URL.replace("/api", "")}${selectedApplication.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    View/Download Resume
                  </a>
                </div>
              )}

              {/* Cover Letter */}
              {selectedApplication.message && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-orange-600" />
                    Cover Letter
                  </h3>
                  <p className="font-medium whitespace-pre-wrap">{selectedApplication.message}</p>
                </div>
              )}

              {/* Declaration */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-orange-600" />
                  Declaration
                </h3>
                <p className="font-medium">
                  {selectedApplication.message ? "Agreed" : "Not Agreed"}
                </p>
              </div>

              {/* Admin Notes */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Edit3 className="w-5 h-5 mr-2 text-orange-600" />
                  Admin Notes
                </h3>
                <textarea
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="Add your note here..."
                  className="w-full min-h-[100px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Close
                </button>
                {selectedApplication.status !== "Shortlisted" && (
                  <button
                    onClick={() => updateApplicationStatus(selectedApplication._id, "Shortlisted", adminNote)}
                    className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center"
                  >
                    <UserCheck className="w-4 h-4 mr-2" />
                    Shortlist
                  </button>
                )}
                {selectedApplication.status !== "Rejected" && (
                  <button
                    onClick={() => updateApplicationStatus(selectedApplication._id, "Rejected", adminNote)}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold flex items-center"
                  >
                    <UserX className="w-4 h-4 mr-2" />
                    Reject
                  </button>
                )}
                {selectedApplication.status !== "Ignored" && (
                  <button
                    onClick={() => updateApplicationStatus(selectedApplication._id, "Ignored", adminNote)}
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold flex items-center"
                  >
                    <UserMinus className="w-4 h-4 mr-2" />
                    Ignore
                  </button>
                )}
                {selectedApplication.status === "Shortlisted" && (
                  <button
                    onClick={() => openInterviewModal()}
                    className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-semibold flex items-center"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Interview
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interview Scheduling Modal */}
      {showInterviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Schedule Interview
              </h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Interview Date
                </label>
                <input
                  type="date"
                  value={interviewDetails.date}
                  onChange={(e) => setInterviewDetails({...interviewDetails, date: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Interview Time
                </label>
                <input
                  type="time"
                  value={interviewDetails.time}
                  onChange={(e) => setInterviewDetails({...interviewDetails, time: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Meeting Link or Location
                </label>
                <input
                  type="text"
                  value={interviewDetails.meetingLink}
                  onChange={(e) => setInterviewDetails({...interviewDetails, meetingLink: e.target.value})}
                  placeholder="e.g., https://meet.google.com/xxx or Office Address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Comments / Notes
                </label>
                <textarea
                  value={interviewDetails.comments}
                  onChange={(e) => setInterviewDetails({...interviewDetails, comments: e.target.value})}
                  placeholder="Additional notes for the interview..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowInterviewModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Validate required fields before scheduling
                    if (!interviewDetails.date) {
                      alert("Please select an interview date");
                      return;
                    }
                    
                    if (!interviewDetails.time) {
                      alert("Please select an interview time");
                      return;
                    }
                    
                    // Use the selected application ID if available
                    const appId = selectedApplication?._id;
                    if (appId) {
                      scheduleInterview(appId);
                    }
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg font-semibold"
                  disabled={!selectedApplication?._id}
                >
                  Schedule Interview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Complete Confirmation Modal */}
      {showCompleteConfirmation && applicationToComplete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                Confirm Completion
              </h2>
            </div>
            
            <div className="p-6 space-y-4">
              <p className="text-gray-700">
                Are you sure you want to mark this application as <strong>Completed</strong>?
              </p>
              <p className="text-gray-700">
                Once marked, the candidate will be notified that they've been selected for the position.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Applicant: <strong>{applicationToComplete.name}</strong></p>
                <p className="text-sm text-gray-600">Position: <strong>{applicationToComplete.position || applicationToComplete.jobId?.title || "N/A"}</strong></p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowCompleteConfirmation(false);
                    setApplicationToComplete(null);
                  }}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  ❌ Cancel
                </button>
                <button
                  onClick={() => markAsCompleted(applicationToComplete._id)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg font-semibold"
                >
                  ✅ Yes, Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;