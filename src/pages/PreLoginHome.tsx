import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Briefcase, CheckCircle, ArrowRight } from "lucide-react";
import { useEffect } from "react";

const PreLoginHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-blue-900/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo and Brand */}
          <div className="mb-8 flex justify-center">
            <div className="bg-white/10 backdrop-blur-md rounded-full p-6 border-2 border-white/20">
              <Briefcase className="w-16 h-16 text-orange-500" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Welcome to
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400">
              SYNNECTIFY Careers
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join our innovative team and build your career with exciting
            opportunities in technology and innovation.
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center space-x-2 text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Remote Work Options</span>
            </div>
            <div className="flex items-center space-x-2 text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Competitive Salaries</span>
            </div>
            <div className="flex items-center space-x-2 text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Growth Opportunities</span>
            </div>
          </div>

          {/* Login Button - Centered and Prominent */}
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={handleLogin}
              className="group relative inline-flex items-center justify-center px-12 py-5 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-2xl hover:shadow-orange-500/50 hover:scale-105"
            >
              <svg
                className="w-6 h-6 mr-3"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="white"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="white"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="white"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="white"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-sm text-gray-300 max-w-md">
              Sign in with your Gmail account to explore job openings, apply for
              positions, and track your applications.
            </p>
          </div>

          {/* Additional Info */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <h3 className="text-3xl font-bold text-orange-400 mb-2">50+</h3>
              <p className="text-gray-300">Happy Employees</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <h3 className="text-3xl font-bold text-orange-400 mb-2">200+</h3>
              <p className="text-gray-300">Projects Completed</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <h3 className="text-3xl font-bold text-orange-400 mb-2">5+</h3>
              <p className="text-gray-300">Open Positions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-5">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            fill="rgba(255,255,255,0.05)"
          />
        </svg>
      </div>
    </div>
  );
};

export default PreLoginHome;
