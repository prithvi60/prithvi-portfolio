import { FaLinkedin } from "react-icons/fa6";
import { FaWhatsappSquare } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { MdAlternateEmail } from "react-icons/md";

export const socialLinks = [
    {
        icon: (
            <FaLinkedin className="text-3xl md:text-4xl hover:text-black/70 hover:animate-pulse bg-transparent border border-secondary rounded-full p-1.5 text-primary" />
        ),
        href: "#",
    },
    {
        icon: (
            <FaWhatsappSquare className="text-3xl md:text-4xl text-primary hover:text-black/70 hover:animate-pulse bg-transparent border border-secondary rounded-full p-1.5" />
        ),
        href: "#",
    },
    {
        icon: (
            <MdAlternateEmail className="text-3xl md:text-4xl text-primary hover:text-black/70 hover:animate-pulse bg-transparent border border-secondary rounded-full p-1.5" />
        ),
        href: "#",
    },
    {
        icon: (
            <AiOutlineGlobal className="text-3xl md:text-4xl text-primary hover:text-black/70 hover:animate-pulse bg-transparent border border-secondary rounded-full p-1.5" />
        ),
        href: "#",
    },
    {
        icon: (
            <FiPhoneCall className="text-3xl md:text-4xl text-primary hover:text-black/70 hover:animate-pulse bg-transparent border border-secondary rounded-full p-1.5" />
        ),
        href: "#",
    },
];

export const dataLists = ["Development", "Branding", "Design", "Management"]

export const prompts = [
    "What services do you provide?",
    "How do you approach website and digital product development",
    "What kind of AI solutions do you offer?",
    "Do you provide complete end-to-end digital solutions?",
    "How does the process work from consultation to launch?",
    "What’s the usual timeline for delivering a project?",
    "Do you offer ongoing support and maintenance after launch?",
];
