import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) {}
}
