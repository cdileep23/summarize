import Link from "next/link";
import React from "react";

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 9,
    description: "For Individuals",
    items: [
      "5 PDF Summaries Per Month",
      "Standard Processing Speed",
      "Email Support",
    ],
    paymentLink: "",
    priceId: "",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For Professionals and Teams",
    items: [
      "Unlimited PDF Summaries",
      "Priority Processing",
      "24/7 Priority Support",
      "Markdown Expert",
    ],
    price: 19,
    paymentLink: "",
    priceId: "",
  },
];

type PlanType = {
  id: String;
  name: String;
  price: Number;
  description: String;
  items: String[];
  paymentLink: String;
  priceId: String;
};

const PlanCard = ({
  id,
  name,
  price,
  paymentLink,
  priceId,
  items,
  description,
}: PlanType) => {
  const isPro = id === "pro";

  return (
    <div
      className={`w-full max-w-sm rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 ${
        isPro ? "border-2 border-rose-500" : "border border-gray-200"
      }`}
    >
      <div
        className={`px-6 py-8 ${
          isPro
            ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white"
            : "bg-gray-50"
        }`}
      >
        <p className="text-2xl font-bold mb-1">{name}</p>
        <p className="text-sm opacity-80">{description}</p>
      </div>

      <div className="px-6 py-6 border-b border-gray-200">
        <p className="text-4xl font-bold mb-1">
          {price}
          <span className="text-lg font-normal text-gray-500">/mo</span>
        </p>
      </div>

      <div className="px-6 py-6">
        <ul className="space-y-4">
          {items.map((item, i) => (
            <li key={i} className="flex items-start">
              <svg
                className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-6 py-6">
        <Link
          href={paymentLink}
          className={`w-full block text-center py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
            isPro
              ? "bg-rose-600 hover:bg-rose-700 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          }`}
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
};

export const PricingSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span className="block">Simple, Transparent Pricing</span>
          </h2>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Choose the plan that works best for you
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-8">
          {plans.map((plan) => (
            <PlanCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
