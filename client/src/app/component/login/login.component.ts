import { Component, OnInit } from '@angular/core';
import { ValidateService } from "../../services/validate.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  constructor(
    private validateService: ValidateService, 
    private flashMessage: FlashMessagesService,
    private authservice: AuthService,
    private router: Router) { }

  ngOnInit() {
  }
  OnLoginSubmit() {
    const user = {
      username:this.username,
      password:this.password
    }
    if(!this.validateService.validateLogin(user)) {
      this.flashMessage.show("fill all field",{cssClass : 'alert-danger', timeout:"3000"});
      return false;
    }
    this.authservice.loginUser(user).subscribe(data => {
      if(data.success) {
        this.authservice.storeUserdata(data.token,data.user);
        this.flashMessage.show("Login successfully",{cssClass : 'alert-success', timeout:"3000"});
        this.router.navigate(['/profile']);
      } else {
        this.flashMessage.show("Login error!!!",{cssClass : 'alert-danger', timeout:"3000"});
        this.router.navigate(['/login']);
      }
    })
  }

}
