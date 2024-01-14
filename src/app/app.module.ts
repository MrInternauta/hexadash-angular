import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import {
  registerLocaleData,
  PathLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import en from '@angular/common/locales/en';

import { AppRoutingModule } from './app-routing.module';
import { TemplateModule } from './shared/template/template.module';
import { SharedModule } from './shared/shared.module';

import { NgChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FullCalendarModule } from '@fullcalendar/angular';

import { AppComponent } from './app.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { ThemeConstantService } from './shared/services/theme-constant.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CoreModule } from './core';
import { AuthModule } from './authentication/auth.module';
import { PermissionsEffects } from './authentication/state/permissions.effects';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, CommonLayoutComponent, FullLayoutComponent],
  imports: [
    AuthModule,
    CoreModule,
    //EffectsModule.forRoot([PermissionsEffects]), //ExercisesEffects, CartEffects,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TemplateModule,
    SharedModule,
    NzBreadCrumbModule,
    NzSpinModule,
    NgChartsModule,
    NgApexchartsModule,
    FullCalendarModule,
    AngularSvgIconModule.forRoot(),
    // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: en_US,
    },
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    ThemeConstantService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
