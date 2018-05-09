import { Component, OnInit } from '@angular/core';
import { ValidateService } from "../../services/validate.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  email: String;
  username:String;
  password:String;
  constructor(private validateService: ValidateService, 
              private flashMessage: FlashMessagesService,
              private authservice: AuthService,
              private router: Router) { }

  ngOnInit() {
  }
  OnRegisterSubmit() {
    const user = {
      name:this.name,
      email:this.email,
      username:this.username,
      password:this.password
    }
    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show("fill all field",{cssClass : 'alert-danger', timeout:"3000"});
      return false;
    }
    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show("Enter valid email",{cssClass: 'alert-danger',timeout:"3000"});
      return false;
    }
    this.authservice.registerUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessage.show("Registered successfully",{cssClass : 'alert-success', timeout:"3000"});
        this.router.navigate(['/profile']);
      } else {
        this.flashMessage.show("Registeration error!!!",{cssClass : 'alert-danger', timeout:"3000"});
      }
    })
  }

}
