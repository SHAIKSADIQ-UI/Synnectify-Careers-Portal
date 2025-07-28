// // import { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { 
// //   Palette, 
// //   Code, 
// //   Smartphone, 
// //   Megaphone, 
// //   Target, 
// //   Camera,
// //   ArrowRight,
// //   CheckCircle,
// //   Users,
// //   Clock,
// //   Award,
// //   Zap,
// //   Settings
// // } from 'lucide-react';

// // const ServicesPage = () => {
// //   const [activeService, setActiveService] = useState('ui-ux');

// //   const services = [
// //     {
// //       id: 'ui-ux',
// //       icon: Palette,
// //       title: 'UI/UX Design',
// //       subtitle: 'User-Centered Design Solutions',
// //       description: 'We create intuitive and engaging user experiences that drive conversions and delight your customers. Our design process focuses on understanding user behavior and business objectives.',
// //       image: 'https://i.postimg.cc/Y0yVKJwh/resized-image-540x360.png',
// //       features: [
// //         'User Research & Analysis',
// //         'Wireframing & Prototyping',
// //         'Visual Design & Branding',
// //         'Usability Testing',
// //         'Responsive Design',
// //         'Design System Creation',
// //         'User Journey Mapping',
// //         'Accessibility Compliance'
// //       ],
// //       technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle', 'Framer'],
// //       // pricing: 'Starting from ₹25,000',
// //       // timeline: '2-6 weeks',
// //       // caseStudy: {
// //       //   client: 'EcoShop',
// //       //   result: '40% increase in conversions',
// //       //   description: 'E-commerce platform redesign'
// //       // }
// //     },
// //     {
// //       id: 'web-development',
// //       icon: Code,
// //       title: 'Web Development',
// //       subtitle: 'Custom Web Applications',
// //       description: 'We build powerful, scalable web applications using modern frameworks and technologies. From simple websites to complex enterprise solutions, we deliver exceptional digital experiences.',
// //       image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
// //       features: [
// //         'Custom Web Application Development',
// //         'Responsive Design Implementation',
// //         'E-commerce Solutions',
// //         'Content Management Systems',
// //         'API Development & Integration',
// //         'Performance Optimization',
// //         'SEO Implementation',
// //         'Ongoing Maintenance & Support'
// //       ],
// //       technologies: ['React', 'Angular', 'Vue.js', 'Node.js', 'Python', 'PHP'],
// //       // pricing: 'Starting from ₹50,000',
// //       // timeline: '4-12 weeks',
// //       // caseStudy: {
// //       //   client: 'TechCorp',
// //       //   result: '300% performance improvement',
// //       //   description: 'Enterprise web platform'
// //       // }
// //     },
// //     {
// //       id: 'mobile-apps',
// //       icon: Smartphone,
// //       title: 'Mobile Applications',
// //       subtitle: 'iOS & Android Development',
// //       description: 'Native and cross-platform mobile applications that deliver exceptional user experiences. We build apps that scale with your business and engage your users effectively.',
// //       image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
// //       features: [
// //         'Native iOS & Android Development',
// //         'Cross-platform Solutions',
// //         'UI/UX Design for Mobile',
// //         'App Store Optimization',
// //         'Push Notifications',
// //         'Offline Functionality',
// //         'Third-party Integrations',
// //         'App Maintenance & Updates'
// //       ],
// //       technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Xamarin'],
// //       // pricing: 'Starting from ₹75,000',
// //       // timeline: '6-16 weeks',
// //       // caseStudy: {
// //       //   client: 'HealthPlus',
// //       //   result: '100K+ downloads',
// //       //   description: 'Healthcare mobile app'
// //       // }
// //     },
// //     {
// //       id: 'digital-marketing',
// //       icon: Megaphone,
// //       title: 'Digital Marketing',
// //       subtitle: 'Growth-Driven Marketing',
// //       description: 'Data-driven digital marketing strategies that increase your online visibility, drive qualified traffic, and convert visitors into customers.',
// //       image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
// //       features: [
// //         'Search Engine Optimization (SEO)',
// //         'Pay-Per-Click Advertising (PPC)',
// //         'Social Media Marketing',
// //         'Content Marketing Strategy',
// //         'Email Marketing Campaigns',
// //         'Analytics & Reporting',
// //         'Conversion Rate Optimization',
// //         'Marketing Automation'
// //       ],
// //       technologies: ['Google Ads', 'Facebook Ads', 'Google Analytics', 'HubSpot', 'Mailchimp'],
// //       // pricing: 'Starting from ₹30,000',
// //       // timeline: '2-8 weeks',
// //       // caseStudy: {
// //       //   client: 'RetailMax',
// //       //   result: '250% ROI increase',
// //       //   description: 'Digital marketing campaign'
// //       // }
// //     },
// //     {
// //       id: 'branding',
// //       icon: Target,
// //       title: 'Branding',
// //       subtitle: 'Brand Identity & Strategy',
// //       description: 'Complete brand identity solutions that make your business stand out. We create memorable brands that resonate with your target audience and drive business growth.',
// //       image: 'https://i.postimg.cc/QtZKSt9M/resized-brand-image-540x360.png',
// //       features: [
// //         'Brand Strategy Development',
// //         'Logo Design & Identity',
// //         'Brand Guidelines Creation',
// //         'Marketing Collateral Design',
// //         'Website Branding',
// //         'Social Media Branding',
// //         'Brand Voice & Messaging',
// //         'Brand Implementation'
// //       ],
// //       technologies: ['Adobe Creative Suite', 'Figma', 'Sketch', 'Canva Pro'],
// //       // pricing: 'Starting from ₹40,000',
// //       // timeline: '3-8 weeks',
// //       // caseStudy: {
// //       //   client: 'StartupX',
// //       //   result: 'Complete brand transformation',
// //       //   description: 'Brand identity redesign'
// //       // }
// //     },
// //     {
// //       id: 'photography',
// //       icon: Camera,
// //       title: 'Photography',
// //       subtitle: 'Photography Services',
// //       description: 'Professional photography services with pre-shoot planning, high-res shoots, creative lighting, retouching, and event coverage.',
// //       image: 'https://imgs.search.brave.com/jZEntI8sAG-l5nP5vM_xXyjVtRJnhZe61-Xg6xoWehU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzAyLzMwLzIw/LzM2MF9GXzMwMjMw/MjA5NF80ZUM0ajhv/SFhGU0VBRFdHSkUz/NmNIWlc2Vmt1b0Zq/ai5qcGc',
// //       features: [
// //         'Pre-shoot Planning & Consultation',
// //         'High-Resolution Photo Shoots',
// //         'Creative Lighting Setup',
// //         'Flyers, Posters, & Brochurese',
// //         'Web & App Graphics',
// //         'Packaging Design',
// //         'Adobe Photoshop',
// //         'Brand Discovery & Research',
        
