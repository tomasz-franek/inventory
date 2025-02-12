import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {MenuComponent} from './menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StoreModule, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public title = 'frontend';

  constructor() {
  }
}
