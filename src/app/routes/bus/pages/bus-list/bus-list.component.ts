import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { BusFormComponent } from '../bus-form/bus-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-bus-list',
  imports: [MatFormFieldModule, MatButtonModule, TranslatePipe, MatIconModule, MatInputModule],
  templateUrl: './bus-list.component.html',
  styleUrl: './bus-list.component.scss',
})
export class BusListComponent {
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  onAddBus() {
    const dialogRef = this.dialog.open(BusFormComponent, {
      width: '500px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.snackBar.open('Bus created successfully!', 'OK', { duration: 3000 });
        }
      },
    });
  }
}
