/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";


import { BookOpen, Code, Lightbulb, Settings, ArrowRight, Check, Info, AlertTriangle,  Copy } from "lucide-react";
import { DocDialog } from "@/components/DocDialog";

const docsSections = [
  {
    title: "Getting Started",
    icon: <BookOpen className="h-5 w-5" />,
    items: [
      {
        title: "Introduction",
        description: "Learn about the core concepts and features.",
        link: "/docs/introduction",
      },
      {
        title: "Quick Start Guide",
        description: "Set up your account and create your first AI content.",
        link: "/docs/quickstart",
      },
      {
        title: "Authentication",
        description: "Learn how to authenticate and manage your API keys.",
        link: "/docs/authentication",
      },
    ],
  },
  {
    title: "Platform Guides",
    icon: <Lightbulb className="h-5 w-5" />,
    items: [
      {
        title: "Twitter Threads",
        description: "Create engaging Twitter threads with AI assistance.",
        link: "/docs/twitter-threads",
      },
      {
        title: "LinkedIn Posts",
        description: "Generate professional LinkedIn content that drives engagement.",
        link: "/docs/linkedin-posts",
      },
      {
        title: "Instagram Captions",
        description: "Craft compelling Instagram captions that resonate.",
        link: "/docs/instagram-captions",
      },
    ],
  },
  {
    title: "API Reference",
    icon: <Code className="h-5 w-5" />,
    items: [
      {
        title: "REST API",
        description: "Complete API reference for developers.",
        link: "/docs/api-reference",
      },
      {
        title: "Webhooks",
        description: "Integrate real-time updates into your application.",
        link: "/docs/webhooks",
      },
      {
        title: "Rate Limits",
        description: "Understanding API rate limits and quotas.",
        link: "/docs/rate-limits",
      },
    ],
  },
  {
    title: "Advanced Topics",
    icon: <Settings className="h-5 w-5" />,
    items: [
      {
        title: "Content Customization",
        description: "Advanced techniques for content customization.",
        link: "/docs/customization",
      },
      {
        title: "Best Practices",
        description: "Recommended practices for optimal results.",
        link: "/docs/best-practices",
      },
      {
        title: "Troubleshooting",
        description: "Common issues and how to resolve them.",
        link: "/docs/troubleshooting",
      },
    ],
  },
];

