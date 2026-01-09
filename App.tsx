import { useEffect, useState } from "react";

/** =========================
 *  90일 질문 데이터 (예시)
 *  실제로는 나중에 90개 전부 넣으면 됨
 * ========================= */
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
  // 👉 여기 계속 Day 90까지 추가
];

export default function App() {
  /** 현재 Day */
  const [currentDay, setCurrentDay] = useState<number>(() => {
    const saved = localStorage.getItem("aura-current-day");
    return saved ? Number(saved) : 1;
  });

  /** 현재 답변 */
  const [answer, setAnswer] = useState<string>("");

  /** Day 변경 시 해당 답변 불러오기 */
  useEffect(() => {
    const savedAnswer = localStorage.getItem(`aura-answer-${currentDay}`);
    setAnswer(savedAnswer || "");
  }, [currentDay]);

  const question =
    QUESTIONS.find((q) => q.day === currentDay) || QUESTIONS[0];

  return (
    <div className="min-h-screen px-6 py-10 max-w-xl mx-auto">
      {/* 상단 안내 */}
      <p className="text-sm text-gray-500 mb-6">
        로그인 없이 체험 중입니다.  
        이 기기에서만 기록이 저장됩니다.
      </p>

      {/* Day 표시 */}
      <h1 className="text-sm tracking-widest text-gray-400 mb-2">
        DAY {currentDay} / 90
      </h1>

      {/* 질문 */}
      <h2 className="text-xl font-semibold mb-2">
        {question.ko}
      </h2>
      <p className="italic text-gray-600 mb-6">
        {question.en}
      </p>

      {/* 답변 입력 */}
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

      {/* 버튼 영역 */}
      <div className="flex justify-between mt-8">
        <button
          disabled={currentDay === 1}
          onClick={() => setCurrentDay((d) => d - 1)}
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
