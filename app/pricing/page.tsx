"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckIcon, Sparkles, Zap, Shield } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const pricingPlans = [
  {
    name: "Basic",
    price: "9",
    priceId: "price_1QwmsjJ1Au2ZYhACBWwk3lSq",
    description: "Perfect for getting started with AI content generation",
    features: [
      "100 AI-generated posts per month",
      "Twitter thread generation",
      "Basic analytics",
      "Email support",
    
    ],
    color: "blue",
    popular: false,
  },
  {
    name: "Pro",
    price: "29",
    priceId: "price_1QwmtBJ1Au2ZYhACyEB5aJ7W",
    description: "Ideal for growing creators and small teams",
    features: [
      "500 AI-generated posts per month",
      "Twitter, Instagram, and LinkedIn content",
      "Advanced analytics",
      "Priority support",
      
    ],
    color: "purple",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceId: null,
    description: "For large teams with custom needs",
    features: [
      "Unlimited AI-generated posts",
      "All social media platforms",
      "Custom AI model training",
      "Dedicated account manager",
      "Unlimited user seats",
      "Custom integration",
      "SLA support",
      "Advanced security features"
    ],
    color: "green",
    popular: false,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function PricingPage() {
  const { isSignedIn, user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const handleSubscribe = async (priceId: string) => {
    if (!isSignedIn) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          userId: user?.id,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { sessionId } = await response.json();
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      if (!stripe) {
        throw new Error("Failed to load Stripe");
      }
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-8">
            Choose the perfect plan for your content creation needs
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${billingPeriod === 'monthly' ? 'text-white' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-16 h-8 bg-gray-700 rounded-full p-1 transition-colors duration-200"
            >
              <motion.div
                className="w-6 h-6 bg-white rounded-full"
                animate={{ x: billingPeriod === 'monthly' ? 0 : 32 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm ${billingPeriod === 'yearly' ? 'text-white' : 'text-gray-400'}`}>
              Yearly <span className="text-green-400">(-20%)</span>
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              variants={item}
              className={`relative ${
                plan.popular ? 'md:mt-4 md:mb-4' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-5 z-30 left-0 right-0 flex justify-center">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className={`h-full p-8 rounded-2xl bg-gradient-to-b from-gray-800/50 to-gray-800/30 backdrop-blur-xl border border-gray-700/30 hover:border-${plan.color}-500/50 transition-all duration-300`}>
                <div className="flex items-center gap-3 mb-6">
                  {plan.name === "Basic" && <Sparkles className="h-6 w-6 text-blue-400" />}
                  {plan.name === "Pro" && <Zap className="h-6 w-6 text-purple-400" />}
                  {plan.name === "Enterprise" && <Shield className="h-6 w-6 text-green-400" />}
                  <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
                </div>
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">
                      ${plan.price === "Custom" ? "Custom" : billingPeriod === 'yearly' ? 
                        (parseInt(plan.price) * 0.8).toString() : plan.price}
                    </span>
                    {plan.price !== "Custom" && (
                      <span className="text-gray-400">/month</span>
                    )}
                  </div>
                  <p className="text-gray-400 mt-2">{plan.description}</p>
                </div>
                <Button
                  onClick={() => plan.priceId && handleSubscribe(plan.priceId)}
                  disabled={isLoading || !plan.priceId}
                  className={`w-full mb-8 ${
                    plan.popular ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' : 
                    'bg-white text-black hover:bg-gray-200'
                  }`}
                >
                  {isLoading ? "Processing..." : plan.price === "Custom" ? "Contact Sales" : "Choose Plan"}
                </Button>
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3 text-gray-300">
                      <CheckIcon className={`w-5 h-5 mt-0.5 text-${plan.color}-400 flex-shrink-0`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ or Additional Info */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-400">
            All plans include 24/7 support and a 14-day money-back guarantee.
            <br />
            Need help choosing? <a href="/contact" className="text-blue-400 hover:text-blue-300">Contact our team</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
