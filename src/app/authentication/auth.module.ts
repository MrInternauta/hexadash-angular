import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './services';
import { AdminGuardGuard, CoreModule, LoginGuardGuard } from '../core';
import { StoreModule } from '@ngrx/store';
import { AppStoreModule } from '../core/state/store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    AppStoreModule,
  ],
  providers: [AuthService, LoginGuardGuard, AdminGuardGuard],
})
export class AuthModule {}
