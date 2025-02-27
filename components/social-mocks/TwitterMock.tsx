import React from "react";


interface TwitterMockProps {
  content: string[];
}

export const TwitterMock: React.FC<TwitterMockProps> = ({ content }) => {
  return (
    <div className="space-y-4">
      {content.map((tweet, index) => (
        <div
          key={index}
          className="bg-[#15202B] p-6 rounded-xl border border-gray-700/30 hover:border-blue-500/30 transition-all duration-300"
        >
          <div className="flex items-start space-x-3">
            <div className="h-12 w-12 rounded-full bg-gray-600 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white">Your Brand</span>
                <span className="text-gray-500">@yourbrand</span>
                <span className="text-gray-500">· 1m</span>
              </div>
              <p className="mt-2 text-white">{tweet}</p>
              <div className="flex items-center space-x-8 mt-4 text-gray-500">
                <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>

                  {Math.floor(Math.random() * (200 - 10 + 1)) + 10}
                  </span>
                </button>
                <button className="flex items-center space-x-2 hover:text-green-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>{Math.floor(Math.random() * (200 - 10 + 1)) + 10}</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-red-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>{Math.floor(Math.random() * (200 - 10 + 1)) + 10}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
