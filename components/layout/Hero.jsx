"use client";
import { GiSupersonicArrow } from "react-icons/gi";
import React, { useEffect, useRef, useState } from "react";
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

    // Scroll to bottom when text updates
    useEffect(() => {
        if (resultRef.current) {
            resultRef.current.scrollTop = resultRef.current.scrollHeight;
        }
    }, [displayedText]);

    // Animation effect for typewriter
    useEffect(() => {
        if (promptResult && !isLoading) {
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
        }
    }, [promptResult, isLoading]);

    const handlePrompt = (val) => {
        setFinalPrompt(val);
        handleSubmit(val);
        if (isMobile === true) {
            setIsOpen(!isOpen);
            setIsMobile(false)
        }
    };

    const handleSubmit = async (promptValue = finalPrompt) => {
        const trimmedPrompt = promptValue.trim();
        if (!trimmedPrompt) return;

        setIsLoading(true);
        setError(null);
        setFinalPrompt("");
        setPromptResult("");
        setDisplayedText("");

        try {
            setPromptResult(
                "The India-Pakistan conflict, rooted in the 1947 Partition of British India, has shaped decades of hostility, primarily over the disputed region of Jammu and Kashmir. The Partition created Hindu-majority India and Muslim-majority Pakistan, leaving princely states like Kashmir to choose their allegiance. Kashmir’s Hindu ruler, Maharaja Hari Singh, initially sought independence but acceded to India amid an invasion by Pakistani-backed tribesmen, sparking the First Indo-Pakistani War (1947–48). The conflict ended with a UN-brokered ceasefire, establishing a Line of Control (LoC) that divided Kashmir, leaving India with two-thirds, including the Kashmir Valley, and Pakistan controlling the rest. This unresolved division fueled subsequent wars in 1965 and 1999 (Kargil War), both centered on Kashmir, with the 1965 war ending in a stalemate and Kargil seeing India reclaim infiltrated territories. The 1971 war, distinct in its focus, arose from East Pakistan’s independence movement, leading to India’s decisive victory and the creation of Bangladesh. Communal violence during Partition, claiming up to two million lives, and the displacement of millions further entrenched mutual distrust. The conflict escalated with nuclear dimensions after India’s 1974 nuclear test and Pakistan’s 1998 response, raising global fears of escalation, especially during Kargil, when nuclear rhetoric surfaced. The Siachen Glacier conflict (1984–2003) and frequent border skirmishes, like the 2001–02 standoff and 2019 Pulwama-Balakot clashes, highlight ongoing tensions. Kashmir’s majority-Muslim population, often favoring independence or Pakistani alignment, has driven insurgencies since 1989, with India alleging Pakistani support for terrorism—a charge Pakistan denies. Recent events, such as the April 2025 Pahalgam attack killing 26 tourists, have reignited war rhetoric, with India suspending the Indus Waters Treaty and both nations exchanging fire across the LoC. Nuclear deterrence has prevented all-out war since 1971, but the absence of robust diplomatic channels and Pakistan’s economic fragility increase miscalculation risks. The international community, including the UN and U.S., has repeatedly intervened, yet a promised plebiscite for Kashmir’s self-determination remains unfulfilled, perpetuating local grievances. Both nations’ military modernization and regional alliances—India with the U.S. and Pakistan with China—complicate de-escalation. Despite intermittent peace efforts, like the 1972 Simla Agreement and 1999 Lahore Declaration, nationalist sentiments and domestic politics hinder resolution. The conflict’s persistence, blending religious, territorial, and geopolitical elements, underscores its complexity, with Kashmir remaining a flashpoint threatening South Asian stability."
            );
            // const response = await fetch("https://api.openai.com/v1/chat/completions", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
            //     },
            //     body: JSON.stringify({
            //         model: "gpt-3.5-turbo-0125",
            //         messages: [
            //             {
            //                 role: "user",
            //                 content: trimmedPrompt
            //             }
            //         ],
            //         temperature: 0.7,
            //         max_tokens: 1000
            //     })
            // });

            // if (!response.ok) {
            //     throw new Error(`API request failed with status ${response.status}`);
            // }

            // const data = await response.json();

            // setPromptResult(data.choices[0]?.message?.content || "No response from AI");
        } catch (err) {
            setError(err.message);
            console.error("Error calling OpenAI API:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <section
            className="w-full min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: "url(/hero-bg.png)" }}
        >
            <div className="flex flex-col lg:flex-row justify-center items-center w-full max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:min-w-7xl h-[85vh] lg:mx-auto text-white font-bold backdrop-blur-md bg-white/10 rounded-xl shadow-lg shadow-black/50 xl:gap-12 border border-white relative overflow-hidden">
                <div
                    className="flex lg:hidden items-center gap-1 w-full justify-start px-2 pb-2 pt-5 cursor-pointer"
                    onClick={() => {
                        setIsOpen(!isOpen);
                        setIsMobile(true);
                    }}
                >
                    <MdArrowCircleRight className="text-2xl text-yellow-400 animate-pulse" />
                    <p className="text-sm md:text-base tracking-wide font-medium ">{`Prompts (${prompts.length})`}</p>
                </div>
                <motion.div
                    className={`left-0 z-20 absolute top-0 w-full h-screen bg-primary text-white `}
                    initial={{ x: "-100%" }}
                    animate={{ x: isOpen ? "0%" : "-100%" }}
                    transition={{ ease: "easeInOut" }}
                >
                    <div className="flex justify-between items-center border-b-2 border-white p-5">
                        <p className="text-base font-medium capitalize ">
                            {`Prompts (${prompts.length})`}
                        </p>
                        <span
                            className="bg-white rounded-full"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <IoMdCloseCircle className="text-xl text-red-700" />
                        </span>
                    </div>
                    <div className="w-full max-h-[80vh] thumbnail overflow-y-scroll border-white px-5 pt-7 pb-12">
                        <div className="grid grid-cols-1 space-y-4">
                            {prompts.map((list, idx) => (
                                <button
                                    key={idx}
                                    className="p-5 rounded-xl border-2 border-white backdrop-blur-xl bg-white/10 text-sm font-medium text-start hover:scale-105 transition-all duration-300 cursor-pointer"
                                    onClick={() => handlePrompt(list)}
                                >
                                    {list}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
                <div className="w-full h-full lg:w-3/5 xl:w-[70%] space-y-5 md:space-y-10 lg:py-6 sm:mx-5">
                    {promptResult === "" ? (
                        <div className="space-y-5 md:space-y-10 flex flex-col justify-center items-center p-5">
                            <div className="block space-y-4 text-center lg:max-w-xl xl:max-w-3xl w-full">
                                <h1 className="text-[clamp(1.5rem,2vw,3.25rem)] leading-6 tracking-wider font-bold capitalize">
                                    Hello there!
                                </h1>
                                <p className="text-[clamp(0.75rem,1.25vw,1.25rem)] leading-4 sm:leading-6 font-normal">
                                    All about the work, the story, and the people behind it.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 w-full max-w-xl mx-auto">
                                    {dataLists.map((list, idx) => (
                                        <div
                                            className={`flex items-center gap-2 p-1.5 sm:p-3 rounded-xl w-full ${list === "Development"
                                                ? "bg-[#FFDD8F]"
                                                : list === "Branding"
                                                    ? "bg-[#FF8FDB]"
                                                    : list === "Design"
                                                        ? "bg-[#8FB2FF]"
                                                        : "bg-[#57BD6A]"
                                                }`}
                                            key={idx}
                                        >
                                            <span className="shrink-0">
                                                <GiSupersonicArrow
                                                    className={`${list === "Development"
                                                        ? "text-[#FFC379] bg-[#FF8C00]"
                                                        : list === "Branding"
                                                            ? "text-[#FF79C7] bg-[#FF006A]"
                                                            : list === "Design"
                                                                ? "text-[#79BCFF] bg-[#0000FF]"
                                                                : "text-[#48C046] bg-[#0B8900]"
                                                        } text-base md:text-lg size-8 md:size-10 rounded-xl p-2`}
                                                />
                                            </span>
                                            <h2
                                                className={`text-sm md:text-base tracking-wide font-semibold ${list === "Development"
                                                    ? "text-[#B86500]"
                                                    : list === "Branding"
                                                        ? "text-[#B80040]"
                                                        : list === "Design"
                                                            ? "text-[#0C00B8]"
                                                            : "text-[#136318]"
                                                    }`}
                                            >
                                                {list}
                                            </h2>
                                        </div>
                                    ))}
                                </div>
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
                                        <p>{error.message}</p>
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

                    <div className="fixed left-4 sm:left-10 bottom-5 w-full max-w-72 sm:max-w-lg md:max-w-xl lg:max-w-lg xl:max-w-3xl mx-auto bg-[#E8E8E8] px-4 py-3 border-t shadow-md rounded-xl ">
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
                                className="resize-none text-base xl:text-lg py-2 xl:py-4 ps-2 sm:ps-5 pe-8 sm:pe-12 md:pe-20 focus-within:border-none focus-within:outline-none w-full placeholder:text-black/50 text-black over font-normal no_scrollbar"
                            />
                            <button
                                className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-5"
                                onClick={() => handleSubmit()}
                                aria-label="Submit prompt"
                                disabled={isLoading}
                            >
                                <FaCircleArrowUp className="text-blue-500 text-3xl sm:text-4xl cursor-pointer" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full hidden lg:block lg:w-2/5 xl:w-[30%] overflow-hidden">
                    <p className="text-base font-medium capitalize p-5 border-s border-white">
                        {`Prompts (${prompts.length})`}
                    </p>
                    <div className="w-full max-h-[80vh] thumbnail overflow-y-scroll border-s border-white border-y px-5 pt-7 pb-12">
                        <div className="grid grid-cols-1 space-y-4">
                            {prompts.map((list, idx) => (
                                <button
                                    key={idx}
                                    className="p-5 rounded-xl border-2 border-white backdrop-blur-xl bg-white/10 text-sm font-medium text-start hover:scale-105 transition-all duration-300 cursor-pointer"
                                    onClick={() => handlePrompt(list)}
                                >
                                    {list}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
