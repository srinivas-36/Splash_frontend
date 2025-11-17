// import React from "react";
// import { Check } from "lucide-react";

// const plans = [
//   {
//     name: "Starter",
//     price: "$99",
//     period: "per month",
//     description: "Perfect for small brands testing the waters.",
//     features: [
//       "50 renders/month",
//       "1 team seat",
//       "Basic model library",
//       "Background removal",
//       "Standard export presets",
//     ],
//     cta: "Start Trial",
//     highlighted: false,
//   },
//   {
//     name: "Studio",
//     price: "$299",
//     period: "per month",
//     description: "For growing brands with regular campaigns.",
//     features: [
//       "500 renders/month",
//       "5 team seats",
//       "Full model library",
//       "Advanced retouch tools",
//       "Custom export presets",
//       "Priority support",
//     ],
//     cta: "Start Trial",
//     highlighted: true,
//   },
//   {
//     name: "Enterprise",
//     price: "Custom",
//     period: "contact sales",
//     description: "Unlimited power for established brands.",
//     features: [
//       "Unlimited renders",
//       "Unlimited seats",
//       "Custom model training",
//       "API access",
//       "Dedicated account manager",
//       "SSO & advanced security",
//     ],
//     cta: "Talk to Sales",
//     highlighted: false,
//   },
// ];

// function PricingSection() {
//   return (
//     <section id="pricing" className="py-12 lg:py-16 bg-gray-100">
//       <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-3xl font-bold mb-4">Simple, transparent pricing</h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Choose the plan that fits your creative needs.
//           </p>
//         </div>

//         {/* Plans Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {plans.map((plan, index) => (
//             <div
//               key={index}
//               className={`relative p-6 rounded-xl border ${
//                 plan.highlighted
//                   ? "border-purple-600 shadow-lg scale-105 bg-white"
//                   : "border-gray-300 bg-white"
//               }`}
//             >
//               {plan.highlighted && (
//                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
//                   Most Popular
//                 </div>
//               )}

//               {/* Plan Header */}
//               <div className="text-center pb-8">
//                 <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
//                 <div className="mb-2">
//                   <span className="text-4xl font-bold">{plan.price}</span>
//                   <span className="text-gray-500 ml-2">/{plan.period}</span>
//                 </div>
//                 <p className="text-sm text-gray-600">{plan.description}</p>
//               </div>

//               {/* Features */}
//               <div className="space-y-6">
//                 <ul className="space-y-3">
//                   {plan.features.map((feature, i) => (
//                     <li key={i} className="flex items-start gap-3">
//                       <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
//                       <span className="text-sm text-gray-700">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>

//                 {/* CTA Button */}
//                 <button
//                   className={`w-full py-2 rounded-md font-medium transition-colors ${
//                     plan.highlighted
//                       ? "bg-purple-600 text-white hover:bg-purple-700"
//                       : "border border-gray-300 text-gray-700 hover:bg-gray-50"
//                   }`}
//                 >
//                   {plan.cta}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default PricingSection;
import React from "react";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$99",
    period: "per month",
    description: "Perfect for small brands testing the waters.",
    features: [
      "50 renders/month",
      "1 team seat",
      "Basic model library",
      "Background removal",
      "Standard export presets",
    ],
    cta: "Start Trial",
    highlighted: false,
  },
  {
    name: "Studio",
    price: "$299",
    period: "per month",
    description: "For growing brands with regular campaigns.",
    features: [
      "500 renders/month",
      "5 team seats",
      "Full model library",
      "Advanced retouch tools",
      "Custom export presets",
      "Priority support",
    ],
    cta: "Start Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact sales",
    description: "Unlimited power for established brands.",
    features: [
      "Unlimited renders",
      "Unlimited seats",
      "Custom model training",
      "API access",
      "Dedicated account manager",
      "SSO & advanced security",
    ],
    cta: "Talk to Sales",
    highlighted: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-12 lg:py-16 bg-white">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your creative needs.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-2xl border shadow-lg transition-transform ${
                plan.highlighted
                  ? "border-purple-600 scale-105 bg-gradient-to-b from-purple-50 to-white"
                  : "border-gray-200 bg-white"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                  Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center pb-8">
                <h3 className="text-2xl font-semibold mb-2 text-gray-900">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 ml-2">/{plan.period}</span>
                </div>
                <p className="text-sm text-gray-500">{plan.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-2 rounded-md font-medium transition-colors ${
                    plan.highlighted
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "border border-gray-300 text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
