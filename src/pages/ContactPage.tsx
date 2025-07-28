// import React, { useState } from 'react';
// // import { Link } from 'react-router-dom';
// import { 
//   // ArrowRight, 
//   Mail, 
//   Phone, 
//   MapPin, 
//   Clock,
//   Send,
//   Linkedin,
//   Instagram,
//   Twitter,
//   CheckCircle
// } from 'lucide-react';

// const ContactPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     company: '',
//     service: '',
//     budget: '',
//     message: ''
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // Simulate form submission
//     await new Promise(resolve => setTimeout(resolve, 2000));
    
//     setIsSubmitting(false);
//     setIsSubmitted(true);
    
//     // Reset form after 3 seconds
//     setTimeout(() => {
//       setIsSubmitted(false);
//       setFormData({
//         name: '',
//         email: '',
//         phone: '',
//         company: '',
//         service: '',
//         budget: '',
//         message: ''
//       });
//     }, 3000);
//   };

//   const services = [
//     'UI/UX Design',
//     'Web Development',
//     'Mobile Applications',
//     'Digital Marketing',
//     'Branding',
//     'Photography',
//     'Graphic Design',
//     'Other'
//   ];

//   // const budgetRanges = [
//   //   'Under ₹50,000',
//   //   '₹50,000 - ₹1,00,000',
//   //   '₹1,00,000 - ₹2,50,000',
//   //   '₹2,50,000 - ₹5,00,000',
//   //   'Above ₹5,00,000'
//   // ];

//   const contactInfo = [
//     {
//       icon: MapPin,
//       title: 'Location',
//       details: ['Vijayawada', 'Andhra Pradesh'],
//       color: 'text-blue-600'
//     },
//     {
//       icon: Phone,
//       title: 'Phone',
//       details: ['+91 98765 43210'],
//       color: 'text-blue-600'
//     },
//     {
//       icon: Mail,
//       title: 'Email',
//       details: ['hello@synnectify.com'],
//       color: 'text-blue-600'
//     },
//     {
//       icon: Clock,
//       title: 'Business Hours',
//       details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM'],
//       color: 'text-blue-600'
//     }
//   ];

//   const socialLinks = [
//     { icon: Linkedin, name: 'LinkedIn', url: '#' },
//     { icon: Instagram, name: 'Instagram', url: '#' },
//     { icon: Twitter, name: 'Twitter', url: '#' }
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-20">
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//         <div className="absolute inset-0">
//           <img
//             src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
//             alt="Contact us"
//             className="w-full h-full object-cover opacity-20"
//           />
//         </div>
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
//             Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400">Touch</span>
//           </h1>
//           <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
//             Ready to transform your business with innovative technology solutions? Let's discuss your project and create something amazing together.
//           </p>
//         </div>
//       </section>

//       {/* Contact Form & Info */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             {
//             /* Contact Form */}
//             <div className="bg-white rounded-xl shadow-lg p-8">
//               <h2 className="text-3xl font-bold text-gray-900 mb-6">
//                 Send us a Message
//               </h2>
//               <p className="text-gray-600 mb-8">
//                 Fill out the form below and we'll get back to you within 24 hours.
//               </p>

//               {isSubmitted ? (
//                 <div className="text-center py-12">
//                   <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
//                     <CheckCircle className="w-8 h-8 text-green-600" />
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
//                   <p className="text-gray-600">Thank you for contacting us. We'll get back to you soon.</p>
//                 </div>
//               ) : (
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//                         Full Name *
//                       </label>
//                       <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
//                         placeholder="Your full name"
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                         Email Address *
//                       </label>
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
//                         placeholder="your@email.com"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
//                         Phone Number
//                       </label>
//                       <input
//                         type="tel"
//                         id="phone"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
//                         placeholder="+91 98765 43210"
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
//                         Company Name
//                       </label>
//                       <input
//                         type="text"
//                         id="company"
//                         name="company"
//                         value={formData.company}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
//                         placeholder="Your company"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
//                         Service Interested In
//                       </label>
//                       <select
//                         id="service"
//                         name="service"
//                         value={formData.service}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
//                       >
//                         <option value="">Select a service</option>
//                         {services.map((service) => (
//                           <option key={service} value={service}>
//                             {service}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     {/* <div>
//                       <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
//                         Project Budget
//                       </label>
//                       <select
//                         id="budget"
//                         name="budget"
//                         value={formData.budget}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
//                       >
//                         <option value="">Select budget range</option>
//                         {budgetRanges.map((range) => (
//                           <option key={range} value={range}>
//                             {range}
//                           </option>
//                         ))}
//                       </select>
//                     </div> */}
//                   </div>

