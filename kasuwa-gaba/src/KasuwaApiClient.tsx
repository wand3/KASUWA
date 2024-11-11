import Config from "./config";

const BASE_API_URL = Config.baseURL;

type Query = Record<string, string>;
type Headers = Record<string, string>;

type Options<TREQ> = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url?: string;
  query?: Query;
  headers?: Headers;
  body?: TREQ;
}
  
type Response<TRES> = {
  ok: boolean;
  status: number;
  body: TRES | null;
  errors: {json: any} | null;
}

type Token = {
  access_token: string | null;
}

export default class KasuwaApiClient {
  base_url = BASE_API_URL + '/api';
  onError: (error: any) => void;

  constructor(onError: (error: any) => void) {
    this.onError = onError;
  }

  async request<TREQ, TRES>(options: Options<TREQ>): Promise<Response<TRES>> {
    let response = await this.requestInternal<TREQ, TRES>(options);
    if (response.status === 401 && options.url !== '/tokens') {
      const refreshResponse = await this.put<Token, Token>('/tokens', {
        access_token: localStorage.getItem('token'),
      });
      if (refreshResponse.ok && refreshResponse.body) {
        localStorage.setItem('token', refreshResponse.body.access_token || '');
        response = await this.requestInternal<TREQ, TRES>(options);
        console.log(response.body)
      }
    }
    if (response.status >= 500 && this.onError) {
      this.onError(response);
    }
    return response;
  }

  async requestInternal<TREQ, TRES>(options: Options<TREQ>): Promise<Response<TRES>> {
    let query = new URLSearchParams(options.query || {}).toString();
    if (query !== '') {
      query = '?' + query;
    }

    let response;
    try {
      response = await fetch(this.base_url + options.url + query, {
        method: options.method,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': 'http://127.0.0.1:5000',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          ...options.headers,
        },
        credentials: options.url === '/tokens' ? 'include' : 'omit',
        body: options.body ? JSON.stringify(options.body) : null,
      });
    }
    catch (error: any) {
      response = {
        ok: false,
        status: 500,
        json: async () => { return {
          code: 500,
          message: 'The server is unresponsive',
          description: error.toString(),
        }; }
      };
    }

    const payload = response.status !== 204 ? await response.json() : null;
    return {
      ok: response.ok,
      status: response.status,
      body: response.status < 400 ? payload : null,
      errors: response.status >= 400 ? payload.errors : null,
    };
  }

  async get<TRES>(url: string, query?: Query, options?: Options<null>): Promise<Response<TRES>> {
    return this.request<null, TRES>({method: 'GET', url, query, ...options});
  }

  async post<TREQ, TRES>(url: string, body?: TREQ, options?: Options<TREQ>): Promise<Response<TRES>> {
    return this.request<TREQ, TRES>({method: 'POST', url, body, ...options});
  }

  async put<TREQ, TRES>(url: string, body?: TREQ, options?: Options<TREQ>): Promise<Response<TRES>> {
    return this.request<TREQ, TRES>({method: 'PUT', url, body, ...options});
  }

  async delete(url: string, options?: Options<null>) {
    return this.request<null, null>({method: 'DELETE', url, ...options});
  }

  async login(email: string, password: string): Promise<'ok' | 'fail' | 'error'> {
    const response = await this.post<null, Token>('/tokens', null, {
      headers: {
        Authorization:  'Basic ' + btoa(email + ":" + password),
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5000'

      }
    });
    if (!response.ok || !response.body) {
      return response.status === 401 ? 'fail' : 'error';
    }
    localStorage.setItem('token', response.body.access_token || '');
    return 'ok';
  }

  async logout() {
    await this.delete('/tokens');
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    return localStorage.getItem('token') !== null;
  }
}