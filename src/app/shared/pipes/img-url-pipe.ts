import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgUrl',
})
export class ImgUrlPipe implements PipeTransform {
  defaultImg = '/assets/imgs/user-profile.svg';
  transform(value?: string | null, defaultUrl?: string): string {
    if (typeof value === 'string' && value.trim() !== '') {
      return value;
    } else {
      return defaultUrl || this.defaultImg;
    }
  }
}
