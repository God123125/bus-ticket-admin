import { Injector } from '@angular/core';
import { RequestService } from './request.service';
import { BaseDatatable } from '../models/base-datatable';

export class BaseCrudService<T> {
  protected requestService: RequestService;
  protected path: string = '';
  constructor(injector: Injector) {
    this.requestService = injector.get(RequestService);
  }
  getMany(data: { page: number; limit: number; search?: string; [key: string]: any }) {
    return this.requestService.getJSON<BaseDatatable<T>>(this.path, {
      data,
      is_alert_error: true,
      is_loading: true,
    });
  }
  create(data: T) {
    return this.requestService.postJSON<T>(this.path, {
      data,
      is_alert_error: true,
      is_loading: true,
    });
  }
  update(id: string, data: T) {
    return this.requestService.patchJSON<T>(this.path + '/' + id, {
      data,
      is_alert_error: true,
      is_loading: true,
    });
  }
  delete(id: string) {
    return this.requestService.deleteJSON<T>(this.path + '/' + id, {
      is_alert_error: true,
      is_loading: true,
    });
  }
  getById(_id: string, data?: { [key: string]: any }) {
    return this.requestService.getJSON<T>(this.path + '/' + _id, {
      data,
      is_alert_error: true,
      is_loading: true,
    });
  }
}
