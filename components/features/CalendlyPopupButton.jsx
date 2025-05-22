'use client';

import { useEffect } from 'react';

export default function CalendlyPopupButton() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const handleClick = () => {
        // @ts-ignore – Calendly may not be in the global TS context
        window.Calendly.initPopupWidget({ url: 'https://calendly.com/gokulgandhi97' });
        return false;
    };

    return (
        <button
            onClick={handleClick}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
            Let's Chat
        </button>
    );
}
