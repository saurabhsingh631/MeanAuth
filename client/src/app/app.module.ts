import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import  {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProfileComponent } from './component/profile/profile.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from  '@angular/forms';
import {ValidateService} from "./services/validate.service";
import {FlashMessagesModule} from "angular2-flash-messages";
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "./services/auth.service";
import {AuthGuard, AuthGuardOne} from "./guards/auth.guard";
import { ChatComponent } from './component/chat/chat.component';
import {ChatService} from './services/chat.service'
const appRoot : Routes = [
  {path: "", component : HomeComponent},
  {path: "dashboard", component : DashboardComponent, canActivate:[AuthGuard]},
  {path: "profile", component : ProfileComponent,canActivate:[AuthGuard]},
  {path: "chat", component : ChatComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    RouterModule.forRoot(appRoot)
  ],
  providers: [ValidateService, FlashMessagesService, AuthService, AuthGuard, AuthGuardOne, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
