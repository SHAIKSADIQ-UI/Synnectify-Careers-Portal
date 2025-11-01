import {} from 'react-router-dom';
import {  
  Users, 
  Target, 
  Award, 
  Lightbulb,
  Heart,
  Globe,
  Zap,
  Shield,
  
} from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We constantly explore new technologies and methodologies to deliver cutting-edge solutions.'
    },
    {
      icon: Heart,
      title: 'Client-Centric',
      description: 'Your success is our priority. We build lasting partnerships through exceptional service.'
    },
    {
      icon: Shield,
      title: 'Quality',
      description: 'We maintain the highest standards in every project, ensuring reliable and robust solutions.'
    },
    {
      icon: Globe,
      title: 'Global Perspective',
      description: 'We bring international best practices to local markets, thinking globally while acting locally.'
    }
  ];

  // const team = [
  //   {
  //     name: 'Arjun Reddy',
  //     role: 'Founder & CEO',
  //     image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  //     description: 'Visionary leader with 10+ years in technology and business strategy.'
  //   },
  //   {
  //     name: 'Sneha Patel',
  //     role: 'CTO',
  //     image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  //     description: 'Technical expert specializing in scalable architecture and emerging technologies.'
  //   },
  //   {
  //     name: 'Vikram Singh',
  //     role: 'Head of Design',
  //     image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  //     description: 'Creative director with expertise in user experience and visual design.'
  //   },
  //   {
  //     name: 'Kavya Sharma',
  //     role: 'Project Manager',
  //     image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  //     description: 'Agile expert ensuring smooth project delivery and client satisfaction.'
  //   }
  // ];

  // const milestones = [
  //   {
  //     year: '2020',
  //     title: 'Company Founded',
  //     description: 'Started with a vision to transform businesses through technology'
  //   },
  //   {
  //     year: '2021',
  //     title: 'First Major Client',
  //     description: 'Delivered our first enterprise-level solution'
  //   },
  //   {
  //     year: '2022',
  //     title: '50+ Projects',
  //     description: 'Reached milestone of 50 successful project deliveries'
  //   },
  //   {
  //     year: '2023',
  //     title: 'Team Expansion',
  //     description: 'Grew to a team of 25+ talented professionals'
  //   },
  //   {
  //     year: '2024',
  //     title: 'Industry Recognition',
  //     description: 'Received awards for innovation and client satisfaction'
  //   }
  // ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#5c5a5a] via-gray-900 to-[#5c5a5a] text-white py-20">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Team collaboration"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400">SYNNECTIFY</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            We are a passionate team of innovators, designers, and developers dedicated to transforming businesses through cutting-edge technology solutions.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Founded in 2020, SYNNECTIFY emerged from a simple yet powerful vision: to bridge the gap between innovative technology and business success. We started as a small team of passionate technologists who believed that every business, regardless of size, deserves access to world-class digital solutions.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Today, we've grown into a trusted partner for businesses across various industries, helping them navigate digital transformation with confidence. Our journey has been marked by continuous learning, adaptation, and an unwavering commitment to excellence.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600 mb-2">200+</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
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

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl mb-6">
                <Target className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To empower businesses with innovative technology solutions that drive growth, enhance efficiency, and create meaningful digital experiences. We strive to be the catalyst that transforms ideas into successful digital realities.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl mb-6">
                <Lightbulb className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be the leading technology partner that businesses trust for their digital transformation journey. We envision a future where technology seamlessly integrates with business objectives to create sustainable competitive advantages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape our culture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The talented individuals who make SYNNECTIFY a success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-orange-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Key milestones that have shaped our growth and success
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                      <div className="text-2xl font-bold text-orange-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10 w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>  */}

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose SYNNECTIFY?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              What sets us apart in the competitive technology landscape
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg mb-4">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Proven Expertise</h3>
              <p className="text-gray-600">200+ successful projects across diverse industries with cutting-edge technology solutions.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg mb-4">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Dedicated Team</h3>
              <p className="text-gray-600">Experienced professionals committed to delivering exceptional results and ongoing support.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg mb-4">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Agile Approach</h3>
              <p className="text-gray-600">Fast, flexible development process that adapts to your changing business needs.</p>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default AboutPage;