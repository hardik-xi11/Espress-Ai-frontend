import React from 'react';

const ChatLayout = ({ children }) => {
    return (
        <div className="flex h-screen w-screen bg-black text-white overflow-hidden relative selection:bg-blue-500/30">

            {/* Background Ambience - Enhanced Gradients */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[10s]"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen opacity-60"></div>
                <div className="absolute top-[30%] left-[40%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[130px] mix-blend-screen opacity-40 animate-pulse duration-[7s]"></div>
            </div>

            {/* Main Content - Full Width */}
            <main className="flex-1 flex flex-col relative z-10 h-full">
                {/* Minimal Header */}
                <div className="absolute top-0 left-0 right-0 h-20 flex items-center justify-between px-8 z-50 pointer-events-none">
                    <h1 className="text-xl font-bold tracking-tight text-white/90 flex items-center gap-2 pointer-events-auto">
                        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
                        Espress AI
                    </h1>
                </div>

                <div className="flex-1 relative w-full max-w-screen mx-auto flex flex-col">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default ChatLayout;
