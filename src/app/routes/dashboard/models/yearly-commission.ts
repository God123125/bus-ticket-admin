export interface YearlyCommission {
  year: number;
  data: DetailData[];
}
interface DetailData {
  month: string;
  monthNumber: number;
  label: string;
  income: number;
}
