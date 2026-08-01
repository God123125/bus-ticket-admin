import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Directive({
  selector: '[appConfirmMessage]',
})
export class ConfirmMessageDirective {
  @Input() message: string = '';
  @Input() title: string = '';
  @Input() imgUrl: string = '/assets/imgs/confirm.svg';
  @Output() confirmEmitter = new EventEmitter<void>();
  constructor(private dialog: MatDialog) {}
  @HostListener('click') confirm() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        message: this.message,
        title: this.title,
        imgUrl: this.imgUrl,
      },
    });
    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.confirmEmitter.emit();
      }
    });
  }
}
