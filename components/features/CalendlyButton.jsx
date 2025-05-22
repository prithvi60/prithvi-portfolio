"use client";
import { useEffect, useState } from "react";

const CalendlyLink = () => {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const url = process.env.NEXT_PUBLIC_CALENDLY_ID;

    useEffect(() => {
        const existingScript = document.querySelector(
            'script[src="https://assets.calendly.com/assets/external/widget.js"]'
        );

        if (existingScript) {
            setIsScriptLoaded(true);
            return;
        }

        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        script.onload = () => setIsScriptLoaded(true);
        script.onerror = () => console.error("Failed to load Calendly script");
        document.body.appendChild(script);

        return () => { };
    }, []);

    // Function to detect if the device is an Apple device
    const isAppleDevice = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /(iphone|ipad|ipod|macintosh)/i.test(userAgent);
    };

    const handleCalendlyClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!url) {
            console.error("Calendly URL is missing!");
            return;
        }

        if (isAppleDevice()) {
            // Redirect to Calendly URL for Apple devices
            window.location.href = url;
        } else {
            // Use popup for non-Apple devices
            if (window.Calendly && isScriptLoaded) {
                window.Calendly.initPopupWidget({ url });

            } else {
                console.error("Calendly not ready. Script loaded:", isScriptLoaded);
                setTimeout(() => {
                    if (window.Calendly) {
                        window.Calendly.initPopupWidget({ url });
                    } else {
                        alert("Unable to load Calendly. Please try again later.");
                    }
                }, 500);
            }
        }
    };

    return (
        <button
            title={`Download Brochure page`}
            role="button"
            onClick={handleCalendlyClick}
            className="rounded-lg border-2 border-solid border-black/70 px-4 py-3 font-normal capitalize text-black text-lg xl:text-xl transition-all duration-300 hover:scale-110 cursor-pointer font-sourceCodePro"
        >
            Okay! lets chat
        </button>
    );
};

export default CalendlyLink;
