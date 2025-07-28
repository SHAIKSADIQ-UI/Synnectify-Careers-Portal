// // import { Link } from 'react-router-dom';
// // import { 
// //   ArrowRight, 
// //   CheckCircle, 
// //   Star, 
// //   Users, 
// //   Award, 
// //   TrendingUp,
// //   Palette,
// //   Code,
// //   Smartphone,
// //   Megaphone,
// //   Zap,
// //   Camera,
// //   Target
// // } from 'lucide-react';

// // const HomePage = () => {
// //   const services = [
// //     {
// //       icon: Palette,
// //       title: 'UI/UX Design',
// //       description: 'Creating intuitive and engaging user experiences that drive conversions.',
// //       features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design']
// //     },
// //     {
// //       icon: Code,
// //       title: 'Web Development',
// //       description: 'Custom web applications built with modern frameworks and best practices.',
// //       features: ['React/Angular/Vue', 'Node.js/Python', 'Responsive Design', 'API Integration']
// //     },
// //     {
// //       icon: Smartphone,
// //       title: 'Mobile Applications',
// //       description: 'Native and cross-platform mobile apps for iOS and Android.',
// //       features: ['React Native', 'Flutter', 'Native iOS/Android', 'App Store Deployment']
// //     },
// //     {
// //       icon: Megaphone,
// //       title: 'Digital Marketing',
// //       description: 'Data-driven marketing strategies to grow your online presence.',
// //       features: ['SEO/SEM', 'Social Media', 'Content Marketing', 'Analytics']
// //     },
// //     {
// //       icon: Target,
// //       title: 'Branding',
// //       description: 'Complete brand identity solutions that make your business stand out.',
// //       features: ['Logo Design', 'Brand Guidelines', 'Marketing Materials', 'Brand Strategy']
// //     },
// //     {
// //       icon: Camera,
// //       title: 'Photography',
// //       description: 'Scalable cloud infrastructure and deployment automation.',
// //       features: ['AWS/Azure/GCP', 'CI/CD Pipelines', 'Monitoring', 'Security']
// //     }
// //   ];

// //   const projects = [
// //     {
// //       title: 'E-commerce Platform',
// //       client: 'RetailTech',
// //       image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
// //       description: 'Complete e-commerce solution with modern design and seamless user experience.',
// //       technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
// //       results: ['300% faster load times', '150% increase in conversions', '99.9% uptime']
// //     },
// //     {
// //       title: 'Healthcare Mobile App',
// //       client: 'MedCare Solutions',
// //       image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
// //       description: 'Patient management app with telemedicine features and real-time monitoring.',
// //       technologies: ['React Native', 'Firebase', 'WebRTC', 'HealthKit'],
// //       results: ['50,000+ downloads', '4.8 star rating', 'HIPAA compliant']
// //     },
// //     {
// //       title: 'FinTech Dashboard',
// //       client: 'InvestPro',
// //       image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
// //       description: 'Real-time financial dashboard with advanced analytics and reporting.',
// //       technologies: ['Vue.js', 'Python', 'PostgreSQL', 'D3.js'],
// //       results: ['Real-time data processing', 'Advanced analytics', 'Secure transactions']
// //     }
// //   ];

// //   const testimonials = [
// //     {
// //       name: 'Rajesh Kumar',
// //       role: 'CEO, TechStart India',
// //       image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
// //       content: 'SYNNECTIFY transformed our digital presence completely. Their team delivered exceptional results that exceeded our expectations.',
// //       rating: 5,
// //       company: 'TechStart India'
// //     },
// //     {
// //       name: 'Priya Sharma',
// //       role: 'Founder, EcoSolutions',
// //       image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
// //       content: 'The mobile app they developed for us has been a game-changer. Professional, reliable, and innovative solutions.',
// //       rating: 5,
// //       company: 'EcoSolutions'
// //     },
// //     {
// //       name: 'Amit Patel',
// //       role: 'CTO, FinanceFlow',
// //       image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
// //       content: 'Outstanding technical expertise and project management. SYNNECTIFY delivered our complex platform on time and within budget.',
// //       rating: 5,
// //       company: 'FinanceFlow'
// //     }
// //   ];

// //   const techStack = [
// //     { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
// //     { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
// //     { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
// //     { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
// //     { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
// //     { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
// //     { name: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
// //     { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
// //     { name: 'Photography', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' }
// //   ];

// //   const stats = [
// //     { number: '200+', label: 'Projects Completed', icon: Award },
// //     { number: '50+', label: 'Happy Clients', icon: Users },
// //     { number: '99.9%', label: 'Uptime Guarantee', icon: TrendingUp },
// //     { number: '24/7', label: 'Support Available', icon: Zap }
// //   ];

// //   return (
// //     <div className="min-h-screen">
// //       {/* Hero Section */}
// //       <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-20 overflow-hidden min-h-screen flex items-center">
// //         {/* Background Video */}
// //         <video
// //           autoPlay
// //           loop
// //           muted
// //           playsInline
// //           className="absolute inset-0 w-full h-full object-cover opacity-100"
// //         >
// //           {/* Video */}
// //           <source src="/video.mov" type="video/mp4" />
// //         </video>
// //         <div className="absolute inset-0 "></div>
        
// //         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
// //               <div>
// //               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 items-center justify-center text-[#ffffff]">
// //                 Transform Your Business with
// //                 <span className="text-transparent bg-clip-text bg-gradient-to-r text-[#f58331] justify-center"> Innovative</span>
// //                 <br />
// //                 IT Solutions
// //               </h1>
// //               <p className="text-xl text-[#ffffff] mb-8 leading-relaxed justify-center">
// //                 We deliver cutting-edge technology solutions that drive growth, enhance user experience, and accelerate your digital transformation journey.
// //               </p>
// //               <div className="flex flex-col sm:flex-row gap-4 mb-8">
// //                 <Link
// //                   to="/services"
// //                   className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 text-center flex items-center justify-center group"
// //                 >
// //                   Explore Services
// //                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
// //                 </Link>
// //                 <Link
// //                   to="/contact"
// //                   className="border-2 border-[#48a6f8] text-black hover:text-[white] px-8 py-4 rounded-lg font-semibold hover:bg-[#48a6f8] transition-all duration-300 text-center"
// //                 >
// //                   Get Free Consultation
// //                 </Link>
// //               </div>
// //               <div className="flex items-center space-x-6 text-sm text-[white]">
// //                 <div className="flex items-center space-x-2">
// //                   <CheckCircle className="w-5 h-5 text-green-400" />
// //                   <span>24/7 Support</span>
// //                 </div>
// //                 <div className="flex items-center space-x-2">
// //                   <CheckCircle className="w-5 h-5 text-green-400" />
// //                   <span>99.9% Uptime</span>
// //                 </div>
// //                 <div className="flex items-center space-x-2">
// //                   <CheckCircle className="w-5 h-5 text-green-400" />
// //                   <span>Expert Team</span>
// //                 </div>
// //               </div>
// //             </div>
            
            
// //           </div>
// //         </div>
// //       </section>

// //       {/* Stats Section */}
// //       <section className="py-16 bg-white">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
// //             {stats.map((stat, index) => (
// //               <div key={index} className="text-center group">
// //                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-4 group-hover:scale-110 transition-transform">
// //                   <stat.icon className="w-8 h-8 text-orange-600" />
// //                 </div>
// //                 <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
// //                 <div className="text-gray-600 font-medium">{stat.label}</div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Services Section */}
// //       <section className="py-20 bg-gray-50">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="text-center mb-16">
// //             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
// //               Our Core Services
// //             </h2>
// //             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
// //               We provide comprehensive IT solutions tailored to your business needs, from design to deployment and ongoing support.
// //             </p>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //             {services.map((service, index) => (
// //               <div
// //                 key={index}
// //                 className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2" 
// //               >
// //                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl mb-6 group-hover:scale-110 transition-transform">
// //                   <service.icon className="w-8 h-8 text-orange-600" />
// //                 </div>
// //                 <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
// //                 <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
// //                 <ul className="space-y-2">
// //                   {service.features.map((feature, idx) => (
// //                     <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
// //                       <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
// //                       <span>{feature}</span>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="text-center mt-12">
// //             <Link
// //               to="/services"
// //               className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 inline-flex items-center group"
// //             >
// //               View All Services
// //               <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
// //             </Link>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Featured Projects */}
// //       <section className="py-20 bg-white">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="text-center mb-16">
// //             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
// //               Featured Projects
// //             </h2>
// //             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
// //               Discover how we've helped businesses transform their operations with innovative technology solutions.
// //             </p>
// //           </div>

