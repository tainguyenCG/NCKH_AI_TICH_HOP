import React, { useState, useEffect, useRef } from 'react';
import { IoSend } from 'react-icons/io5';
import { FaTrash, FaStopwatch, FaEdit, FaCompass, FaWrench, FaCopy, FaCheck } from 'react-icons/fa';
import 'highlight.js/styles/github-dark.css';

const GeminiSp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const chatContainerRef = useRef(null);


  const API_REQUEST_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GOOGLE_API_KEY}`;

  // Load saved chats from localStorage
  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem('saved-api-chats')) || [];
    setMessages(savedChats);
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    setIsGenerating(true);
    const userMessage = { type: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    const response = await fetchApiResponse(input);
    setMessages((prev) => [...prev, { type: 'ai', text: response, isLoading: false }]);
    saveChatToLocalStorage([...messages, userMessage, { type: 'ai', text: response }]);
    setIsGenerating(false);
  };

  const fetchApiResponse = async (message) => {
    try {
      const response = await fetch(API_REQUEST_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: message }] }],
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message);
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    } catch (error) {
      return `Error: ${error.message}`;
    }
  };

  const saveChatToLocalStorage = (updatedMessages) => {
    localStorage.setItem('saved-api-chats', JSON.stringify(updatedMessages));
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    handleSubmit({ preventDefault: () => {} });
  };

  const clearChat = () => {
    if (window.confirm('Are you sure you want to delete all chat history?')) {
      setMessages([]);
      localStorage.removeItem('saved-api-chats');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const suggestions = [
    { text: 'Give tips on helping kids finish their homework on time', icon: <FaStopwatch /> },
    { text: 'Help me write an out-of-office email', icon: <FaEdit /> },
    { text: 'Give me phrases to learn a new language', icon: <FaCompass /> },
    { text: 'Show me how to build something by hand', icon: <FaWrench /> },
  ];

  return (
    <div className="flex flex-col min-h-screen text-gray-900 bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
      {/* Chat Section - Fixed height with scroll */}
      <section ref={chatContainerRef} className="flex-1 p-6 pb-32 overflow-y-auto chats">
        <div className="max-w-2xl mx-auto">
          {messages.length === 0 && (
            <header className="p-6 text-center mt-[6vh]">
              <div className="mb-6">
                <h1
                  className="text-[3.25rem] font-semibold w-fit mx-auto bg-gradient-to-r from-[#4a90e2] via-[#a355b9] to-[#ff6b6b] bg-clip-text text-transparent"
                >
                  Hello, There!
                </h1>
                <h2 className="text-[3.25rem] font-semibold text-gray-700 dark:text-gray-300">
                  How can I help you today?
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    className="flex items-center justify-between p-4 text-white transition-colors bg-indigo-500 rounded-lg hover:bg-indigo-600"
                  >
                    <span>{suggestion.text}</span>
                    {suggestion.icon}
                  </button>
                ))}
              </div>
            </header>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} mb-4 z-0`}
            >
              <div
                className={`flex items-start p-4 rounded-lg ${
                  msg.type === 'user'
                    ? 'bg-indigo-600 text-white'
                    : msg.isLoading
                    ? 'bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    : 'bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                }`}
              >
                <img
                  src={msg.type === 'user' ? 'src/assets/profile.png' : 'src/assets/gemini.svg'}
                  alt={`${msg.type} avatar`}
                  className="w-8 h-8 mr-2 rounded-full"
                />
                <div>
                  <p>{msg.text}</p>
                  {msg.type === 'ai' && !msg.isLoading && (
                    <button
                      onClick={() => copyToClipboard(msg.text)}
                      className="flex items-center mt-2 text-sm text-indigo-400 hover:text-indigo-300"
                    >
                      <FaCopy className="mr-1" /> Copy
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isGenerating && (
            <div className="z-0 flex justify-start mb-4 message message--loading">
              <div className="w-full p-4 text-gray-700 rounded-lg dark:bg-gray-700 dark:text-gray-300">
                <div className="flex items-start">
                  <img
                    src="src/assets/gemini.svg"
                    alt="AI avatar"
                    className="w-10 h-10 mr-3 rounded-full message__avatar animate-spin"
                  />
                  <div className="message__loading-indicator">
                    <div className="message__loading-bar"></div>
                    <div className="message__loading-bar"></div>
                    <div className="message__loading-bar"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Prompt Section - Fixed at the bottom of the screen */}
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <div className="relative z-30 px-6 pb-6 mt-8 bg-gray-100 pt-9 dark:bg-gray-900">
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center max-w-2xl p-3 mx-auto bg-gray-200 rounded-lg shadow-md dark:bg-gray-800"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a prompt here"
              className="flex-1 p-2 text-gray-800 placeholder-gray-500 bg-transparent border-0 dark:text-gray-200 focus:outline-none focus:ring-0 dark:placeholder-gray-400"
            />
            <button
              type="button"
              onClick={clearChat}
              className="absolute p-2 text-gray-500 transform -translate-y-1/2 right-12 top-1/2 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500"
            >
              <FaTrash />
            </button>
            <button
              type="submit"
              className="p-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              <IoSend />
            </button>
          </form>
          <p className="max-w-2xl mx-auto mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
            Gemini may display inaccurate info, including about people, so double-check its responses.
          </p>
        </div>
      </div>

      {/* Custom CSS for loading bars */}
      <style jsx global>{`
        .chats .message__loading-indicator {
          display: none;
          gap: 0.6rem;
          width: 100%;
          flex-direction: column;
          margin-bottom: 20px;
        }

        .chats .message--loading .message__loading-indicator {
          display: flex;
        }

        .chats .message__loading-indicator .message__loading-bar {
          height: 1rem;
          width: 100%;
          border-radius: 0.135rem;
          background-position: -800px 0;
          background: linear-gradient(to right, #2563eb60 30%, transparent 60%, #2563eb60);
          animation: loading 15s linear infinite;
        }

        .chats .message__loading-indicator .message__loading-bar:first-child {
          width: 85%;
        }

        .chats .message__loading-indicator .message__loading-bar:last-child {
          width: 70%;
        }

        @keyframes loading {
          0% {
            background-position: -800px 0;
          }
          50% {
            background-position: 0px 0;
          }
          100% {
            background-position: 800px 0;
          }
        }

        .chats .message__avatar {
          animation: rotate 3s linear infinite;
        }

        @keyframes rotate {
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default GeminiSp;