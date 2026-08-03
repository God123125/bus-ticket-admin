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
}