// //       ],
// //       technologies: ['DJI Mavic', 'Phantom', 'SmugMug', 'Pixieset', 'Godox', 'Reflectors'],
     
// //     }
// //   ];

// //   const processSteps = [
// //     {
// //       step: '01',
// //       title: 'Discovery & Planning',
// //       description: 'We analyze your requirements, understand your business goals, and create a comprehensive project plan.',
// //       icon: Users
// //     },
// //     {
// //       step: '02',
// //       title: 'Design & Strategy',
// //       description: 'Our team creates detailed designs and strategies tailored to your specific needs and objectives.',
// //       icon: Settings
// //     },
// //     {
// //       step: '03',
// //       title: 'Development & Implementation',
// //       description: 'We build your solution using agile methodologies with continuous testing and quality assurance.',
// //       icon: Code
// //     },
// //     {
// //       step: '04',
// //       title: 'Launch & Support',
// //       description: 'We deploy your solution and provide ongoing support, maintenance, and optimization.',
// //       icon: Zap
// //     }
// //   ];

// //   const whyChooseUs = [
// //     {
// //       icon: Award,
// //       title: 'Proven Expertise',
// //       description: '200+ successful projects delivered across various industries'
// //     },
// //     {
// //       icon: Clock,
// //       title: 'On-Time Delivery',
// //       description: '98% of projects delivered on schedule with transparent communication'
// //     },
// //     {
// //       icon: Users,
// //       title: 'Dedicated Team',
// //       description: 'Experienced professionals dedicated to your project success'
// //     },
// //     {
// //       icon: Zap,
// //       title: '24/7 Support',
// //       description: 'Round-the-clock support and maintenance for all our solutions'
// //     }
// //   ];

// //   const currentService = services.find(service => service.id === activeService);

