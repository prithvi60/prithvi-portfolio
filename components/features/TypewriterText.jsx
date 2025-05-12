"use client"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TypewriterText = ({ text, scrollContainerRef, isAtBottom }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex(index + 1);
                // Only scroll if user is at the bottom
                if (isAtBottom && scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTo({
                        top: scrollContainerRef.current.scrollHeight,
                        behavior: "smooth",
                    });
                }
            }, 30); // Adjust speed of typing here (30ms per character)
            return () => clearTimeout(timeout);
        }
    }, [index, text, scrollContainerRef, isAtBottom]);

    return (
        <motion.p
            className="text-white whitespace-pre-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {displayedText}
        </motion.p>
    );
};


















    // Save messages to localStorage whenever they change
    // useEffect(() => {
    //     if (sessionId && messages.length > 0) {
    //         localStorage.setItem(
    //             `chatMessages_${sessionId}`,
    //             JSON.stringify(messages)
    //         );
    //     }
    // }, [messages, sessionId]);

   

    // Add this useEffect to check for expired sessions on component mount
    // useEffect(() => {
    //     const sessionData = localStorage.getItem("sessionData");
    //     if (sessionData) {
    //         const { id, expires } = JSON.parse(sessionData);
    //         if (expires > Date.now()) {
    //             setSessionId(id);
    //             // Load saved messages
    //             const savedChat = localStorage.getItem(`chat_${id}`);
    //             if (savedChat) {
    //                 try {
    //                     const { messages } = JSON.parse(savedChat);
    //                     setMessages(messages || []);
    //                 } catch (e) {
    //                     console.error("Failed to parse saved messages", e);
    //                 }
    //             }
    //         } else {
    //             // Clear expired session
    //             localStorage.removeItem("sessionData");
    //             localStorage.removeItem(`chat_${id}`);
    //         }
    //     }
    // }, []);

    // const clearConversation = useCallback(() => {
    //     setMessages([]);
    //     if (sessionId) {
    //         localStorage.removeItem(`chatMessages_${sessionId}`);
    //     }
    // }, [sessionId]);