"use client";
import { GiSupersonicArrow } from "react-icons/gi";
import React, {
    useEffect,
    useRef,
    useState,
    useCallback,
    useMemo,
} from "react";
import { FaCircleArrowUp } from "react-icons/fa6";
import { dataLists, prompts } from "@/utils/Data";
import { HashLoader } from "react-spinners";
import { MdArrowCircleRight, MdError } from "react-icons/md";
import { motion } from "framer-motion";
import { IoMdCloseCircle } from "react-icons/io";

const Hero = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [finalPrompt, setFinalPrompt] = useState("");
    const [promptResult, setPromptResult] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [displayedText, setDisplayedText] = useState("");
    const resultRef = useRef(null);

    // Memoize the static data to prevent unnecessary re-renders
    const memoizedDataLists = useMemo(() => dataLists, []);
    const memoizedPrompts = useMemo(() => prompts, []);

    // Scroll to bottom when text updates
    useEffect(() => {
        if (resultRef.current) {
            resultRef.current.scrollTop = resultRef.current.scrollHeight;
        }
    }, [displayedText]);

    // Animation effect for typewriter
    useEffect(() => {
        if (!promptResult || isLoading) return;

        setDisplayedText("");
        let index = 0;
        const interval = setInterval(() => {
            if (index < promptResult.length) {
                setDisplayedText((prev) => prev + promptResult[index]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 30);

        return () => clearInterval(interval);
    }, [promptResult, isLoading]);

    const handlePrompt = useCallback(
        (val) => {
            setFinalPrompt(val);
            handleSubmit(val);
            if (isMobile) {
                setIsOpen(false);
                setIsMobile(false);
            }
        },
        [isMobile]
    );

    const handleSubmit = useCallback(
        async (promptValue = finalPrompt) => {
            // Safely convert to string and trim
            const safePrompt = String(promptValue || "").trim();
            if (!safePrompt || isLoading) return;

            setIsLoading(true);
            setError(null);
            setFinalPrompt("");
            setPromptResult("");
            setDisplayedText("");

            try {
                const response = await fetch("/api/chat", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ prompt: safePrompt }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Request failed");
                }

                const data = await response.json();
                // console.log(data);

                setPromptResult(data.result);
            } catch (err) {
                setError(err.message);
                console.error("API Error:", err);
            } finally {
                setIsLoading(false);
            }
        },
        [finalPrompt, isLoading]
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

    // Memoize the prompt buttons to prevent unnecessary re-renders
    const renderPromptButtons = useMemo(
        () =>
            memoizedPrompts.map((list, idx) => (
                <button
                    key={idx}
                    className="p-5 rounded-xl border-2 border-white backdrop-blur-xl bg-white/10 text-sm font-medium text-start hover:scale-105 transition-all duration-300 cursor-pointer"
                    onClick={() => handlePrompt(list)}
                >
                    {list}
                </button>
            )),
        [memoizedPrompts, handlePrompt]
    );

    // Memoize the data list items
    const renderDataListItems = useMemo(
        () =>
            memoizedDataLists.map((list, idx) => {
                const styles = {
                    Development: {
                        bg: "bg-[#FFDD8F]",
                        text: "text-[#B86500]",
                        icon: {
                            color: "text-[#FFC379]",
                            bg: "bg-[#FF8C00]",
                        },
                    },
                    Branding: {
                        bg: "bg-[#FF8FDB]",
                        text: "text-[#B80040]",
                        icon: {
                            color: "text-[#FF79C7]",
                            bg: "bg-[#FF006A]",
                        },
                    },
                    Design: {
                        bg: "bg-[#8FB2FF]",
                        text: "text-[#0C00B8]",
                        icon: {
                            color: "text-[#79BCFF]",
                            bg: "bg-[#0000FF]",
                        },
                    },
                    default: {
                        bg: "bg-[#57BD6A]",
                        text: "text-[#136318]",
                        icon: {
                            color: "text-[#48C046]",
                            bg: "bg-[#0B8900]",
                        },
                    },
                };

                const style = styles[list] || styles.default;

                return (
                    <div
                        className={`flex items-center gap-2 p-1.5 sm:p-3 rounded-xl w-full ${style.bg}`}
                        key={idx}
                    >
                        <span className="shrink-0">
                            <GiSupersonicArrow
                                className={`${style.icon.color} ${style.icon.bg} text-base md:text-lg size-8 md:size-10 rounded-xl p-2`}
                            />
                        </span>
                        <h2
                            className={`text-sm md:text-base tracking-wide font-semibold ${style.text}`}
                        >
                            {list}
                        </h2>
                    </div>
                );
            }),
        [memoizedDataLists]
    );

    return (
        <section
            className="w-full min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: "url(/hero-bg.png)" }}
        >
            <div className="flex flex-col lg:flex-row justify-center items-center w-full max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:min-w-7xl h-[85vh] lg:mx-auto text-white font-bold backdrop-blur-md bg-white/10 rounded-xl shadow-lg shadow-black/50 xl:gap-12 border border-white relative overflow-hidden">
                {/* Mobile Prompt Toggle */}
                <div
                    className="flex lg:hidden items-center gap-1 w-full justify-start px-2 pb-2 pt-5 cursor-pointer"
                    onClick={toggleMobileMenu}
                >
                    <MdArrowCircleRight className="text-2xl text-yellow-400 animate-pulse" />
                    <p className="text-sm md:text-base tracking-wide font-medium">{`Prompts (${memoizedPrompts.length})`}</p>
                </div>

                {/* Mobile Prompt Menu */}
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
                            {renderPromptButtons}
                        </div>
                    </div>
                </motion.div>

                {/* Main Content Area */}
                <div className="w-full h-full lg:w-3/5 xl:w-[70%] space-y-5 md:space-y-10 lg:py-6 sm:mx-5">
                    {!promptResult && !isLoading ? (
                        <div className="space-y-5 md:space-y-10 flex flex-col justify-center items-center p-5">
                            <div className="block space-y-4 text-center lg:max-w-xl xl:max-w-3xl w-full">
                                <h1 className="text-[clamp(1.5rem,2vw,3.25rem)] leading-6 tracking-wider font-bold capitalize">
                                    Hello there!
                                </h1>
                                <p className="text-[clamp(0.75rem,1.25vw,1.25rem)] leading-4 sm:leading-6 font-normal">
                                    All about the work, the story, and the people behind it.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 w-full max-w-xl mx-auto">
                                    {renderDataListItems}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {isLoading ? (
                                <div className="h-fit max-w-72 sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto backdrop-blur-xl bg-black/20 rounded-xl overflow-hidden shadow-lg shadow-black/50 border border-white relative w-full">
                                    <div className="text-base md:text-lg text-white animate-pulse flex items-center gap-2 font-medium p-2.5">
                                        <HashLoader color="#7e59d9" size={25} />
                                        <p>Generating response...</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-fit max-w-72 sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto backdrop-blur-xl bg-black/20 rounded-xl overflow-hidden shadow-lg shadow-black/50 border border-white relative w-full">
                                    <div
                                        ref={resultRef}
                                        className="p-5 max-h-[60vh] md:max-h-[60vh] overflow-y-auto no_scrollbar"
                                    >
                                        {isLoading ? (
                                            <div className="text-md text-white animate-pulse flex items-center gap-2 font-medium">
                                                <HashLoader color="#7e59d9" size={25} />
                                                <p>Generating response...</p>
                                            </div>
                                        ) : error ? (
                                            <div className="text-md text-red-500 flex items-center gap-2 font-medium">
                                                <MdError className="text-red-400 animate-pulse text-xl md:text-2xl" />
                                                <p>{error}</p>
                                            </div>
                                        ) : (
                                            <p className="text-white whitespace-pre-wrap animated-text font-normal">
                                                {displayedText
                                                    ?.toString()
                                                    .replace(/undefined$/, "")
                                                    .trim()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* Input Area */}
                    <div className="fixed left-4 sm:left-10 bottom-5 w-full max-w-72 sm:max-w-lg md:max-w-xl lg:max-w-lg xl:max-w-3xl mx-auto bg-[#E8E8E8] px-4 py-3 border-t shadow-md rounded-xl">
                        <div className="flex items-center space-x-2">
                            <textarea
                                type="text"
                                id="prompt-input"
                                name="prompt"
                                rows={1}
                                value={finalPrompt}
                                onChange={(e) => setFinalPrompt(e.target.value)}
                                onKeyDown={handleKeyDown}
                                required
                                autoFocus
                                disabled={isLoading}
                                placeholder="Summarize the latest!"
                                className={`${isLoading ? "opacity-70" : ""
                                    } resize-none text-base xl:text-lg py-2 xl:py-4 ps-2 sm:ps-5 pe-8 sm:pe-12 md:pe-20 focus-within:border-none focus-within:outline-none w-full placeholder:text-black/50 text-black over font-normal no_scrollbar`}
                            />
                            <button
                                className={`${isLoading ? "opacity-50" : ""
                                    } absolute top-1/2 -translate-y-1/2 right-2 sm:right-5`}
                                onClick={() => handleSubmit()}
                                aria-label="Submit prompt"
                                disabled={isLoading}
                            >
                                <FaCircleArrowUp className="text-blue-500 text-3xl sm:text-4xl cursor-pointer" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Desktop Prompt Menu */}
                <div className="w-full h-full hidden lg:block lg:w-2/5 xl:w-[30%] overflow-hidden">
                    <p className="text-base font-medium capitalize p-5 border-s border-white">
                        {`Prompts (${memoizedPrompts.length})`}
                    </p>
                    <div className="w-full max-h-[80vh] thumbnail overflow-y-scroll border-s border-white border-y px-5 pt-7 pb-12">
                        <div className="grid grid-cols-1 space-y-4">
                            {renderPromptButtons}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
