// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { ArrowLeft, Upload, CheckCircle } from "lucide-react";

// interface JobApplicationFormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   dob: string;
//   linkedin: string;
//   resume: File | null;
// }

// const JobApplicationForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const position = location.state?.position || "General Position";

//   const [formData, setFormData] = useState<JobApplicationFormData>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     dob: "",
//     linkedin: "",
//     resume: null,
//   });
//   const [fileError, setFileError] = useState<string>("");
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
//   const [submitError, setSubmitError] = useState<string>("");

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const file = e.target.files[0];
//       const validTypes = [
//         "application/pdf",
//         "application/msword",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       ];
//       if (!validTypes.includes(file.type)) {
//         setFileError("The file should be in .doc or .pdf format");
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         setFileError("File size should be less than 5MB");
//         return;
//       }
//       setFileError("");
//       setFormData({ ...formData, resume: file });
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitError("");
//     setIsSubmitting(true);

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setSubmitError("Please enter a valid email address.");
//       setIsSubmitting(false);
//       return;
//     }

//     // --- emailjs code removed below ---
//     // Simulate successful submission for UI/UX
//     setTimeout(() => {
//       setIsSubmitted(true);
//       setTimeout(() => navigate("/careers"), 3000);
//     }, 1200);
//     // --- end of removed section ---

//     // If you want to simulate an error, you can uncomment below:
//     // setSubmitError('There was an error submitting your application. Please try again or contact us directly at anonymoushacked480@gmail.com');
//     // setIsSubmitting(false);
//   };

//   if (isSubmitted) {
//     return (
//       <div className="min-h-screen flex items-center justify-center px-4 bg-[black]">
//         <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
//           <div className="w-16 h-16 bg-green-100 rounded-full mb-4 flex items-center justify-center">
//             <CheckCircle className="w-8 h-8 text-green-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">
//             Application Submitted!
//           </h2>
//           <p className="text-gray-600">
//             Thank you. We'll review and get back to you soon.
//           </p>
//           <p className="text-sm text-gray-500 mt-2">
//             Redirecting to careers page...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[black] py-20 mb-[-20px] px-2 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto mt-10">
//         <div className="tooltip-btn-wrapper">
//           <button
//             onClick={() => navigate("/careers")}
//             className="flex items-center text-orange-600 hover:text-orange-700 mb-8 tooltip-btn"
//             type="button"
//           >
//             <ArrowLeft className="w-5 h-5 mr-2" />
//             Back
//           </button>
//           <span className="tooltip-text">To Careers</span>
//         </div>

//         <div className="bg-white shadow-xl rounded-lg overflow-hidden">
//           <div className="bg-gradient-to-r from-orange-500 to-blue-500 p-6 text-white">
//             <h1 className="text-2xl font-bold">Job Application</h1>
//             <p className="mt-2 opacity-90">Position: {position}</p>
//           </div>

//           <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
//             <fieldset className="border-2 border-blue-200 rounded-xl p-6 mb-4 shadow-sm transition-all duration-300 hover:border-orange-400">
//               <legend className="px-3 text-lg font-semibold text-blue-600">
//                 Personal Information
//               </legend>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <input
//                   name="firstName"
//                   required
//                   value={formData.firstName}
//                   onChange={handleInputChange}
//                   placeholder="First Name *"
//                   className="input"
//                 />
//                 <input
//                   name="lastName"
//                   required
//                   value={formData.lastName}
//                   onChange={handleInputChange}
//                   placeholder="Last Name *"
//                   className="input"
//                 />
//                 <input
//                   name="email"
//                   required
//                   type="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   placeholder="Email *"
//                   className="input"
//                 />
//                 <input
//                   name="phone"
//                   required
//                   type="tel"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   placeholder="Phone *"
//                   className="input"
//                 />
//                 <input
//                   name="dob"
//                   required
//                   type="date"
//                   value={formData.dob}
//                   onChange={handleInputChange}
//                   className="input"
//                 />
//                 <input
//                   name="linkedin"
//                   type="url"
//                   value={formData.linkedin}
//                   onChange={handleInputChange}
//                   placeholder="LinkedIn Profile"
//                   className="input"
//                 />
//               </div>
//             </fieldset>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Resume *
//               </label>
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400">
//                 <Upload className="mx-auto w-10 h-10 text-gray-400" />
//                 <label
//                   htmlFor="resume"
//                   className="block cursor-pointer text-orange-600 font-medium"
//                 >
//                   Upload File
//                   <input
//                     type="file"
//                     id="resume"
//                     name="resume"
//                     required
//                     accept=".pdf,.doc,.docx"
//                     onChange={handleFileChange}
//                     className="sr-only"
//                   />
//                 </label>
//                 {formData.resume && (
//                   <p className="text-sm mt-2 text-green-600">
//                     {formData.resume.name}
//                   </p>
//                 )}
//                 {fileError && (
//                   <p className="text-sm mt-2 text-red-600">{fileError}</p>
//                 )}
//               </div>
//             </div>

