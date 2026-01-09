
export interface Prompt {
  id: number;
  titleEn: string;
  titleKo: string;
  questionEn: string;
  questionKo: string;
}

export interface JournalEntry {
  day: number;
  content: string;
  date: string;
  isLocked: boolean;
}

export interface BonusCard {
  id: number;
  milestoneDay: number;
  titleEn: string;
  titleKo: string;
  messageEn: string;
  messageKo: string;
}

export interface UserState {
  startDate: string | null;
  entries: Record<number, JournalEntry>;
}
