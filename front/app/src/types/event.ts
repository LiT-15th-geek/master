export type EventResponse = {
  targetEvent: TargetEvent;
  members: User[];
  allQuestions: string[];
  organizerQuestionArray: [
    {
      answer: string;
      nickname: string;
    }
  ];
  participantQuestionArray: FAQ[];
  decidedTime: [
    {
      desidedTime: string;
      event_title: string;
    }
  ];
  dayArray: [
    {
      day: string;
      point: number;
    }
  ];
  mySchedule: [
    {
      date: [
        {
          startTime: string;
          endTime: string;
        }
      ];
    }
  ];
  othersSchedule: [
    {
      startTime: string;
      endTime: string;
      point: number;
    }
  ];
};
export type TargetEvent = {
  event_title: string;
  description: string;
  term_start_day: string;
  term_end_day: string;
  location: string;
  owner_id: string;
  requireTime: string;
  decidedTime: string;
  is_delete: boolean;
};

type User = {
  bookedUser_id: string;
  nickname: string;
  priority: number;
  must: boolean;
};

export type FAQ = {
  id: number;
  title: string;
  answer: string;
};
