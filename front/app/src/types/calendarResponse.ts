export type CalendarResponse = {
  title: string;
  description: string;
  now_events: CalendarEvent[];
  end_events: CalendarEvent[];
};

type CalendarEvent = {
  id: number;
  title: string;
  decided_time: Date;
};
