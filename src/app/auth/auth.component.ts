import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService, AuthResponseData } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent {
  constructor(private authService: AuthService, private router: Router) {}
	isLoginMode = true;
	isLoading  = false;
	error: string = null;

  onChangeMode() {
    this.isLoginMode = !this.isLoginMode;
  }

	onDismiss(){
		this.error = null;
	}

  onSubmit(authData: NgForm) {
    if (!authData.valid) {
      return;
		}
		const email = authData.value.email;
		const password = authData.value.email;
		this.isLoading = true;

		let authObs: Observable<AuthResponseData>;
		
		if(this.isLoginMode){
			authObs = this.authService.login( email, password);
		}else{
			authObs = this.authService.signup(email, password);
		}

		authObs.subscribe(
			(resData) => {
				this.isLoading = false;
				this.router.navigate(['./recipe']);
			},
			(errorRes) => {
				this.isLoading = false;
				this.error = errorRes;
			}
		);

    authData.reset();
  }
}