//                   <div>
//                     <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
//                       Project Details *
//                     </label>
//                     <textarea
//                       id="message"
//                       name="message"
//                       value={formData.message}
//                       onChange={handleChange}
//                       required
//                       rows={6}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
//                       placeholder="Tell us about your project requirements, goals, and any specific features you need..."
//                     ></textarea>
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="w-full bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                         Sending...
//                       </>
//                     ) : (
//                       <>
//                         Send Message
//                         <Send className="ml-2 w-5 h-5" />
//                       </>
//                     )}
//                   </button>
//                 </form>
//               )}
//             </div>

//             {/* Contact Information */}
//             <div className="space-y-8">
//               <div>
//                 <h2 className="text-3xl font-bold text-gray-900 mb-6">
//                   Contact Information
//                 </h2>
//                 <p className="text-gray-600 mb-8">
//                   Get in touch with us through any of the following channels. We're here to help you succeed.
//                 </p>
//               </div>

//               <div className="space-y-6">
//                 {contactInfo.map((info, index) => (
//                   <div key={index} className="flex items-start space-x-4">
//                     <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg flex-shrink-0`}>
//                       <info.icon className="w-6 h-6 text-orange-600" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900 mb-1">{info.title}</h3>
//                       {info.details.map((detail, idx) => (
//                         <p key={idx} className="text-gray-600">{detail}</p>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Social Links */}
//               <div className="pt-8 border-t border-gray-200">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
//                 <div className="flex space-x-4">
//                   {socialLinks.map((social, index) => (
//                     <a
//                       key={index}
//                       href={social.url}
//                       className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-100 to-blue-100 rounded-lg hover:from-orange-200 hover:to-blue-200 transition-all duration-300 group"
//                     >
//                       <social.icon className="w-6 h-6 text-orange-600 group-hover:scale-110 transition-transform" />
//                     </a>
//                   ))}
//                 </div>
//               </div>

//               {/* Quick Response */}
//               <div className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl p-6 border border-orange-200">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Response Guarantee</h3>
//                 <p className="text-gray-600 mb-4">
//                   We respond to all inquiries within 24 hours. For urgent matters, call us directly.
//                 </p>
//                 <div className="flex items-center space-x-2 text-sm text-orange-600">
//                   <CheckCircle className="w-4 h-4" />
//                   <span>Free consultation included</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Map Section */}
// <section className="py-20 bg-white">
//   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//     <div className="text-center mb-12">
//       <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//         Visit Our Office
//       </h2>
//       <p className="text-lg text-gray-600">
//         Located in the heart of Vijayawada, Andhra Pradesh
//       </p>
//     </div>
    
//     <div className="bg-gray-200 rounded-xl overflow-hidden">
//       <div className="h-96 w-full">
//         <iframe 
//           src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d478.01874674207306!2d80.62978400000001!3d16.568957!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35ef08fe471911%3A0x3d3d334f64369e39!2sKavita%20Dairy!5e0!3m2!1sen!2sin!4v1752566690489!5m2!1sen!2sin" 
//           width="100%" 
//           height="100%" 
//           style={{ border: 0 }}
//           allowFullScreen
//           loading="lazy" 
//           referrerPolicy="no-referrer-when-downgrade"
//           className="w-full h-full"
//         ></iframe>
//       </div>
//       <div className="text-center p-6">
//         <h3 className="text-xl font-semibold text-gray-900 mb-2">SYNNECTIFY Office</h3>
//         <p className="text-gray-600">Vijayawada, Andhra Pradesh</p>
//       </div>
//     </div>
//   </div>
// </section>

