"use client";
import React, {
    useEffect,
    useRef,
    useState,
    useCallback,
    useMemo,
} from "react";
import { FaCircleArrowUp, FaCircleStop } from "react-icons/fa6";
import { dataLists, prompts } from "@/utils/Data";
import { HashLoader } from "react-spinners";
import { MdArrowCircleRight, MdError } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdCloseCircle } from "react-icons/io";
import { TypewriterText } from "../features/TypewriterText";
import { renderDataListItems, renderPromptButtons } from "./OtherRenders";

const Hero = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [isStopped, setIsStopped] = useState(false);
    const timeoutRef = useRef(null);
    const resultRef = useRef(null);

    // Memoize the static data to prevent unnecessary re-renders
    const memoizedDataLists = useMemo(() => dataLists, []);
    const memoizedPrompts = useMemo(() => prompts, []);

    // Check if user is at the bottom of the chat container
    const checkIfAtBottom = useCallback(() => {
        if (resultRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = resultRef.current;
            const atBottom = scrollTop + clientHeight >= scrollHeight - 50;
            setIsAtBottom(atBottom);
        }
    }, []);

    // Add scroll event listener to track user scrolling
    useEffect(() => {
        const container = resultRef.current;
        if (container) {
            container.addEventListener("scroll", checkIfAtBottom);
            return () => container.removeEventListener("scroll", checkIfAtBottom);
        }
    }, [checkIfAtBottom]);

    // Smooth auto-scroll to bottom when messages update or typewriter animation completes
    useEffect(() => {
        if (isAtBottom && resultRef.current && !isLoading) {
            resultRef.current.scrollTo({
                top: resultRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages, isStopped, isAtBottom, isLoading]);

    const handlePrompt = useCallback(
        (val) => {
            setIsStopped(true);
            setInputMessage(val);
            handleSubmit(val);
            if (isMobile) {
                setIsOpen(false);
                setIsMobile(false);
            }
        },
        [isMobile]
    );

    const handleSubmit = useCallback(
        async (promptValue = inputMessage) => {
            const safePrompt = String(promptValue || "").trim();
            if (!safePrompt || isLoading) return;

            setIsLoading(true);
            setIsStopped(true);
            setError(null);

            // Add user message immediately
            const userMessage = { role: "user", content: safePrompt };
            setMessages((prev) => [...prev, userMessage]);
            setInputMessage("");

            try {
                // Prepare request with current session (if exists)
                const requestBody = { prompt: safePrompt };

                const response = await fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requestBody),
                    credentials: "include",
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.error || "Request failed");
                }

                const data = await response.json();

                // Add AI response
                const aiMessage = { role: "assistant", content: data.result };
                setMessages((prev) => [...prev, aiMessage]);
            } catch (err) {
                console.error("API Error:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        },
        [inputMessage, isLoading, messages]
    );

    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
            }
        },
        [handleSubmit]
    );

    const toggleMobileMenu = useCallback(() => {
        setIsOpen((prev) => !prev);
        setIsMobile(true);
    }, []);

    // Memoize the prompt buttons and data list items
    const memoizedPromptButtons = useMemo(
        () => renderPromptButtons(memoizedPrompts, handlePrompt, isStopped),
        [memoizedPrompts, handlePrompt, isStopped]
    );

    const memoizedDataListItems = useMemo(
        () => renderDataListItems(memoizedDataLists, handlePrompt),
        [memoizedDataLists, handlePrompt]
    );

    const stopTypewriter = () => {
        setIsStopped(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    return (
        <section
            className="w-full min-h-dvh sm:min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: "url(/hero-bg.png)" }}
        >
            <div className="flex flex-col lg:flex-row justify-center items-center w-full max-w-[88dvw] sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:min-w-7xl h-[85vh] lg:mx-auto text-white font-bold backdrop-blur-md bg-white/10 rounded-xl shadow-lg shadow-black/50 xl:gap-12 border border-white relative overflow-hidden">
                <div
                    className="flex lg:hidden items-center gap-1 w-full justify-start px-2 pb-2 pt-5 cursor-pointer"
                    onClick={toggleMobileMenu}
                >
                    <MdArrowCircleRight className="text-2xl text-yellow-400 animate-pulse" />
                    <p className="text-sm md:text-base tracking-wide font-medium">{`Prompts (${memoizedPrompts.length})`}</p>
                </div>

                <motion.div
                    className="left-0 z-20 absolute top-0 w-full h-screen bg-primary text-white"
                    initial={{ x: "-100%" }}
                    animate={{ x: isOpen ? "0%" : "-100%" }}
                    transition={{ ease: "easeInOut" }}
                >
                    <div className="flex justify-between items-center border-b-2 border-white p-5">
                        <p className="text-base font-medium capitalize">{`Prompts (${memoizedPrompts.length})`}</p>
                        <span
                            className="bg-white rounded-full"
                            onClick={() => setIsOpen(false)}
                        >
                            <IoMdCloseCircle className="text-xl text-red-700" />
                        </span>
                    </div>
                    <div className="w-full max-h-[80vh] thumbnail overflow-y-scroll border-white px-5 pt-7 pb-12">
                        <div className="grid grid-cols-1 space-y-4">
                            {memoizedPromptButtons}
                        </div>
                    </div>
                </motion.div>

                <div className="w-full h-full lg:w-3/5 xl:w-[70%] space-y-5 md:space-y-10 lg:py-6 sm:mx-5">
                    {messages.length === 0 && !isLoading ? (
                        <div className="space-y-5 md:space-y-10 flex flex-col justify-center items-center p-5 speciality">
                            <div className="block space-y-4 text-center lg:max-w-xl xl:max-w-3xl w-full">
                                <h1 className="text-[clamp(1.5rem,2vw,3.25rem)] leading-6 tracking-wider font-bold capitalize">
                                    Hello there!
                                </h1>
                                <p className="text-[clamp(0.75rem,1.25vw,1.25rem)] leading-4 sm:leading-6 font-normal">
                                    All about the work, the story, and the people behind it.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 w-full max-w-xl mx-auto">
                                    {memoizedDataListItems}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-fit max-w-72 sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto backdrop-blur-xl bg-black/20 rounded-xl overflow-hidden shadow-lg shadow-black/50 border border-white relative w-full">
                            {messages.length > 0 && (
                                <button
                                    onClick={() => {
                                        setMessages([]);
                                        setIsStopped(false);
                                    }}
                                    className="absolute top-2 right-2 text-xs bg-red-500/30 hover:bg-red-500/50 text-white px-2 py-1 rounded cursor-pointer"
                                >
                                    Clear
                                </button>
                            )}
                            <div
                                ref={resultRef}
                                className="p-5 max-h-[60vh] md:max-h-[60vh] overflow-y-auto no_scrollbar space-y-4"
                            >
                                <AnimatePresence>
                                    {messages.map((message, index) => (
                                        <motion.div
                                            key={index}
                                            className={`flex ${message.role === "user"
                                                ? "justify-end"
                                                : "justify-start"
                                                }`}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div
                                                className={`max-w-[80%] rounded-lg p-3 ${message.role === "user"
                                                    ? "bg-blue-500/30 border border-blue-400"
                                                    : "bg-purple-500/30 border border-purple-400"
                                                    }`}
                                            >
                                                {message.role === "assistant" ? (
                                                    <TypewriterText
                                                        isLoading={isLoading}
                                                        text={message.content}
                                                        scrollContainerRef={resultRef}
                                                        timeoutRef={timeoutRef}
                                                        isStopped={isStopped}
                                                        setIsStopped={setIsStopped}
                                                    />
                                                ) : (
                                                    <p className="text-white whitespace-pre-wrap">
                                                        {message.content}
                                                    </p>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="max-w-[80%] rounded-lg p-3 bg-purple-500/30 border border-purple-400">
                                            <div className="text-white flex items-center gap-2">
                                                <HashLoader color="#7e59d9" size={20} />
                                                <span>Thinking...</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {error && (
                                    <div className="flex justify-start">
                                        <div className="max-w-[80%] rounded-lg p-3 bg-red-500/30 border border-red-400">
                                            <div className="text-red-300 flex items-center gap-2">
                                                <MdError className="text-xl" />
                                                <span>{error}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="fixed left-4 sm:left-10 bottom-5 w-full max-w-72 sm:max-w-lg md:max-w-xl lg:max-w-lg xl:max-w-3xl mx-auto bg-[#E8E8E8] px-4 py-3 border-t shadow-md rounded-xl">
                        <div className="flex items-center space-x-2">
                            <textarea
                                type="text"
                                id="prompt-input"
                                name="prompt"
                                rows={1}
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                required
                                autoFocus
                                disabled={isLoading || isStopped}
                                placeholder="Type your message..."
                                className={`${isLoading ? "opacity-70" : ""
                                    } resize-none text-base xl:text-lg py-2 xl:py-4 ps-2 sm:ps-5 pe-8 sm:pe-12 md:pe-20 focus-within:border-none focus-within:outline-none w-full placeholder:text-black/50 text-black font-normal no_scrollbar disabled:cursor-not-allowed`}
                            />
                            {isStopped ? (
                                <button
                                    className={`${isLoading ? "opacity-50" : ""
                                        } absolute top-1/2 -translate-y-1/2 right-2 sm:right-5`}
                                    onClick={() => stopTypewriter()}
                                    aria-label="Submit prompt"
                                    disabled={isLoading}
                                >
                                    <FaCircleStop className="text-blue-500 text-3xl sm:text-4xl cursor-pointer" />
                                </button>
                            ) : (
                                <button
                                    className={`${isLoading ? "opacity-50" : ""
                                        } absolute top-1/2 -translate-y-1/2 right-2 sm:right-5`}
                                    onClick={() => handleSubmit()}
                                    aria-label="Submit prompt"
                                    disabled={isLoading}
                                >
                                    <FaCircleArrowUp className="text-blue-500 text-3xl sm:text-4xl cursor-pointer" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="w-full h-full hidden lg:block lg:w-2/5 xl:w-[30%] overflow-hidden">
                    <p className="text-base font-medium capitalize p-5 border-s border-white">
                        {`Prompts (${memoizedPrompts.length})`}
                    </p>
                    <div className="w-full max-h-[80vh] thumbnail overflow-y-scroll border-s border-white border-y px-5 pt-7 pb-12">
                        <div className="grid grid-cols-1 space-y-4">
                            {memoizedPromptButtons}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
