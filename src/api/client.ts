import type {ApiErrorBody} from './types';

export const API_BASE_URL = 'https://api.example.com/v1';

export class ApiError extends Error {
  status: number;
  code?: string;
  details?: Record<string, string[]>;
  constructor(message: string, status: number, body?: ApiErrorBody) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = body?.code;
    this.details = body?.errors;
  }
}

let accessToken: string | null = null;
export const auth = {
  setToken: (token: string | null) => { accessToken = token; },
  clear: () => { accessToken = null; },
  getToken: () => accessToken,
};

type RequestOptions = Omit<RequestInit, 'body'> & {body?: unknown};
export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set('Accept', 'application/json');
  if (options.body !== undefined) headers.set('Content-Type', 'application/json');
  if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
  const response = await fetch(`${API_BASE_URL}${path}`, {...options, headers, body: options.body === undefined ? undefined : JSON.stringify(options.body)});
  const raw = await response.text();
  let body: unknown = undefined;
  try { body = raw ? JSON.parse(raw) : undefined; } catch { body = raw; }
  if (!response.ok) {
    const errorBody = (body && typeof body === 'object' ? body : {}) as ApiErrorBody;
    throw new ApiError(errorBody.message || `Request failed with status ${response.status}`, response.status, errorBody);
  }
  return body as T;
}

