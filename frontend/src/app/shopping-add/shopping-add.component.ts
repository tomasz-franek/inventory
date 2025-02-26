import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Product, Unit } from '../api';
import { Store } from '@ngrx/store';
import { getUnitsList, UnitState } from '../state/unit/unit.selectors';
import { retrieveUnitList } from '../state/unit/unit.action';
import { TagInputModule } from 'ngx-chips';
import { StorageState } from '../state/storage/storage.selectors';
import { navigateToShoppingList } from '../state/shopping/shopping.action';

@Component({
  selector: 'app-shopping-add',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslatePipe,
    AsyncPipe,
    TagInputModule,
  ],
  templateUrl: './shopping-add.component.html',
  styleUrl: './shopping-add.component.css',
})
export class ShoppingAddComponent implements OnInit {
  private _shoppingForm: FormGroup;
  protected unitsCheckbox: boolean = false;
  private _storeUnit$: Store<UnitState> = inject(Store);
  private _storeStorage$: Store<StorageState> = inject(Store);
  public units$!: Observable<Unit[]>;
  placeholder: string;
  public tags: Product[] = [];
  public products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private translate: TranslateService
  ) {
    this.placeholder = this.translate.instant('ADD_TAG');
    this._storeUnit$.dispatch(retrieveUnitList());

    this.units$ = this._storeUnit$.select(getUnitsList);
    this._shoppingForm = this.formBuilder.group({
      items: [0, Validators.required],
      count: 0,
      idUnit: 0,
      tags: ['', Validators.required],
    });
  }

  get shoppingForm() {
    return this._shoppingForm;
  }

  navigateToShopping() {
    this._storeStorage$.dispatch(navigateToShoppingList());
  }

  saveStorage() {}

  ngOnInit(): void {
    this._storeUnit$.dispatch(retrieveUnitList());
    this.units$ = this._storeUnit$.select(getUnitsList);
  }
}
