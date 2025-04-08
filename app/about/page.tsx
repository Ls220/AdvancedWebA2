"use client"

import { Container } from "../../components/ui/container";

export default function AboutPage() {
  return (
    <Container>
      <div className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-900 rounded-lg">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-6">
          Contact Us
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Email</h2>
              <p className="text-gray-200">STA23006626@heartofyorkshire.ac.uk</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Phone</h2>
              <p className="text-gray-200">+44 (0) 20 7123 4567</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Address</h2>
              <p className="text-gray-200">
                Selby College<br />
                Abbey Road<br />
                Selby<br />
                North Yorkshire<br />
                YO8 8AT<br />
                United Kingdom
              </p>
            </div>
          </div>

          <div className="h-[400px] w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2349.201201123123!2d-1.0703!3d53.7833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b0e0e0e0e0e0e%3A0x0!2sSelby%20College!5e0!3m2!1sen!2suk!4v1710000000000!5m2!1sen!2suk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </Container>
  );
} 