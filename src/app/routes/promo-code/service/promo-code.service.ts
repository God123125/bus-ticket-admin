import { Injectable, Injector } from '@angular/core';
import { extend } from 'leaflet';
import { BaseCrudService } from '../../../services/base-crud.service';
import { PromoCode } from '../model/promo-code';

@Injectable({
  providedIn: 'root',
})
export class PromoCodeService extends BaseCrudService<PromoCode> {
  constructor(private injector: Injector) {
    super(injector);
    this.path = '/api/promo-codes';
  }
}
