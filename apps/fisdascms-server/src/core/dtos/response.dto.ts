interface AppResponse {
  isSuccess: boolean;
  message: string;
  data: any;
}

export class SuccessfulResponse implements AppResponse {
  isSuccess = true;
  message: string;
  data: any;

  constructor(message: string = 'Sukses', data?: any) {
    this.message = message;
    this.data = data;
  }
}

export class ErrorResponse implements AppResponse {
  isSuccess = false;
  message: string;
  data: null;

  constructor(message: string = 'Gagal', data?: any) {
    this.message = message;
    this.data = data;
  }
}
