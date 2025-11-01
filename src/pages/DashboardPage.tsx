// src/pages/DashboardPage.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Send,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Home as HomeIcon,
  Info,
  Briefcase as PortfolioIcon,
  Mail,
  Users,
  Settings,
  Menu,
  X,
  Circle,
  Calendar,
  UserCheck,
  UserX,
} from "lucide-react";
import UserProfile from "../components/UserProfile";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface Application {
  _id?: string; // From database
  position?: string; // Position name stored directly
  submittedAt: string;
  status?: string;
  appliedAt?: string; // From database
  jobId?: {
    _id: string;
    title: string;
  }; // Populated job reference
}

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
}

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [apps, setApps] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // ✅ Add mobile menu state

  const fetchApplications = async () => {
    if (!user) return;
    
    try {
      const response = await fetch(`${API_URL}/applications?email=${encodeURIComponent(user.email)}`);
      if (response.ok) {
        const data = await response.json();
        setApps(data);
        console.log('✅ Fetched applications:', data);
        // ✅ Also update localStorage with fresh data
        localStorage.setItem(`apps_${user.email}`, JSON.stringify(data));
      } else {
        console.error('Failed to fetch applications');
        // Fall back to localStorage if backend fails
        const localData: Application[] = JSON.parse(
          localStorage.getItem(`apps_${user.email}`) || "[]"
        );
        setApps(localData.reverse());
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      // Fall back to localStorage on error
      const localData: Application[] = JSON.parse(
        localStorage.getItem(`apps_${user.email}`) || "[]"
      );
      setApps(localData.reverse());
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${API_URL}/jobs`);
      if (response.ok) {
        const jobData = await response.json();
        setJobs(jobData);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    
    // Fetch user's applications from the backend API
    fetchApplications();

    // Fetch job openings
    fetchJobs();
  }, [user]);

  const handleApply = (jobId: string, jobTitle: string) => {
    navigate("/apply", { state: { jobId, position: jobTitle } });
  };

  // Function to render timeline based on application status
  const renderTimeline = (status: string) => {
    // Don't show timeline for ignored applications
    if (status === "Ignored") return null;

    const stages = [
      { id: "submitted", label: "Submitted", icon: Circle },
      { id: "viewed", label: "Viewed by HR", icon: Circle },
      { id: "shortlisted", label: "Shortlisted", icon: Circle },
      { id: "interview", label: "Interview Scheduled", icon: Circle },
      { id: "completed", label: "Completed", icon: Circle },
    ];

    // Determine which stages to highlight based on status
    let activeStages = [];
    if (status === "Pending") {
      activeStages = ["submitted"];
    } else if (status === "Shortlisted") {
      activeStages = ["submitted", "viewed", "shortlisted"];
    } else if (status === "Interview") {
      activeStages = ["submitted", "viewed", "shortlisted", "interview"];
    } else if (status === "Rejected") {
      activeStages = ["submitted", "viewed"];
    } else {
      // For completed or other statuses
      activeStages = ["submitted", "viewed", "shortlisted", "interview", "completed"];
    }

    return (
      <div className="mt-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Application Timeline</h4>
        <div className="flex items-center">
          {stages.map((stage, index) => {
            const isActive = activeStages.includes(stage.id);
            
            return (
              <div key={stage.id} className="flex items-center">
                <div className={`flex flex-col items-center ${index < stages.length - 1 ? "mr-2" : ""}`}>
                  {isActive ? (
                    <CheckCircle 
                      className="w-5 h-5 text-green-500" 
                      fill="currentColor"
                    />
                  ) : (
                    <Circle 
                      className="w-5 h-5 text-gray-300" 
                      fill="none"
                    />
                  )}
                  <span className={`text-xs mt-1 ${isActive ? "text-green-600 font-medium" : "text-gray-500"}`}>
                    {stage.label}
                  </span>
                </div>
                {index < stages.length - 1 && (
                  <div className={`h-0.5 w-8 ${isActive ? "bg-green-500" : "bg-gray-200"}`}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header with Navigation */}
      <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="SYNNECTIFY Logo" className="w-10 h-10" />
              <span className="text-2xl font-extrabold text-white">
                SYNNECTIFY
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-300 hover:text-orange-500 transition-colors font-medium flex items-center space-x-1"
              >
                <HomeIcon className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link
                to="/about"
                className="text-gray-300 hover:text-orange-500 transition-colors font-medium flex items-center space-x-1"
              >
                <Info className="w-4 h-4" />
                <span>About</span>
              </Link>
              <Link
                to="/portfolio"
                className="text-gray-300 hover:text-orange-500 transition-colors font-medium flex items-center space-x-1"
              >
                <PortfolioIcon className="w-4 h-4" />
                <span>Portfolio</span>
              </Link>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-orange-500 transition-colors font-medium flex items-center space-x-1"
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </Link>
              <Link
                to="/careers"
                className="text-gray-300 hover:text-orange-500 transition-colors font-medium flex items-center space-x-1"
              >
                <Users className="w-4 h-4" />
                <span>Careers</span>
              </Link>
              <Link
                to="/services"
                className="text-gray-300 hover:text-orange-500 transition-colors font-medium flex items-center space-x-1"
              >
                <Settings className="w-4 h-4" />
                <span>Services</span>
              </Link>
              
              {/* User Profile */}
              {user && <UserProfile />}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              {/* User Profile on Mobile */}
              {user && <UserProfile />}
              {/* Hamburger Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-white hover:text-orange-500 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-700 py-4">
              <nav className="flex flex-col space-y-3">
                <Link
                  to="/"
                  className="text-gray-300 hover:text-orange-500 transition-colors font-medium flex items-center space-x-2 px-4 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <HomeIcon className="w-4 h-4" />
                  <span>Home</span>
                </Link>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-orange-500 transition-colors font-medium flex items-center space-x-2 px-4 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Info className="w-4 h-4" />
                  <span>About</span>
                </Link>
                <Link
                  to="/portfolio"
                  className="text-gray-300 hover:text-orange-500 transition-colors font-medium flex items-center space-x-2 px-4 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <PortfolioIcon className="w-4 h-4" />
                  <span>Portfolio</span>
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-orange-500 transition-colors font-medium flex items-center space-x-2 px-4 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact</span>
                </Link>
                <Link
                  to="/careers"
                  className="text-gray-300 hover:text-orange-500 transition-colors font-medium flex items-center space-x-2 px-4 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Users className="w-4 h-4" />
                  <span>Careers</span>
                </Link>
                <Link
                  to="/services"
                  className="text-gray-300 hover:text-orange-500 transition-colors font-medium flex items-center space-x-2 px-4 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Settings className="w-4 h-4" />
                  <span>Services</span>
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content with top padding for fixed header */}
      <div className="pt-20">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-orange-500 to-blue-500 rounded-xl p-8 mb-8 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome back, {user.name || user.email.split("@")[0]}!
            </h1>
            <p className="text-lg opacity-90">
              Explore job opportunities and manage your applications
            </p>
          </div>

          {/* My Applications Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              My Applications
            </h2>
            {apps.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  You haven't applied to any positions yet.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Browse the job openings below and apply to positions that match
                  your skills.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {apps.map((a, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-lg text-gray-900">
                        {a.position || a.jobId?.title || "Position Not Specified"}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          a.status === "Shortlisted"
                            ? "bg-green-100 text-green-700"
                            : a.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : a.status === "Interview"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {a.status || "Pending"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Applied on {new Date(a.appliedAt || a.submittedAt).toLocaleDateString()}
                    </p>
                    
                    {/* Timeline */}
                    {renderTimeline(a.status || "Pending")}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Job Openings Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Available Job Openings
            </h2>
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                <p className="text-gray-600 mt-4">Loading job openings...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                <p className="text-gray-600">
                  No job openings available at the moment.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Check back later for new opportunities!
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {jobs.map((job) => (
                  <div
                    key={job._id}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-gray-900">
                            {job.title}
                          </h3>
                          {job.department && (
                            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                              {job.department}
                            </span>
                          )}
                        </div>

                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>{job.type}</span>
                          </div>
                          {job.experience && (
                            <div className="flex items-center space-x-2">
                              <Briefcase className="w-4 h-4" />
                              <span>{job.experience}</span>
                            </div>
                          )}
                          {job.salary && (
                            <div className="flex items-center space-x-2">
                              <DollarSign className="w-4 h-4" />
                              <span>{job.salary}</span>
                            </div>
                          )}
                        </div>

                        {/* Job Details Section (Requirements & Responsibilities) */}
                        {selectedJobId === job._id && (
                          <div className="mt-6 pt-6 border-t-2 border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              {job.requirements && job.requirements.length > 0 && (
                                <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green-500">
                                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                    Requirements
                                  </h4>
                                  <ul className="space-y-3">
                                    {job.requirements.map((req, idx) => (
                                      <li key={idx} className="flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700 text-sm leading-relaxed">{req}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {job.responsibilities && job.responsibilities.length > 0 && (
                                <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-500">
                                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                    <CheckCircle className="w-5 h-5 text-blue-500 mr-2" />
                                    Responsibilities
                                  </h4>
                                  <ul className="space-y-3">
                                    {job.responsibilities.map((resp, idx) => (
                                      <li key={idx} className="flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700 text-sm leading-relaxed">{resp}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                            {(!job.requirements || job.requirements.length === 0) && 
                             (!job.responsibilities || job.responsibilities.length === 0) && (
                              <p className="text-gray-500 text-center py-4">No detailed information available for this position.</p>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-3 mt-6 lg:mt-0 lg:ml-8">
                        <button
                          onClick={() => setSelectedJobId(selectedJobId === job._id ? null : job._id)}
                          className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center"
                        >
                          {selectedJobId === job._id ? (
                            <>
                              <span>Hide Details</span>
                              <ChevronUp className="ml-2 w-4 h-4" />
                            </>
                          ) : (
                            <>
                              <span>View Details</span>
                              <ChevronDown className="ml-2 w-4 h-4" />
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleApply(job._id, job.title)}
                          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-all duration-300 font-medium flex items-center justify-center"
                        >
                          Apply Now
                          <Send className="ml-2 w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;