import { GiSupersonicArrow } from "react-icons/gi";

export const renderPromptButtons = (prompts, handlePrompt, isStopped) =>
    prompts.map((list, idx) => (
        <button
            disabled={isStopped}
            role="button"
            aria-label={`${list} button`}
            key={idx}
            className="p-5 rounded-xl border-2 border-white backdrop-blur-xl bg-white/10 text-sm font-medium text-start hover:scale-105 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
            onClick={() => handlePrompt(list)}
        >
            {list}
        </button>
    ));

export const renderDataListItems = (dataLists, handlePrompt) =>
    dataLists.map((list, idx) => {
        const styles = {
            Development: {
                bg: "bg-[#FFDD8F]",
                text: "text-[#B86500]",
                icon: {
                    color: "text-[#FFC379]",
                    bg: "bg-[#FF8C00]",
                },
            },
            Branding: {
                bg: "bg-[#FF8FDB]",
                text: "text-[#B80040]",
                icon: {
                    color: "text-[#FF79C7]",
                    bg: "bg-[#FF006A]",
                },
            },
            Design: {
                bg: "bg-[#8FB2FF]",
                text: "text-[#0C00B8]",
                icon: {
                    color: "text-[#79BCFF]",
                    bg: "bg-[#0000FF]",
                },
            },
            default: {
                bg: "bg-[#57BD6A]",
                text: "text-[#136318]",
                icon: {
                    color: "text-[#48C046]",
                    bg: "bg-[#0B8900]",
                },
            },
        };

        const style = styles[list.title] || styles.default;

        return (
            <button
                role="button"
                aria-label={`${list.title} button`}
                className={`flex items-center gap-2 p-1.5 sm:p-3 rounded-xl w-full cursor-pointer ${style.bg}`}
                key={idx}
                onClick={() => handlePrompt(list.prompt)}
            >
                <span className="shrink-0">
                    <GiSupersonicArrow
                        className={`${style.icon.color} ${style.icon.bg} text-base md:text-lg size-8 md:size-10 rounded-xl p-2`}
                    />
                </span>
                <h2
                    className={`text-sm md:text-base tracking-wide font-semibold ${style.text}`}
                >
                    {list.title}
                </h2>
            </button>
        );
    });