import Link from "next/link";
import { footerLinks1, footerLinks2, socialLinks } from "@/utils/Data";
import Image from "next/image";
import { Button } from "../UI/Button";
import { Modal } from "../features/Modal";

const Footer = () => {

    return (
        <footer className={`padding relative space-y-6 md:space-y-10 w-full`}>
            <div className="flex flex-col justify-center items-center gap-8 w-full text-primary-foreground">
                <h1 className="text-sm text-center capitalize tracking-wider opacity-80">Code .  Management . Design</h1>
                <h2 className="text-[clamp(1.35rem,2.5vw,2.85rem)] leading-6 font-bold">Let's Connect and Collaborate or Just talk</h2>
                <Modal title={"contact"} />
                <p className="text-sm text-center capitalize opacity-80">
                    © {new Date().getFullYear()} Lift Media, LLC
                </p>
            </div>
            <div className={`flex flex-col justify-center items-center gap-8 font-medium`}>
                <ul className="hidden md:flex items-center gap-2.5">
                    {socialLinks.map((list, idx) => (
                        <li key={idx} className="flex-shrink-0">
                            <Link title="icons" className="" href={list.href}>{list.icon}</Link>
                        </li>
                    ))}
                </ul>

            </div>
        </footer>
    );
};

export default Footer;
