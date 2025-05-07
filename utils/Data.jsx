import { FaLinkedin } from "react-icons/fa6";
import { FaWhatsappSquare } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { MdAlternateEmail } from "react-icons/md";

export const socialLinks = [
    {
        icon: (
            <FaLinkedin className="text-2xl md:text-4xl hover:text-black/70 hover:animate-pulse bg-transparent border border-secondary rounded-full p-1.5 text-primary-foreground" />
        ),
        href: "#",
    },
    {
        icon: (
            <FaWhatsappSquare className="text-2xl md:text-4xl text-primary-foreground hover:text-black/70 hover:animate-pulse bg-transparent border border-secondary rounded-full p-1.5" />
        ),
        href: "#",
    },
    {
        icon: (
            <MdAlternateEmail className="text-2xl md:text-4xl text-primary-foreground hover:text-black/70 hover:animate-pulse bg-transparent border border-secondary rounded-full p-1.5" />
        ),
        href: "#",
    },
    {
        icon: (
            <AiOutlineGlobal className="text-2xl md:text-4xl text-primary-foreground hover:text-black/70 hover:animate-pulse bg-transparent border border-secondary rounded-full p-1.5" />
        ),
        href: "#",
    },
    {
        icon: (
            <FiPhoneCall className="text-2xl md:text-4xl text-primary-foreground hover:text-black/70 hover:animate-pulse bg-transparent border border-secondary rounded-full p-1.5" />
        ),
        href: "#",
    },
];
