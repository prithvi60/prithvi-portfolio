import Image from 'next/image'
import React from 'react'

const About = () => {
    return (
        <section className='padding w-full h-full space-y-10'>
            <h1 className='text-7xl md:text-9xl xl:text-[250px] text-primary font-extrabold tracking-wider uppercase'>About</h1>
            <div className='flex flex-col md:flex-row items-end justify-between gap-8 md:gap-0 max-w-6xl mx-auto'>
                <div className='w-full md:w-2/5'>
                    <div className='w-full relative h-[320px] md:size-[380px] lg:size-[350px] rounded-xl overflow-hidden border-2 mx-auto'>
                        <Image alt='founder photo' src={"/Founder.png"} fill className='object-contain object-center' />
                    </div>
                </div>
                <div className='w-full md:w-3/5 space-y-5 pb-3.5'>
                    <p className='text-[clamp(1rem,1.15vw,1.3rem)] leading-6 font-secondary'>At Aspire Tech Academy, we go beyond just teaching we ensure our learners are matched with roles and companies that align with their unique strengths Our dedicated career support team works closely with each student, helping them land roles in sectors where they can thrive and grow. This thoughtful alignment gives our graduates the ideal launchpad to kickstart a successful career.</p>
                    <p className='text-[clamp(1rem,1.15vw,1.3rem)] leading-6 font-secondary'>At Aspire Tech Academy, we go beyond just teaching we ensure our learners are matched with roles and companies that align with their unique strengths Our dedicated career support team works closely wit</p>
                </div>
            </div>
        </section>
    )
}

export default About