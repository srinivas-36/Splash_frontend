// // import { useState } from "react";
// // import beforeImage from "../assets/before-ring.jpg";
// // import afterImage from "../assets/after-ring.jpg";

// // const BeforeAfter = () => {
// //   const [sliderPosition, setSliderPosition] = useState(50);

// //   const handleSliderChange = (e) => {
// //     setSliderPosition(Number(e.target.value));
// //   };

// //   return (
// //     <section className="py-12 lg:py-16 bg-secondary/30">
// //       <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
// //         <div className="text-center mb-16">
// //           <h2 className="text-headline mb-4">From packshot to editorial</h2>
// //           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
// //             Transform basic product photos into stunning campaign visuals.
// //           </p>
// //         </div>

// //         <div className="max-w-4xl mx-auto">
// //           <div className="relative overflow-hidden rounded-2xl shadow-premium">
// //             <img
// //               src={afterImage}
// //               alt="After: Editorial jewelry photography"
// //               className="w-full h-auto"
// //             />

// //             <div
// //               className="absolute top-0 left-0 h-full overflow-hidden"
// //               style={{ width: `${sliderPosition}%` }}
// //             >
// //               <img
// //                 src={beforeImage}
// //                 alt="Before: Basic product shot"
// //                 className="w-full h-full object-cover"
// //                 style={{ width: "calc(100vw - 48px)", maxWidth: "1024px" }}
// //               />
// //             </div>

// //             <div
// //               className="absolute top-0 bottom-0 w-1 bg-accent cursor-ew-resize"
// //               style={{ left: `${sliderPosition}%` }}
// //             >
// //               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg">
// //                 <div className="w-4 h-4 border-2 border-accent-foreground rounded-full" />
// //               </div>
// //             </div>

// //             <input
// //               type="range"
// //               min="0"
// //               max="100"
// //               value={sliderPosition}
// //               onChange={handleSliderChange}
// //               className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
// //               aria-label="Compare before and after images"
// //             />

// //             <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
// //               Before
// //             </div>
// //             <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
// //               After
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };
// // export default BeforeAfter;
// "use client";
// import { useState } from "react";

// const BeforeAfter = () => {
//   const [sliderPosition, setSliderPosition] = useState(50);

//   const handleSliderChange = (e) => {
//     setSliderPosition(Number(e.target.value));
//   };

//   return (
//     <section className="py-12 lg:py-16 bg-secondary/30">
//       <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
//         <div className="text-center mb-16">
//           <h2 className="text-headline mb-4">From packshot to editorial</h2>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Transform basic product photos into stunning campaign visuals.
//           </p>
//         </div>

//         <div className="max-w-4xl mx-auto">
//           <div className="relative overflow-hidden rounded-2xl shadow-premium">
//             {/* After Image */}
//             <img
//               src="/images/after-ring.jpg"
//               alt="After: Editorial jewelry photography"
//               className="w-full h-auto"
//             />

//             {/* Before Image (masked by slider) */}
//             <div
//               className="absolute top-0 left-0 h-full overflow-hidden"
//               style={{ width: `${sliderPosition}%` }}
//             >
//               <img
//                 src="/images/before-ring.jpg"
//                 alt="Before: Basic product shot"
//                 className="w-full h-full object-cover"
//                 style={{ width: "calc(100vw - 48px)", maxWidth: "1024px" }}
//               />
//             </div>

//             {/* Slider Divider */}
//             <div
//               className="absolute top-0 bottom-0 w-1 bg-accent cursor-ew-resize"
//               style={{ left: `${sliderPosition}%` }}
//             >
//               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg">
//                 <div className="w-4 h-4 border-2 border-accent-foreground rounded-full" />
//               </div>
//             </div>

//             {/* Invisible Range Input */}
//             <input
//               type="range"
//               min="0"
//               max="100"
//               value={sliderPosition}
//               onChange={handleSliderChange}
//               className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
//               aria-label="Compare before and after images"
//             />

//             {/* Labels */}
//             <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
//               Before
//             </div>
//             <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
//               After
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BeforeAfter;
"use client";
import { useState } from "react";

const BeforeAfter = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            From packshot to editorial
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Transform basic product photos into stunning campaign visuals.
          </p>
        </div>

        {/* Before/After Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl shadow-xl bg-white">
            {/* After Image (Full) */}
            <img
              src="/images/after-ring.jpg"
              alt="After: Editorial jewelry photography"
              className="w-full h-auto object-cover"
            />

            {/* Before Image (Clipped) */}
            <div
              className="absolute top-0 left-0 h-full overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src="/images/before-ring.jpg"
                alt="Before: Basic product shot"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Slider Divider */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-blue-500 cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-4 h-4 border-2 border-white rounded-full" />
              </div>
            </div>

            {/* Invisible Slider Input */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleSliderChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
              aria-label="Compare before and after images"
            />

            {/* Labels */}
            <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm lg:text-base font-medium text-gray-800">
              Before
            </div>
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm lg:text-base font-medium text-gray-800">
              After
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
