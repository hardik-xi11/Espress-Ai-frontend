import React, { useState } from 'react';

const ChatInput = ({ onSend, disabled }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() && !disabled) {
            onSend(input);
            setInput('');
        }
    };

    return (
        <div className="absolute bottom-6 left-0 right-0 px-4 md:px-0 z-50">
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="relative group">

                    {/* Input Container */}
                    <div className="
            relative flex items-center p-2 rounded-full
            bg-[#121212]/80 backdrop-blur-xl border border-white/10
            shadow-[0_8px_32px_rgba(0,0,0,0.4)]
            hover:border-white/20 transition-all duration-300
            focus-within:border-blue-500/50 focus-within:shadow-[0_8px_32px_rgba(59,130,246,0.15)]
          ">

                        {/* Icon */}
                        <div className="pl-4 pr-2 text-white/30">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                        </div>

                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={disabled}
                            placeholder="Ask about hardware projects..."
                            className="
                w-full bg-transparent text-white placeholder-white/30 px-2 py-3
                focus:outline-none font-sans font-light text-[15px]
              "
                        />

                        {/* Send Button */}
                        <button
                            type="submit"
                            disabled={disabled || !input.trim()}
                            className={`
                p-3 rounded-full flex items-center justify-center transition-all duration-300
                ${input.trim()
                                    ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/40 transform scale-100'
                                    : 'bg-white/5 text-white/10 cursor-not-allowed transform scale-95'}
              `}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </div>

                    {/* Disclaimer */}
                    <div className="text-center mt-3">
                        <p className="text-[10px] text-white/20 font-medium">
                            Hardware AI generated content may contain errors. Please verify component specs.
                        </p>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ChatInput;
