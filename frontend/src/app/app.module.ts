import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import { HomeComponent } from './components/home/home.component';
import { AllBlogEntriesComponent } from './components/blog-entry/all-blog-entries/all-blog-entries.component';
import { MarkdownModule } from 'ngx-markdown';
import { UsersComponent } from './components/user/users/users.component';
import { UpdateUserProfileComponent } from './components/user/update-user-profile/update-user-profile.component';
import { CreateBlogEntryComponent } from './components/blog-entry/create-blog-entry/create-blog-entry.component';
import { ViewBlogEntryComponent } from './components/blog-entry/view-blog-entry/view-blog-entry.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { WINDOW, WINDOW_PROVIDERS } from './window-token';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    UpdateUserProfileComponent,
    UserProfileComponent,
    HomeComponent,
    AllBlogEntriesComponent,
    CreateBlogEntryComponent,
    ViewBlogEntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    MarkdownModule.forRoot(),
    MatProgressSpinnerModule,
  ],
  providers: [
    WINDOW_PROVIDERS,
    JwtHelperService,
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