// //           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //             {projects.map((project, index) => (
// //               <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group hover:scale-102 hover:-translate-y-2">
// //                 <div className="relative overflow-hidden">
// //                   <img
// //                     src={project.image}
// //                     alt={project.title}
// //                     className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
// //                   />
// //                   <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
// //                     {project.client}
// //                   </div>
// //                 </div>
// //                 <div className="p-6">
// //                   <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.title}</h3>
// //                   <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  
// //                   <div className="mb-4">
// //                     <h4 className="text-sm font-semibold text-gray-900 mb-2">Technologies Used:</h4>
// //                     <div className="flex flex-wrap gap-2">
// //                       {project.technologies.map((tech, idx) => (
// //                         <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
// //                           {tech}
// //                         </span>
// //                       ))}
// //                     </div>
// //                   </div>

// //                   <div>
// //                     <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Results:</h4>
// //                     <ul className="space-y-1">
// //                       {project.results.map((result, idx) => (
// //                         <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
// //                           <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
// //                           <span>{result}</span>
// //                         </li>
// //                       ))}
// //                     </ul>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Tech Stack */}
// //       <section className="py-16 bg-gray-50">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="text-center mb-12">
// //             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
// //               Our Technology Stack
// //             </h2>
// //             <p className="text-lg text-gray-600">
// //               We work with cutting-edge technologies to deliver robust, scalable solutions
// //             </p>
// //           </div>

// //           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
// //             {techStack.map((tech, index) => (
// //               <div key={index} className="flex flex-col items-center group">
// //                 <div className="w-16 h-16 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center mb-3 group-hover:shadow-md transition-shadow">
// //                   <img src={tech.logo} alt={tech.name} className="w-10 h-10" />
// //                 </div>
// //                 <span className="text-sm font-medium text-gray-700">{tech.name}</span>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Testimonials */}
// //       <section className="py-20 bg-white">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="text-center mb-16">
// //             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
// //               What Our Clients Say
// //             </h2>
// //             <p className="text-lg text-gray-600">
// //               Don't just take our word for it - hear from our satisfied clients
// //             </p>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //             {testimonials.map((testimonial, index) => (
// //               <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
// //                 <div className="flex items-center space-x-1 mb-4">
// //                   {[...Array(testimonial.rating)].map((_, i) => (
// //                     <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
// //                   ))}
// //                 </div>
// //                 <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
// //                 <div className="flex items-center space-x-4">
// //                   <img
// //                     src={testimonial.image}
// //                     alt={testimonial.name}
// //                     className="w-12 h-12 rounded-full object-cover"
// //                   />
// //                   <div>
// //                     <p className="font-semibold text-gray-900">{testimonial.name}</p>
// //                     <p className="text-sm text-gray-600">{testimonial.role}</p>
// //                     <p className="text-sm text-blue-600">{testimonial.company}</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* CTA Section */}
// //       <section className="py-20 bg-black text-white">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
// //           <h2 className="text-3xl md:text-4xl font-bold mb-4">
// //             Ready to Transform Your Business?
// //           </h2>
// //           <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"></p>
// //           <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
// //             Let's discuss how our IT solutions can drive your business forward. Get a free consultation and discover the possibilities.
// //           </p>
// //           <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //             <Link
// //               to="/contact"
// //               className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center justify-center group"
// //             >
// //               Get Free Consultation
// //               <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
// //             </Link>
// //             <Link
// //               to="/portfolio"
// //               className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300"
// //             >
// //               View Our Portfolio
// //             </Link>
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default HomePage;















// // import { motion } from 'framer-motion';
// // import { Link } from 'react-router-dom';
// // import { 
// //   ArrowRight, 
// //   CheckCircle, 
// //   Star, 
// //   Users, 
// //   Award, 
// //   TrendingUp,
// //   Palette,
// //   Code,
// //   Smartphone,
// //   Megaphone,
// //   Zap,
// //   Camera,
// //   Target
// // } from 'lucide-react';

// // const HomePage = () => {
// //   const services = [
// //     {
// //       icon: Palette,
// //       title: 'UI/UX Design',
// //       description: 'Creating intuitive and engaging user experiences that drive conversions.',
// //       features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design']
// //     },
// //     {
// //       icon: Code,
// //       title: 'Web Development',
// //       description: 'Custom web applications built with modern frameworks and best practices.',
// //       features: ['React/Angular/Vue', 'Node.js/Python', 'Responsive Design', 'API Integration']
// //     },
// //     {
// //       icon: Smartphone,
// //       title: 'Mobile Applications',
// //       description: 'Native and cross-platform mobile apps for iOS and Android.',
// //       features: ['React Native', 'Flutter', 'Native iOS/Android', 'App Store Deployment']
// //     },
// //     {
// //       icon: Megaphone,
// //       title: 'Digital Marketing',
// //       description: 'Data-driven marketing strategies to grow your online presence.',
// //       features: ['SEO/SEM', 'Social Media', 'Content Marketing', 'Analytics']
// //     },
// //     {
// //       icon: Target,
// //       title: 'Branding',
// //       description: 'Complete brand identity solutions that make your business stand out.',
// //       features: ['Logo Design', 'Brand Guidelines', 'Marketing Materials', 'Brand Strategy']
// //     },
// //     {
// //       icon: Camera,
// //       title: 'Photography',
// //       description: 'Scalable cloud infrastructure and deployment automation.',
// //       features: ['AWS/Azure/GCP', 'CI/CD Pipelines', 'Monitoring', 'Security']
// //     }
// //   ];

// //   const projects = [
// //     {
// //       title: 'E-commerce Platform',
// //       client: 'RetailTech',
// //       image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
// //       description: 'Complete e-commerce solution with modern design and seamless user experience.',
// //       technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
// //       results: ['300% faster load times', '150% increase in conversions', '99.9% uptime']
// //     },
// //     {
// //       title: 'Healthcare Mobile App',
// //       client: 'MedCare Solutions',
// //       image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
// //       description: 'Patient management app with telemedicine features and real-time monitoring.',
// //       technologies: ['React Native', 'Firebase', 'WebRTC', 'HealthKit'],
// //       results: ['50,000+ downloads', '4.8 star rating', 'HIPAA compliant']
// //     },
// //     {
// //       title: 'FinTech Dashboard',
// //       client: 'InvestPro',
// //       image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
// //       description: 'Real-time financial dashboard with advanced analytics and reporting.',
// //       technologies: ['Vue.js', 'Python', 'PostgreSQL', 'D3.js'],
// //       results: ['Real-time data processing', 'Advanced analytics', 'Secure transactions']
// //     }
// //   ];

// //   const testimonials = [
// //     {
// //       name: 'Rajesh Kumar',
// //       role: 'CEO, TechStart India',
// //       image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
// //       content: 'SYNNECTIFY transformed our digital presence completely. Their team delivered exceptional results that exceeded our expectations.',
// //       rating: 5,
// //       company: 'TechStart India'
// //     },
// //     {
// //       name: 'Priya Sharma',
// //       role: 'Founder, EcoSolutions',
// //       image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
// //       content: 'The mobile app they developed for us has been a game-changer. Professional, reliable, and innovative solutions.',
// //       rating: 5,
// //       company: 'EcoSolutions'
// //     },
// //     {
// //       name: 'Amit Patel',
// //       role: 'CTO, FinanceFlow',
// //       image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
// //       content: 'Outstanding technical expertise and project management. SYNNECTIFY delivered our complex platform on time and within budget.',
// //       rating: 5,
// //       company: 'FinanceFlow'
// //     }
// //   ];

// //   const techStack = [
// //     { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
// //     { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
// //     { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
// //     // { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
// //     // { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
// //     { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
// //     { name: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
// //     { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
// //     { name: 'Graphic Design', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
// //     { name: 'Photography', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' }
// //   ];

// //   const stats = [
// //     { number: '200+', label: 'Projects Completed', icon: Award },
// //     { number: '50+', label: 'Happy Clients', icon: Users },
// //     { number: '99.9%', label: 'Uptime Guarantee', icon: TrendingUp },
// //     { number: '24/7', label: 'Support Available', icon: Zap }
// //   ];

// //   // Animation variants for services
// //   const containerVariants = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: {
// //         staggerChildren: 0.1,
// //         when: "beforeChildren"
// //       }
// //     }
// //   };

// //   const itemVariants = {
// //     hidden: { opacity: 0, x: 100 },
// //     visible: {
// //       opacity: 1,
// //       x: 0,
// //       transition: { duration: 0.5 }
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen">
// //       {/* Hero Section */}
// //       <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-20 overflow-hidden min-h-screen flex items-center">
// //         {/* Background Video */}
// //         <video
// //           autoPlay
// //           loop
// //           muted
// //           playsInline
// //           className="absolute inset-0 w-full h-full object-cover opacity-100"
// //         >
// //           {/* Video */}
// //           <source src="/video.mov" type="video/mp4" />
// //         </video>
// //         <div className="absolute inset-0 "></div>
        
