import React, { useState, useEffect, useRef } from 'react';
import ChatLayout from './components/ChatLayout';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text) => {
    // Add User Message
    setMessages(prev => [...prev, { text, isUser: true }]);
    setIsLoading(true);

    try {
      // Connect to Spring Boot Backend via Proxy
      const baseUrl = import.meta.env.VITE_API_TARGET;
      const response = await fetch(`${baseUrl}/chat?prompt=${encodeURIComponent(text)}`);

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("text/html")) {
        throw new Error("Received HTML login page. Check backend port (8000) or authentication.");
      }

      if (!response.body) {
        throw new Error('ReadableStream not supported.');
      }

      // Prepare for streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botResponse = '';

      // Add a placeholder bot message to update dynamically
      setMessages(prev => [...prev, { text: '', isUser: false, isStreaming: true }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        botResponse += chunk;

        // Update the last message (the bot's streaming message)
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMsg = newMessages[newMessages.length - 1];
          if (lastMsg.isUser === false && lastMsg.isStreaming) {
            lastMsg.text = botResponse;
          }
          return newMessages;
        });
      }

      // Mark streaming as done
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMsg = newMessages[newMessages.length - 1];
        if (lastMsg) lastMsg.isStreaming = false;
        return newMessages;
      });

    } catch (error) {
      console.error("Connection Error:", error);
      setMessages(prev => [...prev, {
        text: `Error connecting to assistant.\nDetails: ${error.message}\nPlease verify backend is running on port 8000.`,
        isUser: false
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatLayout>
      <div className="absolute inset-0 overflow-y-auto p-4 md:p-8 pb-32 no-scrollbar">

        {/* Hero Section if no messages */}
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center -mt-20">
            <div className="text-center space-y-6 animate-fade-in-up">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                  Let's Build.
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-200/50 font-light tracking-wide max-w-lg mx-auto">
                Your next <span className="text-blue-400 font-normal">hardware project</span> starts here.
              </p>
            </div>
          </div>
        )}

        {/* Chat List */}
        <div className="max-w-3xl mx-auto pt-20">
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg.text}
              isUser={msg.isUser}
            />
          ))}
          {isLoading && messages[messages.length - 1]?.isUser && (
            // Loading indicator
            <div className="flex items-center gap-2 p-4 ml-4 pb-12 sm:pb-34 opacity-50">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150"></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput onSend={handleSendMessage} disabled={isLoading} />
    </ChatLayout>
  );
}

export default App;
