import { NgModule } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { RecipeService } from '../recipes/recipe.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorSerivce } from '../auth/auth-interceptor.service';

@NgModule({
  providers: [
    ShoppingListService, 
    RecipeService, 
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorSerivce, 
      multi: true
    }
  ]
})
export class CoreModule {}