import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountUpModule } from 'ngx-countup';
import { NgxScrollTopModule } from 'ngx-scrolltop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorInterceptor } from './Guards/auth-interceptor.interceptor';
import { AdminHomepageComponent } from './components/admin-homepage/admin-homepage.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { WelcomepageComponent } from './components/welcomepage/welcomepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainNavbarComponent } from './components/main-navbar/main-navbar.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeHomepageComponent } from './components/employee-homepage/employee-homepage.component';
@NgModule({
    declarations: [
        AppComponent,
        AdminHomepageComponent,
        LoginComponent,
        NavbarComponent,
        SignupComponent,
        UnauthorizedComponent,
        WelcomepageComponent,
        AboutusComponent,
        FooterComponent,
        MainNavbarComponent,
        ContactusComponent,
        EmployeeHomepageComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CarouselModule,
        FormsModule,
        ReactiveFormsModule,
        NgxScrollTopModule,
        CountUpModule,
        HttpClientModule,
        NgbModule,
        NgbModalModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true }
    ],

    bootstrap: [AppComponent]
})
export class AppModule { }