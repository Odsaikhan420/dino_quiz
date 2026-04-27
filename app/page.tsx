"use client";

import { useMemo, useState } from "react";
import Hero3D from "./Hero3D";

type Letter = "A" | "B" | "C" | "D";

const QUESTIONS: {
    prompt: string;
    options: { letter: Letter; label: string }[];
}[] = [
    {
        prompt: "Чи шинэ юм сурахдаа:",
        options: [
            { letter: "A", label: "Алхам алхмаар логикоор ойлгоно" },
            { letter: "B", label: "Өөрөө оролдож туршина" },
            { letter: "C", label: "Бусдаас асууж хамт хийе гэдэг" },
            { letter: "D", label: "Шууд хэрэгтэй хэсгийг нь сурна" },
        ],
    },
    {
        prompt: "Чөлөөт цагаараа:",
        options: [
            { letter: "A", label: "Puzzle, бодлого бодох" },
            { letter: "B", label: "Юм дизайн хийх, edit хийх" },
            { letter: "C", label: "Найзуудтайгаа чатлах, уулзах" },
            { letter: "D", label: "Ирэх 7 хоногийн ажлуудаа төлөвлөх" },
        ],
    },
    {
        prompt: "Асуудал гарвал:",
        options: [
            { letter: "A", label: "Учрыг нь олж ухна" },
            { letter: "B", label: "Янз бүрийн арга туршина" },
            { letter: "C", label: "Хүнээс тусламж авна" },
            { letter: "D", label: "Хамгийн хурдан шийдлийг олно" },
        ],
    },
    {
        prompt: "Чамд аль нь илүү таалагдах вэ?",
        options: [
            { letter: "A", label: "Алдаа засах" },
            { letter: "B", label: "Шинэ зүйл бүтээх" },
            { letter: "C", label: "Хүмүүстэй ажиллах" },
            { letter: "D", label: "Системийг сайжруулах" },
        ],
    },
    {
        prompt: "Багт чи:",
        options: [
            { letter: "A", label: "«Яагаад ингэж байгааг» олдог" },
            { letter: "B", label: "Шинэ санаа гаргадаг" },
            { letter: "C", label: "Хүмүүсийг холбодог" },
            { letter: "D", label: "Ажлыг явуулдаг" },
        ],
    },
    {
        prompt: "Чи альтай илүү адилхан бэ?",
        options: [
            { letter: "A", label: "Нарийн ширийнд анхаардаг" },
            { letter: "B", label: "Бүтээлч" },
            { letter: "C", label: "Нээлттэй, яриа хөөрөөтэй" },
            { letter: "D", label: "Зорилгод чиглэсэн" },
        ],
    },
    {
        prompt: "Чамд аль нь илүү сонирхолтой вэ?",
        options: [
            { letter: "A", label: "Код бичих" },
            { letter: "B", label: "Аппын харагдах байдлыг хийх" },
            { letter: "C", label: "Баг удирдах" },
            { letter: "D", label: "Систем хурдан ажиллуулах" },
        ],
    },
    {
        prompt: "Хэрвээ тоглоом хийвэл чи:",
        options: [
            { letter: "A", label: "Доторх логикыг нь хийнэ" },
            { letter: "B", label: "Дизайн, дүрслэлийг нь хийнэ" },
            { letter: "C", label: "Багаа зохион байгуулна" },
            { letter: "D", label: "Тоглоомыг smooth ажиллуулна" },
        ],
    },
];

const RESULT_COPY: Record<
    Letter,
    {
        emoji: string;
        title: string;
        tagline: string;
        jobs: string[];
    }
> = {
    A: {
        emoji: "🧠",
        title: "Code Master",
        tagline: "Чамд логик сэтгэлгээ хүчтэй 💪",
        jobs: ["Software Developer", "Backend Engineer", "Cybersecurity Analyst"],
    },
    B: {
        emoji: "🎨",
        title: "Creative Tech",
        tagline: "Чи бүтээлч талдаа 🔥",
        jobs: ["UI/UX Designer", "Frontend Developer", "Game Developer"],
    },
    C: {
        emoji: "🤝",
        title: "People + Tech",
        tagline: "Чи хүмүүсийн дунд гялалздаг ✨",
        jobs: ["IT Project Manager", "Business Analyst", "Scrum Master"],
    },
    D: {
        emoji: "⚙️",
        title: "System Boss",
        tagline: "Чи үр дүн, гүйцэтгэлд анхаардаг 🚀",
        jobs: ["DevOps Engineer", "System Administrator", "QA Tester"],
    },
};

const LETTER_ORDER: Letter[] = ["A", "B", "C", "D"];

const fontDisplay = "font-[family-name:var(--font-cinzel)]";

function tallyAnswers(answers: Letter[]): Record<Letter, number> {
    const counts: Record<Letter, number> = { A: 0, B: 0, C: 0, D: 0 };
    for (const l of answers) counts[l]++;
    return counts;
}

function winnerLetter(counts: Record<Letter, number>): Letter {
    let best: Letter = "A";
    let max = -1;
    for (const letter of LETTER_ORDER) {
        const n = counts[letter];
        if (n > max) {
            max = n;
            best = letter;
        }
    }
    return best;
}