// //         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
// //               <div>
// //               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 items-center justify-center text-[#ffffff]">
// //                 Transform Your Business with
// //                 <span className="text-transparent bg-clip-text bg-gradient-to-r text-[#e57b2f] justify-center"> Innovative</span>
// //                 <br />
// //                 IT Solutions
// //               </h1>
// //               <p className="text-xl text-[#ffffff] mb-8 leading-relaxed justify-center">
// //                 We deliver cutting-edge technology solutions that drive growth, enhance user experience, and accelerate your digital transformation journey.
// //               </p>
// //               <div className="flex flex-col sm:flex-row gap-4 mb-8">
// //                 <Link
// //                   to="/services"
// //                   className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 text-center flex items-center justify-center group"
// //                 >
// //                   Explore Services
// //                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
// //                 </Link>
// //                 <Link
// //                   to="/contact"
// //                   className="border-2 border-[#48a6f8] text-black hover:text-[white] px-8 py-4 rounded-lg font-semibold hover:bg-[#48a6f8] transition-all duration-300 text-center"
// //                 >
// //                   Get Free Consultation
// //                 </Link>
// //               </div>
// //               <div className="flex items-center space-x-6 text-sm text-[white]">
// //                 <div className="flex items-center space-x-2">
// //                   <CheckCircle className="w-5 h-5 text-green-400" />
// //                   <span>24/7 Support</span>
// //                 </div>
// //                 <div className="flex items-center space-x-2">
// //                   <CheckCircle className="w-5 h-5 text-green-400" />
// //                   <span>99.9% Uptime</span>
// //                 </div>
// //                 <div className="flex items-center space-x-2">
// //                   <CheckCircle className="w-5 h-5 text-green-400" />
// //                   <span>Expert Team</span>
// //                 </div>
// //               </div>
// //             </div>
            
            
// //           </div>
// //         </div>
// //       </section>

// //       {/* Stats Section */}
// //       <section className="py-16 bg-white">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
// //             {stats.map((stat, index) => (
// //               <div key={index} className="text-center group">
// //                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-4 group-hover:scale-110 transition-transform">
// //                   <stat.icon className="w-8 h-8 text-orange-600" />
// //                 </div>
// //                 <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
// //                 <div className="text-gray-600 font-medium">{stat.label}</div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Services Section */}
// //       <section className="py-20 bg-gray-50">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="text-center mb-16">
// //             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
// //               Our Core Services
// //             </h2>
// //             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
// //               We provide comprehensive IT solutions tailored to your business needs, from design to deployment and ongoing support.
// //             </p>
// //           </div>

// //           <motion.div 
// //             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
// //             initial="hidden"
// //             whileInView="visible"
// //             viewport={{ once: true, margin: "-100px" }}
// //             variants={containerVariants}
// //           >
// //             {services.map((service, index) => (
// //               <motion.div
// //                 key={index}
// //                 className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
// //                 variants={itemVariants}
// //               >
// //                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl mb-6 group-hover:scale-110 transition-transform">
// //                   <service.icon className="w-8 h-8 text-orange-600" />
// //                 </div>
// //                 <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
// //                 <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
// //                 <ul className="space-y-2">
// //                   {service.features.map((feature, idx) => (
// //                     <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
// //                       <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
// //                       <span>{feature}</span>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </motion.div>
// //             ))}
// //           </motion.div>

// //           <div className="text-center mt-12">
// //             <Link
// //               to="/services"
// //               className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 inline-flex items-center group"
// //             >
// //               View All Services
// //               <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
// //             </Link>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Featured Projects */}
// //       <section className="py-20 bg-white">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="text-center mb-16">
// //             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
// //               Featured Projects
// //             </h2>
// //             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
// //               Discover how we've helped businesses transform their operations with innovative technology solutions.
// //             </p>
// //           </div>

// //           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //             {projects.map((project, index) => (
// //               <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group hover:scale-102 hover:-translate-y-2">
// //                 <div className="relative overflow-hidden">
// //                   <img
// //                     src={project.image}
// //                     alt={project.title}
// //                     className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
// //                   />
// //                   <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
// //                     {project.client}
// //                   </div>
// //                 </div>
// //                 <div className="p-6">
// //                   <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.title}</h3>
// //                   <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  
// //                   <div className="mb-4">
// //                     <h4 className="text-sm font-semibold text-gray-900 mb-2">Technologies Used:</h4>
// //                     <div className="flex flex-wrap gap-2">
// //                       {project.technologies.map((tech, idx) => (
// //                         <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
// //                           {tech}
// //                         </span>
// //                       ))}
// //                     </div>
// //                   </div>

// //                   <div>
// //                     <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Results:</h4>
// //                     <ul className="space-y-1">
// //                       {project.results.map((result, idx) => (
// //                         <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
// //                           <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
// //                           <span>{result}</span>
// //                         </li>
// //                       ))}
// //                     </ul>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Tech Stack */}
// //       <section className="py-16 bg-gray-50">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="text-center mb-12">
// //             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
// //               Our Technology Stack
// //             </h2>
// //             <p className="text-lg text-gray-600">
// //               We work with cutting-edge technologies to deliver robust, scalable solutions
// //             </p>
// //           </div>

// //           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
// //             {techStack.map((tech, index) => (
// //               <div key={index} className="flex flex-col items-center group">
// //                 <div className="w-16 h-16 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center mb-3 group-hover:shadow-md transition-shadow">
// //                   <img src={tech.logo} alt={tech.name} className="w-10 h-10" />
// //                 </div>
// //                 <span className="text-sm font-medium text-gray-700">{tech.name}</span>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Testimonials */}
// //       <section className="py-20 bg-white">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="text-center mb-16">
// //             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
// //               What Our Clients Say
// //             </h2>
// //             <p className="text-lg text-gray-600">
// //               Don't just take our word for it - hear from our satisfied clients
// //             </p>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //             {testimonials.map((testimonial, index) => (
// //               <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
// //                 <div className="flex items-center space-x-1 mb-4">
// //                   {[...Array(testimonial.rating)].map((_, i) => (
// //                     <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
// //                   ))}
// //                 </div>
// //                 <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
// //                 <div className="flex items-center space-x-4">
// //                   <img
// //                     src={testimonial.image}
// //                     alt={testimonial.name}
// //                     className="w-12 h-12 rounded-full object-cover"
// //                   />
// //                   <div>
// //                     <p className="font-semibold text-gray-900">{testimonial.name}</p>
// //                     <p className="text-sm text-gray-600">{testimonial.role}</p>
// //                     <p className="text-sm text-blue-600">{testimonial.company}</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* CTA Section */}
// //       <section className="py-20 bg-black text-white">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
// //           <h2 className="text-3xl md:text-4xl font-bold mb-4">
// //             Ready to Transform Your Business?
// //           </h2>
// //           <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"></p>
// //           <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
// //             Let's discuss how our IT solutions can drive your business forward. Get a free consultation and discover the possibilities.
// //           </p>
// //           <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //             <Link
// //               to="/contact"
// //               className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center justify-center group"
// //             >
// //               Get Free Consultation
// //               <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
// //             </Link>
// //             <Link
// //               to="/portfolio"
// //               className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300"
// //             >
// //               View Our Portfolio
// //             </Link>
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default HomePage;


















// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { 
//   ArrowRight, 
//   CheckCircle, 
//   Star, 
//   Users, 
//   Award, 
//   TrendingUp,
//   Palette,
//   Code,
//   Smartphone,
//   Megaphone,
//   Zap,
//   Camera,
//   Target
// } from 'lucide-react';
// import { useEffect, useRef } from 'react';

// const HomePage = () => {


//   const services = [
//     {
//       icon: Palette,
//       title: 'UI/UX Design',
//       description: 'Creating intuitive and engaging user experiences that drive conversions.',
//       features: ['Figma', 'Adobe XD', 'Sketch', 'InVision']
//     },
//     {
//       icon: Code,
//       title: 'Web Development',
//       description: 'Custom web applications built with modern frameworks and best practices.',
//       features: ['React', 'Angular', 'Vue.js', 'Node.js']
//     },
//     {
//       icon: Smartphone,
//       title: 'Mobile Applications',
//       description: 'Native and cross-platform mobile apps for iOS and Android.',
//       features: ['React Native', 'Flutter', 'Swift', 'Kotlin']
//     },
//     {
//       icon: Megaphone,
//       title: 'Digital Marketing',
//       description: 'Data-driven marketing strategies to grow your online presence.',
//       features: ['Google Ads', 'Facebook Ads', 'Google Analytics', 'HubSpot']
//     },
//     {
//       icon: Target,
//       title: 'Branding',
//       description: 'Complete brand identity solutions that make your business stand out.',
//       features: ['Adobe Creative Suite', 'Figma', 'Sketch', 'Canva Pro']
//     },
//     {
//       icon: Camera,
//       title: 'Photography',
//       description: 'Scalable cloud infrastructure and deployment automation.',
//       features: ['DJI Mavic', 'Phantom', 'SmugMug', 'Pixieset']
//     }
//   ];

