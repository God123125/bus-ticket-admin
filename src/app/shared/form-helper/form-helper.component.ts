import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatLabel } from '@angular/material/form-field';
import { FormErrorComponent } from '../form-error/form-error.component';

@Component({
  selector: 'app-form-helper',
  imports: [MatLabel, FormErrorComponent],
  templateUrl: './form-helper.component.html',
  styleUrl: './form-helper.component.scss',
})
export class FormHelperComponent {
  @Input() label: string = '';
  @Input() control!: FormControl;
}
