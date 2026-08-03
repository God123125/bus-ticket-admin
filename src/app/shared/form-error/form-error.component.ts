import { KeyValuePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  inject,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { TranslatePipe } from '@ngx-translate/core';
import { Subscription, merge } from 'rxjs';

@Component({
  selector: 'app-form-error',
  imports: [KeyValuePipe, MatError, TranslatePipe],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorComponent implements OnChanges, OnDestroy {
  @Input() control!: AbstractControl;

  private cdr = inject(ChangeDetectorRef);
  private sub?: Subscription;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['control'] && this.control) {
      this.sub?.unsubscribe();

      const observables = [];
      if (this.control.events) {
        observables.push(this.control.events);
      }
      if (this.control.statusChanges) {
        observables.push(this.control.statusChanges);
      }
      if (this.control.valueChanges) {
        observables.push(this.control.valueChanges);
      }

      if (observables.length > 0) {
        this.sub = merge(...observables).subscribe(() => {
          this.cdr.markForCheck();
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
