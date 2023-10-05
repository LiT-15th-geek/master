export type CreateCalendarRequest = {
  team_title: string;
  description: string;
  is_private: boolean;
  nicknameArray: string[];
  user_id: string;
};

export type CreateCalendarResponse = {
  state: boolean;
  calendar_id?: number;
};
