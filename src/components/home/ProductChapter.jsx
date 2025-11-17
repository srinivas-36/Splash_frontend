// import React from "react";

// function ProductChapter({
//   title,
//   description,
//   imageSrc,
//   imageAlt,
//   imagePosition = "right",
// }) {
//   return (
//     <section className="py-12 lg:py-16 border-b border-gray-300">
//       <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
//         <div
//           className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
//             imagePosition === "left" ? "lg:flex-row-reverse" : ""
//           }`}
//         >
//           {/* Text Content */}
//           <div className={`space-y-6 ${imagePosition === "left" ? "lg:order-2" : ""}`}>
//             <h2 className="text-2xl lg:text-3xl font-bold">{title}</h2>
//             <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
//               {description}
//             </p>
//           </div>

//           {/* Image */}
//           <div className={`${imagePosition === "left" ? "lg:order-1" : ""}`}>
//             <div className="relative overflow-hidden rounded-2xl shadow-md hover:scale-105 transition-transform duration-300">
//               <img
//                 src={imageSrc}
//                 alt={imageAlt}
//                 className="w-full h-auto object-cover"
//                 loading="lazy"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default ProductChapter;
import React from "react";

function ProductChapter({ title, description, imageSrc, imageAlt, imagePosition = "right" }) {
  return (
    <section className="py-12 lg:py-16 border-b border-gray-200 bg-white">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
            imagePosition === "left" ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Text Content */}
          <div className={`space-y-6 ${imagePosition === "left" ? "lg:order-2" : ""}`}>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{title}</h2>
            <p className="text-lg text-gray-900 lg:text-xl  leading-relaxed">
              {description}
            </p>
          </div>

          {/* Image */}
          <div className={`${imagePosition === "left" ? "lg:order-1" : ""}`}>
            <div className="relative overflow-hidden rounded-2xl shadow-md hover:scale-105 transition-transform duration-300">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductChapter;
