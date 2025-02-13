import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {Category} from '../api';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {saveCategory} from '../state/category/category.action';

@Component({
  selector: 'app-category-add',
  imports: [
    CommonModule,
    TranslatePipe,
    FormsModule,
  ],
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.css'
})
export class CategoryAddComponent implements OnInit {
  protected category: Category = {
    name: '',
    active: 1,
    optLock: 0
  };

  constructor(private router: Router,
              private store: Store) {
  }

  backToCategories() {
    this.router.navigate(['categories']);
  }

  save() {
    this.store.dispatch(saveCategory({category:this.category}));
    this.router.navigate(['categories']);
  }

  ngOnInit(): void {
  }
}
