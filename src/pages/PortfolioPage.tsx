import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, CheckCircle } from "lucide-react";

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "JRavah Foods",
      category: "web",
      client: "JRavah Foods",
      image:
        "https://i.ibb.co/sJPc8w0G/520a6aad-269e-4179-a7fb-b4e0028e2e55.jpg",
      description:
        "Online food store offering fresh products, secure checkout, fast delivery, and easy order tracking.",
      technologies: ["HTML/CSS", "JavaScript", "Bootstrap", "API Integration"],
      results: [
        "300% faster load times",
        "150% increase in conversions",
        "99.9% uptime",
      ],
      liveUrl: "https://jravahfoods.com/index.html",
      featured: true,
    },
    {
      id: 2,
      title: "Odcet",
      category: "mobile",
      client: "Odcet",
      image:
        "https://i.ibb.co/cSqGf7q5/a6b8c92f-e169-4cdc-9f47-e1a0c0392024.jpg",
      description:
        "Engineering consulting firm offering design, project management, and innovative technical solutions.",
      technologies: ["React Native", "Firebase", "WebRTC", "Techical"],
      results: ["100K+ downloads", "4.8 star rating", "HIPAA compliant"],
      liveUrl: "https://www.odcet.com/",
      featured: true,
    },
    {
      id: 3,
      title: "Guardian Home Care",
      category: "web",
      client: "Guardian Home Care",
      image:
        "https://i.ibb.co/sJmWtZDY/3a6e7d13-8736-4407-b191-30b1d5c5aff5.jpg",
      description:
        "Compassionate home care services, skilled nursing, personal assistance, and senior health support.",
      technologies: ["Vue.js", "Python", "PostgreSQL", "D3.js", "Docker"],
      results: [
        "Real-time data processing",
        "Advanced analytics",
        "Secure transactions",
      ],
      liveUrl: "https://guardianhomecare.net/index.html",
      featured: false,
    },
    {
      id: 4,
      title: "Rudraa Tech",
      category: "design",
      client: "Rudraa",
      image:
        "https://i.ibb.co/svf7X3gQ/3acf8cff-0a72-4930-a256-768fda54138c.jpg",
      description:
        "Creative branding agency delivering design, brand strategy, and digital marketing for business growth.",
      technologies: [
        "Cloud Computing",
        "AWS",
        "Microsoft Azure",
        "DevOps Tools",
        "React.js",
        "Node.js",
      ],
      results: [
        "Brand recognition increased",
        "Consistent visual identity",
        "Market positioning improved",
      ],
      liveUrl: "https://rudraatech.com/",
      featured: false,
    },
    {
      id: 5,
      title: "Synnectify Technologies",
      category: "mobile",
      client: "Synnectify",
      image: "https://i.ibb.co/Xkrd5N1J/image.png",
      description:
        "Innovative tech solutions for business growth, digital transformation, and superior user experience.",
      technologies: [
        "React.js",
        "TypeScript",
        "Google Maps API",
        "Tailwind CSS",
        "Node.js",
        "Vite.js",
        "PostCSS",
      ],
      results: [
        "50K+ active users",
        "Real-time tracking",
        "Multi-browser support",
      ],
      liveUrl: "#",
      featured: true,
    },
    {
      id: 6,
      title: "Global Interworks Solutions",
      category: "web",
      client: "Global Interworks Solutions",
      image:
        "https://i.ibb.co/Z6wCYJ3F/ba6bd06b-5bf8-4cad-80c2-c30ee33f8a61.jpg",
      description:
        "Online training platform with video courses, skill assessments, progress tracking, and certifications.",
      technologies: ["React", "Node.js", "MongoDB", "Video.js", "Socket.io"],
      results: [
        "10K+ students enrolled",
        "Interactive learning",
        "Progress analytics",
      ],
      liveUrl: "https://gissllc.com/",
      featured: false,
    },
    {
      id: 7,
      title: "Synnectify Solutions PVT LTD",
      category: "marketing",
      client: "Synnectify",
      image: "https://i.ibb.co/DTX51b6/1fb42c03-d54b-458c-8cd8-1779bbf49abe.jpg",
      description: "IT solutions provider offering web development, cloud services, mobile apps, and digital marketing.",
      technologies: [
          'Web Development Frameworks',
          'Cloud Platforms',
          'Mobile App Development',
          'API Integration',
          'DevOps Tools',
          'UI/UX Design',
          'Digital Marketing Tools'
      ],
      results: [
          'Accelerated project delivery',
          'Improved client ROI',
          'Enhanced digital presence',
          'Seamless cloud migration',
          'Increased user engagement',
          'Optimized business processes'
      ],
      liveUrl: "https:///",
      featured: false,
    },
    {
      id: 8,
      title: "Photography",
      category: "photo",
      client: "Photoshopy",
      image: "https://media.istockphoto.com/id/1200700846/photo/selective-focus-of-photographer-taking-photo-of-model-and-hairstylist.jpg?b=1&s=612x612&w=0&k=20&c=IEZpsgLhnGfuOTUh2Pb0GrFMbhwN1qgAFS9fBxKIJmk=",
      description:
        "Photography captures moments, tells stories, and preserves memories through creative visual expression",
      technologies: [
        "Adobe Photoshop",
        "Adobe Lightroom",
        "Canon EOS R5",
        "Nikon Z7 II",
        "DJI Mavic Air 2",
        "Capture One",
        "SmugMug",
      ],
      results: [
        "500+ high-quality images delivered",
        "Client satisfaction rate 98%",
        "Faster photo turnaround time",
      ],
      liveUrl: "#",
      featured: false,
    },
    {
      id: 9,
      title: "Renaissance Finicial Services",
      category: "design",
      client: "Renaissance",
      image:
        "https://i.ibb.co/FftVfCv/f4d0df8e-0b95-46d8-9f42-56707bb583e2.jpg",
      description:
        "Creative branding agency delivering design, brand strategy, and digital marketing for business growth.",
      technologies: [
        "CRM Platforms",
        "Secure Payment Gateways",
        "API Integration",
        "Data Encryption",
      ],
      results: [
        "Faster policy processing",
        "Improved customer retention",
        "Enhanced data security",
        "Increased online applications",
      ],
      liveUrl: "https://bestinsurancedeal.net/",
      featured: false,
    },
    {
      id: 10,
      title: "Intelli Desk",
      category: "design",
      client: "IntelliDesk",
      image:
        "https://i.ibb.co/Q3sR9g9v/21433b34-f78a-402e-9f36-fd3f9c9f9f6d.jpg",
      description:
        "Online tax filing platform with secure e-filing, refund tracking, expert support, and data protection.",
      technologies: [
        "E-filing Systems",
        "SSL Encryption",
        "User Authentication",
        "Cloud Storage",
        "Automated Tax Calculators",
        "Customer Support Chatbots",
        "Data Backup Solutions",
      ],
      results: [
        'Faster tax return processing',
        'Increased user satisfaction',
        'Enhanced data security',
        'Reduced filing errors',
        'Higher refund accuracy',
        '24/7 customer support'
      ],
      liveUrl: "https://myonlinetaxreturn.com/index.html",
      featured: false,
    },
    {
      id: 11,
      title: "JRavah Foods",
      category: "marketing",
      client: "JRavah Foods",
      image:
        "https://i.ibb.co/sJPc8w0G/520a6aad-269e-4179-a7fb-b4e0028e2e55.jpg",
      description: "Organic mushroom farming brand delivering fresh, pure, and quality produce across Telugu states.",
      technologies: ["HTML/CSS", "JavaScript", "Bootstrap", "API Integration"],
      results: [
        'Expanded market reach',
        'Consistent product quality',
        'Faster delivery times',
        'Increased customer trust',
        'Higher yield per harvest'
      ],
      liveUrl: "https://jravahfoods.com/index.html",
      featured: false,
    },
    {
      id: 12,
      title: "OneDay Co Working Labs",
      category: "design",
      client: "OneDay",
      image: "https://i.ibb.co/vWmSq6X/image.png",
      description: "Affordable coworking space with fast internet, conference room, and lounge at ONEDAY Co Working Labs.",
      technologies: [
            'High-Speed WiFi',
            'Access Control Systems',
            'Video Conferencing',
            'Smart Lighting',
            'Cloud Printing',
            'Online Booking Platform',
            'Security Cameras'
      ],
      results: [
          'Increased workspace productivity',
          'Seamless meeting experiences',
          'Enhanced member satisfaction',
          'Efficient space utilization',
          'Improved security and access',
          'Faster internet connectivity'
      ],
      liveUrl: "https://www.odcwl.com/",
      featured: false,
    }
  ];

  const categories = [
    { name: "All Projects", value: "all", count: projects.length },
    {
      name: "Web Development",
      value: "web",
      count: projects.filter((p) => p.category === "web").length,
    },
    {
      name: "Mobile Apps",
      value: "mobile",
      count: projects.filter((p) => p.category === "mobile").length,
    },
    {
      name: "UI/UX Design",
      value: "design",
      count: projects.filter((p) => p.category === "design").length,
    },
    {
      name: "Digital Marketing",
      value: "marketing",
      count: projects.filter((p) => p.category === "marketing").length,
    },
    {
      name: "Photography",
      value: "photo",
      count: projects.filter((p) => p.category === "photo").length,
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-20">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Portfolio showcase"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400">
              Portfolio
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore our collection of successful projects that showcase our
            expertise in delivering innovative technology solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 inline-flex items-center justify-center group"
            >
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Highlighting some of our most successful and innovative projects
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl text-justify border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group hover:scale-102 hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                  <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                    {project.client}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Technologies:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Results:
                    </h4>
                    <ul className="space-y-1">
                      {project.results.map((result, idx) => (
                        <li
                          key={idx}
                          className="flex items-center space-x-2 text-sm text-gray-600"
                        >
                          <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={project.liveUrl}
                      className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 text-center text-sm font-medium flex items-center justify-center"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Browse through our complete portfolio of successful projects
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setActiveFilter(category.value)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeFilter === category.value
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl text-justify border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group hover:scale-102 hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                    {project.client}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={project.liveUrl}
                      className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 text-center text-sm font-medium flex items-center justify-center"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
