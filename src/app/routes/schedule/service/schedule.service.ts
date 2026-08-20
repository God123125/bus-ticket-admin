import { Injectable, Injector } from '@angular/core';
import { BaseCrudService } from '../../../services/base-crud.service';
import { Schedule } from '../model/schedule';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService extends BaseCrudService<Schedule> {
  constructor(injector: Injector) {
    super(injector);
    this.path = '/api/schedules';
  }

  override create(data: any) {
    return this.requestService.postFile<Schedule>(this.path, {
      data,
      is_alert_error: true,
      is_loading: true,
    });
  }

  override update(id: string, data: any) {
    return this.requestService.patchFile<Schedule>(this.path + '/' + id, {
      data,
      is_alert_error: true,
      is_loading: true,
    });
  }
}
