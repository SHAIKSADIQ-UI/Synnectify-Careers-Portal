import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ArrowRight,
  MapPin,
  Clock,
  Users,
  Briefcase,
  Heart,
  Lightbulb,
  Target,
  Award,
  CheckCircle,
  Send,
  DollarSign,
  Globe,
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

const CareersPage = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [userApplications, setUserApplications] = useState<any[]>([]); // ✅ Add state for user applications
  const navigate = useNavigate();
  const { user, loginWithGoogle } = useAuth();

  useEffect(() => {
    fetchJobs();
    if (user) {
      fetchUserApplications(); // ✅ Fetch user applications when user is available
    }
  }, [user]);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${API_URL}/jobs`);
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch user's applications to check for duplicates
  const fetchUserApplications = async () => {
    if (!user) return;
    
    try {
      const response = await fetch(`${API_URL}/applications?email=${encodeURIComponent(user.email)}`);
      if (response.ok) {
        const data = await response.json();
        setUserApplications(data);
      }
    } catch (error) {
      console.error("Error fetching user applications:", error);
    }
  };

  const handleApplyClick = async (jobId: string, jobTitle: string) => {
    // ✅ Check if user has already applied for this job
    const hasApplied = userApplications.some(app => 
      app.jobId && app.jobId._id === jobId
    );
    
    if (hasApplied) {
      alert("You have already applied for this position.");
      return;
    }

    if (user) {
      navigate("/apply", { state: { jobId, position: jobTitle } });
      return;
    }

    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  };

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs",
    },
    {
      icon: Lightbulb,
      title: "Learning & Development",
      description: "Continuous learning opportunities and skill development",
    },
    {
      icon: Users,
      title: "Team Culture",
      description: "Collaborative and inclusive work environment",
    },
    {
      icon: Globe,
      title: "Remote Flexibility",
      description: "Hybrid work options and flexible schedules",
    },
    {
      icon: Award,
      title: "Recognition",
      description: "Performance-based rewards and recognition programs",
    },
    {
      icon: Target,
      title: "Growth Opportunities",
      description: "Clear career progression and leadership opportunities",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-20">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Team collaboration"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Join Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400">
              Team
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Build your career with SYNNECTIFY and be part of a team that's
            shaping the future of technology.
          </p>
          <a
            href="#openings"
            className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 inline-flex items-center justify-center group"
          >
            View Open Positions
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Work With Us?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We believe in creating an environment where talent thrives and
              innovation flourishes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-100 to-blue-100 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                  <b.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{b.title}</h3>
                <p className="text-gray-600 leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="openings" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Current Openings
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore exciting career opportunities
            </p>
          </div>

          <div className="space-y-6">
            {jobs.length === 0 ? (
              <div className="text-center py-12 text-gray-600">
                <p>No job openings available at the moment. Check back soon!</p>
              </div>
            ) : (
              jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
                        {job.department && (
                          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                            {job.department}
                          </span>
                        )}
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed">{job.description}</p>

                      <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-6">
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

                      {selectedJob === job._id && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {job.requirements && job.requirements.length > 0 && (
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h4>
                                <ul className="space-y-2">
                                  {job.requirements.map((r, i) => (
                                    <li key={i} className="flex items-start space-x-2">
                                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span className="text-gray-600 text-sm">{r}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {job.responsibilities && job.responsibilities.length > 0 && (
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Responsibilities</h4>
                                <ul className="space-y-2">
                                  {job.responsibilities.map((r, i) => (
                                    <li key={i} className="flex items-start space-x-2">
                                      <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                      <span className="text-gray-600 text-sm">{r}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 mt-6 lg:mt-0 lg:ml-8">
                      <button
                        onClick={() =>
                          setSelectedJob(selectedJob === job._id ? null : job._id)
                        }
                        className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                      >
                        {selectedJob === job._id ? "Hide Details" : "View Details"}
                      </button>
                      <button
                        onClick={() => handleApplyClick(job._id, job.title)}
                        className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 font-medium flex items-center justify-center"
                      >
                        Apply Now
                        <Send className="ml-2 w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Culture
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                At SYNNECTIFY, we foster a culture of innovation, collaboration, and continuous learning.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                  <span className="text-gray-600 text-base">
                    Collaborative and inclusive environment
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                  <span className="text-gray-600 text-base">
                    Continuous learning and development
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                  <span className="text-gray-600 text-base">
                    Work-life balance and flexibility
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                  <span className="text-gray-600 text-base">
                    Innovation and creativity encouraged
                  </span>
                </div>
              </div>
            </div>
            <div className="relative h-full min-h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Team working together"
                className="rounded-lg shadow-2xl w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
