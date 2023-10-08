export type CreateEventRequest = {
  event_title: string;
  description: string;
  term_start_day: string;
  term_end_day: string;
  location: string;
  user_id: string;
  requireTime: number;
  members: [
    {
      id: number;
      priority: number;
      must: boolean;
    }
  ];
  defaultquestions: number[]
  additionalQuestions: string[];
};

export type GetEventResponse = {
  event_title: string;
  description: string;
  term_start_day: string;
  term_end_day: string;
  location: string;
  user_id: string;
  requireTime: number;
  members: [
    {
      id: number;
      priority: number;
      must: boolean;
    }
  ];
  defaultquestions: number[]
  additionalQuestions: string[];
};