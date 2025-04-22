"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 text-white">About Us</h1>
        
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-white">Contact Information</h2>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-2xl text-white" />
              <div>
                <p className="text-white/70">Email</p>
                <a href="mailto:STA23006626@heartofyorkshire.ac.uk" className="text-white hover:text-blue-400 transition-colors">
                  STA23006626@heartofyorkshire.ac.uk
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <FaPhone className="text-2xl text-white" />
              <div>
                <p className="text-white/70">Phone</p>
                <a href="tel:+447123456789" className="text-white hover:text-blue-400 transition-colors">
                  +44 (0) 7123 456 789
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-2xl text-white" />
              <div>
                <p className="text-white/70">Address</p>
                <p className="text-white">
                  Abbot's Road<br />
                  Selby<br />
                  North Yorkshire<br />
                  YO8 8AT
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-white">Location</h2>
          <div className="aspect-video w-full rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2357.6862829536844!2d-1.0700843234793901!3d53.78334994799976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48795b476c550e99%3A0x9e87c6a69e1adf4e!2sSelby%20College!5e0!3m2!1sen!2suk!4v1708619436044!5m2!1sen!2suk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
} 