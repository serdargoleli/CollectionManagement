export interface IResponseModel<T> {
  status: number;
  message: string;
  data: T;
}
