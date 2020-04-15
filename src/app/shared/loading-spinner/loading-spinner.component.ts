import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `<div class="sk-chase">
              <div class="sk-chase-dot"></div>
              <div class="sk-chase-dot"></div>
              <div class="sk-chase-dot"></div>
              <div class="sk-chase-dot"></div>
              <div class="sk-chase-dot"></div>
              <div class="sk-chase-dot"></div>
            </div>`,
styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {

}