//   const projects = [
//     {
//       title: 'E-commerce Platform',
//       client: 'RetailTech',
//       image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
//       description: 'Complete e-commerce solution with modern design and seamless user experience.',
//       technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
//       results: ['300% faster load times', '150% increase in conversions', '99.9% uptime']
//     },
//     {
//       title: 'Healthcare Mobile App',
//       client: 'MedCare Solutions',
//       image: 'https://imgs.search.brave.com/n32HCyRw1hIX9g4hfvUHtjwxCVd-RyD2uPmLTPEDdNM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9rbXMt/aGVhbHRoY2FyZS5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjQvMTAvaGVhbHRo/Y2FyZS1tb2JpbGUt/YXBwLWRldmVsb3Bt/ZW50LWttcy1oZWFs/dGhjYXJlLTIud2Vi/cA',
//       description: 'Patient management app with telemedicine features and real-time monitoring.',
//       technologies: ['React Native', 'Firebase', 'WebRTC', 'HealthKit'],
//       results: ['50,000+ downloads', '4.8 star rating', 'HIPAA compliant']
//     },
//     {
//       title: 'FinTech Dashboard',
//       client: 'InvestPro',
//       image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
//       description: 'Real-time financial dashboard with advanced analytics and reporting.',
//       technologies: ['Vue.js', 'Python', 'PostgreSQL', 'D3.js'],
//       results: ['Real-time data processing', 'Advanced analytics', 'Secure transactions']
//     }
//   ];

//   const testimonials = [
//     {
//       name: 'Rajesh Kumar',
//       role: 'CEO, TechStart India',
//       image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
//       content: 'SYNNECTIFY transformed our digital presence completely. Their team delivered exceptional results that exceeded our expectations.',
//       rating: 5,
//       company: 'TechStart India'
//     },
//     {
//       name: 'Priya Sharma',
//       role: 'Founder, EcoSolutions',
//       image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
//       content: 'The mobile app they developed for us has been a game-changer. Professional, reliable, and innovative solutions.',
//       rating: 5,
//       company: 'EcoSolutions'
//     },
//     {
//       name: 'Amit Patel',
//       role: 'CTO, FinanceFlow',
//       image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
//       content: 'Outstanding technical expertise and project management. SYNNECTIFY delivered our complex platform on time and within budget.',
//       rating: 5,
//       company: 'FinanceFlow'
//     }
//   ];

//   const techStack = [
//     { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
//     { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
//     { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
//     { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
//     { name: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
//     { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
//     { name: 'Graphic Design', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
//     { name: 'Photography', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' }
//   ];

//   const stats = [
//     { number: '200+', label: 'Projects Completed', icon: Award },
//     { number: '50+', label: 'Happy Clients', icon: Users },
//     { number: '99.9%', label: 'Uptime Guarantee', icon: TrendingUp },
//     { number: '24/7', label: 'Support Available', icon: Zap }
//   ];

//   // Animation variants for services
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         when: "beforeChildren"
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, x: 100 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.5 }
//     }
//   };

//   const techStackRef = useRef<HTMLDivElement>(null);

// useEffect(() => {
//   const techStackElement = techStackRef.current;
//   if (!techStackElement) return;

//   const techStackWidth = techStackElement.scrollWidth / 2; // Since we duplicate the items
//   const duration = 20; // seconds for one complete loop

//   const animate = () => {
//     techStackElement.style.transition = `transform ${duration}s linear`;
//     techStackElement.style.transform = `translateX(-${techStackWidth}px)`;
//   };

//   const handleTransitionEnd = () => {
//     techStackElement.style.transition = 'none';
//     techStackElement.style.transform = `translateX(0)`;
//     setTimeout(animate, 10);
//   };

//   techStackElement.addEventListener('transitionend', handleTransitionEnd);
//   animate();

//   return () => {
//     techStackElement.removeEventListener('transitionend', handleTransitionEnd);
//   };
// }, []);
  
//   return (
//     <>
       
//         <div className="min-h-screen">
//           {/* Hero Section */}
//           <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-20 overflow-hidden min-h-screen flex items-center">
//             <video
//               autoPlay
//               loop
//               muted
//               playsInline
//               className="absolute inset-0 w-full h-full object-cover opacity-100"
//             >
//               <source src="/video.mov" type="video/mp4" />
//             </video>
//             <div className="absolute inset-0"></div>
            
//             <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//                 <div>
//                   <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 items-center justify-center text-[#ffffff]">
//                     Transform Your Business with
//                     <span className="text-[#ef8031]"> Innovative</span>
//                     <br />
//                     IT Solutions
//                   </h1>
//                   <p className="text-xl text-[#ffffff] mb-8 leading-relaxed justify-center">
//                     We deliver cutting-edge technology solutions that drive growth, enhance user experience, and accelerate your digital transformation journey.
//                   </p>
//                   <div className="flex flex-col sm:flex-row gap-4 mb-8">
//                     <Link
//                       to="/services"
//                       className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 text-center flex items-center justify-center group"
//                     >
//                       Explore Services
//                       <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                     </Link>
//                     <Link
//                       to="/contact"
//                       className="border-2 border-[#48a6f8] text-black hover:text-[white] px-8 py-4 rounded-lg font-semibold hover:bg-[#48a6f8] transition-all duration-300 text-center"
//                     >
//                       Get Free Consultation
//                     </Link>
//                   </div>
//                   <div className="flex items-center space-x-6 text-sm text-[white]">
//                     <div className="flex items-center space-x-2">
//                       <CheckCircle className="w-5 h-5 text-green-400" />
//                       <span>24/7 Support</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <CheckCircle className="w-5 h-5 text-green-400" />
//                       <span>99.9% Uptime</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <CheckCircle className="w-5 h-5 text-green-400" />
//                       <span>Expert Team</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Stats Section */}
//           <section className="py-16 bg-white">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//                 {stats.map((stat, index) => (
//                   <div key={index} className="text-center group">
//                     <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-4 group-hover:scale-110 transition-transform">
//                       <stat.icon className="w-8 h-8 text-orange-600" />
//                     </div>
//                     <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
//                     <div className="text-gray-600 font-medium">{stat.label}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* Services Section */}
//           <section className="py-20 bg-gray-50">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="text-center mb-16">
//                 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                   Our Core Services
//                 </h2>
//                 <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//                   We provide comprehensive IT solutions tailored to your business needs, from design to deployment and ongoing support.
//                 </p>
//               </div>

//               <motion.div 
//                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, margin: "-100px" }}
//                 variants={containerVariants}
//               >
//                 {services.map((service, index) => (
//                   <motion.div
//                     key={index}
//                     className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
//                     variants={itemVariants}
//                   >
//                     <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl mb-6 group-hover:scale-110 transition-transform">
//                       <service.icon className="w-8 h-8 text-orange-600" />
//                     </div>
//                     <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
//                     <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
//                     <ul className="space-y-2">
//                       {service.features.map((feature, idx) => (
//                         <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
//                           <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
//                           <span>{feature}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </motion.div>
//                 ))}
//               </motion.div>

//               <div className="text-center mt-12">
//                 <Link
//                   to="/services"
//                   className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 inline-flex items-center group"
//                 >
//                   View All Services
//                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </Link>
//               </div>
//             </div>
//           </section>

//           {/* Featured Projects */}
//           <section className="py-20 bg-white">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="text-center mb-16">
//                 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                   Featured Projects
//                 </h2>
//                 <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//                   Discover how we've helped businesses transform their operations with innovative technology solutions.
//                 </p>
//               </div>

//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 {projects.map((project, index) => (
//                   <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group hover:scale-102 hover:-translate-y-2">
//                     <div className="relative overflow-hidden">
//                       <img
//                         src={project.image}
//                         alt={project.title}
//                         className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//                       />
//                       <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
//                         {project.client}
//                       </div>
//                     </div>
//                     <div className="p-6">
//                       <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.title}</h3>
//                       <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                      
//                       <div className="mb-4">
//                         <h4 className="text-sm font-semibold text-gray-900 mb-2">Technologies Used:</h4>
//                         <div className="flex flex-wrap gap-2">
//                           {project.technologies.map((tech, idx) => (
//                             <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
//                               {tech}
//                             </span>
//                           ))}
//                         </div>
//                       </div>

