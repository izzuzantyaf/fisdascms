import { HttpException } from '@nestjs/common';

export class SuccessfulResponse extends HttpException {
  constructor(
    message: string,
    statusCode: number = 200,
    additionalData?: object,
  ) {
    super({ isSuccess: true, message, ...additionalData }, statusCode);
  }
}

export class ErrorResponse extends HttpException {
  constructor(
    message: string,
    statusCode: number = 400,
    additionalData?: object,
  ) {
    super({ isSuccess: false, message, ...additionalData }, statusCode);
  }
}
