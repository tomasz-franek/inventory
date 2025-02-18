import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  imports: [TranslatePipe, RouterLink],
  styleUrl: './menu.component.css',
})
export class MenuComponent {}
