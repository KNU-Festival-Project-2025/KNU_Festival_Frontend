import { useMemo } from "react";

type Props = {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
    variant?: "pill" | "rounded";
};

export default function FAQItem({ question, answer, isOpen, onClick, variant }: Props) {
    const autoVariant = useMemo<"pill" | "rounded">(() => {
        if (variant) return variant;
        return question.length <= 23 ? "pill" : "rounded";
    }, [question, variant]);

    const qClass =
        autoVariant === "pill"
            ? "inline-flex h-[34px] items-center flex-shrink-0 rounded-[50px]"
            : "inline-flex min-h-[34px] items-center flex-shrink-0 rounded-[20px] py-[10px]";

    return (
        <div className="mb-[15px] mx-[10px]">
            {/* 질문 바 */}
            <button
                onClick={onClick}
                className={`group w-full shadow-sm focus:outline-none focus:ring-0 ${qClass}`}
                style={{
                    border: "1px solid transparent",
                    borderRadius: autoVariant === "pill" ? "50px" : "20px",
                    background: isOpen
                        ? "linear-gradient(#FFFFFFFF, #FFFFFFFF) padding-box, linear-gradient(90deg,#83C082,#3E5A3D) border-box"
                        : "linear-gradient(#FFFFFFCC, #FFFFFFCC) padding-box, linear-gradient(90deg,#83C082,#3E5A3D) border-box",
                }}
            >
                {/* 가운데 정렬 컨테이너 */}
                <div className="flex w-full items-center justify-center relative px-[23px]">
                    <span
                        className="text-center"
                        style={{
                            color: "#0A0A0A",
                            fontFamily: "Hahmlet, serif",
                            fontSize: "15px",
                            fontWeight: 700,
                            lineHeight: "22px",
                        }}
                    >
                        {question}
                    </span>

                    {/* 우측 아이콘 */}
                    <span className="absolute right-[10px] flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="8"
                            viewBox="0 0 16 8"
                            fill="none"
                            className={`transition-transform duration-200 ${isOpen ? "" : "rotate-180"}`}
                        >
                            <path
                                d="M8.00008 0.74998L0.916748 7.83331H15.0834L8.00008 0.74998Z"
                                fill="#2B5027"
                                fillOpacity="0.77"
                            />
                        </svg>
                    </span>
                </div>
            </button>

            {/* 답변 카드 */}
            {isOpen && (
                <div
                    className="mt-[3px] flex flex-col justify-center items-center flex-shrink-0 mx-[-1px] rounded-[17px]"
                    style={{
                        background:
                            "linear-gradient(0deg, rgba(255,255,255,0.80) 0%, rgba(255,255,255,0.80) 100%), rgba(69,130,68,0.17)",
                        boxShadow:
                            "0 0 19.4px 7px rgba(255,255,255,0.26) inset, -1px 3px 13.1px -4px rgba(56,63,41,0.67)",
                        padding: "0px 14px",
                    }}
                >
                    <p className="mt-[9px] mb-[10px] text-[#1B1B1B] text-center font-pretendard font-[300] text-[15px] whitespace-pre-line leading-relaxed">
                        {answer}
                    </p>
                </div>
            )}
        </div>
    );
}
