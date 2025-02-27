/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  SparklesIcon,
  ZapIcon,
  BarChartIcon,
  UsersIcon,
  StarIcon,
  ShieldIcon,
  TrendingUpIcon,
  MessageCircleIcon,
} from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { SignUpButton } from "@clerk/nextjs";



const stats = [
  { number: "10K+", label: "Active Users" },
  { number: "1M+", label: "Posts Generated" },
  { number: "3x", label: "Faster Content Creation" },
  { number: "24/7", label: "AI Assistance" },
];

export default function Home() {
  const { userId } = auth();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <main className="relative">
        {/* Enhanced background effects */}
        <div className="fixed inset-0 bg-[url('/grid.svg')] opacity-15 bg-center pointer-events-none animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="fixed inset-0 bg-gradient-to-b from-blue-500/15 via-purple-500/10 to-transparent animate-gradient pointer-events-none" />

        {/* Hero Section - Enhanced */}
        <div className="relative">
          <div className="container mx-auto px-4 pt-28 pb-20">
            <div className="text-center max-w-4xl mx-auto">
              {/* Animated Badge */}
              <div className="inline-block mb-6 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-xl hover:scale-105 transition-transform cursor-default animate-[float_3s_ease-in-out_infinite]">
                <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ✨ Powered by Advanced AI
                </span>
              </div>

              {/* Enhanced heading with animated gradient */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 animate-gradient-x bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-200">
                AI-Powered Social Media Content Generator
              </h1>

              <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Create engaging content for Twitter, Instagram, and LinkedIn with cutting-edge AI technology.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-8 py-6 rounded-xl text-lg transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transform-gpu"
                >
                  <Link href="/generate" className="flex items-center">
                    Start Creating
                    <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-gray-800 text-gray-300 hover:text-white hover:bg-gray-800/50 px-8 py-6 rounded-xl text-lg backdrop-blur-sm"
                >
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>

            {/* Enhanced Platform Icons */}
            <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                { icon: TwitterIcon, color: "text-blue-400", label: "Twitter", gradient: "from-blue-600/20 to-blue-400/10" },
                { icon: InstagramIcon, color: "text-pink-400", label: "Instagram", gradient: "from-pink-600/20 to-purple-400/10" },
                { icon: LinkedinIcon, color: "text-blue-500", label: "LinkedIn", gradient: "from-blue-700/20 to-blue-500/10" },
              ].map((platform, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-b border border-gray-700/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 cursor-pointer ${platform.gradient}">
                    <platform.icon className={`w-8 h-8 ${platform.color} transition-transform group-hover:scale-110`} />
                  </div>
                  <p className="text-gray-400 mt-3 group-hover:text-white transition-colors">{platform.label}</p>
                </div>
              ))}
            </div>

            {/* Enhanced Stats Section */}
            <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center p-6 rounded-2xl bg-gradient-to-b from-gray-800/30 to-gray-800/20 border border-gray-700/50 backdrop-blur-sm hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 animate-[pulse_3s_ease-in-out_infinite]">
                    {stat.number}
                  </div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="relative">
          <div className="absolute inset-0backdrop-blur-3xl" />
          <div className="relative container mx-auto px-4 py-24">
            <h2 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-16">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {[
                {
                  step: "1",
                  title: "Choose Platform",
                  description: "Select your target social media platform",
                  icon: UsersIcon,
                },
                {
                  step: "2",
                  title: "Generate Content",
                  description: "Let AI create engaging posts for you",
                  icon: SparklesIcon,
                },
                {
                  step: "3",
                  title: "Publish & Track",
                  description: "Share content and monitor performance",
                  icon: TrendingUpIcon,
                },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                    {item.step}
                  </div>
                  <div className="p-6 rounded-2xl bg-gradient-to-b from-gray-800/50 to-gray-800/30 border border-gray-700/50 backdrop-blur-sm">
                    <div className="inline-flex p-3 rounded-xl bg-blue-500/10 mb-4">
                      <item.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="relative">
          <div className="absolute inset-0 backdrop-blur-3xl" />
          <div className="relative container mx-auto px-4 py-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Supercharge Your Social Media Presence
              </h2>
              <p className="text-gray-400 text-lg">
                Everything you need to create engaging content at scale
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {[
                {
                  icon: SparklesIcon,
                  title: "AI-Powered Content",
                  description: "Generate high-quality content tailored to your brand voice",
                  color: "blue"
                },
                {
                  icon: ZapIcon,
                  title: "Lightning Fast",
                  description: "Create weeks worth of content in minutes",
                  color: "yellow"
                },
                {
                  icon: BarChartIcon,
                  title: "Analytics",
                  description: "Track performance and optimize your content strategy",
                  color: "green"
                },
                {
                  icon: UsersIcon,
                  title: "Multi-Platform",
                  description: "Optimize content for each social network automatically",
                  color: "purple"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative p-6 rounded-2xl bg-gradient-to-b from-gray-800/50 to-gray-800/30 border border-gray-700/50 hover:border-gray-600/50 backdrop-blur-sm transition-all duration-300"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-${feature.color}-500/10 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      

        {/* Trust Indicators Section - Enhanced */}
        <div className="relative">
          <div className="absolute inset-0 backdrop-blur-3xl" />
          <div className="relative container mx-auto px-4 py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: ShieldIcon,
                  title: "Enterprise-Grade Security",
                  description: "Your data is protected with advanced encryption",
                  gradient: "from-green-500/10 to-emerald-500/10",
                  iconColor: "text-green-400"
                },
                {
                  icon: StarIcon,
                  title: "99.9% Uptime",
                  description: "Reliable service you can count on",
                  gradient: "from-yellow-500/10 to-orange-500/10",
                  iconColor: "text-yellow-400"
                },
                {
                  icon: MessageCircleIcon,
                  title: "24/7 Support",
                  description: "Get help whenever you need it",
                  gradient: "from-blue-500/10 to-purple-500/10",
                  iconColor: "text-blue-400"
                },
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="group p-6 rounded-2xl bg-gradient-to-b from-gray-800/30 to-gray-800/20 border border-gray-700/50 backdrop-blur-sm hover:border-gray-600 transition-all duration-300 hover:transform hover:-translate-y-1"
                >
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${item.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section - Enhanced */}
        <div className="relative">
          <div className="absolute inset-0  backdrop-blur-3xl" />
          <div className="relative container mx-auto px-4 py-24">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-block animate-[float_3s_ease-in-out_infinite]">
                <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-400 text-sm mb-6">
                  ⚡ Limited Time Offer
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                Start Creating Amazing Content Today
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Join thousands of content creators who are already using our platform
              </p>
              {userId ? (
                <Button
                  asChild
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-6 rounded-xl text-lg transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-purple-500/40 hover:scale-105"
                >
                  <Link href="/generate" className="flex items-center">
                    Start Creating Now
                    <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              ) : (
                <SignUpButton mode="modal">
                  <Button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-6 rounded-xl text-lg transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-purple-500/40 hover:scale-105">
                    <span className="flex items-center">
                      Get Started Free
                      <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </SignUpButton>
              )}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-400">
                <span className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 mr-2 text-green-400" />
                  No credit card required
                </span>
               
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}