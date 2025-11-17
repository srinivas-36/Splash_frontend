
// // // // // // // "use client";
// // // // // // // import React from "react";
// // // // // // // import Link from "next/link";
// // // // // // // import { Instagram, Twitter, Linkedin } from "lucide-react";

// // // // // // // const footerLinks = {
// // // // // // //   Product: ["Features", "Pricing", "Case Studies", "Roadmap"],
// // // // // // //   Company: ["About", "Blog", "Careers", "Contact"],
// // // // // // //   Resources: ["Documentation", "Help Center", "API Reference", "Community"],
// // // // // // //   Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
// // // // // // // };

// // // // // // // function Footer() {
// // // // // // //   return (
// // // // // // //     <footer className="bg-black text-white">
// // // // // // //       <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
// // // // // // //         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
// // // // // // //           {/* Brand */}
// // // // // // //           <div className="col-span-2">
// // // // // // //             <Link href="/" className="mb-4 block">
// // // // // // //               <img
// // // // // // //                 src="/images/logo-splash.png"
// // // // // // //                 alt="Splash AI Studio"
// // // // // // //                 className="h-12 w-auto object-contain hover:scale-105 transition-transform duration-300"
// // // // // // //               />
// // // // // // //             </Link>

// // // // // // //             <p className="text-sm text-white/70 mb-6 max-w-xs">
// // // // // // //               Campaign Ready Visuals with AI.
// // // // // // //             </p>

// // // // // // //             {/* Social Icons */}
// // // // // // //             <div className="flex gap-4">
// // // // // // //               <a
// // // // // // //                 href="#"
// // // // // // //                 className="w-10 h-10 rounded-full bg-white/10 hover:bg-purple-600 transition-colors flex items-center justify-center"
// // // // // // //                 aria-label="Instagram"
// // // // // // //               >
// // // // // // //                 <Instagram size={18} />
// // // // // // //               </a>
// // // // // // //               <a
// // // // // // //                 href="#"
// // // // // // //                 className="w-10 h-10 rounded-full bg-white/10 hover:bg-purple-600 transition-colors flex items-center justify-center"
// // // // // // //                 aria-label="Twitter"
// // // // // // //               >
// // // // // // //                 <Twitter size={18} />
// // // // // // //               </a>
// // // // // // //               <a
// // // // // // //                 href="#"
// // // // // // //                 className="w-10 h-10 rounded-full bg-white/10 hover:bg-purple-600 transition-colors flex items-center justify-center"
// // // // // // //                 aria-label="LinkedIn"
// // // // // // //               >
// // // // // // //                 <Linkedin size={18} />
// // // // // // //               </a>
// // // // // // //             </div>
// // // // // // //           </div>

// // // // // // //           {/* Link Columns */}
// // // // // // //           {Object.entries(footerLinks).map(([category, links]) => (
// // // // // // //             <div key={category}>
// // // // // // //               <h3 className="font-semibold mb-4">{category}</h3>
// // // // // // //               <ul className="space-y-3">
// // // // // // //                 {links.map((link) => (
// // // // // // //                   <li key={link}>
// // // // // // //                     <a
// // // // // // //                       href="#"
// // // // // // //                       className="text-sm text-white/70 hover:text-white transition-colors"
// // // // // // //                     >
// // // // // // //                       {link}
// // // // // // //                     </a>
// // // // // // //                   </li>
// // // // // // //                 ))}
// // // // // // //               </ul>
// // // // // // //             </div>
// // // // // // //           ))}
// // // // // // //         </div>

// // // // // // //         {/* Bottom Bar */}
// // // // // // //         <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
// // // // // // //           <p className="text-sm text-white/70">
// // // // // // //             © 2025 Splash AI Studio. All rights reserved.
// // // // // // //           </p>
// // // // // // //           <p className="text-sm text-white/70">
// // // // // // //             Made with precision and care.
// // // // // // //           </p>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </footer>
// // // // // // //   );
// // // // // // // }

// // // // // // // export default Footer;
// // // // // // import React from "react";
// // // // // // import { Link } from "react-router-dom";
// // // // // // import { Instagram, Twitter, Linkedin } from "lucide-react";
// // // // // // import logo from "@/assets/logo-splash.png";

// // // // // // const footerLinks = {
// // // // // //   Product: ["Features", "Pricing", "Case Studies", "Roadmap"],
// // // // // //   Company: ["About", "Blog", "Careers", "Contact"],
// // // // // //   Resources: ["Documentation", "Help Center", "API Reference", "Community"],
// // // // // //   Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
// // // // // // };

