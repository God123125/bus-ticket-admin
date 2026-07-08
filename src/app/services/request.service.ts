import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from './loading.service';
import { LocalStorageService } from './local-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../environments/environment';
import { catchError, filter, finalize, map, Observable, throwError } from 'rxjs';
import { LocalStorageEnum } from '../models/enum/localstorage.enum';
import { RequestParam } from '../models/request-param';
import { APIResponseCodeEnum } from '../models/enum/api-response-code.enum';
@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService,
    private localStorageService: LocalStorageService,
    private translateService: TranslateService,
  ) {}
  getUrl(path: string, queryParams?: { [key: string]: any }) {
    let arr = path.split('/').filter((v) => v);
    arr.unshift(environment.api_url);
    const urlPath = arr.join('/');
    if (queryParams) {
      this.clean(queryParams, true);
      const url = new URL(urlPath);
      for (const [key, value] of Object.entries(queryParams)) {
        url.searchParams.append(key, value);
      }
      return url.toString();
    }

    return urlPath;
  }
  get<T>(path: string, request: RequestParam = {}) {
    const url = this.getUrl(path);
    this.clean(request.data, true);
    if (request.is_loading) {
      this.loadingService.setLoading(true);
    }
    return this.http.get<T>(url, { params: request.data }).pipe(
      catchError((err) => this.handleHttpError(err, request.is_alert_error)),
      finalize(() => this.finalizeRequest(request.is_loading)),
    );
  }

  getBlob(path: string, request: RequestParam = {}) {
    const url = this.getUrl(path);
    this.clean(request.data, true);
    if (request.is_loading) {
      this.loadingService.setLoading(true);
    }
    return this.http.get(url, { params: request.data, responseType: 'blob' }).pipe(
      catchError((err) => this.handleHttpError(err, request.is_alert_error)),
      finalize(() => this.finalizeRequest(request.is_loading)),
    );
  }

  getJSON<T>(path: string, request: RequestParam = {}) {
    const url = this.getUrl(path);
    this.clean(request.data, true);
    if (request.is_loading) {
      this.loadingService.setLoading(true);
    }

    const headers = this.getAuthHeader();
    headers.append('Content-Type', 'application/json');
    return this.http.get<T>(url, { params: request.data, headers }).pipe(
      catchError((err) => this.handleHttpError(err, request.is_alert_error)),
      finalize(() => this.finalizeRequest(request.is_loading)),
    );
  }

  post<T>(path: string, request: RequestParam) {
    const url = this.getUrl(path);
    this.clean(request.data);
    if (request.is_loading) {
      this.loadingService.setLoading(true);
    }
    const headers = this.getAuthHeader();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    request.data = this.toFormData(request.data);
    return this.http.post<T>(url, request.data, { headers }).pipe(
      catchError((err) => this.handleHttpError(err, request.is_alert_error)),
      finalize(() => this.finalizeRequest(request.is_loading)),
    );
  }

  postJSON<T>(path: string, request: RequestParam) {
    const url = this.getUrl(path);
    this.clean(request.data);
    if (request.is_loading) {
      this.loadingService.setLoading(true);
    }
    const headers = this.getAuthHeader();
    headers.append('Content-Type', 'application/json');
    return this.http.post<T>(url, request.data, { headers }).pipe(
      catchError((err) => this.handleHttpError(err, request.is_alert_error)),
      finalize(() => this.finalizeRequest(request.is_loading)),
    );
  }

  postFile<T>(path: string, request: RequestParam): Observable<T> {
    const url = this.getUrl(path);
    this.clean(request.data);
    if (request.is_loading) {
      this.loadingService.setLoading(true);
    }
    const headers = this.getAuthHeader();
    headers.append('Content-Type', 'multipart/form-data;boundary=abc');
    request.data = this.toFormData(request.data);
    return this.http.post<T>(url, request.data, { headers }).pipe(
      catchError((err) => this.handleHttpError(err, request.is_alert_error)),
      finalize(() => this.finalizeRequest(request.is_loading)),
    );
  }

  postFileProgress<T>(path: string, request: RequestParam): Observable<number | T> {
    const url = this.getUrl(path);
    this.clean(request.data);
    if (request.is_loading) {
      this.loadingService.setLoading(true);
    }
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data;boundary=abc');
    request.data = this.toFormData(request.data);
    return this.http
      .post<T>(url, request.data, {
        headers,
        reportProgress: true,
        responseType: 'json',
        observe: 'events',
      })
      .pipe(
        filter(
          (res) => res.type == HttpEventType.UploadProgress || res.type == HttpEventType.Response,
        ),
        map((res) => {
          if (res.type == HttpEventType.UploadProgress) {
            return Math.round((res.loaded / (res.total || 0)) * 100);
          } else {
            return (res as HttpResponse<T>).body || ({} as T);
          }
        }),
        catchError((err) => this.handleHttpError(err, request.is_alert_error)),
        finalize(() => this.finalizeRequest(request.is_loading)),
      );
  }

  patchFileProgress<T>(path: string, request: RequestParam): Observable<number | T> {
    const url = this.getUrl(path);
    this.clean(request.data);
    if (request.is_loading) {
      this.loadingService.setLoading(true);
    }
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data;boundary=abc');
    request.data = this.toFormData(request.data);
    return this.http
      .patch<T>(url, request.data, {
        headers,
        reportProgress: true,
        responseType: 'json',
        observe: 'events',
      })
      .pipe(
        filter(
          (res) => res.type == HttpEventType.UploadProgress || res.type == HttpEventType.Response,
        ),
        map((res) => {
          if (res.type == HttpEventType.UploadProgress) {
            return Math.round((res.loaded / (res.total || 0)) * 100);
          } else {
            return (res as HttpResponse<T>).body || ({} as T);
          }
        }),
        catchError((err) => this.handleHttpError(err, request.is_alert_error)),
        finalize(() => this.finalizeRequest(request.is_loading)),
      );
  }

  patchJSON<T>(path: string, request: RequestParam) {
    const url = this.getUrl(path);
    this.clean(request.data);
    if (request.is_loading) {
      this.loadingService.setLoading(true);
    }
    const headers = this.getAuthHeader();
    headers.append('Content-Type', 'application/json');
    return this.http.patch<T>(url, request.data, { headers }).pipe(
      catchError((err) => this.handleHttpError(err, request.is_alert_error)),
      finalize(() => this.finalizeRequest(request.is_loading)),
    );
  }

  deleteJSON<T>(path: string, request: RequestParam = {}) {
    const url = this.getUrl(path);
    this.clean(request.data);
    if (request.is_loading) {
      this.loadingService.setLoading(true);
    }
    const headers = this.getAuthHeader();
    headers.append('Content-Type', 'application/json');
    return this.http.delete<T>(url, { headers, params: request.data }).pipe(
      catchError((err) => this.handleHttpError(err, request.is_alert_error)),
      finalize(() => this.finalizeRequest(request.is_loading)),
    );
  }
  multiDelete<T>(path: string, request: RequestParam) {
    const url = this.getUrl(path);
    this.clean(request.data);
    if (request.is_loading) {
      this.loadingService.setLoading(true);
    }
    const headers = this.getAuthHeader();
    headers.append('Content-Type', 'application/json');
    return this.http.delete<T>(url, { headers, body: request.data }).pipe(
      catchError((err) => this.handleHttpError(err, request.is_alert_error)),
      finalize(() => this.finalizeRequest(request.is_loading)),
    );
  }

  private clean(obj: any, isCleanQuery = false) {
    for (const propName in obj) {
      if (obj[propName] === undefined || (isCleanQuery && obj[propName] === null)) {
        delete obj[propName];
      } else if (obj[propName] instanceof Date) {
        (obj[propName] as Date).setMilliseconds(0);
        obj[propName] = (obj[propName] as Date).toISOString();
      } else if (typeof obj[propName] == 'object' && !(obj[propName] instanceof File)) {
        this.clean(obj[propName]);
      }
    }
  }

  private handleHttpError(error: HttpErrorResponse, is_alert_error?: boolean) {
    if (is_alert_error) {
      if (error.status === APIResponseCodeEnum.user_error) {
        const msg = this.translateService.instant('invalid_input_data');
        this.snackBar.open(msg, 'OK', {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: ['custom-snack-bar-content', 'error'],
        });
      } else if (error.status === APIResponseCodeEnum.server_error) {
        this.snackBar.open(error.error || error.statusText, 'OK', {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: ['custom-snack-bar-content', 'error'],
        });
      } else if (error.status === APIResponseCodeEnum.gate_way_time_out) {
        this.snackBar.open('Gateway Time out', 'OK', {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: ['custom-snack-bar-content', 'error'],
        });
      }
    }
    return throwError(() => error.error);
  }

  private finalizeRequest(is_loading?: boolean) {
    if (is_loading) {
      this.loadingService.setLoading(false);
    }
  }
  private getAuthHeader(): HttpHeaders {
    const token = this.localStorageService.get(LocalStorageEnum.Token);
    if (token) {
      return new HttpHeaders({
        Authorization: 'Bearer ' + token,
      });
    }
    return new HttpHeaders();
  }
  private toFormData(formValue: any) {
    const formData = new FormData();
    //to append files to last of form data
    const fileKeys = [];
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      if (typeof value.name == 'string') {
        fileKeys.push(key);
        continue;
      }
      formData.append(key, value);
    }
    for (const key of fileKeys) {
      formData.append(key, formValue[key]);
    }
    return formData;
  }
}
