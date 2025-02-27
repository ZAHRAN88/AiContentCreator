"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, History, Copy, Twitter, Linkedin, Instagram, Zap, Check, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950">
      <div className="container mx-auto px-4 py-20">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Features & Capabilities
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Generate engaging content for multiple platforms with AI-powered assistance
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Multi-Platform Support */}
          <motion.div 
            variants={item}
            className="group relative bg-gradient-to-b from-gray-800/50 to-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30 hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                  <Sparkles className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Multi-Platform Support</h3>
              </div>
              <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
                Generate content optimized for different social media platforms:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300 group-hover:text-white transition-colors">
                  <Twitter className="h-5 w-5 text-blue-400" />
                  <span>Twitter Threads</span>
                  <ArrowUpRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center gap-3 text-gray-300 group-hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5 text-blue-500" />
                  <span>LinkedIn Posts</span>
                  <ArrowUpRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center gap-3 text-gray-300 group-hover:text-white transition-colors">
                  <Instagram className="h-5 w-5 text-pink-400" />
                  <span>Instagram Captions</span>
                  <ArrowUpRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* History Tracking */}
          <motion.div 
            variants={item}
            className="group relative bg-gradient-to-b from-gray-800/50 to-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30 hover:border-purple-500/50 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                  <History className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">History Tracking</h3>
              </div>
              <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
                Keep track of all your generated content with a comprehensive history system:
              </p>
              <ul className="space-y-3">
                {["View past generations", "Reuse successful content", "Easy content management"].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300 group-hover:text-white transition-colors">
                    <Check className="h-5 w-5 text-purple-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            variants={item}
            className="group relative bg-gradient-to-b from-gray-800/50 to-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30 hover:border-green-500/50 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-green-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500/10 rounded-xl group-hover:bg-green-500/20 transition-colors">
                  <Zap className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Quick Actions</h3>
              </div>
              <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
                Streamlined workflow with convenient features:
              </p>
              <ul className="space-y-3">
                {[
                  { icon: Copy, text: "One-click copy to clipboard" },
                  { icon: ArrowRight, text: "Platform-specific formatting" },
                  { icon: ArrowRight, text: "Instant preview" }
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300 group-hover:text-white transition-colors">
                    <item.icon className="h-5 w-5 text-green-400" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div 
          className="mt-16 text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Ready to start generating content?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/generate">
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 rounded-full font-medium transition-all duration-200 hover:scale-105"
              >
                Start Generating
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                size="lg"
                variant="outline"
                className="border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white px-8 py-6 rounded-full font-medium transition-all duration-200"
              >
                View Documentation
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