// //   return (
// //     <div className="min-h-screen bg-[white]">
// //       {/* Hero Section */}
// //       <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-20">
// //         <div className="absolute inset-0 bg-black opacity-50"></div>
// //         <div className="absolute inset-0">
// //           <img
// //             src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
// //             alt="Technology services"
// //             className="w-full h-full object-cover opacity-20"
// //           />
// //         </div>
// //         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
// //           <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
// //             Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400">Services</span>
// //           </h1>
// //           <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
// //             Comprehensive IT solutions designed to transform your business, enhance user experience, and drive growth in the digital age.
// //           </p>
// //           <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //             <Link
// //               to="/contact"
// //               className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 inline-flex items-center justify-center group"
// //             >
// //               Get Free Consultation
// //               <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
// //             </Link>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Services Navigation */}
// //       <section className="py-8 bg-gray-900 sticky top-0 z-40 border-b border-gray-700">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex overflow-x-auto space-x-4 pb-2">
// //             {services.map((service) => (
// //               <button
// //                 key={service.id}
// //                 onClick={() => setActiveService(service.id)}
// //                 className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
// //                   activeService === service.id
// //                     ? 'bg-orange-500 text-white shadow-lg'
// //                     : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-600'
// //                 }`}
// //               >
// //                 <service.icon className="w-5 h-5" />
// //                 <span>{service.title}</span>
// //               </button>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Service Detail */}
// //       {currentService && (
// //         <section className="py-20">
// //           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
// //               <div>
// //                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl mb-6">
// //                   <currentService.icon className="w-8 h-8 text-orange-600" />
// //                 </div>
// //                 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
// //                   {currentService.title}
// //                 </h2>
// //                 <p className="text-xl text-blue-600 mb-6">{currentService.subtitle}</p>
// //                 <p className="text-gray-700 mb-8 leading-relaxed text-lg">
// //                   {currentService.description}
// //                 </p>
                
// //                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
// //                   <div className="text-center p-4 rounded-lg">
// //                     <div className="text-2xl font-bold text-gray-900 mb-1"></div>
// //                     <div className="text-sm text-gray-600"></div>
// //                   </div>
// //                   <div className="text-center p-4 rounded-lg">
// //                     <div className="text-2xl font-bold text-gray-900 mb-1"></div>
// //                     <div className="text-sm text-gray-600"></div>
// //                   </div>
// //                   <div className="text-center p-4  rounded-lg">
// //                     <div className="text-2xl font-bold text-gray-900 mb-1"></div>
// //                     <div className="text-sm text-gray-600"></div>
// //                   </div>
// //                 </div>

// //                 <Link
// //                   to="/contact"
// //                   className="bg-orange-500 text-white px-8 py-3 mt-[-90px] rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 inline-flex items-center group"
// //                 >
// //                   Get Started
// //                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
// //                 </Link>
// //               </div>
              
// //               <div className="relative">
// //                 <img
// //                   src={currentService.image}
// //                   alt={currentService.title}
// //                   className="rounded-lg shadow-2xl"
// //                 />
// //                 <div className="absolute">
// //                   <div className="text-center">
// //                     <div className="text-2xl font-bold text-gray-900"></div>
// //                     <div className="text-sm text-gray-600 mb-2"></div>
// //                     <div className="text-xs text-gray-500"></div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Features & Technologies */}
// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
// //               <div>
// //                 <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h3>
// //                 <div className="space-y-4">
// //                   {currentService.features.map((feature, index) => (
// //                     <div key={index} className="flex items-start space-x-3">
// //                       <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
// //                       <span className="text-gray-700">{feature}</span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
              
// //               <div>
// //                 <h3 className="text-2xl font-bold text-gray-900 mb-6">Technologies We Use</h3>
// //                 <div className="grid grid-cols-2 gap-3">
// //                   {currentService.technologies.map((tech, index) => (
// //                     <div key={index} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-center font-medium">
// //                       {tech}
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </section>
// //       )}

// //       {/* Our Process */}
// //       <section className="py-20 bg-gray-50">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="text-center mb-16">
// //             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
// //               Our Process
// //             </h2>
// //             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
// //               We follow a proven methodology to ensure successful project delivery and client satisfaction
// //             </p>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
// //             {processSteps.map((step, index) => (
// //               <div key={index} className="text-center">
// //                 <div className="relative mb-6">
// //                   <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
// //                     <step.icon className="w-10 h-10 text-white" />
// //                   </div>
// //                   <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold text-blue-600 border-2 border-blue-600">
// //                     {step.step}
// //                   </div>
// //                 </div>
// //                 <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
// //                 <p className="text-gray-600 leading-relaxed">{step.description}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Why Choose Us */}
// //       <section className="py-20 bg-white">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="text-center mb-16">
// //             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
// //               Why Choose SYNNECTIFY?
// //             </h2>
// //             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
// //               We combine technical expertise with business acumen to deliver solutions that drive real results
// //             </p>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
// //             {whyChooseUs.map((item, index) => (
// //               <div key={index} className="text-center group">
// //                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl mb-6 group-hover:scale-110 transition-transform">
// //                   <item.icon className="w-8 h-8 text-orange-600" />
// //                 </div>
// //                 <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
// //                 <p className="text-gray-600 leading-relaxed">{item.description}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* CTA Section */}
// //       <section className="py-20 bg-black text-white">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
// //           <h2 className="text-3xl md:text-4xl font-bold mb-4">
// //             Ready to Get Started?
// //           </h2>
// //           <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
// //             Let's discuss your project requirements and create a solution that drives your business forward.
// //           </p>
// //           <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //             <Link
// //               to="/contact"
// //               className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center justify-center group"
// //             >
// //               Start Your Project
// //               <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
// //             </Link>
// //             <Link
// //               to="/portfolio"
// //               className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300"
// //             >
// //               View Our Work
// //             </Link>
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default ServicesPage;








// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Palette,
//   Code,
//   Smartphone,
//   Megaphone,
//   Target,
//   Camera,
//   ArrowRight,
//   CheckCircle,
//   Users,
//   Clock,
//   Award,
//   Zap,
//   Settings
// } from 'lucide-react';

// /* ------------------------------------------------------------------ */
// /*  tiny helper that injects the btn-12 CSS once at runtime            */
// /* ------------------------------------------------------------------ */
// const Btn12Styles = () => (
//   <style>{`
//     .btn-12,
//     .btn-12 *,
//     .btn-12 :after,
//     .btn-12 :before,
//     .btn-12:after,
//     .btn-12:before {
//       border: 0 solid;
//       box-sizing: border-box;
//     }
//     .btn-12 {
//       -webkit-tap-highlight-color: transparent;
//       -webkit-appearance: button;
//       background-color: #000;
//       background-image: none;
//       color: #fff;
//       cursor: pointer;
//       font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
//         Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
//         Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
//       font-size: 100%;
//       font-weight: 900;
//       line-height: 1.5;
//       margin: 0;
//       -webkit-mask-image: -webkit-radial-gradient(#000, #fff);
//       padding: 0;
//       text-transform: uppercase;
//       border-radius: 9999px;
//       border-width: 2px;
//       overflow: hidden;
//       padding: 0.5rem 1.5rem;
//       position: relative;
//       white-space: nowrap;
//     }
//     .btn-12 span {
//       mix-blend-mode: difference;
//     }
//     .btn-12:after,
//     .btn-12:before {
//       background: linear-gradient(
//         90deg,
//         #fff 25%,
//         transparent 0,
//         transparent 50%,
//         #fff 0,
//         #fff 75%,
//         transparent 0
//       );
//       content: "";
//       inset: 0;
//       position: absolute;
//       transform: translateY(var(--progress, 100%));
//       transition: transform 0.2s ease;
//     }
//     .btn-12:after {
//       --progress: -100%;
//       background: linear-gradient(
//         90deg,
//         transparent 0,
//         transparent 25%,
//         #fff 0,
//         #fff 50%,
//         transparent 0,
//         transparent 75%,
//         #fff 0
//       );
//       z-index: -1;
//     }
//     .btn-12:hover:after,
//     .btn-12:hover:before {
//       --progress: 0;
//     }
//     .btn-12.active {
//       background-color: #fff;
//       color: #fff;
      
//     }
//   `}</style>
// );

// /* ------------------------------------------------------------------ */
// /*  rest of ServicesPage                                              */
// /* ------------------------------------------------------------------ */
// const ServicesPage = () => {
//   const [activeService, setActiveService] = useState('ui-ux');

