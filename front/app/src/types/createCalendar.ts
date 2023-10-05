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

export type CreateCalendarInvitedResponse = {
  bookedUsers: BookedUsers[];
  user_id: string;
};

type BookedUsers = {
  nickname: string;
  password: string;
};
