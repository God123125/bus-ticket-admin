export interface Feedback {
  _id?: string;
  id?: string;
  image?: string;
  message: string;
  star: number;
  user_name?: string;
  user_phone?: string;
  trip_name?: string;
  company?: {
    _id?: string;
    name?: string;
    image?: string;
    [key: string]: any;
  };
  created_at?: string;
  createdAt?: string;
}
export interface FeedbackSummary {
  total_feedback: number;
  good: number;
  bad: number;
}
