import React from "react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

function ImageWithFallback(props) {
  const [didError, setDidError] = useState(false);
  const { src, alt, style, className, ...rest } = props;

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==" alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={() => setDidError(true)} />
  );
}

export default function TrinityLawFirm({ 
  primaryColor = "#0a2351",
  accentColor = "#bf9b30",
  ctaText = "Contact Us Today",
  animationDuration = 0.6,
  animationDelay = 0.1
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    contactMethod: "whatsapp" // Default to WhatsApp
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const formRef = useRef(null);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const copyEmailToClipboard = async () => {
    try {
      const emailContent = `To: ebangwesse@yahoo.com
Subject: New Contact Form Submission - Trinity Law Firm

New Contact Form Submission from Trinity Law Firm Website

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}

Message:
${formData.message}

---
Sent from Trinity Law Firm website`;

      await navigator.clipboard.writeText(emailContent);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = emailContent;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(false);
    
    if (formData.contactMethod === "whatsapp") {
      // Format message for WhatsApp
      const whatsappMessage = `*New Contact Form Submission from Trinity Law Firm Website*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone || 'Not provided'}

*Message:*
${formData.message}

---
Sent from Trinity Law Firm website`;

      // Encode the message for WhatsApp URL
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/237677275129?text=${encodedMessage}`;
      
      // Open WhatsApp with the pre-filled message
      window.open(whatsappUrl, '_blank');
      
      // Show success message
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        // Reset form after successful submission
        if (formRef.current) {
          formRef.current.reset();
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            contactMethod: "whatsapp"
          });
        }
      }, 500);
          } else {
        // Email handling using Web3Forms backend service
        const formDataToSend = new FormData();
        formDataToSend.append('access_key', '85f6997a-6e95-48d9-b796-6b1dbad336f5'); // Add access_key
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone || 'Not provided');
        formDataToSend.append('message', formData.message);
        formDataToSend.append('contactMethod', 'Email');
        formDataToSend.append('subject', 'New Contact Form Submission - Trinity Law Firm');
        
        // Send to Web3Forms with your access key
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formDataToSend
        })
        .then(response => {
          console.log('Web3Forms Response Status:', response.status);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Web3Forms Response Data:', data);
          if (data.success) {
            setIsSubmitting(false);
            setSubmitSuccess(true);
            
            // Reset form after successful submission
            if (formRef.current) {
              formRef.current.reset();
              setFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
                contactMethod: "whatsapp"
              });
            }
          } else {
            throw new Error('Form submission failed: ' + (data.message || 'Unknown error'));
          }
        })
        .catch(error => {
          console.error('Error submitting form:', error);
          setIsSubmitting(false);
          setSubmitError(true);
        });
      }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: animationDuration,
        ease: "easeOut"
      }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-full flex flex-col font-sans bg-white text-gray-800">
      {/* Header/Navigation */}
      <motion.header 
        className="sticky top-0 z-50 bg-white shadow-md"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              className="flex items-center"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold" style={{ color: primaryColor }}>
                TRINITY <span style={{ color: accentColor }}>LAW FIRM</span>
              </h1>
            </motion.div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {["Home", "About Us", "Practice Areas", "Our Team", "Contact"].map((item, index) => (
                <motion.a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(/\s+/g, '')}`}
                  className="font-medium hover:text-opacity-75" 
                  style={{ color: primaryColor }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
            
            {/* Mobile menu button */}
            <motion.div 
              className="md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button 
                onClick={toggleMenu} 
                className="p-2 rounded-md focus:outline-none"
                style={{ color: primaryColor }}
              >
                {isMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </motion.div>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div 
              className="md:hidden mt-4 pt-4 border-t"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="flex flex-col space-y-4"
                variants={staggerChildren}
                initial="hidden"
                animate="visible"
              >
                {["Home", "About Us", "Practice Areas", "Our Team", "Contact"].map((item) => (
                  <motion.a 
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, '')}`} 
                    className="font-medium" 
                    style={{ color: primaryColor }}
                    variants={fadeInUpVariants}
                    whileHover={{ x: 5 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.section 
          id="home" 
          className="relative py-20 md:py-32" 
          style={{ backgroundColor: primaryColor }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUpVariants}
        >
          <div className="absolute inset-0 opacity-20">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt="Law firm background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-white mb-4"
                variants={fadeInUpVariants}
              >
                Your Trusted Advocates. Your Legal Solution.
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-white opacity-90 mb-8"
                variants={fadeInUpVariants}
              >
                Trinity Law Firm provides a comprehensive and client-focused approach to every legal challenge. 
                We are dedicated to delivering clarity, integrity, and exceptional results.
              </motion.p>
              <motion.a 
                href="#contact" 
                className="inline-block px-6 py-3 rounded-md text-white font-medium transition-all duration-200"
                style={{ backgroundColor: accentColor, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                variants={fadeInUpVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {ctaText}
              </motion.a>
            </motion.div>
          </div>
        </motion.section>

        {/* About Us Section */}
        <motion.section 
          id="aboutus" 
          className="py-16 bg-gray-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUpVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-3xl mx-auto text-center mb-12"
              variants={staggerChildren}
            >
              <motion.h2 
                className="text-3xl font-bold mb-4" 
                style={{ color: primaryColor }}
                variants={fadeInUpVariants}
              >
                About Us
              </motion.h2>
              <motion.div 
                className="w-16 h-1 mx-auto mb-4" 
                style={{ backgroundColor: accentColor }}
                variants={fadeInUpVariants}
              ></motion.div>
              <motion.p 
                className="text-lg text-gray-700"
                variants={fadeInUpVariants}
              >
                At Trinity, we believe in the power of a strong legal partnership. We are a team of experienced and dedicated legal 
                professionals committed to protecting your interests and achieving your goals. Our firm is founded on the principles of 
                trust, transparency, and a relentless pursuit of justice for our clients.
              </motion.p>
            </motion.div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
              variants={staggerChildren}
            >
              {[
                {
                  title: "Our Mission",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  ),
                  description: "To provide exceptional legal services with integrity, dedication, and a commitment to achieving the best outcomes for our clients."
                },
                {
                  title: "Our Values",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  ),
                  description: "Trust, transparency, and a relentless pursuit of justice guide everything we do at Trinity Law Firm."
                },
                {
                  title: "Our Story",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                  description: "Founded by attorneys passionate about making a difference, Trinity Law Firm has grown to serve clients across multiple practice areas."
                }
              ].map((item, index) => (
                <motion.div 
                  key={item.title}
                  className="bg-white p-6 rounded-lg shadow-md text-center"
                  variants={fadeInUpVariants}
                  transition={{ delay: index * animationDelay }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" 
                    style={{ backgroundColor: primaryColor }}
                    whileHover={{ rotate: 10 }}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: primaryColor }}>{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Practice Areas Section */}
        <motion.section 
          id="practiceareas" 
          className="py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUpVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              variants={fadeInUpVariants}
            >
              <h2 className="text-3xl font-bold mb-4" style={{ color: primaryColor }}>Our Practice Areas</h2>
              <div className="w-16 h-1 mx-auto mb-4" style={{ backgroundColor: accentColor }}></div>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                We offer comprehensive legal services across multiple practice areas to meet diverse client needs.
              </p>
            </motion.div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerChildren}
            >
              {[
                {
                  title: "Corporate Law",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  ),
                  description: "Guiding businesses through formation, transactions, and regulatory compliance.",
                  services: ["Business Formation", "Mergers & Acquisitions", "Contract Drafting", "Regulatory Compliance"]
                },
                {
                  title: "Family Law",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                  description: "Providing compassionate and effective representation for a range of domestic issues.",
                  services: ["Divorce & Separation", "Child Custody", "Adoption", "Spousal Support"]
                },
                {
                  title: "Real Estate Law",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  ),
                  description: "Protecting your investments and interests in property transactions.",
                  services: ["Property Transactions", "Landlord-Tenant Issues", "Title Disputes", "Construction Law"]
                },
                {
                  title: "Litigation",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  ),
                  description: "Aggressively representing you in court to resolve complex disputes.",
                  services: ["Civil Litigation", "Commercial Disputes", "Personal Injury", "Alternative Dispute Resolution"]
                }
              ].map((item, index) => (
                <motion.div 
                  key={item.title}
                  className="bg-white p-6 rounded-lg shadow-md border-t-4" 
                  style={{ borderTopColor: accentColor }}
                  variants={fadeInUpVariants}
                  transition={{ delay: index * animationDelay }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <motion.div 
                    className="mb-4" 
                    style={{ color: primaryColor }}
                    whileHover={{ rotate: 5 }}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: primaryColor }}>{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <ul className="text-gray-600 space-y-1">
                    {item.services.map((service, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                        viewport={{ once: true }}
                      >
                        • {service}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Why Choose Trinity Section */}
        <motion.section 
          className="py-16 bg-gray-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUpVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              variants={fadeInUpVariants}
            >
              <h2 className="text-3xl font-bold mb-4" style={{ color: primaryColor }}>Why Choose Trinity?</h2>
              <div className="w-16 h-1 mx-auto mb-4" style={{ backgroundColor: accentColor }}></div>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Our commitment to excellence and client satisfaction sets us apart from other law firms.
              </p>
            </motion.div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={staggerChildren}
            >
              {[
                {
                  title: "Experience",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  description: "Our attorneys bring years of experience and deep expertise to every case, ensuring you receive knowledgeable guidance throughout your legal journey."
                },
                {
                  title: "Client-Focused Approach",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  ),
                  description: "We listen carefully to your needs and tailor our strategy to your unique situation, ensuring personalized legal solutions."
                },
                {
                  title: "Results-Driven",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  description: "We are committed to achieving the best possible outcome for you, leveraging our expertise and resources to secure favorable results."
                },
                {
                  title: "Integrity",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  ),
                  description: "We operate with the highest ethical standards, ensuring you always receive honest counsel and transparent communication."
                }
              ].map((item, index) => (
                <motion.div 
                  key={item.title}
                  className="flex bg-white p-6 rounded-lg shadow-md"
                  variants={fadeInUpVariants}
                  transition={{ delay: index * animationDelay }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <motion.div 
                    className="mr-4" 
                    style={{ color: accentColor }}
                    whileHover={{ rotate: 10 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: primaryColor }}>{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Our Team Section */}
        <motion.section 
          id="ourteam" 
          className="py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUpVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              variants={fadeInUpVariants}
            >
              <h2 className="text-3xl font-bold mb-4" style={{ color: primaryColor }}>Meet Our Legal Professionals</h2>
              <div className="w-16 h-1 mx-auto mb-4" style={{ backgroundColor: accentColor }}></div>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Our team of experienced attorneys is dedicated to providing exceptional legal services.
              </p>
            </motion.div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerChildren}
            >
              {[
                {
                  name: "Alexander Mitchell",
                  position: "Managing Partner, Corporate Law",
                  bio: "With over 20 years of experience in corporate law, Alex leads our corporate practice with expertise in mergers & acquisitions and business formation.",
                  education: "J.D., Harvard Law School\nB.A., Yale University"
                },
                {
                  name: "Sophia Rodriguez",
                  position: "Partner, Family Law",
                  bio: "Sophia brings compassion and strategic thinking to her family law practice, helping clients navigate challenging domestic situations.",
                  education: "J.D., Columbia Law School\nB.A., University of Michigan"
                },
                {
                  name: "Michael Thompson",
                  position: "Partner, Litigation",
                  bio: "Michael is a seasoned litigator with a proven track record of success in complex commercial and civil disputes.",
                  education: "J.D., Stanford Law School\nB.S., Georgetown University"
                }
              ].map((person, index) => (
                <motion.div 
                  key={person.name}
                  className="bg-white rounded-lg overflow-hidden shadow-md"
                  variants={fadeInUpVariants}
                  transition={{ delay: index * animationDelay }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="h-64 bg-gray-100 flex items-center justify-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-24 w-24 text-gray-400" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1} 
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                      />
                    </svg>
                  </div>
                  <motion.div 
                    className="p-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-semibold mb-1" style={{ color: primaryColor }}>{person.name}</h3>
                    <p className="text-sm mb-3" style={{ color: accentColor }}>{person.position}</p>
                    <p className="text-gray-600 mb-4">{person.bio}</p>
                    <p className="text-sm text-gray-500">
                      {person.education.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}<br />
                        </React.Fragment>
                      ))}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div 
              className="text-center mt-10"
              variants={fadeInUpVariants}
              transition={{ delay: 0.5 }}
            >
              <motion.a 
                href="#team" 
                className="inline-block px-6 py-2 border-2 rounded-md font-medium transition-all duration-200"
                style={{ borderColor: primaryColor, color: primaryColor }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Team Members
              </motion.a>
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action Section */}
        <motion.section 
          id="contact" 
          className="py-16" 
          style={{ backgroundColor: primaryColor }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUpVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-3xl mx-auto text-center text-white"
              variants={staggerChildren}
            >
              <motion.h2 
                className="text-3xl font-bold mb-4"
                variants={fadeInUpVariants}
              >
                Ready to take the next step?
              </motion.h2>
              <motion.p 
                className="text-lg mb-8 opacity-90"
                variants={fadeInUpVariants}
              >
                Contact us today for a consultation and discover how we can help you navigate your legal matters with confidence.
              </motion.p>
              <motion.div 
                className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center"
                variants={staggerChildren}
              >
                <motion.a 
                  href="#contact-form" 
                  className="inline-block px-6 py-3 rounded-md text-white font-medium transition-all duration-200"
                  style={{ backgroundColor: accentColor }}
                  variants={fadeInUpVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {ctaText}
                </motion.a>
                                 <motion.a 
                   href="tel:+237677275129" 
                   className="inline-block px-6 py-3 rounded-md font-medium border-2 border-white text-white transition-all duration-200 hover:bg-white hover:text-gray-800"
                   variants={fadeInUpVariants}
                   whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.9)", color: primaryColor }}
                   whileTap={{ scale: 0.95 }}
                 >
                   Call Us: +237 677 275 129
                 </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Form Section */}
        <motion.section 
          id="contact-form" 
          className="py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUpVariants}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <motion.div
                  variants={fadeInUpVariants}
                >
                  <h2 className="text-3xl font-bold mb-4" style={{ color: primaryColor }}>Let's Connect</h2>
                  <div className="w-16 h-1 mb-6" style={{ backgroundColor: accentColor }}></div>
                                     <p className="text-lg text-gray-700 mb-8">
                     We're here to help with your legal needs. Fill out the form below and choose your preferred contact method. We'll open either WhatsApp or your email client with your message pre-filled.
                   </p>
                  
                  <motion.div 
                    className="space-y-6"
                    variants={staggerChildren}
                  >
                    {[
                      {
                        title: "Address",
                        content: "1234 Legal Avenue, Suite 500\nMetropolis, CA 90001",
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        )
                      },
                      {
                        title: "WhatsApp",
                        content: "+237 677 275 129",
                        icon: (
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#25D366' }}>
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                          </svg>
                        )
                      },
                      {
                        title: "Email",
                        content: "info@trinitylawfirm.com",
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        )
                      },
                      {
                        title: "Hours",
                        content: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 2:00 PM\nSunday: Closed",
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )
                      }
                    ].map((item, index) => (
                      <motion.div 
                        key={item.title}
                        className="flex items-start"
                        variants={fadeInUpVariants}
                        transition={{ delay: index * 0.1 }}
                      >
                        <motion.div 
                          className="mr-4" 
                          style={{ color: primaryColor }}
                          whileHover={{ rotate: 15 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {item.icon}
                        </motion.div>
                        <div>
                          <h3 className="font-semibold mb-1">{item.title}</h3>
                          <p className="text-gray-600">
                            {item.content.split('\n').map((line, i) => (
                              <React.Fragment key={i}>
                                {line}<br />
                              </React.Fragment>
                            ))}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="bg-white p-6 rounded-lg shadow-md"
                  variants={fadeInUpVariants}
                >
                  <div className="flex items-center mb-6">
                    <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#25D366' }}>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <h3 className="text-2xl font-semibold" style={{ color: primaryColor }}>Send Us a Message</h3>
                  </div>
                  <form 
                    className="space-y-4" 
                    onSubmit={handleSubmit}
                    ref={formRef}
                  >
                    <input type="hidden" name="access_key" value="85f6997a-6e95-48d9-b796-6b1dbad336f5" />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Name</label>
                      <input 
                        type="text" 
                        id="name"
                        name="name"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ focusRing: accentColor }}
                        placeholder="Your Name"
                        onChange={handleInputChange}
                        required
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ focusRing: accentColor }}
                        placeholder="your.email@example.com"
                        onChange={handleInputChange}
                        required
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="phone" className="block mb-1 font-medium text-gray-700">Phone</label>
                      <input 
                        type="tel" 
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                        style={{ focusRing: accentColor }}
                        placeholder="(555) 123-4567"
                        onChange={handleInputChange}
                      />
                    </motion.div>
                                         <motion.div
                       initial={{ opacity: 0, y: 10 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.4 }}
                       viewport={{ once: true }}
                     >
                       <label htmlFor="message" className="block mb-1 font-medium text-gray-700">Message</label>
                       <textarea 
                         id="message"
                         name="message"
                         rows={4}
                         className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                         style={{ focusRing: accentColor }}
                         placeholder="How can we help you?"
                         onChange={handleInputChange}
                         required
                       ></textarea>
                     </motion.div>
                     
                     <motion.div
                       initial={{ opacity: 0, y: 10 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.45 }}
                       viewport={{ once: true }}
                     >
                       <label className="block mb-3 font-medium text-gray-700">How would you like to contact us?</label>
                       <div className="space-y-2">
                         <label className="flex items-center">
                           <input
                             type="radio"
                             name="contactMethod"
                             value="whatsapp"
                             checked={formData.contactMethod === "whatsapp"}
                             onChange={handleInputChange}
                             className="mr-2 text-blue-600 focus:ring-blue-500"
                           />
                           <span className="text-gray-700">💬 WhatsApp (Instant contact)</span>
                         </label>
                         <label className="flex items-center">
                           <input
                             type="radio"
                             name="contactMethod"
                             value="email"
                             checked={formData.contactMethod === "email"}
                             onChange={handleInputChange}
                             className="mr-2 text-blue-600 focus:ring-blue-500"
                           />
                           <span className="text-gray-700">📧 Email (Traditional contact)</span>
                         </label>
                       </div>
                     </motion.div>
                    
                    {/* Hidden field for target email */}
                    <input 
                      type="hidden"
                      name="targetEmail"
                      value="etame.eddy01@gmail.com"
                    />
                    
                                         <motion.button 
                       type="submit"
                       className="w-full px-6 py-3 text-white font-medium rounded-md transition-all duration-200"
                       style={{ backgroundColor: primaryColor }}
                       whileHover={{ scale: 1.02 }}
                       whileTap={{ scale: 0.98 }}
                       disabled={isSubmitting}
                       initial={{ opacity: 0, y: 10 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.5 }}
                       viewport={{ once: true }}
                     >
                       {isSubmitting 
                         ? (formData.contactMethod === "whatsapp" ? "Opening WhatsApp..." : "Opening Email...") 
                         : (formData.contactMethod === "whatsapp" ? "Send via WhatsApp" : "Send via Email")
                       }
                     </motion.button>
                    
                                         {submitSuccess && (
                       <motion.div 
                         className="mt-4 p-3 bg-green-100 text-green-700 rounded-md"
                         initial={{ opacity: 0, height: 0 }}
                         animate={{ opacity: 1, height: "auto" }}
                         transition={{ duration: 0.3 }}
                       >
                         {formData.contactMethod === "whatsapp" 
                           ? "✅ WhatsApp opened! Your message has been formatted and sent to our team. We'll respond to you on WhatsApp shortly."
                           : "✅ Email client opened! Your message has been formatted and sent to our team. We'll respond to you via email shortly."
                         }
                       </motion.div>
                     )}
                    
                                         {submitError && (
                       <motion.div 
                         className="mt-4 p-3 bg-red-100 text-red-700 rounded-md"
                         initial={{ opacity: 0, height: 0 }}
                         animate={{ opacity: 1, height: "auto" }}
                         transition={{ duration: 0.3 }}
                       >
                         <div className="mb-3">
                           <strong>Email client could not be opened automatically.</strong>
                         </div>
                         <div className="text-sm">
                           <p className="mb-2">Please copy the information below and send it manually to:</p>
                           <div className="bg-white p-3 rounded border mb-3">
                             <p><strong>To:</strong> ebangwesse@yahoo.com</p>
                             <p><strong>Subject:</strong> New Contact Form Submission - Trinity Law Firm</p>
                             <p><strong>Message:</strong></p>
                             <div className="bg-gray-50 p-2 rounded text-xs">
                               <p>New Contact Form Submission from Trinity Law Firm Website</p>
                               <p>Name: {formData.name}</p>
                               <p>Email: {formData.email}</p>
                               <p>Phone: {formData.phone || 'Not provided'}</p>
                               <p>Message: {formData.message}</p>
                               <p>---</p>
                               <p>Sent from Trinity Law Firm website</p>
                             </div>
                           </div>
                           <div className="flex justify-center space-x-3">
                             <button
                               onClick={copyEmailToClipboard}
                               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
                               type="button"
                             >
                               <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                               </svg>
                               {copySuccess ? "Copied!" : "Copy Email Content"}
                             </button>
                             <a
                               href={`mailto:ebangwesse@yahoo.com?subject=${encodeURIComponent("New Contact Form Submission - Trinity Law Firm")}&body=${encodeURIComponent(`New Contact Form Submission from Trinity Law Firm Website

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}

Message:
${formData.message}

---
Sent from Trinity Law Firm website`)}`}
                               className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center"
                               target="_blank"
                               rel="noopener noreferrer"
                             >
                               <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                               </svg>
                               Try Email Again
                             </a>
                           </div>
                           {copySuccess && (
                             <div className="mt-2 text-center text-green-600 text-sm">
                               ✅ Email content copied to clipboard! You can now paste it into your email client.
                             </div>
                           )}
                         </div>
                       </motion.div>
                     )}
                  </form>
                  
                                     <div className="mt-4 p-3 bg-blue-50 rounded-md">
                     <p className="text-sm text-blue-700 text-center">
                       💬 <strong>Contact Options:</strong> Choose between WhatsApp for instant contact or Email for traditional communication. Our enhanced email system includes multiple fallback options to ensure your message gets through!
                     </p>
                   </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <motion.footer 
        className="bg-gray-900 text-white py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div 
              className="col-span-1 md:col-span-2"
              variants={fadeInUpVariants}
            >
              <h2 className="text-2xl font-bold mb-4">TRINITY <span style={{ color: accentColor }}>LAW FIRM</span></h2>
              <p className="text-gray-400 mb-6 max-w-md">
                Trinity Law Firm provides a comprehensive and client-focused approach to every legal challenge. 
                We are dedicated to delivering clarity, integrity, and exceptional results.
              </p>
              <div className="flex space-x-4">
                {["Facebook", "Twitter", "LinkedIn"].map((platform, i) => (
                  <motion.a 
                    key={platform}
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <span className="sr-only">{platform}</span>
                    {platform === "Facebook" ? (
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    ) : platform === "Twitter" ? (
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    ) : (
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.4 2.5-2.4c1.6 0 2.5 1 2.6 2.5 0 1.4-1 2.5-2.6 2.5zm11.5 6c-1 0-2 1-2 2v7h-5v-13h5V10s1.6-1.5 4-1.5c3 0 5 2.2 5 6.3v6.7h-5v-7c0-1-1-2-2-2z" />
                      </svg>
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              variants={fadeInUpVariants}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {["Home", "About Us", "Practice Areas", "Our Team", "Contact"].map((item, i) => (
                  <motion.li 
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <a 
                      href={`#${item.toLowerCase().replace(/\s+/g, '')}`} 
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              variants={fadeInUpVariants}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <motion.li 
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  1234 Legal Avenue, Suite 500<br />Metropolis, CA 90001
                </motion.li>
                                 <motion.li 
                   className="flex items-center"
                   initial={{ opacity: 0, x: -10 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.2 }}
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                   </svg>
                   +237 677 275 129
                 </motion.li>
                <motion.li 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@trinitylawfirm.com
                </motion.li>
              </ul>
            </motion.div>
          </div>
          
          <motion.div 
            className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-gray-400">© {new Date().getFullYear()} Trinity Law Firm. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-white mr-4 transition-colors duration-200"
                whileHover={{ y: -2 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
                whileHover={{ y: -2 }}
              >
                Terms of Service
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}

// Component configuration removed for standalone React app