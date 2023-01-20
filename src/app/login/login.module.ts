import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';

@NgModule({
  declarations: [
    LoginComponent,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})

export class LoginModule { }
