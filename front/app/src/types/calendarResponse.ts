export type CalendarResponse = {
  calendar: CalendarData; // カレンダー情報を含むオブジェクト
  users: string[]; // メンバー名の配列
  futureEvents: CalendarEventData[];
  pastEvents: CalendarEventData[];
};

type Users = {
  nickname: string;
  password: string;
}

type CalendarData = {
  team_title: string;
  description: string;
  user_id: string;
};

export type CalendarEventData = {
  event_title: string; // プロパティ名を修正
  desidedTime: Date; // プロパティ名を修正
  id: number | null; // idの型修正
};