// // // // // // const Footer = () => {
// // // // // //   return (
// // // // // //     <footer className="border-t border-gray-200 bg-white">
// // // // // //       <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
// // // // // //         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
// // // // // //           {/* Brand */}
// // // // // //           <div className="col-span-2">
// // // // // //             <Link to="/" className="mb-4 block">
// // // // // //               <img 
// // // // // //                 src={logo} 
// // // // // //                 alt="Splash AI Studio" 
// // // // // //                 className="h-12 w-auto object-contain hover:scale-105 transition-transform duration-300"
// // // // // //               />
// // // // // //             </Link>
// // // // // //             <p className="text-sm text-gray-600 mb-6 max-w-xs">
// // // // // //               Campaign Ready Visuals with AI.
// // // // // //             </p>

// // // // // //             {/* Social Icons */}
// // // // // //             <div className="flex gap-4">
// // // // // //               <a
// // // // // //                 href="#"
// // // // // //                 className="w-10 h-10 rounded-full bg-gray-100 hover:bg-purple-600 hover:text-white transition-colors flex items-center justify-center"
// // // // // //                 aria-label="Instagram"
// // // // // //               >
// // // // // //                 <Instagram size={18} />
// // // // // //               </a>
// // // // // //               <a
// // // // // //                 href="#"
// // // // // //                 className="w-10 h-10 rounded-full bg-gray-100 hover:bg-purple-600 hover:text-white transition-colors flex items-center justify-center"
// // // // // //                 aria-label="Twitter"
// // // // // //               >
// // // // // //                 <Twitter size={18} />
// // // // // //               </a>
// // // // // //               <a
// // // // // //                 href="#"
// // // // // //                 className="w-10 h-10 rounded-full bg-gray-100 hover:bg-purple-600 hover:text-white transition-colors flex items-center justify-center"
// // // // // //                 aria-label="LinkedIn"
// // // // // //               >
// // // // // //                 <Linkedin size={18} />
// // // // // //               </a>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           {/* Link Columns */}
// // // // // //           {Object.entries(footerLinks).map(([category, links]) => (
// // // // // //             <div key={category}>
// // // // // //               <h3 className="font-semibold mb-4 text-gray-900">{category}</h3>
// // // // // //               <ul className="space-y-3">
// // // // // //                 {links.map((link) => (
// // // // // //                   <li key={link}>
// // // // // //                     <a
// // // // // //                       href="#"
// // // // // //                       className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
// // // // // //                     >
// // // // // //                       {link}
// // // // // //                     </a>
// // // // // //                   </li>
// // // // // //                 ))}
// // // // // //               </ul>
// // // // // //             </div>
// // // // // //           ))}
// // // // // //         </div>

// // // // // //         {/* Bottom Bar */}
// // // // // //         <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
// // // // // //           <p className="text-sm text-gray-600">
// // // // // //             © 2025 Splash AI Studio. All rights reserved.
// // // // // //           </p>
// // // // // //           <p className="text-sm text-gray-600">
// // // // // //             Made with precision and care.
// // // // // //           </p>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </footer>
// // // // // //   );
// // // // // // };

// // // // // // export default Footer;
// // // // // import React from "react";
// // // // // import Link from "next/link";
// // // // // import { Instagram, Twitter, Linkedin } from "lucide-react";

// // // // // const footerLinks = {
// // // // //   Product: ["Features", "Pricing", "Case Studies", "Roadmap"],
// // // // //   Company: ["About", "Blog", "Careers", "Contact"],
// // // // //   Resources: ["Documentation", "Help Center", "API Reference", "Community"],
// // // // //   Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
// // // // // };

// // // // // const Footer = () => {
// // // // //   return (
// // // // //     <footer className="border-t border-gray-200 bg-white">
// // // // //       <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
// // // // //         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
// // // // //           {/* Brand */}
// // // // //           <div className="col-span-2">
// // // // //             <Link href="/" className="mb-4 block">
// // // // //               <img 
// // // // //                 src="/images/logo-splash.png" 
// // // // //                 alt="Splash AI Studio" 
// // // // //                 className="h-12 w-auto object-contain hover:scale-105 transition-transform duration-300"
// // // // //               />
// // // // //             </Link>
// // // // //             <p className="text-sm text-gray-600 mb-6 max-w-xs">
// // // // //               Campaign Ready Visuals with AI.
// // // // //             </p>

