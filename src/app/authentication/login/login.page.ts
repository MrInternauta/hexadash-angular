import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
// import  socialIcons  from './../../../../assets/data/pages/social-items.json';
import { ComponentBase } from '../../core/base/component.base';
import { AppState } from '../../core/state/app.reducer';
import { ModalInfoService } from '../../core/services/modal.service';
import { AuthService } from '../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends ComponentBase implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isLoading = false;
  error = false;
  passwordVisible = false;
  validateForm!: UntypedFormGroup;
  // socialMediaButtons = socialIcons.socialMediaButtons;
  constructor(
    private _authService: AuthService,
    private _store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router,
    private modalInfoService: ModalInfoService
  ) {
    super();
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: ['admin', [Validators.required]],
      password: ['admin', [Validators.required, Validators.minLength(5)]],
      remember: [true],
    });
    return;
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this._authService
        .login(this.validateForm.value, this.validateForm.value.remember)
        .subscribe(
          (res) => {
            if (!res) {
              this.modalInfoService.error('Something is wrong', '');
              this.validateForm.hasError('Something is wrong');
              return;
            }
            console.log(res);
            this.modalInfoService.success('Login successfully', '');
            // window.location.href = '/dashboard/demo-one';
          },
          (login) => {
            this.modalInfoService.error('Something is wrong', login || '');
            this.validateForm.hasError('Something is wrong');
          }
        );
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
