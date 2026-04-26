import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-booking',
  imports: [ReactiveFormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.scss',
})
export class Booking {
  bookingForm!: FormGroup;
  submitted = false;

  readonly anlaesse: string[] = ['Konzert', 'Gottesdienst', 'Sonstiges'];

  /** Heutiges Datum als ISO-String für das min-Attribut des Date-Inputs */
  readonly minDate: string = new Date().toISOString().split('T')[0];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.bookingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      anlass: ['', Validators.required],
      datum: ['', Validators.required],
      nachricht: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  isInvalid(field: string): boolean {
    const control = this.bookingForm.get(field);
    return !!control && control.invalid && (control.touched || this.submitted);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }
    this.http.post('/sendBooking.php', this.bookingForm.value)
    .subscribe({
      next: () => {
        console.log('Anfrage erfolgreich gesendet.');
        this.bookingForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        console.error('Fehler beim Senden:', err);
      }
    });
  }
}