//   const services = [
//     {
//       id: 'ui-ux',
//       icon: Palette,
//       title: 'UI/UX Design',
//       subtitle: 'User-Centered Design Solutions',
//       description:
//         'We create intuitive and engaging user experiences that drive conversions and delight your customers. Our design process focuses on understanding user behavior and business objectives.',
//       image: 'https://i.postimg.cc/Y0yVKJwh/resized-image-540x360.png',
//       features: [
//         'User Research & Analysis',
//         'Wireframing & Prototyping',
//         'Visual Design & Branding',
//         'Usability Testing',
//         'Responsive Design',
//         'Design System Creation',
//         'User Journey Mapping',
//         'Accessibility Compliance'
//       ],
//       technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle', 'Framer']
//     },
//     {
//       id: 'web-development',
//       icon: Code,
//       title: 'Web Development',
//       subtitle: 'Custom Web Applications',
//       description:
//         'We build powerful, scalable web applications using modern frameworks and technologies. From simple websites to complex enterprise solutions, we deliver exceptional digital experiences.',
//       image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
//       features: [
//         'Custom Web Application Development',
//         'Responsive Design Implementation',
//         'E-commerce Solutions',
//         'Content Management Systems',
//         'API Development & Integration',
//         'Performance Optimization',
//         'SEO Implementation',
//         'Ongoing Maintenance & Support'
//       ],
//       technologies: ['React', 'Angular', 'Vue.js', 'Node.js', 'Python', 'PHP']
//     },
//     {
//       id: 'mobile-apps',
//       icon: Smartphone,
//       title: 'Mobile Applications',
//       subtitle: 'iOS & Android Development',
//       description:
//         'Native and cross-platform mobile applications that deliver exceptional user experiences. We build apps that scale with your business and engage your users effectively.',
//       image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
//       features: [
//         'Native iOS & Android Development',
//         'Cross-platform Solutions',
//         'UI/UX Design for Mobile',
//         'App Store Optimization',
//         'Push Notifications',
//         'Offline Functionality',
//         'Third-party Integrations',
//         'App Maintenance & Updates'
//       ],
//       technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Xamarin']
//     },
//     {
//       id: 'digital-marketing',
//       icon: Megaphone,
//       title: 'Digital Marketing',
//       subtitle: 'Growth-Driven Marketing',
//       description:
//         'Data-driven digital marketing strategies that increase your online visibility, drive qualified traffic, and convert visitors into customers.',
//       image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
//       features: [
//         'Search Engine Optimization (SEO)',
//         'Pay-Per-Click Advertising (PPC)',
//         'Social Media Marketing',
//         'Content Marketing Strategy',
//         'Email Marketing Campaigns',
//         'Analytics & Reporting',
//         'Conversion Rate Optimization',
//         'Marketing Automation'
//       ],
//       technologies: ['Google Ads', 'Facebook Ads', 'Google Analytics', 'HubSpot', 'Mailchimp']
//     },
//     {
//       id: 'branding',
//       icon: Target,
//       title: 'Branding',
//       subtitle: 'Brand Identity & Strategy',
//       description:
//         'Complete brand identity solutions that make your business stand out. We create memorable brands that resonate with your target audience and drive business growth.',
//       image: 'https://i.postimg.cc/QtZKSt9M/resized-brand-image-540x360.png',
//       features: [
//         'Brand Strategy Development',
//         'Logo Design & Identity',
//         'Brand Guidelines Creation',
//         'Marketing Collateral Design',
//         'Website Branding',
//         'Social Media Branding',
//         'Brand Voice & Messaging',
//         'Brand Implementation'
//       ],
//       technologies: ['Adobe Creative Suite', 'Figma', 'Sketch', 'Canva Pro']
//     },
//     {
//       id: 'photography',
//       icon: Camera,
//       title: 'Photography',
//       subtitle: 'Photography Services',
//       description:
//         'Professional photography services with pre-shoot planning, high-res shoots, creative lighting, retouching, and event coverage.',
//       image: 'https://imgs.search.brave.com/jZEntI8sAG-l5nP5vM_xXyjVtRJnhZe61-Xg6xoWehU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzAyLzMwLzIw/LzM2MF9GXzMwMjMw/MjA5NF80ZUM0ajhv/SFhGU0VBRFdHSkUz/NmNIWlc2Vmt1b0Zq/ai5qcGc',
//       features: [
//         'Pre-shoot Planning & Consultation',
//         'High-Resolution Photo Shoots',
//         'Creative Lighting Setup',
//         'Flyers, Posters, & Brochures',
//         'Web & App Graphics',
//         'Packaging Design',
//         'Adobe Photoshop',
//         'Brand Discovery & Research'
//       ],
//       technologies: ['DJI Mavic', 'Phantom', 'SmugMug', 'Pixieset', 'Godox', 'Reflectors']
//     }
//   ];

//   const processSteps = [
//     {
//       step: '01',
//       title: 'Discovery & Planning',
//       description:
//         'We analyze your requirements, understand your business goals, and create a comprehensive project plan.',
//       icon: Users
//     },
//     {
//       step: '02',
//       title: 'Design & Strategy',
//       description:
//         'Our team creates detailed designs and strategies tailored to your specific needs and objectives.',
//       icon: Settings
//     },
//     {
//       step: '03',
//       title: 'Development & Implementation',
//       description:
//         'We build your solution using agile methodologies with continuous testing and quality assurance.',
//       icon: Code
//     },
//     {
//       step: '04',
//       title: 'Launch & Support',
//       description:
//         'We deploy your solution and provide ongoing support, maintenance, and optimization.',
//       icon: Zap
//     }
//   ];

//   const whyChooseUs = [
//     {
//       icon: Award,
//       title: 'Proven Expertise',
//       description: '200+ successful projects delivered across various industries'
//     },
//     {
//       icon: Clock,
//       title: 'On-Time Delivery',
//       description: '98% of projects delivered on schedule with transparent communication'
//     },
//     {
//       icon: Users,
//       title: 'Dedicated Team',
//       description: 'Experienced professionals dedicated to your project success'
//     },
//     {
//       icon: Zap,
//       title: '24/7 Support',
//       description: 'Round-the-clock support and maintenance for all our solutions'
//     }
//   ];