//                       <div>
//                         <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Results:</h4>
//                         <ul className="space-y-1">
//                           {project.results.map((result, idx) => (
//                             <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
//                               <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
//                               <span>{result}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* Tech Stack Section */}
// <section className="py-16 bg-gray-50">
//   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//     <div className="text-center mb-12">
//       <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//         Our Technology Stack
//       </h2>
//       <p className="text-lg text-gray-600">
//         We work with cutting-edge technologies to deliver robust, scalable solutions
//       </p>
//     </div>

//     <div className="relative overflow-hidden py-4">
//       <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
//       <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
      
//       <div className="whitespace-nowrap overflow-hidden">
//         <div 
//           ref={techStackRef}
//           className="inline-flex gap-8"
//         >
//           {/* Original set */}
//           {techStack.map((tech, index) => (
//             <div key={`original-${index}`} className="inline-flex flex-col items-center group px-4">
//               <div className="w-16 h-16 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center mb-3 group-hover:shadow-md transition-shadow">
//                 <img src={tech.logo} alt={tech.name} className="w-10 h-10" />
//               </div>
//               <span className="text-sm font-medium text-gray-700">{tech.name}</span>
//             </div>
//           ))}
          
//           {/* Duplicate set for seamless looping */}
//           {techStack.map((tech, index) => (
//             <div key={`duplicate-${index}`} className="inline-flex flex-col items-center group px-4">
//               <div className="w-16 h-16 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center mb-3 group-hover:shadow-md transition-shadow">
//                 <img src={tech.logo} alt={tech.name} className="w-10 h-10" />
//               </div>
//               <span className="text-sm font-medium text-gray-700">{tech.name}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   </div>
// </section>

//           {/* Testimonials */}
//           <section className="py-20 bg-white">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="text-center mb-16">
//                 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                   What Our Clients Say
//                 </h2>
//                 <p className="text-lg text-gray-600">
//                   Don't just take our word for it - hear from our satisfied clients
//                 </p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                 {testimonials.map((testimonial, index) => (
//                   <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
//                     <div className="flex items-center space-x-1 mb-4">
//                       {[...Array(testimonial.rating)].map((_, i) => (
//                         <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                       ))}
//                     </div>
//                     <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
//                     <div className="flex items-center space-x-4">
//                       <img
//                         src={testimonial.image}
//                         alt={testimonial.name}
//                         className="w-12 h-12 rounded-full object-cover"
//                       />
//                       <div>
//                         <p className="font-semibold text-gray-900">{testimonial.name}</p>
//                         <p className="text-sm text-gray-600">{testimonial.role}</p>
//                         <p className="text-sm text-blue-600">{testimonial.company}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>
//         </div>

//     </>
//   );
// };

// export default HomePage;













// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import {
//   ArrowRight,
//   CheckCircle,
//   Star,
//   Users,
//   Award,
//   TrendingUp,
//   Palette,
//   Code,
//   Smartphone,
//   Megaphone,
//   Zap,
//   Camera,
//   Target
// } from 'lucide-react';
// import { useEffect, useRef } from 'react';

// /* ----------  fade helper ---------- */
// const fadeIn = (direction: string) => ({
//   hidden: {
//     opacity: 0,
//     ...(direction === 'up' && { y: 60 }),
//     ...(direction === 'down' && { y: -60 }),
//     ...(direction === 'left' && { x: -60 }),
//     ...(direction === 'right' && { x: 60 }),
//     ...(direction === 'up-right' && { y: 60, x: 60 })
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     x: 0,
//     transition: { duration: 0.7, ease: 'easeOut' }
//   }
// });

// const fadeOptions = { once: false, margin: '-100px' };

// const HomePage = () => {
//   /* existing data unchanged */
//   const services = [
//     {
//       icon: Palette,
//       title: 'UI/UX Design',
//       description: 'Creating intuitive and engaging user experiences that drive conversions.',
//       features: ['Figma', 'Adobe XD', 'Sketch', 'InVision']
//     },
//     {
//       icon: Code,
//       title: 'Web Development',
//       description: 'Custom web applications built with modern frameworks and best practices.',
//       features: ['React', 'Angular', 'Vue.js', 'Node.js']
//     },
//     {
//       icon: Smartphone,
//       title: 'Mobile Applications',
//       description: 'Native and cross-platform mobile apps for iOS and Android.',
//       features: ['React Native', 'Flutter', 'Swift', 'Kotlin']
//     },
//     {
//       icon: Megaphone,
//       title: 'Digital Marketing',
//       description: 'Data-driven marketing strategies to grow your online presence.',
//       features: ['Google Ads', 'Facebook Ads', 'Google Analytics', 'HubSpot']
//     },
//     {
//       icon: Target,
//       title: 'Branding',
//       description: 'Complete brand identity solutions that make your business stand out.',
//       features: ['Adobe Creative Suite', 'Figma', 'Sketch', 'Canva Pro']
//     },
//     {
//       icon: Camera,
//       title: 'Photography',
//       description: 'Scalable cloud infrastructure and deployment automation.',
//       features: ['DJI Mavic', 'Phantom', 'SmugMug', 'Pixieset']
//     }
//   ];

//   const projects = [
//     {
//       title: 'E-commerce Platform',
//       client: 'RetailTech',
//       image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
//       description: 'Complete e-commerce solution with modern design and seamless user experience.',
//       technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
//       results: ['300% faster load times', '150% increase in conversions', '99.9% uptime']
//     },
//     {
//       title: 'Healthcare Mobile App',
//       client: 'MedCare Solutions',
//       image: 'https://imgs.search.brave.com/n32HCyRw1hIX9g4hfvUHtjwxCVd-RyD2uPmLTPEDdNM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9rbXMtaGVhbHRoY2FyZS5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMjQvMTAvaGVhbHRoY2FyZS1tb2JpbGUtYXBwLWRldmVsb3BtZW50LWttcy1oZWFsdGhjYXJlLTIud2Vi',
//       description: 'Patient management app with telemedicine features and real-time monitoring.',
//       technologies: ['React Native', 'Firebase', 'WebRTC', 'HealthKit'],
//       results: ['50,000+ downloads', '4.8 star rating', 'HIPAA compliant']
//     },
//     {
//       title: 'FinTech Dashboard',
//       client: 'InvestPro',
//       image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
//       description: 'Real-time financial dashboard with advanced analytics and reporting.',
//       technologies: ['Vue.js', 'Python', 'PostgreSQL', 'D3.js'],
//       results: ['Real-time data processing', 'Advanced analytics', 'Secure transactions']
//     }
//   ];

//   const testimonials = [
//     {
//       name: 'Rajesh Kumar',
//       role: 'CEO, TechStart India',
//       image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
//       content: 'SYNNECTIFY transformed our digital presence completely. Their team delivered exceptional results that exceeded our expectations.',
//       rating: 5,
//       company: 'TechStart India'
//     },
//     {
//       name: 'Priya Sharma',
//       role: 'Founder, EcoSolutions',
//       image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
//       content: 'The mobile app they developed for us has been a game-changer. Professional, reliable, and innovative solutions.',
//       rating: 5,
//       company: 'EcoSolutions'
//     },
//     {
//       name: 'Amit Patel',
//       role: 'CTO, FinanceFlow',
//       image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
//       content: 'Outstanding technical expertise and project management. SYNNECTIFY delivered our complex platform on time and within budget.',
//       rating: 5,
//       company: 'FinanceFlow'
//     }
//   ];

//   const techStack = [
//     { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
//     { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
//     { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
//     { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
//     { name: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
//     { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
//     { name: 'Graphic Design', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
//     { name: 'Photography', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' }
//   ];

//   const stats = [
//     { number: '200+', label: 'Projects Completed', icon: Award },
//     { number: '50+', label: 'Happy Clients', icon: Users },
//     { number: '99.9%', label: 'Uptime Guarantee', icon: TrendingUp },
//     { number: '24/7', label: 'Support Available', icon: Zap }
//   ];

//   /* ----------  scroll animations ---------- */
//   const fadeOptions = { once: false, margin: '-100px' };

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section – fade-up */}
//       <motion.section
//         className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-20 overflow-hidden flex items-center"
//         initial="hidden"
//         whileInView="visible"
//         viewport={fadeOptions}
//         variants={fadeIn('up')}
//       >
//         <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-100">
//           <source src="/video.mov" type="video/mp4" />
//         </video>
//         <div className="absolute inset-0 bg-black/5" />
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
//                 Transform Your Business with <span className="text-[#ef8031]">Innovative</span><br />IT Solutions
//               </h1>
//               <p className="text-xl text-white mb-8 leading-relaxed">
//                 We deliver cutting-edge technology solutions that drive growth, enhance user experience, and accelerate your digital transformation journey.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 mb-8">
//                 <Link to="/services" className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 flex items-center group">
//                   Explore Services <ArrowRight className="ml-2 w-5 h-5" />
//                 </Link>
//                 <Link to="/contact" className="border-2 border-[#48a6f8] text-black hover:text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#48a6f8] transition-all duration-300">
//                   Get Free Consultation
//                 </Link>
//               </div>
//               <div className="flex items-center space-x-6 text-sm text-white">
//                 <div className="flex items-center space-x-2"><CheckCircle className="w-5 h-5 text-green-400" /><span>24/7 Support</span></div>
//                 <div className="flex items-center space-x-2"><CheckCircle className="w-5 h-5 text-green-400" /><span>99.9% Uptime</span></div>
//                 <div className="flex items-center space-x-2"><CheckCircle className="w-5 h-5 text-green-400" /><span>Expert Team</span></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.section>

