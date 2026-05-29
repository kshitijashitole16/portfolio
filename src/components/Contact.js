import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');

    if (window.emailjs) {
      window.emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        {
          publicKey: process.env.REACT_APP_EMAILJS_USER_ID,
        }
      ).then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', title: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      }).catch((error) => {
        console.error("Email send error:", error);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      });
    } else {
      console.error("EmailJS not loaded");
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleOpenMail = () => {
    window.location.href = `mailto:kshitijashitole16@gmail.com?subject=${encodeURIComponent('reaching out from portfolio')}`;
  };

  return (
    <section className="min-h-screen w-full relative flex flex-col items-center justify-center z-10 pb-32" id="contact">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center w-full">
        <h2 className="text-[10px] md:text-xs text-cyan-400 font-bold tracking-[0.4em] uppercase mb-4">
          Next Steps
        </h2>
        <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-white/10 uppercase">
          Let's Collaborate
        </h3>
      </div>
      
      <div className="relative mt-32 w-full flex justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[600px] bg-black/60 backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 md:p-12 shadow-2xl"
        >
          <form ref={formRef} className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="text-center space-y-3 mb-2">
              <h2 className="text-3xl font-black tracking-widest text-white uppercase">Get In Touch</h2>
              <div className="h-px w-12 bg-cyan-400/50 mx-auto" />
              <p className="text-[10px] md:text-xs text-neutral-400 tracking-[0.2em] uppercase">Let's build something extraordinary.</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-cyan-400 font-bold tracking-[0.2em] uppercase ml-1">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe" 
                  required
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.08] transition-all duration-300"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-cyan-400 font-bold tracking-[0.2em] uppercase ml-1">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com" 
                  required
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.08] transition-all duration-300"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-cyan-400 font-bold tracking-[0.2em] uppercase ml-1">Subject</label>
                <input 
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Project Inquiry" 
                  required
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.08] transition-all duration-300"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-cyan-400 font-bold tracking-[0.2em] uppercase ml-1">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Tell me about your project..." 
                  required
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.08] transition-all duration-300 resize-none"
                ></textarea>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-4">
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full relative group overflow-hidden rounded-xl bg-white text-black font-black text-xs tracking-[0.2em] uppercase py-4 transition-transform active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] disabled:opacity-70 disabled:active:scale-100"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : status === 'error' ? 'Error. Try Again.' : 'Send Message'}
                </span>
                <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </button>

              <button 
                type="button"
                onClick={handleOpenMail}
                className="w-full relative group overflow-hidden rounded-xl bg-transparent border border-white/20 text-white font-black text-[10px] tracking-[0.2em] uppercase py-4 transition-all duration-300 active:scale-95 hover:border-cyan-400/50"
              >
                <span className="relative z-10 group-hover:text-cyan-400 transition-colors duration-300">Open Mail Directly</span>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
