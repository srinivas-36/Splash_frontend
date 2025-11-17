// import React, { useState } from "react";
// import {
//   FileText,
//   Users,
//   Sparkles,
//   Share2,
//   ImagePlus,
//   UserCircle,
//   Camera,
//   Wand2,
// } from "lucide-react";

// const steps = [
//   {
//     icon: FileText,
//     title: "Brief",
//     description: "Upload moodboards and define your brand feel.",
//   },
//   {
//     icon: Users,
//     title: "Model",
//     description: "Choose AI models or upload approved talent.",
//   },
//   {
//     icon: Sparkles,
//     title: "Generate",
//     description: "Create multiple takes and refine details.",
//   },
//   {
//     icon: Share2,
//     title: "Publish",
//     description: "Export for PDP, marketplace, and social.",
//   },
// ];

// const imageOptions = [
//   {
//     icon: ImagePlus,
//     title: "Background Generation",
//     description: "Generate plain background images or replace existing backgrounds for your product.",
//   },
//   {
//     icon: UserCircle,
//     title: "Model Integration",
//     description: "Generate AI or real model images with the product for authentic representation.",
//   },
//   {
//     icon: Camera,
//     title: "Campaign Shots",
//     description: "Generate campaign shots after selecting your campaign reference materials.",
//   },
//   {
//     icon: Wand2,
//     title: "Direct Prompting",
//     description: "Generate custom images by providing direct text prompts for maximum flexibility.",
//   },
// ];

// function HowItWorks() {
//   const [activeTab, setActiveTab] = useState("projects");

//   return (
//     <section id="how-it-works" className="py-12 lg:py-16">
//       <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
//         <div className="text-center mb-16">
//           <h2 className="text-headline mb-4">How it works</h2>
//         </div>

//         {/* Tabs */}
//         <div className="w-full max-w-md mx-auto mb-12 flex border-b border-gray-300">
//           <button
//             className={`flex-1 py-2 text-center font-medium transition-colors ${
//               activeTab === "projects"
//                 ? "border-b-2 border-purple-600 text-purple-600"
//                 : "text-gray-600 hover:text-gray-800"
//             }`}
//             onClick={() => setActiveTab("projects")}
//           >
//             Projects
//           </button>
//           <button
//             className={`flex-1 py-2 text-center font-medium transition-colors ${
//               activeTab === "images"
//                 ? "border-b-2 border-purple-600 text-purple-600"
//                 : "text-gray-600 hover:text-gray-800"
//             }`}
//             onClick={() => setActiveTab("images")}
//           >
//             Images
//           </button>
//         </div>

//         {/* Tab Content */}
//         {activeTab === "projects" && (
//           <div>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center mb-12">
//               Four simple steps from concept to campaign with team collaboration.
//             </p>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
//               {steps.map((step, index) => (
//                 <div key={index} className="text-center space-y-4">
//                   <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 mb-2">
//                     <step.icon size={32} strokeWidth={1.5} />
//                   </div>
//                   <div className="text-sm font-medium text-gray-500">
//                     Step {index + 1}
//                   </div>
//                   <h3 className="text-2xl font-semibold">{step.title}</h3>
//                   <p className="text-gray-600">{step.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === "images" && (
//           <div>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center mb-12">
//               Quick and powerful AI image generation for individual creators.
//             </p>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
//               {imageOptions.map((option, index) => (
//                 <div key={index} className="text-center space-y-4">
//                   <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 mb-2">
//                     <option.icon size={32} strokeWidth={1.5} />
//                   </div>
//                   <div className="text-sm font-medium text-gray-500">
//                     Option {index + 1}
//                   </div>
//                   <h3 className="text-2xl font-semibold">{option.title}</h3>
//                   <p className="text-gray-600">{option.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// export default HowItWorks;
import React, { useState } from "react";
import {
  FileText,
  Users,
  Sparkles,
  Share2,
  ImagePlus,
  UserCircle,
  Camera,
  Wand2,
} from "lucide-react";

const steps = [
  { icon: FileText, title: "Brief", description: "Upload moodboards and define your brand feel." },
  { icon: Users, title: "Model", description: "Choose AI models or upload approved talent." },
  { icon: Sparkles, title: "Generate", description: "Create multiple takes and refine details." },
  { icon: Share2, title: "Publish", description: "Export for PDP, marketplace, and social." },
];

const imageOptions = [
  {
    icon: ImagePlus,
    title: "Background Generation",
    description: "Generate plain background images or replace existing backgrounds for your product.",
  },
  {
    icon: UserCircle,
    title: "Model Integration",
    description: "Generate AI or real model images with the product for authentic representation.",
  },
  {
    icon: Camera,
    title: "Campaign Shots",
    description: "Generate campaign shots after selecting your campaign reference materials.",
  },
  {
    icon: Wand2,
    title: "Direct Prompting",
    description: "Generate custom images by providing direct text prompts for maximum flexibility.",
  },
];

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <section id="how-it-works" className="py-12 lg:py-16 bg-white">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
            How it works
          </h2>
        </div>

        {/* Tabs Buttons */}
        <div className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 border-b border-gray-300">
          <button
            className={`py-2 font-medium transition-colors ${
              activeTab === "projects"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("projects")}
          >
            Projects
          </button>
          <button
            className={`py-2 font-medium transition-colors ${
              activeTab === "images"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("images")}
          >
            Images
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "projects" && (
          <div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center mb-12">
              Four simple steps from concept to campaign with team collaboration.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {steps.map((step, index) => (
                <div key={index} className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 mb-2">
                    <step.icon size={32} strokeWidth={1.5} />
                  </div>
                  <div className="text-sm font-medium text-gray-500">Step {index + 1}</div>
                  <h3 className="text-2xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "images" && (
          <div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center mb-12">
              Quick and powerful AI image generation for individual creators.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {imageOptions.map((option, index) => (
                <div key={index} className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 mb-2">
                    <option.icon size={32} strokeWidth={1.5} />
                  </div>
                  <div className="text-sm font-medium text-gray-500">Option {index + 1}</div>
                  <h3 className="text-2xl font-semibold text-gray-900">{option.title}</h3>
                  <p className="text-gray-600">{option.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HowItWorks;