//       {/* Stats – fade-down */}
//       <motion.section className="py-16 bg-white" initial="hidden" whileInView="visible" viewport={fadeOptions} variants={fadeIn('down')}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {stats.map((stat, index) => (
//               <div key={index} className="text-center group">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-4 group-hover:scale-110 transition-transform">
//                   <stat.icon className="w-8 h-8 text-orange-600" />
//                 </div>
//                 <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
//                 <div className="text-gray-600 font-medium">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* Services – fade-up */}
//       <motion.section className="py-20 bg-gray-50" initial="hidden" whileInView="visible" viewport={fadeOptions} variants={fadeIn('up')}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Services</h2>
//             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//               We provide comprehensive IT solutions tailored to your business needs, from design to deployment and ongoing support.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {services.map((service, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={fadeOptions}
//                 variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.1 } } }}
//               >
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl mb-6 group-hover:scale-110 transition-transform">
//                   <service.icon className="w-8 h-8 text-orange-600" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
//                 <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
//                 <ul className="space-y-2">
//                   {service.features.map((feature, idx) => (
//                     <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
//                       <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
//                       <span>{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* Projects – fade-right */}
//       <motion.section className="py-20 bg-white" initial="hidden" whileInView="visible" viewport={fadeOptions} variants={fadeIn('right')}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
//             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//               Discover how we've helped businesses transform their operations with innovative technology solutions.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {projects.map((project, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group hover:scale-102 hover:-translate-y-2"
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={fadeOptions}
//                 variants={{ hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: index * 0.15 } } }}
//               >
//                 <img src={project.image} alt={project.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
//                 <div className="p-6">
//                   <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.title}</h3>
//                   <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

//                   <div className="mb-4">
//                     <h4 className="text-sm font-semibold text-gray-900 mb-2">Technologies Used:</h4>
//                     <div className="flex flex-wrap gap-2">
//                       {project.technologies.map((tech, idx) => (
//                         <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">{tech}</span>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Results:</h4>
//                     <ul className="space-y-1">
//                       {project.results.map((result, idx) => (
//                         <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
//                           <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
//                           <span>{result}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* Tech Stack – fade-left */}
//       <motion.section className="py-16 bg-gray-50" initial="hidden" whileInView="visible" viewport={fadeOptions} variants={fadeIn('left')}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Technology Stack</h2>
//             <p className="text-lg text-gray-600">We work with cutting-edge technologies to deliver robust, scalable solutions</p>
//           </div>

//           <div className="relative overflow-hidden">
//             <div className="flex space-x-8 animate-marquee">
//               {techStack.concat(techStack).map((tech, idx) => (
//                 <div key={idx} className="flex-shrink-0 flex flex-col items-center group px-4">
//                   <div className="w-16 h-16 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center mb-3">
//                     <img src={tech.logo} alt={tech.name} className="w-10 h-10" />
//                   </div>
//                   <span className="text-sm font-medium text-gray-700">{tech.name}</span>
//                 </div>
//               ))}
//             </div>
//             <style>{`
//               @keyframes marquee {
//                 0% { transform: translateX(0); }
//                 100% { transform: translateX(-50%); }
//               }
//               .animate-marquee {
//                 animation: marquee 25s linear infinite;
//               }
//             `}</style>
//           </div>
//         </div>
//       </motion.section>

//       {/* Testimonials – fade-up-right */}
//       <motion.section className="py-20 bg-white" initial="hidden" whileInView="visible" viewport={fadeOptions} variants={fadeIn('up-right')}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
//             <p className="text-lg text-gray-600">Don't just take our word for it - hear from our satisfied clients</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {testimonials.map((testimonial, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow"
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={fadeOptions}
//                 variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.15 } } }}
//               >
//                 <div className="flex items-center space-x-1 mb-4">
//                   {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}
//                 </div>
//                 <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
//                 <div className="flex items-center space-x-4">
//                   <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
//                   <div>
//                     <p className="font-semibold text-gray-900">{testimonial.name}</p>
//                     <p className="text-sm text-gray-600">{testimonial.role}</p>
//                     <p className="text-sm text-blue-600">{testimonial.company}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>
//     </div>
//   );
// };

// export default HomePage;

















// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import {
//   ArrowRight,
//   CheckCircle,
//   Star,
//   Users,
//   Award,
//   TrendingUp,
//   Palette,
//   Code,
//   Smartphone,
//   Megaphone,
//   Zap,
//   Camera,
//   Target
// } from 'lucide-react';


// /* ----------  types ---------- */
// type Direction = 'up' | 'down' | 'left' | 'right' | 'up-right';

// /* ----------  fade helper ---------- */
// const fadeIn = (direction: Direction) => ({
//   hidden: {
//     opacity: 0,
//     ...(direction === 'up' && { y: 60 }),
//     ...(direction === 'down' && { y: -60 }),
//     ...(direction === 'left' && { x: -60 }),
//     ...(direction === 'right' && { x: 60 }),
//     ...(direction === 'up-right' && { y: 60, x: 60 })
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     x: 0,
//     transition: { duration: 0.7, ease: 'easeOut' }
//   }
// });

// const fadeOptions = { once: false, margin: '-100px' };

// /* ----------  data ---------- */
// const services = [
//   {
//     icon: Palette,
//     title: 'UI/UX Design',
//     description: 'Creating intuitive and engaging user experiences that drive conversions.',
//     features: ['Figma', 'Adobe XD', 'Sketch', 'InVision']
//   },
//   {
//     icon: Code,
//     title: 'Web Development',
//     description: 'Custom web applications built with modern frameworks and best practices.',
//     features: ['React', 'Angular', 'Vue.js', 'Node.js']
//   },
//   {
//     icon: Smartphone,
//     title: 'Mobile Applications',
//     description: 'Native and cross-platform mobile apps for iOS and Android.',
//     features: ['React Native', 'Flutter', 'Swift', 'Kotlin']
//   },
//   {
//     icon: Megaphone,
//     title: 'Digital Marketing',
//     description: 'Data-driven marketing strategies to grow your online presence.',
//     features: ['Google Ads', 'Facebook Ads', 'Google Analytics', 'HubSpot']
//   },
//   {
//     icon: Target,
//     title: 'Branding',
//     description: 'Complete brand identity solutions that make your business stand out.',
//     features: ['Adobe Creative Suite', 'Figma', 'Sketch', 'Canva Pro']
//   },
//   {
//     icon: Camera,
//     title: 'Photography',
//     description: 'Scalable cloud infrastructure and deployment automation.',
//     features: ['DJI Mavic', 'Phantom', 'SmugMug', 'Pixieset']
//   }
// ];

// const projects = [
//   {
//     title: 'E-commerce Platform',
//     client: 'RetailTech',
//     image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
//     description: 'Complete e-commerce solution with modern design and seamless user experience.',
//     technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
//     results: ['300% faster load times', '150% increase in conversions', '99.9% uptime']
//   },
//   {
//     title: 'Healthcare Mobile App',
//     client: 'MedCare Solutions',
//     image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
//     description: 'Patient management app with telemedicine features and real-time monitoring.',
//     technologies: ['React Native', 'Firebase', 'WebRTC', 'HealthKit'],
//     results: ['50,000+ downloads', '4.8 star rating', 'HIPAA compliant']
//   },
//   {
//     title: 'FinTech Dashboard',
//     client: 'InvestPro',
//     image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
//     description: 'Real-time financial dashboard with advanced analytics and reporting.',
//     technologies: ['Vue.js', 'Python', 'PostgreSQL', 'D3.js'],
//     results: ['Real-time data processing', 'Advanced analytics', 'Secure transactions']
//   }
// ];

