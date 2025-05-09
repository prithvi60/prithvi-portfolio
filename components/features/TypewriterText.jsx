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