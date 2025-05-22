import Link from "next/link";
import { footerLinks1, footerLinks2, socialLinks } from "@/utils/Data";
import CalendlyLink from "../features/CalendlyButton";
import CalendlyPopupButton from "../features/CalendlyPopupButton";

const Footer = () => {
    return (
        <footer className={`padding space-y-6 md:space-y-10 w-full`}>
            <div className="flex flex-col justify-center items-center gap-8 w-full text-primary-foreground">
                {/* <h1 className="text-sm text-center capitalize tracking-wider opacity-80 font-sourceCodePro">
                    Code . Management . Design
                </h1> */}
                <h2 className="text-[clamp(1.85rem,2.5vw,2.85rem)] leading-8 font-bold font-ebGaramond text-center">
                    By the way, can I build your AI version ?
                </h2>
                {/* <Modal title={"contact"} /> */}
                <CalendlyLink />
                <p className="text-sm text-center capitalize opacity-80">
                    © since 1999 Prithvi
                </p>
            </div>
            <div
                className={`flex flex-col justify-center items-center gap-8 font-medium`}
            >
                <ul className="flex items-center gap-2.5">
                    {socialLinks.map((list, idx) => (
                        <li key={idx} className="flex-shrink-0">
                            <Link
                                target="_blank"
                                rel="noopener noreferrer"
                                title="icons"
                                href={list.href}
                            >
                                {list.icon}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
