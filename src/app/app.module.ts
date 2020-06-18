import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { JwtModule } from '@auth0/angular-jwt';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

import { LoginComponent } from './componentes/login/login.component';
import { SignupComponent } from './componentes/signup/signup.component';
import { ToolbarComponent } from './componentes/toolbar/toolbar.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { IngresoComponent } from './paginas/ingreso/ingreso.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { PrincipalComponent } from './paginas/principal/principal.component';

export function tokenGetter() {
  return localStorage.getItem('usuario');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ToolbarComponent,
    InicioComponent,
    IngresoComponent,
    RegistroComponent,
    PrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    RecaptchaModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter
      }
    }),
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule
  ],
  providers: [
    DatePipe,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6LeFXAAVAAAAANB0sVyw-fmPazJ-XteypoQr2YA7' } as RecaptchaSettings
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
