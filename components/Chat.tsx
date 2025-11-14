
import React, { useState, useEffect, useRef } from 'react';
import { Message } from '../types';
import { sendChatMessage } from '../services/geminiService';
import { Icon } from './Icon';
import MarkdownRenderer from './MarkdownRenderer';

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMessages([
            {
                sender: 'ai',
                text: "Hi! I'm AozoraAi, your intelligent assistant. 🚀\n\nI can help you with:\n- Writing and debugging code\n- Explaining technical concepts\n- Analyzing images and screenshots\n- Creating documentation\n- Solving problems\n\nTry asking:\n- \"Write a Python function to sort a list\"\n- \"Explain async/await in JavaScript\"\n- Upload an image and ask \"What's in this image?\""
            }
        ]);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const aiResponse = await sendChatMessage(input);
            const aiMessage: Message = { sender: 'ai', text: aiResponse };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Failed to get chat response:", error);
            const errorMessage: Message = {
                sender: 'ai',
                text: "Sorry, I encountered an error. Please try again."
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full w-full max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-4 text-black dark:text-white shrink-0">Chat with AozoraAi</h2>
            <div className="flex-grow bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700 p-4 overflow-y-auto flex flex-col gap-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex gap-3 items-start ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'ai' && <img src="https://aozoradesu.com/wp-content/uploads/2025/09/Aozora.svg" alt="AozoraAi Avatar" className="h-8 w-8 rounded-full flex-shrink-0" />}
                        <div className={`max-w-xl p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-bl-none'}`}>
                            <MarkdownRenderer content={msg.text} />
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex gap-3 justify-start items-start">
                         <img src="https://aozoradesu.com/wp-content/uploads/2025/09/Aozora.svg" alt="AozoraAi Avatar" className="h-8 w-8 rounded-full flex-shrink-0" />
                        <div className="max-w-xl p-3 rounded-2xl bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-bl-none">
                            <Icon name="spinner" className="h-5 w-5" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="mt-4 flex gap-2 shrink-0">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage(e);
                        }
                    }}
                    placeholder="Ask AozoraAi anything..."
                    className="w-full p-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black dark:text-white placeholder-gray-500 resize-none"
                    rows={2}
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="px-4 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-500 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200 shrink-0"
                    aria-label="Send message"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="http://www.w3.org/2000/svg" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default Chat;
