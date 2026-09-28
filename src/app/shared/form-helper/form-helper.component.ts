import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  constructor() {}
  ngOnInit(): void {
    // if (this.control) {
    //   this.control.statusChanges.subscribe(() => {
    //     if (this.control!.errors) {
    //       if (this.control!.parent) {
    //         const controlName = Object.keys((this.control!.parent as FormGroup).controls)
    //           .map((key) =>
    //             (this.control!.parent as FormGroup).controls[key] == this.control ? key : '',
    //           )
    //           .find((v) => v);
    //         console.log(controlName, this.control!.errors, this.control!.value);
    //       } else {
    //         console.log(this.control);
    //       }
    //     }
    //   });
    // }
    // if (this.requiredChange && this.control) {
    //   this.control.statusChanges.subscribe(() => {
    //     this.controlChange++;
    //   });
    // }
  }
}
