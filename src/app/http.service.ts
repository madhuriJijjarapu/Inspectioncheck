
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface HttpOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
}

export interface Headers {
  [name: string]: string | string[];
}

export interface Params {
  [param: string]: string | readonly string[];
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  get(url: string, headers?: Headers, params?: Params): Observable<any> {
    const httpOptions: HttpOptions = this.addHttpOptions(headers, params);
    return this.httpClient.get(url, httpOptions).pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }
  authorizeUser(url: string, headers?: Headers): Observable<any> {
    const httpOptions: HttpOptions = this.addHttpOptions(headers);
    return this.httpClient.get(url, httpOptions).pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }
  getToken(url: string, body: any, headers?: Headers): Observable<any> {
    const httpOptions: HttpOptions = this.addHttpOptions(headers);
    return this.httpClient.post(url, body, httpOptions).pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }
  post(url: string, body: any, headers?: Headers): Observable<any> {
    const httpOptions: HttpOptions = this.addHttpOptions(headers);
    return this.httpClient.post(url, body, httpOptions).pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }


  put(url: string, body: any, headers?: Headers): Observable<any> {
    const httpOptions: HttpOptions = this.addHttpOptions(headers);
    return this.httpClient.put(url, body, httpOptions).pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }

  delete(url: string, headers?: Headers, params?: Params): Observable<any> {
    const httpOptions: HttpOptions = this.addHttpOptions(headers, params);
    return this.httpClient.delete(url, httpOptions).pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }


  // Add HTTP headers | params
  addHttpOptions(headers?: Headers, params?: Params): HttpOptions {
    const httpOptions: HttpOptions = {};
    if (headers && typeof headers === 'object' && Object.keys(headers) && Object.keys(headers).length) {
      httpOptions.headers = new HttpHeaders(headers);
    }
    if (params && typeof params === 'object' && Object.keys(params) && Object.keys(params).length) {
      httpOptions.params = new HttpParams({
        fromObject: params
      });
    }
    return httpOptions;
  }

}
