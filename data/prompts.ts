
import { Prompt } from '../types';

export const PROMPTS: Prompt[] = [
  {
    id: 1,
    titleEn: "Beginnings",
    titleKo: "시작",
    questionEn: "What is the primary intention you want to set for this 90-day journey?",
    questionKo: "이 90일간의 여정을 통해 당신이 세우고 싶은 가장 큰 의도는 무엇인가요?"
  },
  {
    id: 2,
    titleEn: "Gratitude",
    titleKo: "감사",
    questionEn: "List three small things that brought you peace today. Why them?",
    questionKo: "오늘 당신에게 평온함을 주었던 세 가지 작은 것들을 적어보세요. 왜 그것들이었나요?"
  },
  {
    id: 3,
    titleEn: "Inner Voice",
    titleKo: "내면의 목소리",
    questionEn: "What is one recurring thought you've had lately? Is it serving you?",
    questionKo: "최근 반복적으로 드는 생각은 무엇인가요? 그 생각은 당신에게 도움이 되고 있나요?"
  },
  {
    id: 4,
    titleEn: "Space",
    titleKo: "공간",
    questionEn: "Describe the place where you feel most at home with yourself.",
    questionKo: "자신과 가장 편안하게 마주할 수 있는 당신만의 공간은 어떤 모습인가요?"
  },
  {
    id: 5,
    titleEn: "Boundaries",
    titleKo: "경계",
    questionEn: "Where do you need to say 'no' more often to protect your energy?",
    questionKo: "당신의 에너지를 보호하기 위해 더 자주 '아니오'라고 말해야 할 부분은 어디인가요?"
  },
  {
    id: 6,
    titleEn: "Fear",
    titleKo: "두려움",
    questionEn: "If fear was no longer an obstacle, what would be your next step?",
    questionKo: "만약 두려움이 더 이상 장애물이 아니라면, 당신의 다음 발걸음은 무엇이 될까요?"
  },
  {
    id: 7,
    titleEn: "Connection",
    titleKo: "연결",
    questionEn: "Who in your life makes you feel truly seen and understood?",
    questionKo: "당신의 삶에서 누가 당신을 진정으로 이해하고 바라봐준다고 느끼나요?"
  },
  {
    id: 8,
    titleEn: "Strength",
    titleKo: "강점",
    questionEn: "Recall a time you surprised yourself with your own resilience.",
    questionKo: "자신의 회복 탄력성에 스스로 놀랐던 순간을 떠올려 보세요."
  },
  {
    id: 9,
    titleEn: "Self-Care",
    titleKo: "자기 돌봄",
    questionEn: "What does 'rest' look like for you today? Not sleeping, but resting.",
    questionKo: "오늘 당신에게 '휴식'이란 어떤 모습인가요? 잠을 자는 것 말고, 진정한 쉼을 의미합니다."
  },
  {
    id: 10,
    titleEn: "Value",
    titleKo: "가치",
    questionEn: "What are three core values that define who you are at your best?",
    questionKo: "가장 나다운 모습일 때 나를 정의하는 세 가지 핵심 가치는 무엇인가요?"
  },
  {
    id: 11,
    titleEn: "Letting Go",
    titleKo: "내려놓기",
    questionEn: "What is one belief about yourself that you are ready to release?",
    questionKo: "자신에 대해 가지고 있던 생각 중 이제는 놓아줄 준비가 된 것은 무엇인가요?"
  },
  {
    id: 12,
    titleEn: "Balance",
    titleKo: "균형",
    questionEn: "In what area of your life are you currently overextending yourself?",
    questionKo: "현재 삶의 어떤 부분에서 스스로를 지나치게 몰아붙이고 있나요?"
  }
  // For the sake of this implementation, we can dynamically generate or extend this list.
  // In a real product, all 90 would be curated here.
];

// Helper to fill up the remaining days for demonstration
for (let i = 13; i <= 90; i++) {
  PROMPTS.push({
    id: i,
    titleEn: `Reflection Day ${i}`,
    titleKo: `성찰 Day ${i}`,
    questionEn: `What has changed in your perspective since Day ${Math.max(1, i-7)}?`,
    questionKo: `Day ${Math.max(1, i-7)} 이후 당신의 관점에는 어떤 변화가 있었나요?`
  });
}
