"use client"
import { GiSupersonicArrow } from "react-icons/gi";
import React from "react";
import { FaCircleArrowUp } from "react-icons/fa6";


const Hero = () => {
    return (
        <section
            className="w-full min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: "url(/hero-bg.png)" }}
        >
            {/* <div className="absolute inset-0 z-auto w-full min-h-screen">
                <Image alt="bg image" src={"/hero-bg.png"} fill className="object-cover object-contain" />
            </div> */}
            <div className="flex justify-center items-center min-w-6xl h-[85vh] mx-auto text-5xl text-white font-bold backdrop-blur-md bg-white/10 rounded-lg shadow-lg shadow-black/50 p-5 gap-12 border border-white relative">
                <div className="w-full h-full md:w-3/4 space-y-5 md:space-y-10 py-16">
                    <div className="space-y-5 md:space-y-10 flex flex-col justify-center items-center">
                        <div className="block space-y-4 text-center">
                            <h1 className="text-[clamp(1.5rem,2vw,3.25rem)] leading-6 tracking-wider font-bold">
                                Hello there!
                            </h1>
                            <p className="text-[clamp(1rem,1.25vw,1.25rem)] leading-6">
                                All about the work, the story, and the people behind it.
                            </p>
                        </div>
                        <div className="grid grid-col-1 md:grid-cols-2 gap-6 max-w-xl mx-auto ">
                            <div className="flex items-center gap-2 p-3 bg-[#FFDD8F] rounded-xl">
                                <span className="shrink-0">
                                    <GiSupersonicArrow className="text-yellow-200 text-lg bg-[#FF8C00] size-10 rounded-xl border-2 border-white p-2" />
                                </span>
                                <h2 className="text-base md:text-lg tracking-wide font-semibold text-yellow-600">Development</h2>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-[#FFDD8F] rounded-xl">
                                <span className="shrink-0">
                                    <GiSupersonicArrow className="text-yellow-200 text-lg bg-[#FF8C00] size-10 rounded-xl border-2 border-white p-2" />
                                </span>
                                <h2 className="text-base md:text-lg tracking-wide font-semibold text-yellow-600">Development</h2>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-[#FFDD8F] rounded-xl">
                                <span className="shrink-0">
                                    <GiSupersonicArrow className="text-yellow-200 text-lg bg-[#FF8C00] size-10 rounded-xl border-2 border-white p-2" />
                                </span>
                                <h2 className="text-base md:text-lg tracking-wide font-semibold text-yellow-600">Development</h2>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-[#FFDD8F] rounded-xl">
                                <span className="shrink-0">
                                    <GiSupersonicArrow className="text-yellow-200 text-lg bg-[#FF8C00] size-10 rounded-xl border-2 border-white p-2" />
                                </span>
                                <h2 className="text-base md:text-lg tracking-wide font-semibold text-yellow-600">Development</h2>
                            </div>
                        </div>
                    </div>
                    <div className="fixed left-10 bottom-5 w-full max-w-3xl mx-auto bg-[#E8E8E8] px-4 py-3 border-t shadow-md rounded-xl ">
                        <div className="flex items-center space-x-2">
                            <textarea
                                type="text"
                                id="name"
                                name="name"
                                rows={1}
                                required
                                autoFocus
                                onKeyDown={(e) => console.log(e.target.value)}
                                placeholder="Summarize the latest !"
                                className="resize-none text-lg py-4 ps-5 pe-20 focus-within:border-none focus-within:outline-none w-full placeholder:text-black/50 text-black over font-normal no_scrollbar"

                            />
                            <button className="absolute top-1/2 -translate-y-1/2 right-5" onClick={console.log("click")}>
                                <FaCircleArrowUp className="text-blue-500 text-4xl cursor-pointer" /></button>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full md:w-1/4"></div>
            </div>
        </section>
    );
};

export default Hero;