// const testimonials = [
//   {
//     name: 'Rajesh Kumar',
//     role: 'CEO, TechStart India',
//     image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
//     content: 'SYNNECTIFY transformed our digital presence completely. Their team delivered exceptional results that exceeded our expectations.',
//     rating: 5,
//     company: 'TechStart India'
//   },
//   {
//     name: 'Priya Sharma',
//     role: 'Founder, EcoSolutions',
//     image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
//     content: 'The mobile app they developed for us has been a game-changer. Professional, reliable, and innovative solutions.',
//     rating: 5,
//     company: 'EcoSolutions'
//   },
//   {
//     name: 'Amit Patel',
//     role: 'CTO, FinanceFlow',
//     image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
//     content: 'Outstanding technical expertise and project management. SYNNECTIFY delivered our complex platform on time and within budget.',
//     rating: 5,
//     company: 'FinanceFlow'
//   }
// ];

// const techStack = [
//   { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
//   { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
//   { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
//   { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
//   { name: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
//   { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
//   { name: 'Graphic Design', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
//   { name: 'Photography', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' }
// ];

// const stats = [
//   { number: '200+', label: 'Projects Completed', icon: Award },
//   { number: '50+', label: 'Happy Clients', icon: Users },
//   { number: '99.9%', label: 'Uptime Guarantee', icon: TrendingUp },
//   { number: '24/7', label: 'Support Available', icon: Zap }
// ];

// /* ----------  component ---------- */
// const HomePage = () => (
//   <div className="min-h-screen">
//     {/* Hero Section */}
//     <motion.section
//       className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-20 overflow-hidden flex items-center"
//       initial="hidden"
//       whileInView="visible"
//       viewport={fadeOptions}
//       variants={fadeIn('up')}
//     >
//       <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-100">
//         <source src="/video.mov" type="video/mp4" />
//       </video>
//       <div className="absolute inset-0 bg-black/5" />
//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           <div>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
//               Transform Your Business with <span className="text-[#ef8031]">Innovative</span><br />IT Solutions
//             </h1>
//             <p className="text-xl text-white mb-8 leading-relaxed">
//               We deliver cutting-edge technology solutions that drive growth, enhance user experience, and accelerate your digital transformation journey.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 mb-8">
//               <Link
//                 to="/services"
//                 className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 flex items-center group"
//               >
//                 Explore Services <ArrowRight className="ml-2 w-5 h-5" />
//               </Link>
//               <Link
//                 to="/contact"
//                 className="border-2 border-[#48a6f8] text-black hover:text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#48a6f8] transition-all duration-300"
//               >
//                 Get Free Consultation
//               </Link>
//             </div>
//             <div className="flex items-center space-x-6 text-sm text-white">
//               <div className="flex items-center space-x-2">
//                 <CheckCircle className="w-5 h-5 text-green-400" />
//                 <span>24/7 Support</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <CheckCircle className="w-5 h-5 text-green-400" />
//                 <span>99.9% Uptime</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <CheckCircle className="w-5 h-5 text-green-400" />
//                 <span>Expert Team</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </motion.section>

//     {/* Stats */}
//     <motion.section
//       className="py-16 bg-white"
//       initial="hidden"
//       whileInView="visible"
//       viewport={fadeOptions}
//       variants={fadeIn('down')}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//           {stats.map((stat, index) => (
//             <div key={index} className="text-center group">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-4 group-hover:scale-110 transition-transform">
//                 <stat.icon className="w-8 h-8 text-orange-600" />
//               </div>
//               <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
//               <div className="text-gray-600 font-medium">{stat.label}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </motion.section>

//     {/* Services */}
//     <motion.section
//       className="py-20 bg-gray-50"
//       initial="hidden"
//       whileInView="visible"
//       viewport={fadeOptions}
//       variants={fadeIn('up')}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Services</h2>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//             We provide comprehensive IT solutions tailored to your business needs, from design to deployment and ongoing support.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {services.map((service, index) => (
//             <motion.div
//               key={index}
//               className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
//               initial="hidden"
//               whileInView="visible"
//               viewport={fadeOptions}
//               variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.1 } } }}
//             >
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl mb-6 group-hover:scale-110 transition-transform">
//                 <service.icon className="w-8 h-8 text-orange-600" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
//               <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
//               <ul className="space-y-2">
//                 {service.features.map((feature, idx) => (
//                   <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
//                     <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
//                     <span>{feature}</span>
//                   </li>
//                 ))}
//               </ul>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </motion.section>

//     {/* Projects */}
//     <motion.section
//       className="py-20 bg-white"
//       initial="hidden"
//       whileInView="visible"
//       viewport={fadeOptions}
//       variants={fadeIn('right')}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//             Discover how we've helped businesses transform their operations with innovative technology solutions.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {projects.map((project, index) => (
//             <motion.div
//               key={index}
//               className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group hover:scale-102 hover:-translate-y-2"
//               initial="hidden"
//               whileInView="visible"
//               viewport={fadeOptions}
//               variants={{ hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: index * 0.15 } } }}
//             >
//               <img src={project.image} alt={project.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.title}</h3>
//                 <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
//                 <div className="mb-4">
//                   <h4 className="text-sm font-semibold text-gray-900 mb-2">Technologies Used:</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {project.technologies.map((tech, idx) => (
//                       <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">{tech}</span>
//                     ))}
//                   </div>
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Results:</h4>
//                   <ul className="space-y-1">
//                     {project.results.map((result, idx) => (
//                       <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
//                         <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
//                         <span>{result}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </motion.section>

//     {/* Tech Stack */}
//     <motion.section
//       className="py-16 bg-gray-50"
//       initial="hidden"
//       whileInView="visible"
//       viewport={fadeOptions}
//       variants={fadeIn('left')}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Technology Stack</h2>
//           <p className="text-lg text-gray-600">We work with cutting-edge technologies to deliver robust, scalable solutions</p>
//         </div>

//         <div className="relative overflow-hidden">
//           <div className="flex space-x-8 animate-marquee">
//             {techStack.concat(techStack).map((tech, idx) => (
//               <div key={idx} className="flex-shrink-0 flex flex-col items-center group px-4">
//                 <div className="w-16 h-16 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center mb-3">
//                   <img src={tech.logo} alt={tech.name} className="w-10 h-10" />
//                 </div>
//                 <span className="text-sm font-medium text-gray-700">{tech.name}</span>
//               </div>
//             ))}
//           </div>
//           <style>{`
//             @keyframes marquee {
//               0% { transform: translateX(0); }
//               100% { transform: translateX(-50%); }
//             }
//             .animate-marquee {
//               animation: marquee 25s linear infinite;
//             }
//           `}</style>
//         </div>
//       </div>
//     </motion.section>

//     {/* Testimonials */}
//     <motion.section
//       className="py-20 bg-white"
//       initial="hidden"
//       whileInView="visible"
//       viewport={fadeOptions}
//       variants={fadeIn('up-right')}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
//           <p className="text-lg text-gray-600">Don't just take our word for it - hear from our satisfied clients</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {testimonials.map((testimonial, index) => (
//             <motion.div
//               key={index}
//               className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow"
//               initial="hidden"
//               whileInView="visible"
//               viewport={fadeOptions}
//               variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.15 } } }}
//             >
//               <div className="flex items-center space-x-1 mb-4">
//                 {[...Array(testimonial.rating)].map((_, i) => (
//                   <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                 ))}
//               </div>
//               <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
//               <div className="flex items-center space-x-4">
//                 <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
//                 <div>
//                   <p className="font-semibold text-gray-900">{testimonial.name}</p>
//                   <p className="text-sm text-gray-600">{testimonial.role}</p>
//                   <p className="text-sm text-blue-600">{testimonial.company}</p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </motion.section>
//   </div>
// );

// export default HomePage;



















// backup to present code

import { motion, Variants } from 'framer-motion';
// import OurClients from '../components/OurClients';
import OurClientsResponsive from '../components/OurClientsResponsive';// Adjust path if needed
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  Users,
  Award,
  TrendingUp,
  Palette,
  Code,
  Smartphone,
  Megaphone,
  Zap,
  Camera,
  Target
} from 'lucide-react';

// ----------  fade helper ----------
type Direction = 'up' | 'down' | 'left' | 'right' | 'up-right';

const fadeIn = (direction: Direction): Variants => ({
  hidden: {
    opacity: 0,
    ...(direction === 'up' && { y: 60 }),
    ...(direction === 'down' && { y: -60 }),
    ...(direction === 'left' && { x: -60 }),
    ...(direction === 'right' && { x: 60 }),
    ...(direction === 'up-right' && { y: 60, x: 60 })
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' }
  }
});

const fadeOptions = { once: false, margin: '-100px' };

