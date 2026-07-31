import { Component, Input } from '@angular/core';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-form-helper',
  imports: [MatLabel],
  templateUrl: './form-helper.component.html',
  styleUrl: './form-helper.component.scss',
})
export class FormHelperComponent {
  @Input() label: string = '';
}
