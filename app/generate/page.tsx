"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  Upload,
  Copy,
  Twitter,
  Instagram,
  Linkedin,
  Clock,
  Zap,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import { Navbar } from "@/components/Navbar";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  getUserPoints,
  saveGeneratedContent,
  updateUserPoints,
  getGeneratedContentHistory,
  createOrUpdateUser,
  clearGeneratedContentHistory,
} from "@/utils/db/actions";
import { TwitterMock } from "@/components/social-mocks/TwitterMock";
import { InstagramMock } from "@/components/social-mocks/InstagramMock";
import { LinkedInMock } from "@/components/social-mocks/LinkedInMock";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import Loading from "./loading";


const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const contentTypes = [
  { value: "twitter", label: "Twitter Thread" },
  { value: "instagram", label: "Instagram Caption" },
  { value: "linkedin", label: "LinkedIn Post" },
];

const MAX_TWEET_LENGTH = 280;
const POINTS_PER_GENERATION = 5;

interface HistoryItem {
  id: number;
  contentType: string;
  prompt: string;
  content: string;
  createdAt: Date;
}

export default function GenerateContent() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  const [contentType, setContentType] = useState(contentTypes[0].value);
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [userPoints, setUserPoints] = useState<number | null>(500);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedHistoryItem, setSelectedHistoryItem] =
    useState<HistoryItem | null>(null);

  useEffect(() => {
    if (!apiKey) {
      console.error("Gemini API key is not set");
    }
  }, []);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    } else if (isSignedIn && user) {
      console.log("User loaded:", user);
      fetchUserPoints();
      fetchContentHistory();
    }
  }, [isLoaded, isSignedIn, user, router]);

  const fetchUserPoints = async () => {
    if (user?.id) {
      console.log("Fetching points for user:", user.id);
      const points = await getUserPoints(user.id);
      console.log("Fetched points:", points);
      setUserPoints(points);
      if (points === 0) {
        console.log("User has 0 points. Attempting to create/update user.");
        const updatedUser = await createOrUpdateUser(
          user.id,
          user.emailAddresses[0].emailAddress,
          user.fullName || ""
        );
        console.log("Updated user:", updatedUser);
        if (updatedUser) {
          setUserPoints(updatedUser.points);
        }
      }
    }
  };

  const fetchContentHistory = async () => {
    if (user?.id) {
      const contentHistory = await getGeneratedContentHistory(user.id);
      setHistory(contentHistory);
    }
  };

  const handleGenerate = async () => {
    if (
      !genAI ||
      !user?.id ||
      userPoints === null ||
      userPoints < POINTS_PER_GENERATION
    ) {
      alert("Not enough points or API key not set.");
      return;
    }

    setIsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

      let promptText = `Generate ${contentType} content about "${prompt}".`;
      if (contentType === "twitter") {
        promptText +=
          `
 
Stay within 280 characters
Include 1-2 relevant emojis that enhance the message
Add 1-2 trending or relevant hashtags
Incorporate wit, humor, or relatability where appropriate
Please provide 3 options:
A) A casual, conversational tweet
B) A clever/witty observation
C) A more thoughtful/inspirational take

Note: Focus on creating shareable content that encourages engagement (likes, retweets, replies) while maintaining authenticity.
don't number the three options like A) .. B) just send them and dont give an intro for the message
`;
      } else if (contentType === "linkedin") {
        promptText += `
Create a professional LinkedIn post that:
- Has a compelling hook in the first line
- Provides valuable insights or lessons learned
- Uses appropriate professional tone
- Includes 2-3 relevant hashtags
- Incorporates appropriate line breaks for readability
- Keeps length between 150-250 words
- Encourages meaningful professional engagement
- Optionally includes 1-2 professional emojis where appropriate

Please provide the post without any additional formatting or labels.`;
      }

      let imagePart: Part | null = null;
      if (contentType === "instagram" && image) {
        const reader = new FileReader();
        const imageData = await new Promise<string>((resolve) => {
          reader.onload = (e) => {
            if (e.target && typeof e.target.result === "string") {
              resolve(e.target.result);
            } else {
              resolve("");
            }
          };
          reader.readAsDataURL(image);
        });

        const base64Data = imageData.split(",")[1];
        if (base64Data) {
          imagePart = {
            inlineData: {
              data: base64Data,
              mimeType: image.type,
            },
          };
        }
        promptText += `Analyze this image in detail and create a compelling Instagram caption that:

Captures the mood, atmosphere, and key elements of the scene
Includes relevant emotional elements or storytelling
Incorporates 2-3 fitting emojis
Adds relevant hashtags (max 5) that would help with discovery
Keeps the overall length between 100-150 characters (not counting hashtags)
and don't add ur text format to the response (*,#)
don't provide me the image analysis just the post caption
`;
      }

      const parts: (string | Part)[] = [promptText];
      if (imagePart) parts.push(imagePart);

      const result = await model.generateContent(parts);
      const generatedText = result.response.text();

      let content: string[];
      if (contentType === "twitter") {
        content = generatedText
          .split("\n\n")
          .filter((tweet) => tweet.trim() !== "");
      } else {
        content = [generatedText];
      }

      setGeneratedContent(content);

      // Update points
      const updatedUser = await updateUserPoints(
        user.id,
        -POINTS_PER_GENERATION
      );
      if (updatedUser) {
        setUserPoints(updatedUser.points);
      }

      // Save generated content
      const savedContent = await saveGeneratedContent(
        user.id,
        content.join("\n\n"),
        prompt,
        contentType
      );

      if (savedContent) {
        setHistory((prevHistory) => [savedContent, ...prevHistory]);
      }
    } catch (error) {
      console.error("Error generating content:", error);
      setGeneratedContent(["An error occurred while generating content."]);
    } finally {
      setIsLoading(false);
    }
  };


  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const renderContentMock = () => {
    if (generatedContent.length === 0) return null;

    switch (contentType) {
      case "twitter":
        return <TwitterMock content={generatedContent} />;
      case "instagram":
        return <InstagramMock content={generatedContent[0]} />;
      case "linkedin":
        return <LinkedInMock content={generatedContent[0]} />;
      default:
        return null;
    }
  };

  const clearHistory = async () => {
    if (user?.id) {
      await clearGeneratedContentHistory(user.id);
      setHistory([]);
      setSelectedHistoryItem(null);
    }
  };

  if (!isLoaded) {
    return <Loading/>;
  }

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
        <div className="text-center bg-[#111111] p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-4">
            Welcome to ThreadCraft AI
          </h1>
          <p className="text-gray-400 mb-6">
            To start generating amazing content, please sign in or create an
            account.
          </p>
          <SignInButton mode="modal">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
              Sign In / Sign Up
            </Button>
          </SignInButton>
          <p className="text-gray-500 mt-4 text-sm">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    );
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-4 mb-8 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 mt-14 lg:grid-cols-12 gap-8">
          {/* Left sidebar - History */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 bg-gradient-to-b from-gray-800/50 to-gray-800/30 backdrop-blur-xl rounded-3xl p-6 h-[calc(100vh-12rem)] overflow-y-auto border border-gray-700/30"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-blue-400" />
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  History
                </h2>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="p-2 hover:bg-red-500/10 text-red-400 rounded-full transition-colors duration-200"
                    title="Clear History"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-900 border border-gray-800">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">Clear History</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                      Are you sure you want to clear your entire generation history? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-800 text-white hover:bg-gray-700">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={clearHistory}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      Clear History
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            
            <div className="space-y-4">
              {history.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <div className="flex justify-center mb-3">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <p>No generation history yet</p>
                  <p className="text-sm mt-1">Generated content will appear here</p>
                </div>
              ) : (
                history.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedHistoryItem?.id === item.id
                        ? "bg-blue-500/20 border border-blue-500/30"
                        : "hover:bg-gray-700/50 border border-transparent"
                    }`}
                    onClick={() => setSelectedHistoryItem(item)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {item.contentType === "twitter" && <Twitter className="h-4 w-4 text-blue-400" />}
                      {item.contentType === "instagram" && <Instagram className="h-4 w-4 text-pink-400" />}
                      {item.contentType === "linkedin" && <Linkedin className="h-4 w-4 text-blue-600" />}
                      <span className="text-sm text-gray-400">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 line-clamp-2">{item.prompt}</p>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

          {/* Main content area */}
          <div className="lg:col-span-9 space-y-6">
            {/* Points display */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-8 rounded-3xl flex items-center justify-between backdrop-blur-xl border border-blue-500/20 hover:border-blue-500/30 transition-all duration-300 shadow-[0_0_25px_rgba(59,130,246,0.1)]">
              <div className="flex items-center">
                <div className="bg-blue-500/20 p-3 rounded-2xl mr-4">
                  <Zap className="h-8 w-8 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Available Points</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {userPoints !== null ? userPoints : "Loading..."}
                  </p>
                </div>
              </div>
              <Button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-sm py-3 px-6 rounded-2xl transition-all duration-300 border border-blue-500/30 hover:border-blue-500/50 shadow-lg hover:shadow-blue-500/20">
                <Link href="/pricing" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Get More Points
                </Link>
              </Button>
            </div>

            {/* Content generation form */}
            <div className="bg-gradient-to-b from-gray-800/50 to-gray-800/30 backdrop-blur-xl p-8 rounded-3xl space-y-6 border border-gray-700/30">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Content Type
                </label>
                <Select onValueChange={setContentType} defaultValue={contentType}>
                  <SelectTrigger className="w-full bg-gray-800/50 border-gray-700/50 rounded-2xl shadow-sm transition-all duration-300 hover:border-blue-500/50 focus:border-blue-500/50 h-12">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border border-gray-700">
                    {contentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center">
                          {type.value === "twitter" && (
                            <Twitter className="mr-2 h-4 w-4 text-blue-400" />
                          )}
                          {type.value === "instagram" && (
                            <Instagram className="mr-2 h-4 w-4 text-pink-400" />
                          )}
                          {type.value === "linkedin" && (
                            <Linkedin className="mr-2 h-4 w-4 text-gray-400" />
                          )}
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="prompt" className="block text-sm font-medium mb-2 text-gray-300">
                  Prompt
                </label>
                <Textarea
                  id="prompt"
                  placeholder="Enter your prompt here..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="w-full bg-gray-800/50 border-gray-700/50 rounded-2xl resize-none transition-all duration-300 hover:border-blue-500/50 focus:border-blue-500/50"
                />
              </div>

              {contentType === "instagram" && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-300">
                    Upload Image
                  </label>
                  <div className="flex items-center space-x-3">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex items-center justify-center px-6 py-3 bg-blue-500/20 rounded-2xl text-sm font-medium text-blue-400 hover:bg-blue-500/30 transition-all duration-300 border border-blue-500/30 hover:border-blue-500/50"
                    >
                      <Upload className="mr-2 h-5 w-5" />
                      <span>Upload Image</span>
                    </label>
                    {image && (
                      <span className="text-sm text-gray-400">{image.name}</span>
                    )}
                  </div>
                </div>
              )}

              <Button
                onClick={handleGenerate}
                disabled={isLoading || !prompt || userPoints === null || userPoints < POINTS_PER_GENERATION}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  `Generate Content (${POINTS_PER_GENERATION} points)`
                )}
              </Button>
            </div>

            {/* Generated content display with updated styling */}
            {(selectedHistoryItem || generatedContent.length > 0) && (
              <div className="bg-gradient-to-b from-gray-800/50 to-gray-800/30 backdrop-blur-xl p-8 rounded-3xl space-y-6 border border-gray-700/30">
                <h2 className="text-2xl font-semibold text-blue-400">
                  {selectedHistoryItem ? "History Item" : "Generated Content"}
                </h2>
                {contentType === "twitter" ? (
                  <div className="space-y-4">
                    {(selectedHistoryItem
                      ? selectedHistoryItem.content.split("\n\n")
                      : generatedContent
                    ).map((tweet, index) => (
                      <div
                        key={index}
                        className="bg-gray-700 p-4 rounded-xl relative"
                      >
                        <ReactMarkdown className="prose prose-invert max-w-none mb-2 text-sm">
                          {tweet}
                        </ReactMarkdown>
                        <div className="flex justify-between items-center text-gray-400 text-xs mt-2">
                          <span>
                            {tweet.length}/{MAX_TWEET_LENGTH}
                          </span>
                          <Button
                            onClick={() => copyToClipboard(tweet)}
                            className="bg-gray-600 hover:bg-gray-500 text-white rounded-full p-2 transition-colors"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : contentType === "linkedin" ? (
                  <div className="bg-gray-700 p-4 rounded-xl relative">
                    <ReactMarkdown className="prose prose-invert max-w-none text-sm">
                      {selectedHistoryItem
                        ? selectedHistoryItem.content
                        : generatedContent[0]}
                    </ReactMarkdown>
                    <div className="flex justify-end mt-4">
                      <Button
                        onClick={() => copyToClipboard(selectedHistoryItem ? selectedHistoryItem.content : generatedContent[0])}
                        className="bg-gray-600 hover:bg-gray-500 text-white rounded-full p-2 transition-colors"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-700 p-4 rounded-xl">
                    <ReactMarkdown className="prose prose-invert max-w-none text-sm">
                      {selectedHistoryItem
                        ? selectedHistoryItem.content
                        : generatedContent[0]}
                    </ReactMarkdown>
                    <div className="flex justify-end mt-4">
                      <Button
                        onClick={() => copyToClipboard(selectedHistoryItem ? selectedHistoryItem.content : generatedContent[0])}
                        className="bg-gray-600 hover:bg-gray-500 text-white rounded-full p-2 transition-colors"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Content preview */}
            {generatedContent.length > 0 && (
              <div className="bg-gray-800 p-6 rounded-2xl">
                <h2 className="text-2xl font-semibold mb-4 text-blue-400">
                  Preview
                </h2>
                {renderContentMock()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
