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
        href: "https://www.linkedin.com/in/prithvi-n/",
    },
    {
        icon: (
            <FaWhatsappSquare className="text-3xl md:text-4xl text-primary hover:text-black/70 hover:animate-pulse bg-transparent border border-secondary rounded-full p-1.5" />
        ),
        href: "https://wa.me/7358023088?text=Hey%20Prithvi.%20We%20need%20to%20connect%20now%20!",
    },
    {
        icon: (
            <MdAlternateEmail className="text-3xl md:text-4xl text-primary hover:text-black/70 hover:animate-pulse bg-transparent border border-secondary rounded-full p-1.5" />
        ),
        href: "mailto:support@webibee.com",
    },
    {
        icon: (
            <AiOutlineGlobal className="text-3xl md:text-4xl text-primary hover:text-black/70 hover:animate-pulse bg-transparent border border-secondary rounded-full p-1.5" />
        ),
        href: "https://webibee.com/",
    },
    {
        icon: (
            <FiPhoneCall className="text-3xl md:text-4xl text-primary hover:text-black/70 hover:animate-pulse bg-transparent border border-secondary rounded-full p-1.5" />
        ),
        href: "tel:+91-7358023088",
    },
];

export const dataLists = [{
    title: "Development",
    prompt: "What tech stack are you using?"
},
{
    title: "Branding",
    prompt: "What’s your brand’s personality?"
},
{
    title: "Design",
    prompt: "Web or mobile UI first?"
},
{
    title: "Management",
    prompt: "Meetings: love or hate?"
}]

export const prompts = [
    "What services do you provide?",
    "How do you approach website and digital product development?",
    "What kind of AI solutions do you offer?",
    "Do you provide complete end-to-end digital solutions?",
    "How does the process work from consultation to launch?",
    "What’s the usual timeline for delivering a project?",
    "Do you offer ongoing support and maintenance after launch?",
];
