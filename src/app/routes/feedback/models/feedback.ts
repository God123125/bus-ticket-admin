export interface Feedback {
  _id?: string;
  id?: string;
  image?: string;
  message: string;
  star: number;
  user_name?: string;
  user_phone?: string;
  trip_name?: string;
  created_at?: string;
  createdAt?: string;
}
export interface FeedbackSummary {
  total_feedback: number;
  good: number;
  bad: number;
}
