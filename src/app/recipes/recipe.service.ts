import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'Chicken Burger', 
            'Tasty chicken burger.', 
            'https://www.seriouseats.com/recipes/images/2015/07/20150702-sous-vide-hamburger-anova-primary-1500x1125.jpg',
            [
                new Ingredient('Bread', 2),
                new Ingredient('Chicken', 1),
                new Ingredient('Greens', 3)
            ]
            ),
        new Recipe(
            'French Fries', 
            'Get one free on two.', 
            'https://www.seriouseats.com/2018/04/20180309-french-fries-vicky-wasik-15-1500x1125.jpg',
            [
                new Ingredient('Potatos', 3),
                new Ingredient('Oil', 1),
                new Ingredient('Salt', 0.5),
            ]
            )
      ];

      constructor( private slService: ShoppingListService ){}

      getRecipes(){
          return this.recipes.slice();
      }

      getRecipe(id: number){
          return this.recipes[id];
      }

      addIngredientsToShoppingList( ingredients: Ingredient[] ){
        this.slService.addIngredients(ingredients);
      }

}