// // // // //             {/* Social Icons */}
// // // // //             <div className="flex gap-4">
// // // // //               <a
// // // // //                 href="#"
// // // // //                 className="w-10 h-10 rounded-full bg-gray-100 hover:bg-purple-600 hover:text-white transition-colors flex items-center justify-center"
// // // // //                 aria-label="Instagram"
// // // // //               >
// // // // //                 <Instagram size={18} />
// // // // //               </a>
// // // // //               <a
// // // // //                 href="#"
// // // // //                 className="w-10 h-10 rounded-full bg-gray-100 hover:bg-purple-600 hover:text-white transition-colors flex items-center justify-center"
// // // // //                 aria-label="Twitter"
// // // // //               >
// // // // //                 <Twitter size={18} />
// // // // //               </a>
// // // // //               <a
// // // // //                 href="#"
// // // // //                 className="w-10 h-10 rounded-full bg-gray-100 hover:bg-purple-600 hover:text-white transition-colors flex items-center justify-center"
// // // // //                 aria-label="LinkedIn"
// // // // //               >
// // // // //                 <Linkedin size={18} />
// // // // //               </a>
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* Link Columns */}
// // // // //           {Object.entries(footerLinks).map(([category, links]) => (
// // // // //             <div key={category}>
// // // // //               <h3 className="font-semibold mb-4 text-gray-900">{category}</h3>
// // // // //               <ul className="space-y-3">
// // // // //                 {links.map((link) => (
// // // // //                   <li key={link}>
// // // // //                     <a
// // // // //                       href="#"
// // // // //                       className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
// // // // //                     >
// // // // //                       {link}
// // // // //                     </a>
// // // // //                   </li>
// // // // //                 ))}
// // // // //               </ul>
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>

// // // // //         {/* Bottom Bar */}
// // // // //         <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
// // // // //           <p className="text-sm text-gray-600">
// // // // //             © 2025 Splash AI Studio. All rights reserved.
// // // // //           </p>
// // // // //           <p className="text-sm text-gray-600">
// // // // //             Made with precision and care.
// // // // //           </p>
// // // // //         </div>
// // // // //       </div>
// // // // //     </footer>
// // // // //   );
// // // // // };

// // // // // export default Footer;
// // // // import Link from "next/link";
// // // // import { Instagram, Twitter, Linkedin } from "lucide-react";

// // // // const footerLinks = {
// // // //   Product: ["Features", "Pricing", "Case Studies", "Roadmap"],
// // // //   Company: ["About", "Blog", "Careers", "Contact"],
// // // //   Resources: ["Documentation", "Help Center", "API Reference", "Community"],
// // // //   Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
// // // // };

// // // // const Footer = () => {
// // // //   return (
// // // //     <footer className="border-t border-border bg-secondary/20">
// // // //       <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
// // // //         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
// // // //           {/* Brand */}
// // // //           <div className="col-span-2">
// // // //             <Link href="/" className="mb-4 block">
// // // //               <img
// // // //                 src="/images/logo-splash.png"
// // // //                 alt="Splash AI Studio"
// // // //                 className="h-36 w-auto object-contain hover:scale-105 transition-transform duration-300"
// // // //               />
// // // //             </Link>
// // // //             <p className="text-sm text-muted-foreground mb-6 max-w-xs">
// // // //               Campaign Ready Visuals with AI.
// // // //             </p>

// // // //             {/* Social Icons */}
// // // //             <div className="flex gap-4">
// // // //               <a
// // // //                 href="#"
// // // //                 className="w-10 h-10 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center"
// // // //                 aria-label="Instagram"
// // // //               >
// // // //                 <Instagram size={18} />
// // // //               </a>
// // // //               <a
// // // //                 href="#"
// // // //                 className="w-10 h-10 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center"
// // // //                 aria-label="Twitter"
// // // //               >
// // // //                 <Twitter size={18} />
// // // //               </a>
// // // //               <a
// // // //                 href="#"
// // // //                 className="w-10 h-10 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center"
// // // //                 aria-label="LinkedIn"
// // // //               >
// // // //                 <Linkedin size={18} />
// // // //               </a>
// // // //             </div>
// // // //           </div>

// // // //           {/* Link Columns */}
// // // //           {Object.entries(footerLinks).map(([category, links]) => (
// // // //             <div key={category}>
// // // //               <h3 className="font-semibold mb-4 text-sm">{category}</h3>
// // // //               <ul className="space-y-3">
// // // //                 {links.map((link) => (
// // // //                   <li key={link}>
// // // //                     <a
// // // //                       href="#"
// // // //                       className="text-sm text-muted-foreground hover:text-foreground transition-colors"
// // // //                     >
// // // //                       {link}
// // // //                     </a>
// // // //                   </li>
// // // //                 ))}
// // // //               </ul>
// // // //             </div>
// // // //           ))}
// // // //         </div>

