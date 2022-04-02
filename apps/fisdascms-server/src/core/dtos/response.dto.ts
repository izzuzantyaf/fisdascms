interface AppResponse {
  isSuccess: boolean;
  message: string;
  data: object | null;
}

export class SuccessfulResponse implements AppResponse {
  isSuccess = true;
  message: string;
  data = null;

  constructor(message: string = 'Sukses', data?: object) {
    this.message = message;
    this.data = { ...data };
  }
}

export class ErrorResponse implements AppResponse {
  isSuccess = false;
  message: string;
  data = null;

  constructor(message: string = 'Gagal', data?: object) {
    this.message = message;
    this.data = { ...data };
  }
}
