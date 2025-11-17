// // import React from "react";
// // import showcase1 from "../assets/showcase-01.jpg";
// // import showcase2 from "../assets/showcase-02.jpg";
// // import showcase3 from "../assets/showcase-03.jpg";
// // import showcase4 from "../assets/showcase-04.jpg";
// // import showcase5 from "../assets/showcase-05.jpg";
// // import showcase6 from "../assets/showcase-06.jpg";
// // const showcaseImages = [
// //   { src: showcase1, alt: "Pearl and diamond drop earrings editorial close-up", tall: true },
// //   { src: showcase2, alt: "Luxury tennis bracelet with diamonds", tall: false },
// //   { src: showcase3, alt: "Stack of gold rings with gemstones", tall: false },
// //   { src: showcase4, alt: "Pendant necklace editorial portrait", tall: true },
// //   { src: showcase5, alt: "Flat lay jewelry collection on marble", tall: false },
// //   { src: showcase6, alt: "Model wearing statement earrings and necklaces", tall: true },
// // ];
// // const ShowcaseSection = () => {
// //   return (
// //     <section id="showcase" className="py-12 lg:py-16">
// //       <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
// //         <div className="text-center mb-16">
// //           <h2 className="text-3xl font-bold mb-4">See it in action</h2>
// //           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
// //             Campaign-ready visuals created entirely with Splash AI Studio.
// //           </p>
// //         </div>

// //         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
// //           {showcaseImages.map((image, index) => (
// //             <div
// //               key={index}
// //               className={`relative overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 ${
// //                 image.tall ? "md:row-span-2" : ""
// //               }`}
// //             >
// //               <img
// //                 src={image.src}
// //                 alt={image.alt}
// //                 className="w-full h-full object-cover"
// //                 loading="lazy"
// //               />
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default ShowcaseSection;
// "use client";

// import React from "react";
// import Image from "next/image";

// const showcaseImages = [
//   { src: "/images/showcase-01.jpg", alt: "Pearl and diamond drop earrings editorial close-up", tall: true },
//   { src: "/images/showcase-02.jpg", alt: "Luxury tennis bracelet with diamonds", tall: false },
//   { src: "/images/showcase-03.jpg", alt: "Stack of gold rings with gemstones", tall: false },
//   { src: "/images/showcase-04.jpg", alt: "Pendant necklace editorial portrait", tall: true },
//   { src: "/images/showcase-05.jpg", alt: "Flat lay jewelry collection on marble", tall: false },
//   { src: "/images/showcase-06.jpg", alt: "Model wearing statement earrings and necklaces", tall: true },
// ];

// const ShowcaseSection = () => {
//   return (
//     <section id="showcase" className="py-12 lg:py-16">
//       <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl font-bold mb-4">See it in action</h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Campaign-ready visuals created entirely with Splash AI Studio.
//           </p>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
//           {showcaseImages.map((image, index) => (
//             <div
//               key={index}
//               className={`relative overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 ${
//                 image.tall ? "md:row-span-2" : ""
//               }`}
//             >
//               <Image
//                 src={image.src}
//                 alt={image.alt}
//                 className="w-full h-full object-cover"
//                 width={800}
//                 height={800}
//                 sizes="(min-width: 768px) 33vw, 50vw"
//                 priority={index < 2} // Optional: prioritize first images
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ShowcaseSection;
import React from "react";

const showcaseImages = [
  { src: "/images/showcase-01.jpg", alt: "Pearl and diamond drop earrings editorial close-up", tall: true },
  { src: "/images/showcase-02.jpg", alt: "Luxury tennis bracelet with diamonds", tall: false },
  { src: "/images/showcase-03.jpg", alt: "Stack of gold rings with gemstones", tall: false },
  { src: "/images/showcase-04.jpg", alt: "Pendant necklace editorial portrait", tall: true },
  { src: "/images/showcase-05.jpg", alt: "Flat lay jewelry collection on marble", tall: false },
  { src: "/images/showcase-06.jpg", alt: "Model wearing statement earrings and necklaces", tall: true },
];

const ShowcaseSection = () => {
  return (
    <section id="showcase" className="py-12 lg:py-16 bg-white">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            See it in action
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Campaign-ready visuals created entirely with Splash AI Studio.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {showcaseImages.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 ${
                image.tall ? "md:row-span-2" : ""
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
