import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] text-[#CCCCCC] py-12 px-6 md:px-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-white">InterviewMate</h2>
          <p className="mb-4">Empowering job seekers with AI-driven interview preparation.</p>
          <div className="flex space-x-4">
            <a href="https://twitter.com/Arsalan_0101" className="hover:text-white"><Facebook size={20} /></a>
            <a href="https://twitter.com/Arsalan_0101" className="hover:text-white"><Twitter size={20} /></a>
            <a href="https://www.linkedin.com/in/arsalan-uddin-2356b81b9" className="hover:text-white"><Linkedin size={20} /></a>
            <a href="https://www.instagram.com/uddinarsalan91" className="hover:text-white"><Instagram size={20} /></a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/interview" className="hover:text-white">Interviews</Link></li>
            <li><Link href="/profile" className="hover:text-white">Profile</Link></li>
            <li><Link href="#pay" className="hover:text-white">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">FAQ</a></li>
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-gray-700 text-center">
        <p>&copy; {currentYear} InterviewMate. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;