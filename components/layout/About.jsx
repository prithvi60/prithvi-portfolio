import Image from "next/image";
import React from "react";

const About = () => {
    return (
        <section className="padding w-full h-full space-y-10">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        name: "Prithvi",
                        description: "Its my personal portfolio powered by AI",
                        url: "https://prithvi.webibee.com",
                        image: "https://prithvi.webibee.com/Founder.png",
                        sameAs: ["https://www.linkedin.com/in/prithvi-n/"],
                        jobTitle: "Founder of Webibee",
                        worksFor: {
                            "@type": "Organization",
                            name: "Webibee",
                        },
                    }),
                }}
            />
            <header>
                <h1 className="text-[clamp(2.25rem,5.5vw,4.5rem)] text-primary font-extrabold tracking-wider uppercase text-center md:text-right">
                    Meet Real PRITHVI
                </h1>
            </header>

            <div className="flex flex-col lg:flex-row items-end justify-between gap-8 md:gap-8 max-w-6xl mx-auto">
                <div className="w-full lg:w-2/5">
                    <div className="relative size-[280px] md:size-[380px] lg:size-[350px] border-2 mx-auto">
                        <Image
                            alt="founder photo"
                            src={"/Founder.png"}
                            fill
                            className="object-contain object-center rounded-xl"
                            sizes="(min-width: 1040px) 347px, (min-width: 780px) 377px, 277px"
                            loading="eager"
                            priority={true}
                        />
                        <Image
                            alt="circle svg"
                            src={"/circle.svg"}
                            width={350}
                            height={350}
                            className="object-cover object-center absolute -top-6 md:-top-20 -left-20 md:-left-40 -z-10 rounded-full size-56 md:size-80"
                            loading="lazy"
                            priority={false}
                        />
                    </div>
                </div>
                <div className="w-full lg:w-3/5 space-y-5 pb-3.5 font-sourceCodePro">
                    <p className="text-[clamp(1rem,1.15vw,1.3rem)] leading-6 font-secondary">
                        {`Hey! my name is Prithvi. I'm a creative at heart, always wondering how I can connect with people. The answer is always evolving through writing, obsessing over software workflows, building products at my agency Webibee and venting about life problems to close friends.`}
                    </p>
                    <p className="text-[clamp(1rem,1.15vw,1.3rem)] leading-6 font-secondary">
                        It has been quite an exciting journey over the past few years and to
                        wonder it all started with love - for travel atleast ;) More on this
                        when life connects us !
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
