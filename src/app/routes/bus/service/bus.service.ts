import { Injectable, Injector } from '@angular/core';
import { BaseCrudService } from '../../../services/base-crud.service';

@Injectable({
  providedIn: 'root',
})
export class BusService extends BaseCrudService<any> {
  constructor(injector: Injector) {
    super(injector);
    this.path = '/api/buses';
  }

  private buildFormData(data: any): FormData {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === 'images' && Array.isArray(data.images)) {
        data.images.forEach((img: any) => {
          if (img instanceof File) {
            formData.append('images', img);
          }
        });
      } else if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    return formData;
  }

  override create(data: any) {
    const formData = this.buildFormData(data);
    return this.requestService.postFileProgress(this.path, {
      data: formData,
      is_alert_error: true,
      is_loading: true,
    });
  }

  override update(id: string, data: any) {
    const formData = this.buildFormData(data);
    return this.requestService.patchFileProgress(`${this.path}/${id}`, {
      data: formData,
      is_alert_error: true,
      is_loading: true,
    });
  }
}

