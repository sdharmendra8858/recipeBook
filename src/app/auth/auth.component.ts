import { 
	Component, 
	ComponentFactoryResolver, 
	ViewChild, 
	OnDestroy, 
	ViewContainerRef} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService, AuthResponseData } from "./auth.service";
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: "app-auth",
  templateUrl: "auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnDestroy{
  constructor(
		private authService: AuthService, 
		private router: Router, 
		private viewContainerRef: ViewContainerRef,
		private componentFactoryResolver: ComponentFactoryResolver) {}
	isLoginMode = true;
	isLoading  = false;
	error: string = null;
	private closeSub: Subscription;

  @ViewChild(PlaceholderDirective, { static: true }) alertHost: PlaceholderDirective;

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
		const password = authData.value.password;
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
				this.showErrorAlert(errorRes);
				this.error = errorRes;
			}
		);

    authData.reset();
	}
	
	onHandleError(){
		this.error = null;
	}

	private showErrorAlert(message: string){
		const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
		const hostViewContainerRef = this.alertHost.viewContainerRef;
		hostViewContainerRef.clear();

		const componentRef =  hostViewContainerRef.createComponent(alertCmpFactory);
		componentRef.instance.message = message;

		this.closeSub = componentRef.instance.close.subscribe(() => {
			this.closeSub.unsubscribe();
			hostViewContainerRef.clear();
		})
	}

	ngOnDestroy() {
		if(this.closeSub){
			this.closeSub.unsubscribe();
		}
  }
}
