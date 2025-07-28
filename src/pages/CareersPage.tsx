import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const CareersPage = () => {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const navigate = useNavigate();

  const jobOpenings = [
    {
      id: 1,
      title: "Senior React Developer",
      department: "Engineering",
      location: "Vijayawada, AP",
      type: "Full-time",
      experience: "3-5 years",
      salary: "₹8-15 LPA",
      description:
        "We are looking for a skilled React Developer to join our frontend team and build amazing user experiences.",
      requirements: [
        "3+ years of experience with React.js",
        "Strong knowledge of JavaScript, HTML5, CSS3",
        "Experience with Redux, Context API",
        "Familiarity with RESTful APIs",
        "Knowledge of Git version control",
        "Experience with responsive design",
      ],
      responsibilities: [
        "Develop user-facing features using React.js",
        "Build reusable components and libraries",
        "Optimize applications for maximum speed",
        "Collaborate with design and backend teams",
        "Participate in code reviews",
        "Stay updated with latest React trends",
      ],
    },
    {
      id: 2,
      title: "UI/UX Designer",
      department: "Design",
      location: "Vijayawada, AP",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₹6-12 LPA",
      description:
        "Join our design team to create beautiful and intuitive user interfaces that delight our clients.",
      requirements: [
        "2+ years of UI/UX design experience",
        "Proficiency in Figma, Adobe XD, Sketch",
        "Strong portfolio showcasing design skills",
        "Understanding of user-centered design",
        "Knowledge of design systems",
        "Experience with prototyping tools",
      ],
      responsibilities: [
        "Create wireframes and prototypes",
        "Design user interfaces for web and mobile",
        "Conduct user research and testing",
        "Collaborate with development teams",
        "Maintain design systems",
        "Present design concepts to clients",
      ],
    },
    {
      id: 3,
      title: "Node.js Backend Developer",
      department: "Engineering",
      location: "Vijayawada, AP",
      type: "Full-time",
      experience: "2-5 years",
      salary: "₹7-14 LPA",
      description:
        "Build scalable backend systems and APIs that power our applications and serve millions of users.",
      requirements: [
        "2+ years of Node.js development",
        "Experience with Express.js framework",
        "Knowledge of MongoDB, PostgreSQL",
        "Understanding of RESTful API design",
        "Experience with cloud platforms (AWS/Azure)",
        "Familiarity with Docker and microservices",
      ],
      responsibilities: [
        "Develop and maintain backend services",
        "Design and implement APIs",
        "Optimize database performance",
        "Implement security best practices",
        "Deploy applications to cloud platforms",
        "Monitor and troubleshoot production issues",
      ],
    },
    {
      id: 4,
      title: "Digital Marketing Specialist",
      department: "Marketing",
      location: "Vijayawada, AP",
      type: "Full-time",
      experience: "1-3 years",
      salary: "₹4-8 LPA",
      description:
        "Drive our digital marketing efforts and help clients achieve their marketing goals through innovative strategies.",
      requirements: [
        "1+ years of digital marketing experience",
        "Knowledge of SEO, SEM, social media marketing",
        "Experience with Google Ads, Facebook Ads",
        "Understanding of analytics tools",
        "Content creation and copywriting skills",
        "Certification in Google Analytics preferred",
      ],
      responsibilities: [
        "Develop digital marketing strategies",
        "Manage social media campaigns",
        "Create and optimize ad campaigns",
        "Analyze campaign performance",
        "Generate marketing reports",
        "Stay updated with marketing trends",
      ],
    },
    {
      id: 5,
      title: "Project Manager",
      department: "Operations",
      location: "Vijayawada, AP",
      type: "Full-time",
      experience: "3-6 years",
      salary: "₹10-18 LPA",
      description:
        "Lead project teams and ensure successful delivery of client projects on time and within budget.",
      requirements: [
        "3+ years of project management experience",
        "PMP or Agile certification preferred",
        "Experience with project management tools",
        "Strong communication and leadership skills",
        "Knowledge of software development lifecycle",
        "Experience in IT services industry",
      ],
      responsibilities: [
        "Plan and execute project timelines",
        "Coordinate with cross-functional teams",
        "Manage client relationships",
        "Monitor project progress and budgets",
        "Identify and mitigate risks",
        "Ensure quality deliverables",
      ],
    },
  ];

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

  const handleApply = (jobTitle: string) => {
    navigate("/apply", { state: { position: jobTitle } });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
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
            shaping the future of technology. We offer exciting opportunities
            for growth and innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#openings"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 inline-flex items-center justify-center group"
            >
              View Open Positions
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
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
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-100 to-blue-100 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section id="openings" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Current Openings
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore exciting career opportunities and find the perfect role
              for your skills and aspirations
            </p>
          </div>

          <div className="space-y-6">
            {jobOpenings.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {job.title}
                      </h3>
                      <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                        {job.department}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-6">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Briefcase className="w-4 h-4" />
                        <span>{job.experience}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4" />
                        <span>{job.salary}</span>
                      </div>
                    </div>

                    {selectedJob === job.id && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">
                              Requirements
                            </h4>
                            <ul className="space-y-2">
                              {job.requirements.map((req, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start space-x-2"
                                >
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-600 text-sm">
                                    {req}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">
                              Responsibilities
                            </h4>
                            <ul className="space-y-2">
                              {job.responsibilities.map((resp, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start space-x-2"
                                >
                                  <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-600 text-sm">
                                    {resp}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3 mt-6 lg:mt-0 lg:ml-8">
                    <button
                      onClick={() =>
                        setSelectedJob(selectedJob === job.id ? null : job.id)
                      }
                      className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      {selectedJob === job.id ? "Hide Details" : "View Details"}
                    </button>
                    <button
                      onClick={() => handleApply(job.title)}
                      className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 font-medium flex items-center justify-center"
                    >
                      Apply Now
                      <Send className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Culture
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                At SYNNECTIFY, we foster a culture of innovation, collaboration,
                and continuous learning. We believe that great work comes from
                great teams, and we're committed to creating an environment
                where everyone can thrive.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-orange-500" />
                  <span className="text-gray-700">
                    Collaborative and inclusive environment
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-orange-500" />
                  <span className="text-gray-700">
                    Continuous learning and development
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-orange-500" />
                  <span className="text-gray-700">
                    Work-life balance and flexibility
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-orange-500" />
                  <span className="text-gray-700">
                    Innovation and creativity encouraged
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Team working together"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join Our Team?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Don't see a position that fits? We're always looking for talented
            individuals. Send us your resume and let's talk!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/apply"
              className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center justify-center group"
            >
              Send Your Resume
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=hr@synnectify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              Contact HR
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
