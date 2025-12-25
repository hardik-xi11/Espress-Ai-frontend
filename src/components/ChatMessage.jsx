import React from 'react';

const ChatMessage = ({ message, isUser }) => {
    return (
        <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6 px-4 md:px-0`}>
            <div className={`max-w-[85%] md:max-w-[75%] flex ${isUser ? 'flex-row-reverse' : 'flex-row'} gap-4`}>

                {/* Avatar - Minimalist Gradient */}
                <div className={`hidden md:flex flex-shrink-0 h-8 w-8 rounded-full items-center justify-center text-[10px] font-bold tracking-wider shadow-lg ${isUser
                    ? 'bg-gradient-to-br from-violet-700/70 to-blue-800/40 text-white'
                    : 'bg-white/10 border border-white/5 text-white/70 backdrop-blur-md'
                    }`}>
                    {isUser ? 'YOU' : 'AI'}
                </div>

                {/* Message Bubble */}
                <div className={`
            relative p-5 rounded-2xl text-[15px] leading-7 shadow-sm transition-all duration-200 backdrop-blur-md
            ${isUser
                        ? 'bg-stone-700/60 text-white shadow-[0_4px_20px_rgba(59,130,246,0.2)] rounded-tr-sm'
                        : 'bg-white/5 text-gray-200 border border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.2)] rounded-tl-sm'
                    }
        `}>
                    <p className="whitespace-pre-wrap font-sans font-light tracking-wide">
                        {message}
                    </p>

                    {/* Timestamp */}
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;