//       {/* CTA Section */}
//       {/* <section className="py-20 bg-black text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             Ready to Start Your Project?
//           </h2>
//           <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
//             Don't wait any longer. Let's discuss your project and turn your ideas into reality.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <a
//               href="https://wa.me/919876543210?text=Hello! I'm ready to start my project. Can we discuss the details?"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center justify-center group"
//             >
//               Start Your Project
//               <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </a>
//             <Link
//               to="/portfolio"
//               className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300"
//             >
//               See Our Work
//             </Link>
//           </div>
//         </div>
//       </section> */}
//     </div>
//   );
// };

// export default ContactPage;
















import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { 
  // ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  Linkedin,
  Instagram,
  Twitter,
  CheckCircle
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Construct WhatsApp message
    const whatsappMessage = `Hello Synnectify Team,\n\nI'm interested in your services. Here are my details:\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Company:* ${formData.company}\n*Service Interested In:* ${formData.service}\n*Project Details:* ${formData.message}\n\nPlease contact me to discuss further.`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/919494669228?text=${encodedMessage}`, '_blank');
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        message: ''
      });
    }, 3000);
  };

  const services = [
    'UI/UX Design',
    'Web Development',
    'Mobile Applications',
    'Digital Marketing',
    'Branding',
    'Photography',
    'Graphic Design',
    'Other'
  ];

  // const budgetRanges = [
  //   'Under ₹50,000',
  //   '₹50,000 - ₹1,00,000',
  //   '₹1,00,000 - ₹2,50,000',
  //   '₹2,50,000 - ₹5,00,000',
  //   'Above ₹5,00,000'
  // ];

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Location',
      details: ['Vijayawada', 'Andhra Pradesh'],
      color: 'text-blue-600'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 98765 43210'],
      color: 'text-blue-600'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['Info@synnectify.com'],
      color: 'text-blue-600'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM'],
      color: 'text-blue-600'
    }
  ];

  const socialLinks = [
    { icon: Linkedin, name: 'LinkedIn', url: '#' },
    { icon: Instagram, name: 'Instagram', url: '#' },
    { icon: Twitter, name: 'Twitter', url: '#' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-20">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Contact us"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400">Touch</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your business with innovative technology solutions? Let's discuss your project and create something amazing together.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {
            /* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for contacting us. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                        placeholder="Your company"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                        Project Budget
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div> */}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Tell us about your project requirements, goals, and any specific features you need..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>
                <p className="text-gray-600 mb-8">
                  Get in touch with us through any of the following channels. We're here to help you succeed.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg flex-shrink-0`}>
                      <info.icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-100 to-blue-100 rounded-lg hover:from-orange-200 hover:to-blue-200 transition-all duration-300 group"
                    >
                      <social.icon className="w-6 h-6 text-orange-600 group-hover:scale-110 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Response */}
              <div className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl p-6 border border-orange-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Response Guarantee</h3>
                <p className="text-gray-600 mb-4">
                  We respond to all inquiries within 24 hours. For urgent matters, call us directly.
                </p>
                <div className="flex items-center space-x-2 text-sm text-orange-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Free consultation included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Visit Our Office
            </h2>
            <p className="text-lg text-gray-600">
              Located in the heart of Telangana, Andhra Pradesh
            </p>
          </div>
          
          <div className="bg-gray-200 rounded-xl overflow-hidden">
            <div className="h-96 w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d478.01874674207306!2d80.62978400000001!3d16.568957!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35ef08fe471911%3A0x3d3d334f64369e39!2sKavita%20Dairy!5e0!3m2!1sen!2sin!4v1752566690489!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">SYNNECTIFY Office</h3>
              <p className="text-gray-600">Vijayawada, Andhra Pradesh</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Don't wait any longer. Let's discuss your project and turn your ideas into reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919876543210?text=Hello! I'm ready to start my project. Can we discuss the details?"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center justify-center group"
            >
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/portfolio"
              className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              See Our Work
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  );
};
export default ContactPage;