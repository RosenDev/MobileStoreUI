export enum StatusCode {
  Ok = 200,
  Created = 201,
  NoContent = 204,
  InternalServerError = 500,
}

export interface ApiResponseBase{
  statusCode: StatusCode;
  error?: string;
  isSuccess: boolean;
}

export interface ApiResponse<TResult> extends ApiResponseBase{
  result: TResult;
}

