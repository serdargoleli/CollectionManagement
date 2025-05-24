export interface IResponseModel<T> {
  status: number;
  message: string;
  data: T;
}

export interface IResponseModelError {
  error: string;
  ok: boolean;
  status: number;
  url: string;
}
