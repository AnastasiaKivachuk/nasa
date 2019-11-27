export interface StoreData {
  isFetching: boolean;
  error: string;
  data: {};
  startEndDate: {dateStart: Date; dateEnd: Date};
  selectedDate: '';
}
