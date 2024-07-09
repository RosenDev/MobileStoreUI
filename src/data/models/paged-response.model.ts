import { StatusCode } from "../api/api-response.model";

export interface PagedResponse<TResult> {
    error: string | null;
    statusCode: StatusCode;
    isSuccess: boolean;
    result: TResult[];
    total: number;
    page: number;
    size: number;
}