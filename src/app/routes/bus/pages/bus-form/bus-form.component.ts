import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslatePipe } from '@ngx-translate/core';
import { BusService } from '../../service/bus.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-bus-form',
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, TranslatePipe, ReactiveFormsModule],
  templateUrl: './bus-form.component.html',
  styleUrl: './bus-form.component.scss',
})
export class BusFormComponent {
  form = new FormGroup({
    model_name: new FormControl("", [Validators.required]),
    plate_number: new FormControl("", [Validators.required]),
    type: new FormControl(""),
    row: new FormControl(""),
    description: new FormControl("")
  })
  constructor(private busService: BusService,private dialogRef: MatDialogRef<BusFormComponent>) { }
  onSubmit(){
    if(this.form.invalid){
      return;
    }
    if(this.form.valid){
      const payload = this.form.value;
      this.busService.create(payload).subscribe({
        next: (res)=>{
          this.dialogRef.close(true)
        }
      })
    }
  }
}