//   const currentService = services.find((service) => service.id === activeService);

//   return (
//     <>
//       <Btn12Styles />
//       <div className="min-h-screen bg-white">
//         {/* Hero Section */}
//         <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-20">
//           <div className="absolute inset-0 bg-black opacity-50" />
//           <div className="absolute inset-0">
//             <img
//               src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
//               alt="Technology services"
//               className="w-full h-full object-cover opacity-20"
//             />
//           </div>
//           <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
//               Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400">Services</span>
//             </h1>
//             <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
//               Comprehensive IT solutions designed to transform your business, enhance user experience, and drive growth in the digital age.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link
//                 to="/contact"
//                 className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 inline-flex items-center justify-center group"
//               >
//                 Get Free Consultation
//                 <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </Link>
//             </div>
//           </div>
//         </section>

//         {/* Services Navigation */}
//         <section className="py-8 sticky top-0 z-40 border-b border-[#2fa9f0] backdrop-blur-md bg-white/5">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex overflow-x-auto space-x-6 pb-2">
//               {services.map((service) => (
//                 <button
//                   key={service.id}
//                   onClick={() => setActiveService(service.id)}
//                   className={`btn-12 ${activeService === service.id ? 'active' : ''}`}
//                 >
//                   <span className="flex items-center space-x-2">
//                     <service.icon className="w-4 h-4" />
//                     {service.title}
//                   </span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Service Detail */}
//         {currentService && (
//           <section className="py-20">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
//                 <div>
//                   <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl mb-6">
//                     <currentService.icon className="w-8 h-8 text-orange-600" />
//                   </div>
//                   <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                     {currentService.title}
//                   </h2>
//                   <p className="text-xl text-blue-600 mb-6">{currentService.subtitle}</p>
//                   <p className="text-gray-700 mb-8 leading-relaxed text-lg">
//                     {currentService.description}
//                   </p>

//                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
//                     <div className="text-center p-4 rounded-lg">
//                       <div className="text-2xl font-bold text-gray-900 mb-1" />
//                       <div className="text-sm text-gray-600" />
//                     </div>
//                     <div className="text-center p-4 rounded-lg">
//                       <div className="text-2xl font-bold text-gray-900 mb-1" />
//                       <div className="text-sm text-gray-600" />
//                     </div>
//                     <div className="text-center p-4 rounded-lg">
//                       <div className="text-2xl font-bold text-gray-900 mb-1" />
//                       <div className="text-sm text-gray-600" />
//                     </div>
//                   </div>

//                   <Link
//                     to="/contact"
//                     className="bg-orange-500 text-white px-8 py-3 mt-[-90px] rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 inline-flex items-center group"
//                   >
//                     Get Started
//                     <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                   </Link>
//                 </div>

//                 <div className="relative">
//                   <img
//                     src={currentService.image}
//                     alt={currentService.title}
//                     className="rounded-lg shadow-2xl"
//                   />
//                   <div className="absolute">
//                     <div className="text-center">
//                       <div className="text-2xl font-bold text-gray-900" />
//                       <div className="text-sm text-gray-600 mb-2" />
//                       <div className="text-xs text-gray-500" />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Features & Technologies */}
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//                 <div>
//                   <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h3>
//                   <div className="space-y-4">
//                     {currentService.features.map((feature, index) => (
//                       <div key={index} className="flex items-start space-x-3">
//                         <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
//                         <span className="text-gray-700">{feature}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-2xl font-bold text-gray-900 mb-6">Technologies We Use</h3>
//                   <div className="grid grid-cols-2 gap-3">
//                     {currentService.technologies.map((tech, index) => (
//                       <div
//                         key={index}
//                         className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-center font-medium"
//                       >
//                         {tech}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         )}