// // // //         {/* Bottom Bar */}
// // // //         <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
// // // //           <p className="text-sm text-muted-foreground">
// // // //             © 2025 Splash AI Studio. All rights reserved.
// // // //           </p>
// // // //           <p className="text-sm text-muted-foreground">
// // // //             Made with precision and care.
// // // //           </p>
// // // //         </div>
// // // //       </div>
// // // //     </footer>
// // // //   );
// // // // };

// // // // export default Footer;
// // // import Link from "next/link";
// // // import { Instagram, Twitter, Linkedin } from "lucide-react";

// // // const footerLinks = {
// // //   Product: ["Features", "Pricing", "Case Studies", "Roadmap"],
// // //   Company: ["About", "Blog", "Careers", "Contact"],
// // //   Resources: ["Documentation", "Help Center", "API Reference", "Community"],
// // //   Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
// // // };

// // // const Footer = () => {
// // //   return (
// // //     <footer className="border-t border-black bg-white">
// // //       <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
// // //         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
// // //           {/* Brand */}
// // //           <div className="col-span-2">
// // //             <Link href="/" className="mb-4 block">
// // //               <img
// // //                 src="/images/logo-splash.png"
// // //                 alt="Splash AI Studio"
// // //                 className="h-36 w-auto object-contain hover:scale-105 transition-transform duration-300"
// // //               />
// // //             </Link>
// // //             <p className="text-sm text-black mb-6 max-w-xs">
// // //               Campaign Ready Visuals with AI.
// // //             </p>

// // //             {/* Social Icons */}
// // //             <div className="flex gap-4">
// // //               <a
// // //                 href="#"
// // //                 className="w-10 h-10 rounded-full bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center"
// // //                 aria-label="Instagram"
// // //               >
// // //                 <Instagram size={18} />
// // //               </a>
// // //               <a
// // //                 href="#"
// // //                 className="w-10 h-10 rounded-full bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center"
// // //                 aria-label="Twitter"
// // //               >
// // //                 <Twitter size={18} />
// // //               </a>
// // //               <a
// // //                 href="#"
// // //                 className="w-10 h-10 rounded-full bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center"
// // //                 aria-label="LinkedIn"
// // //               >
// // //                 <Linkedin size={18} />
// // //               </a>
// // //             </div>
// // //           </div>

// // //           {/* Link Columns */}
// // //           {Object.entries(footerLinks).map(([category, links]) => (
// // //             <div key={category}>
// // //               <h3 className="font-semibold mb-4 text-sm text-black">{category}</h3>
// // //               <ul className="space-y-3">
// // //                 {links.map((link) => (
// // //                   <li key={link}>
// // //                     <a
// // //                       href="#"
// // //                       className="text-sm text-black hover:text-gray-700 transition-colors"
// // //                     >
// // //                       {link}
// // //                     </a>
// // //                   </li>
// // //                 ))}
// // //               </ul>
// // //             </div>
// // //           ))}
// // //         </div>

// // //         {/* Bottom Bar */}
// // //         <div className="pt-8 border-t border-black flex flex-col md:flex-row justify-between items-center gap-4">
// // //           <p className="text-sm text-black">
// // //             © 2025 Splash AI Studio. All rights reserved.
// // //           </p>
// // //           <p className="text-sm text-black">
// // //             Made with precision and care.
// // //           </p>
// // //         </div>
// // //       </div>
// // //     </footer>
// // //   );
// // // };

// // // export default Footer;
// // import Link from "next/link";
// // import { Instagram, Twitter, Linkedin } from "lucide-react";

// // const footerLinks = {
// //   Product: ["Features", "Pricing", "Case Studies", "Roadmap"],
// //   Company: ["About", "Blog", "Careers", "Contact"],
// //   Resources: ["Documentation", "Help Center", "API Reference", "Community"],
// //   Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
// // };

// // const Footer = () => {
// //   return (
// //     <footer className="border-t border-border bg-secondary/20">
// //       <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
// //         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
// //           {/* Brand */}
// //           <div className="col-span-2">
// //             <Link href="/" className="mb-4 block">
// //               <img
// //                 src="/images/logo-splash.png"
// //                 alt="Splash AI Studio"
// //                 className="h-36 w-auto object-contain hover:scale-105 transition-transform duration-300"
// //               />
// //             </Link>
// //             <p className="text-sm text-muted-foreground mb-6 max-w-xs">
// //               Campaign Ready Visuals with AI.
// //             </p>

