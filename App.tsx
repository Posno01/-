import { useEffect, useState } from "react";

/* =========================
   질문 데이터 (예시)
   ========================= */
const QUESTIONS = [
  {
    day: 1,
    ko: "가장 자주 찾아오지만 말로 표현하지 않는 감정은 무엇인가요?",
    en: "Which emotion visits you most often, yet remains unspoken?",
  },
  {
    day: 2,
    ko: "최근 한 달 동안 나를 가장 많이 흔든 사건은 무엇이었나요?",
    en: "What event has shaken you most this past month?",
  },
  // 👉 Day 90까지 동일한 형식으로 추가 가능
];

/* =========================
   페이지 타입
   ========================= */
type Page = "home" | "today" | "journal";

export default function App() {
  /* 현재 페이지 */
  const [page, setPage] = useState<Page>("home");

  return (
    <div className="min-h-screen flex bg-[#F7F5F2]">
      <Sidebar page={page} setPage={setPage} />

      <main className="flex-1 px-12 py-10">
        {page === "home" && <HomeView setPage={setPage} />}
        {page === "today" && <TodayView />}
        {page === "journal" && <JournalView />}
      </main>
    </div>
  );
}

/* =========================
   Sidebar
   ========================= */
function Sidebar({
  page,
  setPage,
}: {
  page: Page;
  setPage: (p: Page) => void;
}) {
  const item = (key: Page, label: string) => (
    <button
      onClick={() => setPage(key)}
      className={`w-full text-left px-4 py-2 rounded-lg mb-1 transition
        ${
          page === key
            ? "bg-white shadow-sm text-black"
            : "opacity-70 hover:opacity-100"
        }`}
    >
      {label}
    </button>
  );

  return (
    <aside className="w-64 px-6 py-10">
      <h1 className="font-serif text-2xl mb-10">Aura</h1>
      {item("home", "Home")}
      {item("today", "Today's Question")}
      {item("journal", "My Journal")}
    </aside>
  );
}

/* =========================
   Home View
   ========================= */
function HomeView({ setPage }: { setPage: (p: Page) => void }) {
  const currentDay =
    Number(localStorage.getItem("aura-current-day")) || 1;

  const writtenCount = Object.keys(localStorage).filter((key) =>
    key.startsWith("aura-answer-")
  ).length;

  return (
    <div>
      <h2 className="font-serif text-4xl mb-4">
        One question a day.
        <br />A quieter, clearer version of you.
      </h2>

      <p className="text-gray-600 mb-10">
        Welcome back. Today marks Day {currentDay} of your 90-day reflection journey.
      </p>

      <div className="bg-white rounded-2xl p-8 shadow-sm flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-400 mb-1">YOUR JOURNEY</p>
          <p className="text-3xl font-serif">
            {currentDay} / 90 Days
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {writtenCount} entries written so far.
          </p>
        </div>

        <button
          onClick={() => setPage("today")}
          className="px-6 py-3 bg-black text-white rounded-full"
        >
          Open Today’s Question →
        </button>
      </div>
    </div>
  );
}

/* =========================
   Today Question View
   ========================= */
function TodayView() {
  const [currentDay, setCurrentDay] = useState<number>(() => {
    const saved = localStorage.getItem("aura-current-day");
    return saved ? Number(saved) : 1;
  });

  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    const savedAnswer = localStorage.getItem(
      `aura-answer-${currentDay}`
    );
    setAnswer(savedAnswer || "");
  }, [currentDay]);

  const question =
    QUESTIONS.find((q) => q.day === currentDay) || QUESTIONS[0];

  return (
    <div className="max-w-xl">
      <h1 className="text-sm tracking-widest text-gray-400 mb-2">
        DAY {currentDay} / 90
      </h1>

      <h2 className="text-xl font-semibold mb-2">
        {question.ko}
      </h2>

      <p className="italic text-gray-600 mb-6">
        {question.en}
      </p>

      <textarea
        value={answer}
        onChange={(e) => {
          setAnswer(e.target.value);
          localStorage.setItem(
            `aura-answer-${currentDay}`,
            e.target.value
          );
        }}
        placeholder="여기에 오늘의 답을 적어보세요."
        className="w-full h-40 p-4 border rounded-xl resize-none focus:outline-none focus:ring-1"
      />

      <div className="flex justify-between mt-8">
        <button
          disabled={currentDay === 1}
          onClick={() => {
            const prev = currentDay - 1;
            setCurrentDay(prev);
            localStorage.setItem("aura-current-day", String(prev));
          }}
          className="text-sm text-gray-500 disabled:opacity-30"
        >
          ← 이전
        </button>

        <button
          onClick={() => {
            if (currentDay < 90) {
              const next = currentDay + 1;
              setCurrentDay(next);
              localStorage.setItem(
                "aura-current-day",
                String(next)
              );
            }
          }}
          className="px-6 py-2 bg-black text-white rounded-full"
        >
          다음 →
        </button>
      </div>
    </div>
  );
}

/* =========================
   Journal View
   ========================= */
function JournalView() {
  const entries = Object.keys(localStorage)
    .filter((key) => key.startsWith("aura-answer-"))
    .map((key) => {
      const day = key.replace("aura-answer-", "");
      return {
        day,
        text: localStorage.getItem(key) || "",
      };
    })
    .sort((a, b) => Number(a.day) - Number(b.day));

  return (
    <div className="max-w-2xl">
      <h2 className="font-serif text-2xl mb-6">My Journal</h2>

      {entries.length === 0 && (
        <p className="text-gray-500">
          아직 작성된 기록이 없습니다.
        </p>
      )}

      <ul className="space-y-4">
        {entries.map((entry) => (
          <li
            key={entry.day}
            className="bg-white p-4 rounded-xl shadow-sm"
          >
            <p className="text-sm text-gray-400 mb-1">
              Day {entry.day}
            </p>
            <p className="whitespace-pre-wrap text-gray-800">
              {entry.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