//         {/* Our Process */}
//         <section className="py-20 bg-gray-50">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-16">
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
//               <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//                 We follow a proven methodology to ensure successful project delivery and client satisfaction
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {processSteps.map((step, index) => (
//                 <div key={index} className="text-center">
//                   <div className="relative mb-6">
//                     <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <step.icon className="w-10 h-10 text-white" />
//                     </div>
//                     <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold text-blue-600 border-2 border-blue-600">
//                       {step.step}
//                     </div>
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
//                   <p className="text-gray-600 leading-relaxed">{step.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Why Choose Us */}
//         <section className="py-20 bg-white">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-16">
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose SYNNECTIFY?</h2>
//               <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//                 We combine technical expertise with business acumen to deliver solutions that drive real results
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {whyChooseUs.map((item, index) => (
//                 <div key={index} className="text-center group">
//                   <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl mb-6 group-hover:scale-110 transition-transform">
//                     <item.icon className="w-8 h-8 text-orange-600" />
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
//                   <p className="text-gray-600 leading-relaxed">{item.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="py-20 bg-black text-white">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
//             <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
//               Let's discuss your project requirements and create a solution that drives your business forward.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link
//                 to="/contact"
//                 className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center justify-center group"
//               >
//                 Start Your Project
//                 <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </Link>
//               <Link
//                 to="/portfolio"
//                 className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300"
//               >
//                 View Our Work
//               </Link>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// };

// export default ServicesPage;














import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Palette,
  Code,
  Smartphone,
  Megaphone,
  Target,
  Camera,
  ArrowRight,
  CheckCircle,
  Users,
  Clock,
  Award,
  Zap,
  Settings
} from 'lucide-react';

const ServicesPage = () => {
  const [activeService, setActiveService] = useState('ui-ux');

  const services = [
    {
      id: 'ui-ux',
      icon: Palette,
      title: 'UI/UX Design',
      subtitle: 'User-Centered Design Solutions',
      description:
        'We create intuitive and engaging user experiences that drive conversions and delight your customers. Our design process focuses on understanding user behavior and business objectives.',
      image: 'https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg?semt=ais_hybrid&w=740',
      features: [
        'User Research & Analysis',
        'Wireframing & Prototyping',
        'Visual Design & Branding',
        'Usability Testing',
        'Responsive Design',
        'Design System Creation',
        'User Journey Mapping',
        'Accessibility Compliance'
      ],
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle', 'Framer']
    },
    {
      id: 'web-development',
      icon: Code,
      title: 'Web Development',
      subtitle: 'Custom Web Applications',
      description:
        'We build powerful, scalable web applications using modern frameworks and technologies. From simple websites to complex enterprise solutions, we deliver exceptional digital experiences.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      features: [
        'Custom Web Application Development',
        'Responsive Design Implementation',
        'E-commerce Solutions',
        'Content Management Systems',
        'API Development & Integration',
        'Performance Optimization',
        'SEO Implementation',
        'Ongoing Maintenance & Support'
      ],
      technologies: ['React', 'Angular', 'Vue.js', 'Node.js', 'Python', 'PHP']
    },
    {
      id: 'mobile-apps',
      icon: Smartphone,
      title: 'Mobile Applications',
      subtitle: 'iOS & Android Development',
      description:
        'Native and cross-platform mobile applications that deliver exceptional user experiences. We build apps that scale with your business and engage your users effectively.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      features: [
        'Native iOS & Android Development',
        'Cross-platform Solutions',
        'UI/UX Design for Mobile',
        'App Store Optimization',
        'Push Notifications',
        'Offline Functionality',
        'Third-party Integrations',
        'App Maintenance & Updates'
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Xamarin']
    },
    {
      id: 'digital-marketing',
      icon: Megaphone,
      title: 'Digital Marketing',
      subtitle: 'Growth-Driven Marketing',
      description:
        'Data-driven digital marketing strategies that increase your online visibility, drive qualified traffic, and convert visitors into customers.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      features: [
        'Search Engine Optimization (SEO)',
        'Pay-Per-Click Advertising (PPC)',
        'Social Media Marketing',
        'Content Marketing Strategy',
        'Email Marketing Campaigns',
        'Analytics & Reporting',
        'Conversion Rate Optimization',
        'Marketing Automation'
      ],
      technologies: ['Google Ads', 'Facebook Ads', 'Google Analytics', 'HubSpot', 'Mailchimp']
    },
    {
      id: 'branding',
      icon: Target,
      title: 'Branding',
      subtitle: 'Brand Identity & Strategy',
      description:
        'Complete brand identity solutions that make your business stand out. We create memorable brands that resonate with your target audience and drive business growth.',
      image: 'https://img.freepik.com/vecteurs-libre/vecteur-conception-degrade-colore-oiseau_343694-2506.jpg?semt=ais_hybrid&w=740',
      features: [
        'Brand Strategy Development',
        'Logo Design & Identity',
        'Brand Guidelines Creation',
        'Marketing Collateral Design',
        'Website Branding',
        'Social Media Branding',
        'Brand Voice & Messaging',
        'Brand Implementation'
      ],
      technologies: ['Adobe Creative Suite', 'Figma', 'Sketch', 'Canva Pro']
    },
    {
      id: 'photography',
      icon: Camera,
      title: 'Photography',
      subtitle: 'Photography Services',
      description:
        'Professional photography services with pre-shoot planning, high-res shoots, creative lighting, retouching, and event coverage.',
      image: 'https://imgs.search.brave.com/jZEntI8sAG-l5nP5vM_xXyjVtRJnhZe61-Xg6xoWehU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzAyLzMwLzIw/LzM2MF9GXzMwMjMw/MjA5NF80ZUM0ajhv/SFhGU0VBRFdHSkUz/NmNIWlc2Vmt1b0Zq/ai5qcGc',
      features: [
        'Pre-shoot Planning & Consultation',
        'High-Resolution Photo Shoots',
        'Creative Lighting Setup',
        'Flyers, Posters, & Brochures',
        'Web & App Graphics',
        'Packaging Design',
        'Adobe Photoshop',
        'Brand Discovery & Research'
      ],
      technologies: ['DJI Mavic', 'Phantom', 'SmugMug', 'Pixieset', 'Godox', 'Reflectors']
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description:
        'We analyze your requirements, understand your business goals, and create a comprehensive project plan.',
      icon: Users
    },
    {
      step: '02',
      title: 'Design & Strategy',
      description:
        'Our team creates detailed designs and strategies tailored to your specific needs and objectives.',
      icon: Settings
    },
    {
      step: '03',
      title: 'Development & Implementation',
      description:
        'We build your solution using agile methodologies with continuous testing and quality assurance.',
      icon: Code
    },
    {
      step: '04',
      title: 'Launch & Support',
      description:
        'We deploy your solution and provide ongoing support, maintenance, and optimization.',
      icon: Zap
    }
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: 'Proven Expertise',
      description: '200+ successful projects delivered across various industries'
    },
    {
      icon: Clock,
      title: 'On-Time Delivery',
      description: '98% of projects delivered on schedule with transparent communication'
    },
    {
      icon: Users,
      title: 'Dedicated Team',
      description: 'Experienced professionals dedicated to your project success'
    },
    {
      icon: Zap,
      title: '24/7 Support',
      description: 'Round-the-clock support and maintenance for all our solutions'
    }
  ];

  const currentService = services.find((service) => service.id === activeService);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section ------------------------------------------------ */}
      <section className="relative bg-gradient-to-br from-[#686666] via-[#5a5757] to-[#524f4f] text-white py-20">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0">
          <motion.img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Technology services"
            className="w-full h-full object-cover opacity-20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 0.2, y: 0 }}
            viewport={{ once: false }}
            transition={{ ease: 'easeOut', duration: 0.9 }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400">Services</span>
          </h1>
          <p className="text-xl text-white-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Comprehensive IT solutions designed to transform your business, enhance user experience, and drive growth in the digital age.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 inline-flex items-center justify-center group"
            >
              Get Free Consultation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Navigation ---------------------------------------- */}
      <section className="py-5 sticky top-0 z-40 animated-border backdrop-blur-md bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <div className="scroll-strip flex space-x-6">
              {[...services, ...services].map((service, idx) => (
                <button
                  key={service.id + '-' + idx}
                  onClick={() => setActiveService(service.id)}
                  className={`btn-12 ${activeService === service.id ? 'active' : ''}`}
                >
                  <span className="flex items-center space-x-2">
                    <service.icon className="w-4 h-4" />
                    {service.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Detail --------------------------------------------- */}
      {currentService && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl mb-6">
                  <currentService.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {currentService.title}
                </h2>
                <p className="text-xl text-blue-600 mb-6">{currentService.subtitle}</p>
                <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                  {currentService.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 mb-1" />
                    <div className="text-sm text-gray-600" />
                  </div>
                  <div className="text-center p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 mb-1" />
                    <div className="text-sm text-gray-600" />
                  </div>
                  <div className="text-center p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 mb-1" />
                    <div className="text-sm text-gray-600" />
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="bg-orange-500 text-white px-8 py-3 mt-[-90px] rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 inline-flex items-center group"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Service image animated on every scroll */}
              <div className="relative">
                <motion.img
                  src={currentService.image}
                  alt={currentService.title}
                  className="rounded-lg shadow-2xl"
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ ease: 'easeOut', duration: 0.9 }}
                />
              </div>
            </div>

            {/* Features & Technologies */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h3>
                <div className="space-y-4">
                  {currentService.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Technologies We Use</h3>
                <div className="grid grid-cols-2 gap-3">
                  {currentService.technologies.map((tech, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-center font-medium"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Our Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We follow a proven methodology to ensure successful project delivery and client satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold text-blue-600 border-2 border-blue-600">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose SYNNECTIFY?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We combine technical expertise with business acumen to deliver solutions that drive real results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;