// //             {/* Social Icons */}
// //             <div className="flex gap-4">
// //               <a
// //                 href="#"
// //                 className="w-10 h-10 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center"
// //                 aria-label="Instagram"
// //               >
// //                 <Instagram size={18} />
// //               </a>
// //               <a
// //                 href="#"
// //                 className="w-10 h-10 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center"
// //                 aria-label="Twitter"
// //               >
// //                 <Twitter size={18} />
// //               </a>
// //               <a
// //                 href="#"
// //                 className="w-10 h-10 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center"
// //                 aria-label="LinkedIn"
// //               >
// //                 <Linkedin size={18} />
// //               </a>
// //             </div>
// //           </div>

// //           {/* Link Columns */}
// //           {Object.entries(footerLinks).map(([category, links]) => (
// //             <div key={category}>
// //               <h3 className="font-semibold mb-4 text-sm">{category}</h3>
// //               <ul className="space-y-3">
// //                 {links.map((link) => (
// //                   <li key={link}>
// //                     <a
// //                       href="#"
// //                       className="text-sm text-muted-foreground hover:text-foreground transition-colors"
// //                     >
// //                       {link}
// //                     </a>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Bottom Bar */}
// //         <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
// //           <p className="text-sm text-muted-foreground">
// //             © 2025 Splash AI Studio. All rights reserved.
// //           </p>
// //           <p className="text-sm text-muted-foreground">
// //             Made with precision and care.
// //           </p>
// //         </div>
// //       </div>
// //     </footer>
// //   );
// // };

// // export default Footer;
// import Link from "next/link";
// import { Instagram, Twitter, Linkedin } from "lucide-react";

// const footerLinks = {
//   Product: ["Features", "Pricing", "Case Studies", "Roadmap"],
//   Company: ["About", "Blog", "Careers", "Contact"],
//   Resources: ["Documentation", "Help Center", "API Reference", "Community"],
//   Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
// };

// const Footer = () => {
//   return (
//     <footer className="border-t border-gray-300 bg-white">
//       <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
//           {/* Brand */}
//           <div className="col-span-2">
//             <Link href="/" className="mb-4 block">
//               <img
//                 src="/images/logo-splash.png"
//                 alt="Splash AI Studio"
//                 className="h-36 w-auto object-contain hover:scale-105 transition-transform duration-300"
//               />
//             </Link>
//             <p className="text-sm text-black mb-6 max-w-xs">
//               Campaign Ready Visuals with AI.
//             </p>

//             {/* Social Icons */}
//             <div className="flex gap-4">
//               <a
//                 href="#"
//                 className="w-10 h-10 rounded-full bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center"
//                 aria-label="Instagram"
//               >
//                 <Instagram size={18} />
//               </a>
//               <a
//                 href="#"
//                 className="w-10 h-10 rounded-full bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center"
//                 aria-label="Twitter"
//               >
//                 <Twitter size={18} />
//               </a>
//               <a
//                 href="#"
//                 className="w-10 h-10 rounded-full bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center"
//                 aria-label="LinkedIn"
//               >
//                 <Linkedin size={18} />
//               </a>
//             </div>
//           </div>

//           {/* Link Columns */}
//           {Object.entries(footerLinks).map(([category, links]) => (
//             <div key={category}>
//               <h3 className="font-semibold mb-4 text-sm text-black">{category}</h3>
//               <ul className="space-y-3">
//                 {links.map((link) => (
//                   <li key={link}>
//                     <a
//                       href="#"
//                       className="text-sm text-black hover:text-gray-700 transition-colors"
//                     >
//                       {link}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         {/* Bottom Bar */}
//         <div className="pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center gap-4">
//           <p className="text-sm text-black">
//             © 2025 Splash AI Studio. All rights reserved.
//           </p>
//           <p className="text-sm text-black">
//             Made with precision and care.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import Link from "next/link";
import { Instagram, Twitter, Linkedin } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Pricing", "Case Studies", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Resources: ["Documentation", "Help Center", "API Reference", "Community"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

const Footer = () => {
  return (
    <footer className="border-t border-gray-300 bg-white">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="mb-4 block">
              <img
                src="/images/logo-splash.png"
                alt="Splash AI Studio"
                className="h-36 w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p className="text-sm text-black mb-6 max-w-xs">
              Campaign Ready Visuals with AI.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white border border-gray-300 hover:bg-gray-100 transition-colors flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram size={18} className="text-black" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white border border-gray-300 hover:bg-gray-100 transition-colors flex items-center justify-center"
                aria-label="Twitter"
              >
                <Twitter size={18} className="text-black" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white border border-gray-300 hover:bg-gray-100 transition-colors flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} className="text-black" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4 text-sm text-black">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-black hover:text-gray-700 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-black">
            © 2025 Splash AI Studio. All rights reserved.
          </p>
          <p className="text-sm text-black">
            Made with precision and care.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