function GenshinOption({ letter, label, onSelect }: { letter: Letter; label: string; onSelect: () => void }) {
    return (
        <button
            type="button"
            onClick={onSelect}
            className="flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-left transition-all duration-200 hover:border-[#5ec4b6]/40 hover:bg-[#5ec4b6]/[0.06] active:scale-[0.99] cursor-pointer"
        >
            <span
                className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-[#5ec4b6]/55 bg-[#0d1420]/80 shadow-[inset_0_0_0_1px_rgba(94,196,182,0.15)]"
                aria-hidden
            />
            <span className="min-w-0 flex-1 text-sm leading-snug text-[#b8c5d6]">
                <span className="font-semibold text-[#7dd3c0]/90">{letter}.</span> {label}
            </span>
        </button>
    );
}

export default function Home() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Letter[]>([]);

    const finished = answers.length === QUESTIONS.length;
    const counts = useMemo(() => (finished ? tallyAnswers(answers) : null), [answers, finished]);
    const winner = counts ? winnerLetter(counts) : null;
    const result = winner ? RESULT_COPY[winner] : null;

    const current = QUESTIONS[step];
    const progressPct = ((step + 1) / QUESTIONS.length) * 100;

    function select(letter: Letter) {
        setAnswers((prev) => [...prev, letter]);
        setStep((s) => s + 1);
    }

    function restart() {
        setAnswers([]);
        setStep(0);
    }

    return (
        <div className={`quiz-genshin-bg flex min-h-full flex-1 flex-col px-4 py-8 text-[#d8e0ea]`}>
            <main className="mx-auto flex w-full max-w-lg flex-col gap-6">
                <Hero3D />

                <header className="text-center">
                    <h1
                        className={`${fontDisplay} mt-3 text-2xl font-bold tracking-wide text-[#f2e6c9] drop-shadow-[0_0_24px_rgba(212,175,55,0.25)] md:text-[1.65rem]`}
                    >
                        Чи ямар IT ажилд тохирох вэ?
                    </h1>
                </header>

                {!finished && current && (
                    <section className="quiz-genshin-panel quiz-genshin-panel--active rounded-2xl p-5" aria-live="polite">
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                            <span
                                className={`${fontDisplay} text-[11px] font-semibold uppercase tracking-[0.15em] text-[#7dd3c0]`}
                            >
                                Асуулт
                            </span>
                            <span className="text-xs tabular-nums text-[#8a9aac]">
                                {step + 1} / {QUESTIONS.length}
                            </span>
                        </div>
                        <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-[#0a1018]" aria-hidden>
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-[#3d8a7c] via-[#c9a227] to-[#e4c76a] transition-[width] duration-500 ease-out"
                                style={{ width: `${progressPct}%` }}
                            />
                        </div>
                        <h2 className={`${fontDisplay} text-lg font-semibold leading-snug text-[#f2e8d8]`}>{current.prompt}</h2>
                        <fieldset className="mt-4 space-y-1">
                            <legend className="sr-only">{current.prompt}</legend>
                            {current.options.map(({ letter, label }) => (
                                <GenshinOption key={letter} letter={letter} label={label} onSelect={() => select(letter)} />
                            ))}
                        </fieldset>
                    </section>
                )}

                {finished && result && counts && (
                    <section className="quiz-genshin-panel rounded-2xl p-4" aria-live="polite">
                        <p
                            className={`${fontDisplay} text-center text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a227]`}
                        >
                            Үр дүн
                        </p>
                        <div className="mt-5 text-center">
                            <span className="text-5xl drop-shadow-[0_0_20px_rgba(228,199,106,0.35)]" aria-hidden>
                                {result.emoji}
                            </span>
                            <h2 className={`${fontDisplay} mt-3 text-2xl font-bold text-[#f2e6c9]`}>«{result.title}»</h2>
                            <p className="mt-2 text-sm text-[#a8b8c8]">{result.tagline}</p>
                        </div>
                        <div className="mt-6 rounded-xl border border-[#c9a227]/20 bg-[#0a1018]/80 px-4 py-3">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7dd3c0]/90">Тоололт</p>
                            <ul className="mt-2 flex flex-wrap gap-4 text-sm text-[#c9d4de]">
                                {LETTER_ORDER.map((L) => (
                                    <li key={L}>
                                        <span className="font-semibold text-[#e4c76a]">{L}</span>
                                        <span className="text-[#8a9aac]"> — </span>
                                        {counts[L]}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-6">
                            <p className="text-sm font-semibold text-[#e8dfd0]">👉 Тохирох ажил:</p>
                            <ul className="mt-2 space-y-1.5 text-sm text-[#a8b8c8]">
                                {result.jobs.map((job) => (
                                    <li key={job} className="flex gap-2">
                                        <span className="text-[#c9a227]" aria-hidden>
                                            ▸
                                        </span>
                                        <span>{job}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button
                            type="button"
                            onClick={restart}
                            className={`${fontDisplay} mt-8 w-full rounded-xl border border-[#c9a227]/45 bg-gradient-to-b from-[#2a2418] to-[#151210] py-3.5 text-sm font-semibold tracking-wide text-[#f2e6c9] shadow-[0_0_24px_-8px_rgba(201,162,39,0.4)] transition hover:border-[#e4c76a]/60 hover:from-[#342a1c] hover:text-white cursor-pointer`}
                        >
                            Дахин эхлэх
                        </button>
                    </section>
                )}
            </main>
        </div>
    );
}
