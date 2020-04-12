import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class RecipeService {
    recipeChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'Chicken Burger', 
    //         'Tasty chicken burger.', 
    //         'https://www.seriouseats.com/recipes/images/2015/07/20150702-sous-vide-hamburger-anova-primary-1500x1125.jpg',
    //         [
    //             new Ingredient('Bread', 2),
    //             new Ingredient('Chicken', 1),
    //             new Ingredient('Greens', 3)
    //         ]
    //         ),
    //     new Recipe(
    //         'French Fries', 
    //         'Get one free on two.', 
    //         'https://www.seriouseats.com/2018/04/20180309-french-fries-vicky-wasik-15-1500x1125.jpg',
    //         [
    //             new Ingredient('Potatos', 3),
    //             new Ingredient('Oil', 1),
    //             new Ingredient('Salt', 5),
    //         ]
    //         )
    //   ];
    private recipes: Recipe[] = [];

      constructor( private slService: ShoppingListService ){}

      getRecipes(){
          return this.recipes.slice();
      }

      getRecipe(id: number){
          return this.recipes[id];
      }

      setRecipe(recipes: Recipe[]){
          this.recipes = recipes;
          this.recipeChanged.next(this.recipes.slice());
      }

      addIngredientsToShoppingList( ingredients: Ingredient[] ){
        this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number){
          this.recipes.splice(index, 1);
          this.recipeChanged.next(this.recipes.slice());
      }

}