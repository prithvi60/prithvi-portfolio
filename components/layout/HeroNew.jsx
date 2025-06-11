"use client";
import React, {
    useRef,
    useState,
    useCallback,
    useLayoutEffect,
} from "react";
import { FaCircleArrowUp, FaCircleStop } from "react-icons/fa6";
import { HashLoader } from "react-spinners";
import { MdError } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "typewriter-effect";


const HeroNew = () => {
    // const [isOpen, setIsOpen] = useState(false);
    // const [isMobile, setIsMobile] = useState(false);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [messages, setMessages] = useState([]);
    // const [stepCount, setStepCount] = useState(0);
    const [isStopped, setIsStopped] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);
    const timeoutRef = useRef(null);
    const containerRef = useRef(null);
    const messagesEndRef = useRef(null);

    // const handlePrompt = useCallback(
    //     (val) => {
    //         setIsStopped(true);
    //         setInputMessage(val);
    //         handleSubmit(val);
    //         if (isMobile) {
    //             setIsMobile(false);
    //         }
    //     },
    //     [isMobile]
    // );

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    };

    useLayoutEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = useCallback(
        async (promptValue = inputMessage) => {
            const safePrompt = String(promptValue || "").trim();
            if (!safePrompt || isLoading) return;

            setIsLoading(true);
            // setIsStopped(true);
            setError(null);

            // Add user message immediately
            const userMessage = { role: "user", content: safePrompt };
            setMessages((prev) => [...prev, userMessage]);
            setInputMessage("");

            try {
                const response = await fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt: safePrompt }),
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(
                        errorData.error || `Request failed with status ${response.status}`
                    );
                }

                const data = await response.json();

                // Validate response data
                if (!data.response || typeof data.response !== "string") {
                    throw new Error("Invalid response from server");
                }

                // Add AI response
                const aiMessage = {
                    role: "assistant",
                    content: data.response,
                    step: data.step,
                    ...(data.step >= 4 && { img: "/prithvi-QR.jpg" }),
                };
                // setStepCount(data.step);
                setMessages((prev) => [...prev, aiMessage]);
            } catch (err) {
                console.error("API Error:", err.message);
                setError(err.message || "Failed to fetch response from AI service");
            } finally {
                setIsLoading(false);
            }
        },
        [inputMessage, isLoading]
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

    const stopTypewriter = () => {
        setIsStopped(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // console.log(messages);

    return (
        <section
            className="w-full h-dvh md:min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: "url(/hero-bg.png)" }}
        >
            <div className="flex flex-col lg:flex-row justify-center items-center w-full max-w-[88dvw] sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:min-w-7xl 2xl:w-screen h-[70dvh] sm:h-[85dvh] lg:mx-auto xl:mx-0 text-white font-bold backdrop-blur-md bg-white/10 rounded-xl shadow-lg shadow-black/50 xl:gap-12 border border-white relative overflow-hidden">
                <div className="w-full h-full lg:py-2 sm:mx-5">
                    <div
                        className="max-h-[62dvh] md:max-h-[70dvh] overflow-y-auto space-y-5 md:space-y-10"
                        ref={containerRef}
                    >
                        <div className="space-y-5 md:space-y-10 flex flex-col justify-center items-center p-5">
                            <div className="block space-y-4 text-center lg:max-w-xl xl:max-w-3xl w-full">
                                <h1 className="text-[clamp(1rem,2vw,2.25rem)] leading-8 2xl:leading-14 tracking-wider font-bold capitalize">
                                    Curious how I help businesses grow with design, websites, and
                                    AI?
                                </h1>
                                <p className="text-[clamp(0.75rem,1.25vw,1rem)] leading-4 sm:leading-6 font-normal">
                                    Ask my assistant. It knows what I’ve done — and what might be
                                    possible for you. Try: “I run a business — can you help?”
                                    or “What do you charge?”
                                </p>
                            </div>
                        </div>
                        <div className="h-full relative w-full">
                            <div className="p-5 space-y-4 max-w-3xl mx-auto">
                                <AnimatePresence>
                                    {messages.map((message, index) => {
                                        const isLatestAssistant =
                                            message.role === "assistant" &&
                                            index === messages.length - 1;
                                        return (
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
                                                        : "bg-green-500/30 border border-green-300"
                                                        }`}
                                                >
                                                    {message.role === "assistant" ? (
                                                        <div className="text-white whitespace-pre-wrap">
                                                            {isLatestAssistant ? (
                                                                <div className="block space-y-3">
                                                                    <Typewriter
                                                                        options={{
                                                                            delay: 20,
                                                                            cursor: "",
                                                                        }}
                                                                        onInit={(typewriter) => {
                                                                            typewriter
                                                                                .typeString(message.content)
                                                                                .callFunction(() => {
                                                                                    setAnimationComplete(true);
                                                                                })
                                                                                .start();
                                                                        }}
                                                                    />
                                                                    {message.img &&
                                                                        animationComplete === true && (
                                                                            <>
                                                                                <a href="https://calendly.com/webibee/consultation" target="_blank" rel="noopener noreferrer"
                                                                                    aria-label="Book a consultation"
                                                                                    className="text-yellow-200 underline">https://calendly.com/webibee/consultation</a>
                                                                            </>
                                                                        )}
                                                                </div>
                                                            ) : (
                                                                <p>{message.content}</p>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <p className="text-white whitespace-pre-wrap">
                                                            {message.content}
                                                        </p>
                                                    )}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="max-w-[80%] rounded-lg p-3">
                                            <div className="flex items-center gap-2">
                                                <HashLoader color="#ffffff" size={20} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {error && (
                                    <div className="flex justify-start">
                                        <div className="max-w-[80%] rounded-lg p-3 bg-pink-400/50 border border-pink-400">
                                            <div className="text-red-300 flex items-center gap-2">
                                                <MdError className="text-xl" />
                                                <span>{"Please try again later"}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="fixed left-1/2 -translate-x-1/2 bottom-5 w-full max-w-xs sm:max-w-xl lg:max-w-3xl xl:max-w-5xl bg-[#E8E8E8] px-4 py-3 border-t shadow-md rounded-xl">
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
                                        <FaCircleStop className="text-primary text-3xl sm:text-4xl cursor-pointer" />
                                    </button>
                                ) : (
                                    <button
                                        className={`${isLoading ? "opacity-50" : ""
                                            } absolute top-1/2 -translate-y-1/2 right-2 sm:right-5`}
                                        onClick={() => handleSubmit()}
                                        aria-label="Submit prompt"
                                        disabled={isLoading}
                                    >
                                        <FaCircleArrowUp className="text-primary text-3xl sm:text-4xl cursor-pointer" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroNew;