// ----------  data  ----------
const services = [
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Creating intuitive and engaging user experiences that drive conversions.',
    features: ['Figma', 'Adobe XD', 'Sketch', 'InVision']
  },
  {
    icon: Code,
    title: 'Web Development',
    description: 'Custom web applications built with modern frameworks and best practices.',
    features: ['React', 'Angular', 'Vue.js', 'Node.js']
  },
  {
    icon: Smartphone,
    title: 'Mobile Applications',
    description: 'Native and cross-platform mobile apps for iOS and Android.',
    features: ['React Native', 'Flutter', 'Swift', 'Kotlin']
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Data-driven marketing strategies to grow your online presence.',
    features: ['Google Ads', 'Facebook Ads', 'Google Analytics', 'HubSpot']
  },
  {
    icon: Target,
    title: 'Branding',
    description: 'Complete brand identity solutions that make your business stand out.',
    features: ['Adobe Creative Suite', 'Figma', 'Sketch', 'Canva Pro']
  },
  {
    icon: Camera,
    title: 'Photography',
    description: 'Scalable cloud infrastructure and deployment automation.',
    features: ['DJI Mavic', 'Phantom', 'SmugMug', 'Pixieset']
  }
];

const projects = [
  {
    title: 'E-commerce Platform',
    client: 'RetailTech',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Complete e-commerce solution with modern design and seamless user experience.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    results: ['300% faster load times', '150% increase in conversions', '99.9% uptime']
  },
  {
    title: 'Healthcare Mobile App',
    client: 'MedCare Solutions',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Patient management app with telemedicine features and real-time monitoring.',
    technologies: ['React Native', 'Firebase', 'WebRTC', 'HealthKit'],
    results: ['50,000+ downloads', '4.8 star rating', 'HIPAA compliant']
  },
  {
    title: 'FinTech Dashboard',
    client: 'InvestPro',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Real-time financial dashboard with advanced analytics and reporting.',
    technologies: ['Vue.js', 'Python', 'PostgreSQL', 'D3.js'],
    results: ['Real-time data processing', 'Advanced analytics', 'Secure transactions']
  }
];


const techStack = [
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name: 'Graphic Design', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Photography', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' }
];

const stats = [
  { number: '200+', label: 'Projects Completed', icon: Award },
  { number: '50+', label: 'Happy Clients', icon: Users },
  { number: '99.9%', label: 'Uptime Guarantee', icon: TrendingUp },
  { number: '24/7', label: 'Support Available', icon: Zap }
];

// ----------  component  ----------
const HomePage = () => (
   <div className="min-h-screen overflow-x-hidden overflow-y-hidden">
    {/* Hero */}
    <motion.section
  className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white pt-32 sm:pt-40 lg:pt-56 pb-20 overflow-hidden flex items-center min-h-screen"
  initial="hidden"
  whileInView="visible"
  viewport={fadeOptions}
  variants={fadeIn('up')}
>
  {/* Responsive video background */}
  <div className="absolute inset-0 w-full h-full">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full min-h-screen object-cover"
      style={{ objectPosition: 'center' }}
    >
      <source src="/video.mov" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-black/5" />
  </div>
  {/* Content */}
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-tight mb-6 text-white">
          Transform Your Business with <span className="text-[#ef8031]">Innovative</span> IT Solutions
        </h1>
        <div className="w-full mb-8">
          <p className="text-xl text-white leading-relaxed text-justify max-w-2xl mx-auto">
            We deliver cutting-edge technology solutions that drive growth, enhance user experience, and accelerate your digital transformation journey.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link
            to="/services"
            className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 flex items-center group"
          >
            Explore Services <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link
            to="/contact"
            className="border-2 border-[#48a6f8] text-black hover:text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#48a6f8] transition-all duration-300"
          >
            Get Free Consultation
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-white">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span>24/7 Support</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span>99.9% Uptime</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span>Expert Team</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</motion.section>

    {/* Stats – no flicker, only children animate */}
<section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="text-center group"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeIn('down')}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-4 group-hover:scale-110 transition-transform">
            <stat.icon className="w-8 h-8 text-orange-600" />
          </div>
          <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
          <div className="text-gray-600 font-medium">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

    {/* Services */}
    <motion.section
      className="py-20 bg-gray-50"
      initial="hidden"
      whileInView="visible"
      viewport={fadeOptions}
      variants={fadeIn('up')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
              initial="hidden"
              whileInView="visible"
              viewport={fadeOptions}
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.1 } } }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>

    {/* Projects */}
    <motion.section
      className="py-20 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={fadeOptions}
      variants={fadeIn('right')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group hover:scale-102 hover:-translate-y-2"
              initial="hidden"
              whileInView="visible"
              viewport={fadeOptions}
              variants={{ hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: index * 0.15 } } }}
            >
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">{tech}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Results:</h4>
                  <ul className="space-y-1">
                    {project.results.map((result, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>

    {/* Tech Stack */}
    <motion.section
      className="py-16 bg-gray-50"
      initial="hidden"
      whileInView="visible"
      viewport={fadeOptions}
      variants={fadeIn('left')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Technology Stack</h2>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex space-x-8 animate-marquee">
            {techStack.concat(techStack).map((tech, idx) => (
              <div key={idx} className="flex-shrink-0 flex flex-col items-center group px-4">
                <div className="w-16 h-16 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center mb-3">
                  <img src={tech.logo} alt={tech.name} className="w-10 h-10" />
                </div>
                <span className="text-sm font-medium text-gray-700">{tech.name}</span>
              </div>
            ))}
          </div>
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 25s linear infinite;
            }
          `}</style>
        </div>
      </div>
    </motion.section>

    
    {/* Our Clients Swiper Section */}
<motion.section
  className="py-20 bg-white"
  initial="hidden"
  whileInView="visible"
  viewport={fadeOptions}
  variants={fadeIn('up-right')}
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Clients</h2>
    </div>
        {/* <OurClients /> */}
        <OurClientsResponsive />
  </div>
</motion.section>


  </div>
);

export default HomePage;







// {/* Right Side Icons */}
// <div className="hidden md:flex items-center space-x-4">
//   {/* WhatsApp */}
//   <a
//     href="https://wa.me/919876543210"
//     target="_blank"
//     rel="noopener noreferrer"
//     className="p-2 rounded-full bg-white hover:bg-green-100 whatsapp-glow"
//     title="WhatsApp"
//   >
//     <svg className="w-6 h-6" viewBox="0 0 48 48">
//       <path fill="#4CAF50" d="M4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5c5.1,0,9.8,2,13.4,5.6C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19h0c-3.2,0-6.3-0.8-9.1-2.3L4.9,43.3z"></path>
//       <path fill="#FAFAFA" d="M19.3,16c-0.4-0.8-0.7-0.8-1.1-0.8c-0.3,0-0.6,0-0.9,0s-0.8,0.1-1.3,0.6c-0.4,0.5-1.7,1.6-1.7,4s1.7,4.6,1.9,4.9s3.3,5.3,8.1,7.2c4,1.6,4.8,1.3,5.7,1.2c0.9-0.1,2.8-1.1,3.2-2.3c0.4-1.1,0.4-2.1,0.3-2.3c-0.1-0.2-0.4-0.3-0.9-0.6s-2.8-1.4-3.2-1.5c-0.4-0.2-0.8-0.2-1.1,0.2c-0.3,0.5-1.2,1.5-1.5,1.9c-0.3,0.3-0.6,0.4-1,0.1c-0.5-0.2-2-0.7-3.8-2.4c-1.4-1.3-2.4-2.8-2.6-3.3c-0.3-0.5,0-0.7,0.2-1c0.2-0.2,0.5-0.6,0.7-0.8c0.2-0.3,0.3-0.5,0.5-0.8c0.2-0.3,0.1-0.6,0-0.8C20.6,19.3,19.7,17,19.3,16z" clip-rule="evenodd"></path>
//     </svg>
//   </a>

//   {/* LinkedIn */}
//   <a
//     href="#your-linkedin"
//     target="_blank"
//     rel="noopener noreferrer"
//     className="p-2 rounded-full bg-white hover:bg-blue-100 linkedin-glow"
//     title="LinkedIn"
//   >
//     <svg className="w-6 h-6" viewBox="0 0 48 48">
//       <path fill="#0288D1" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path>
//       <path fill="#FFF" d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"></path>
//     </svg>
//   </a>

//   {/* Gmail */}
//   <a
//     href="#your-gmail"
//     target="_blank"
//     rel="noopener noreferrer"
//     className="p-2 rounded-full bg-white hover:bg-red-100 gmail-glow"
//     title="Gmail"
//   >
//     <svg className="w-6 h-6" viewBox="0 0 48 48">
//       <path fill="#4CAF50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"></path>
//       <path fill="#1E88E5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"></path>
//       <path fill="#E53935" d="M35,11.2L24,19.45L13,11.2L12,17L13,23.7L24,31.95L35,23.7L36,17L35,11.2z"></path>
//       <path fill="#C62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"></path>
//       <path fill="#FBC02D" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0C43.076,8,45,9.924,45,12.298z"></path>
//     </svg>
//   </a>
// </div>




