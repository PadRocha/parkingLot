import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { WebcamModule } from 'ngx-webcam';
import { ColorPickerModule } from 'ngx-color-picker';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ShowComponent } from './components/show/show.component';

import { AuthService } from './services/auth.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ShippingService } from './services/shipping.service';
import { ArrivalsService } from './services/arrivals.service';

import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    ShowComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ColorPickerModule,
    routing,
    WebcamModule,
  ],
  providers: [
    appRoutingProviders,
    AuthService,
    AuthGuard,
    ShippingService,
    ArrivalsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