//             {submitError && (
//               <p className="text-red-600 text-sm">{submitError}</p>
//             )}

//             <button
//               type="submit"
//               disabled={isSubmitting || !!fileError}
//               className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition disabled:opacity-50"
//             >
//               {isSubmitting ? "Submitting..." : "Submit Application"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobApplicationForm;


















import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Upload, CheckCircle } from "lucide-react";

interface JobApplicationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  linkedin: string;
  resume: File | null;
}

const JobApplicationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const position = location.state?.position || "General Position";

  const [formData, setFormData] = useState<JobApplicationFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    linkedin: "",
    resume: null,
  });
  const [fileError, setFileError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        setFileError("The file should be in .doc or .pdf format");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setFileError("File size should be less than 5MB");
        return;
      }
      setFileError("");
      setFormData({ ...formData, resume: file });
    }
  };

  // --- Your new handleSubmit function here ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitError("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    // Prepare form data for backend
    const data = new FormData();
    data.append('firstName', formData.firstName);
    data.append('lastName', formData.lastName);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('dob', formData.dob);
    data.append('linkedin', formData.linkedin);
    data.append('position', position); // <-- send position!
    if (formData.resume) {
      data.append('resume', formData.resume);
    }

    try {
      const response = await fetch('http://localhost:5000/api/apply', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => navigate("/careers"), 3000);
      } else {
        setSubmitError("There was an error submitting your application. Please try again or contact us directly at sriramborra00@gmail.com");
      }
    } catch (error) {
      console.error(error);
      setSubmitError("There was an error submitting your application. Please try again or contact us directly at sriramborra00@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };
  // --- End of handleSubmit ---

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[black]">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
          <div className="w-16 h-16 bg-green-100 rounded-full mb-4 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Application Submitted!
          </h2>
          <p className="text-gray-600">
            Thank you. We'll review and get back to you soon.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Redirecting to careers page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[black] py-20 mb-[-20px] px-2 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto mt-10">
        <div className="tooltip-btn-wrapper">
          <button
            onClick={() => navigate("/careers")}
            className="flex items-center text-orange-600 hover:text-orange-700 mb-8 tooltip-btn"
            type="button"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <span className="tooltip-text">To Careers</span>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-blue-500 p-6 text-white">
            <h1 className="text-2xl font-bold">Job Application</h1>
            <p className="mt-2 opacity-90">Position: {position}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <fieldset className="border-2 border-blue-200 rounded-xl p-6 mb-4 shadow-sm transition-all duration-300 hover:border-orange-400">
              <legend className="px-3 text-lg font-semibold text-blue-600">
                Personal Information
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name *"
                  className="input"
                />
                <input
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name *"
                  className="input"
                />
                <input
                  name="email"
                  required
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email *"
                  className="input"
                />
                <input
                  name="phone"
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone *"
                  className="input"
                />
                <input
                  name="dob"
                  required
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="input"
                />
                <input
                  name="linkedin"
                  type="url"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  placeholder="LinkedIn Profile"
                  className="input"
                />
              </div>
            </fieldset>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resume *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400">
                <Upload className="mx-auto w-10 h-10 text-gray-400" />
                <label
                  htmlFor="resume"
                  className="block cursor-pointer text-orange-600 font-medium"
                >
                  Upload File
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    required
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
                {formData.resume && (
                  <p className="text-sm mt-2 text-green-600">
                    {formData.resume.name}
                  </p>
                )}
                {fileError && (
                  <p className="text-sm mt-2 text-red-600">{fileError}</p>
                )}
              </div>
            </div>

            {submitError && (
              <p className="text-red-600 text-sm">{submitError}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !!fileError}
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationForm;