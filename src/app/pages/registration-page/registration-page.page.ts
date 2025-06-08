import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/auth.service';
import { LoadingService } from 'src/app/core/loading.service';
import { IonText, IonIcon, IonLabel, IonContent, IonButton, IonInput, IonItem, IonRadio, IonRadioGroup, IonToolbar, IonTitle, IonHeader } from "@ionic/angular/standalone";

@Component({
  selector: 'app-register-page',
  templateUrl: './registration-page.page.html',
  styleUrls: ['./registration-page.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonTitle, IonToolbar, IonRadio, IonItem, IonButton, IonContent, IonLabel, IonIcon, IonText,
    ReactiveFormsModule,
    RouterModule,
    CommonModule, IonInput, IonRadioGroup
  ]
})
export class RegisterPage {
  registerForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/)]],
      surname: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)]], // Min 8 caratteri, almeno una lettera maiuscola e un numero
      confirmPassword: ['', Validators.required],
      role: ['customer'],
      specialization: [''],
    });

    // Forza la validazione iniziale in base al ruolo predefinito
    const specializationCtrl = this.registerForm.get('specialization');
    const roleValue = this.registerForm.get('role')?.value;

    if (roleValue === 'trainer') {
      specializationCtrl?.setValidators([Validators.required]);
    } else {
      specializationCtrl?.clearValidators();
      specializationCtrl?.setValue('');
    }

    specializationCtrl?.updateValueAndValidity();

    // Gestione dinamica in caso cambi il ruolo dopo
    this.registerForm.get('role')?.valueChanges.subscribe(role => {
      if (role === 'trainer') {
        specializationCtrl?.setValidators([Validators.required]);
      } else {
        specializationCtrl?.clearValidators();
        specializationCtrl?.setValue('');
      }
      specializationCtrl?.updateValueAndValidity();
    });
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      Swal.fire({ title: 'Errore', text: 'Compila correttamente tutti i campi.', icon: 'error', heightAuto: false });
      return;
    }

    const values = this.registerForm.value;

    // Controllo pwd
    if (values.password !== values.confirmPassword) {
      Swal.fire({ title: 'Errore', text: 'Le password non coincidono.', icon: 'error', heightAuto: false });
      return;
    }

    await this.loadingService.show('Registrazione in corso...');

    const userData: any = {
      username: values.username.trim(),
      password: values.password,
      email: values.email.trim(),
      full_name: `${values.name.trim()} ${values.surname.trim()}`,
      phone: values.phone.trim(),
      role: values.role
    };

    if (values.role === 'trainer' && values.specialization.trim()) {
      userData.specialization = values.specialization.trim();
    }

    this.auth.register(userData).subscribe({
      next: (res) => {
        this.loadingService.hide();
        if (res.status === 'success') {
          this.auth.login(userData.username, userData.password).subscribe({
            next: (loginRes) => {
              this.loadingService.hide();
              if (loginRes.status === 'success') {
                Swal.fire({
                  title: 'Benvenuto!',
                  text: 'Registrazione e login effettuati con successo!',
                  icon: 'success',
                  heightAuto: false
                }).then(() => {
                  this.router.navigate([userData.role === 'trainer' ? '/trainer/dashboard' : '/customer/dashboard']);
                });
              }
            },
            error: () => {
              this.loadingService.hide();
              this.router.navigate(['/login']);
            }
          });
        } else {
          Swal.fire({ title: 'Errore', text: res.message || 'Registrazione fallita', icon: 'error', heightAuto: false });
        }
      },
      error: (err) => {
        this.loadingService.hide();
        Swal.fire({
          title: 'Errore',
          text: err.error?.message || 'Errore durante la registrazione',
          icon: 'error',
          heightAuto: false
        });
      }
    });
  }
}
