import Image from "next/image";
import React from "react";

const About = () => {
    return (
        <section className="padding w-full h-full space-y-10">
            <h1 className="text-[clamp(2.25rem,5.5vw,4.5rem)] text-primary font-extrabold tracking-wider uppercase text-center md:text-right">
            Meet Real PRITHVI
            </h1>
            <div className="flex flex-col lg:flex-row items-end justify-between gap-8 md:gap-8 max-w-6xl mx-auto">
                <div className="w-full lg:w-2/5">
                    <div className="relative size-[280px] md:size-[380px] lg:size-[350px] border-2 mx-auto">
                        <Image
                            alt="founder photo"
                            src={"/Founder.png"}
                            fill
                            className="object-contain object-center rounded-xl"
                            sizes="(min-width: 1040px) 347px, (min-width: 780px) 377px, 277px"
                        />
                        <Image
                            alt="circle svg"
                            src={"/circle.svg"}
                            width={350}
                            height={350}
                            className="object-cover object-center absolute -top-6 md:-top-20 -left-20 md:-left-40 -z-10 rounded-full size-56 md:size-80"
                        />
                    </div>
                </div>
                <div className="w-full lg:w-3/5 space-y-5 pb-3.5 font-sourceCodePro">
                    <p className="text-[clamp(1rem,1.15vw,1.3rem)] leading-6 font-secondary">
                    {`Hey {bestie — insert your name here 👀} my name is Prithvi. I'm creative at heart, always wondering how I can connect with people. The answer is evolving through me writing independent music, obsessed over caring about people and creating software, at my agency Webibee to venting about life problems to close friends.`}  
                    </p>
                    <p className="text-[clamp(1rem,1.15vw,1.3rem)] leading-6 font-secondary">
                    It has been quite an exciting journey over the past few years and to wonder it all started with love - for travel atleast ;) More on this when life connects us !  
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