// Add this content map
const docsContent: Record<string, React.ReactNode> = {
  "/docs/introduction": (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Introduction
      </h2>
      
      <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <div className="flex gap-3">
          <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-medium text-blue-400 mb-1">Welcome to AI Content Generation</h4>
            <p className="text-gray-300">
              This documentation will help you understand how to use our platform effectively to create engaging content across multiple social media platforms.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">What is AI Content Generation?</h3>
        <p className="text-gray-300 leading-relaxed">
          Our platform uses advanced AI models to help you create compelling content for various social media platforms. Whether you're looking to create Twitter threads, LinkedIn posts, or Instagram captions, our AI assists you in generating high-quality content that resonates with your audience.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Multi-platform support",
            "AI-powered content generation",
            "Custom content formatting",
            "History tracking"
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <Check className="h-5 w-5 text-green-400" />
              <span className="text-gray-200">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  "/docs/quickstart": (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Quick Start Guide
      </h2>

      <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
        <div className="flex gap-3">
          <Info className="h-5 w-5 text-purple-400 flex-shrink-0 mt-1" />
          <p className="text-gray-300">
            Get started with our platform in just a few minutes. Follow these steps to begin generating content.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {[
          {
            step: 1,
            title: "Create an Account",
            description: "Sign up for an account using your email or social media credentials."
          },
          {
            step: 2,
            title: "Choose a Platform",
            description: "Select the social media platform you want to create content for."
          },
          {
            step: 3,
            title: "Generate Content",
            description: "Enter your topic or prompt and let our AI generate engaging content for you."
          }
        ].map((item, index) => (
          <div key={index} className="flex gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="h-8 w-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-semibold">
              {item.step}
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-1">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  "/docs/authentication": (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Authentication
      </h2>

      <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <div className="flex gap-3">
          <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-medium text-blue-400 mb-1">Secure Authentication</h4>
            <p className="text-gray-300">
              This Site uses Clerk Authentication to protect your account and content.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Sign Up Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Email", description: "Traditional email & password" },
            { title: "Google", description: "Sign in with Google" },
            { title: "LinkedIn", description: "Sign in with LinkedIn" },
            { title: "TikTok", description: "Sign in with TikTok" }
          ].map((option, index) => (
            <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <h4 className="font-medium text-white mb-2">{option.title}</h4>
              <p className="text-sm text-gray-400">{option.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
        <div className="flex gap-3">
          <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-medium text-green-400 mb-1">Security Features</h4>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Two-factor authentication support</li>
              <li>Secure password hashing</li>
              <li>Session management</li>
              <li>Regular security audits</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  "/docs/twitter-threads": (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Twitter Threads
      </h2>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Automatic thread splitting",
            "Character count optimization",
            "Hashtag suggestions",
            "Engagement hooks"
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <Check className="h-5 w-5 text-green-400" />
              <span className="text-gray-200">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Example Thread</h3>
        <div className="relative group">
          <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-gray-300">
              <Copy className="h-4 w-4" />
            </button>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 font-mono text-sm text-gray-300 whitespace-pre-wrap">
{`1/ How I built a SaaS in 30 days 🚀

Here's everything I learned...

2/ First, I validated the idea:
• Posted on Reddit
• Created landing page
• Collected email signups

3/ Tech stack:
• Next.js
• Tailwind
• Prisma
• PostgreSQL`}
          </div>
        </div>
      </div>

      <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
        <div className="flex gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-medium text-yellow-400 mb-1">Best Practices</h4>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Start with a strong hook</li>
              <li>Use appropriate spacing for readability</li>
              <li>Include relevant hashtags</li>
              <li>End with a call-to-action</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  "/docs/linkedin-posts": (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        LinkedIn Posts
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <h3 className="text-lg font-medium text-white mb-3">Content Types</h3>
          <div className="space-y-2">
            {[
              "Professional insights",
              "Career tips",
              "Industry trends",
              "Success stories"
            ].map((type, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">{type}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <h3 className="text-lg font-medium text-white mb-3">Formatting Guidelines</h3>
          <div className="space-y-2">
            {[
              "Clear paragraph breaks",
              "Appropriate emoji usage",
              "Professional tone",
              "Relevant hashtags"
            ].map((guideline, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-purple-400" />
                <span className="text-gray-300">{guideline}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
        <div className="flex gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-medium text-yellow-400 mb-1">Engagement Tips</h4>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Post during peak hours</li>
              <li>Engage with comments</li>
              <li>Use relevant hashtags</li>
              <li>Include a call-to-action</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  "/docs/instagram-captions": (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Instagram Captions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[
          {
            title: "Caption Elements",
            items: ["Attention-grabbing opening", "Storytelling elements", "Relevant emojis", "Strategic hashtags"],
            color: "blue"
          },
          {
            title: "Caption Styles",
            items: ["Personal stories", "Product descriptions", "Motivational quotes", "Behind-the-scenes"],
            color: "purple"
          },
          {
            title: "Optimization Tips",
            items: ["First 125 characters", "Line breaks", "Relevant hashtags", "Clear CTA"],
            color: "green"
          }
        ].map((section, index) => (
          <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <h3 className="text-lg font-medium text-white mb-3">{section.title}</h3>
            <div className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center gap-2">
                  <Check className={`h-4 w-4 text-${section.color}-400`} />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <div className="flex gap-3">
          <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-medium text-blue-400 mb-1">Pro Tip</h4>
            <p className="text-gray-300">
              Keep your most important information in the first 125 characters to ensure it's visible without expanding the caption.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
  "/docs/customization": (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Content Customization
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Tone Settings",
            items: ["Professional", "Casual", "Humorous", "Educational"]
          },
          {
            title: "Style Options",
            items: ["Content length", "Emoji usage", "Hashtag placement", "Formatting"]
          },
          {
            title: "Brand Voice",
            items: ["Brand guidelines", "Custom templates", "Vocabulary", "Tone parameters"]
          }
        ].map((section, index) => (
          <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <h3 className="text-lg font-medium text-white mb-3">{section.title}</h3>
            <div className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
        <div className="flex gap-3">
          <Info className="h-5 w-5 text-purple-400 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-medium text-purple-400 mb-1">Customization Tips</h4>
            <p className="text-gray-300">
              Take time to set up your brand voice and customization preferences. This will help ensure consistent content across all platforms.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
  "/docs/best-practices": (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Best Practices
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">General Tips</h3>
          <div className="space-y-3">
            {[
              "Be specific in your prompts",
              "Review and edit generated content",
              "Maintain brand consistency",
              "Test different approaches"
            ].map((tip, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                <Check className="h-5 w-5 text-green-400" />
                <span className="text-gray-200">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Platform-Specific Tips</h3>
          <div className="space-y-3">
            {[
              "Twitter: Focus on thread coherence",
              "LinkedIn: Maintain professional tone",
              "Instagram: Balance text and visuals"
            ].map((tip, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                <Check className="h-5 w-5 text-blue-400" />
                <span className="text-gray-200">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
        <div className="flex gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-medium text-yellow-400 mb-1">Important Reminders</h4>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Always review generated content before posting</li>
              <li>Keep your brand voice consistent</li>
              <li>Monitor content performance</li>
              <li>Adjust your approach based on results</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  "/docs/troubleshooting": (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Troubleshooting
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-medium text-red-400 mb-1">Common Issues</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Generation timeout</li>
                <li>Content quality concerns</li>
                <li>Platform limitations</li>
                <li>Account access problems</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
          <div className="flex gap-3">
            <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-medium text-green-400 mb-1">Quick Fixes</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Refresh the page</li>
                <li>Clear browser cache</li>
                <li>Check internet connection</li>
                <li>Verify account status</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <div className="flex gap-3">
          <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-medium text-blue-400 mb-1">Getting Help</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              {[
                "Contact support team",
                "Visit help center",
                "Check system status",
                "Join community forum"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export default function DocsPage() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  const handleDocClick = (link: string) => {
    setSelectedDoc(link);
  };

  return (
    <div className="min-h-screen bg-gray-950">
    

      <div className="container mx-auto px-4 py-20">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Documentation
          </h1>
          
          <div className="space-y-12">
            {docsSections.map((section, index) => (
              <div key={index}>
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.items.map((item, itemIndex) => (
                    <button
                      key={itemIndex}
                      onClick={() => handleDocClick(item.link)}
                      className="group p-6 rounded-xl border border-gray-800 bg-gray-900/50 hover:border-gray-700 transition-all duration-200 text-left"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium text-white">{item.title}</h3>
                        <ArrowRight className="h-5 w-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                      </div>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedDoc && (
        <DocDialog
          isOpen={!!selectedDoc}
          onClose={() => setSelectedDoc(null)}
          title={docsSections.flatMap(s => s.items).find(i => i.link === selectedDoc)?.title || ""}
          content={docsContent[selectedDoc] || <p>Content coming soon...</p>}
        />
      )}
    </div>
  );
}
