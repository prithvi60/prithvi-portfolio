"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TypewriterText = ({
    text,
    timeoutRef,
    isStopped,
    isLoading,
    setIsStopped,
}) => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    // Reset animation when text changes
    useEffect(() => {
        if (timeoutRef.current && !isLoading) {
            clearTimeout(timeoutRef.current);
        }
        setDisplayedText("");
        setIndex(0);
    }, [text, isLoading, timeoutRef]);

    // Clean up timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    useEffect(() => {
        if (isLoading || !isStopped || index >= text.length) {
            if (index >= text.length && isStopped) {
                setIsStopped(false);
            }
            return;
        }

        timeoutRef.current = setTimeout(() => {
            setDisplayedText((prev) => prev + text[index]);
            setIndex(index + 1);
        }, 30);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [index, text, isStopped, isLoading, setIsStopped]);

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
