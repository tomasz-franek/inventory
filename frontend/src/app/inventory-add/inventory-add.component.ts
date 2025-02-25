import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Inventory } from '../api';
import { ActivatedRoute } from '@angular/router';
import {
  loadInventoryAction,
  navigateToInventoryList,
  saveInventory,
} from '../state/inventory/inventory.action';
import {
  editInventorySelector,
  newInventorySelector,
} from '../state/inventory/inventory.selectors';

@Component({
  selector: 'app-inventory-add',
  imports: [TranslatePipe, FormsModule, ReactiveFormsModule],
  templateUrl: './inventory-add.component.html',
  styleUrl: './inventory-add.component.css',
})
export class InventoryAddComponent implements OnInit {
  private _store$: Store = inject(Store);
  protected inventory$: Inventory = { active: false, name: '', optLock: 0 };
  protected _inventoryForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this._inventoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      active: [1, Validators.required],
      id: [],
      optLock: [],
    });
  }

  ngOnInit(): void {
    const id = this.routerId;
    if (id === null) {
      this._store$.select(newInventorySelector).subscribe((inventory) => {
        this.inventory$ = inventory;
        this._inventoryForm = this.formBuilder.group({
          id: undefined,
          name: ['', Validators.required],
          description: ['', Validators.required],
          active: [true, Validators.required],
          optLock: [0],
        });
      });
    } else {
      this._store$.dispatch(loadInventoryAction({ id: Number(id) }));
      this._store$.select(editInventorySelector).subscribe((inventory) => {
        this.inventory$ = inventory;
        this._inventoryForm = this.formBuilder.group({
          id: this.inventory$.idInventory,
          name: [this.inventory$.name, Validators.required],
          description: [this.inventory$.description, Validators.required],
          active: [this.inventory$.active, Validators.required],
          optLock: [this.inventory$.optLock, Validators.required],
        });
      });
    }
  }

  get inventoryForm(): FormGroup {
    return this._inventoryForm;
  }

  backToInventories() {
    this._store$.dispatch(navigateToInventoryList());
  }

  save() {
    const updatedInventory: Inventory = {
      ...this.inventory$,
      name: this._inventoryForm.value.name,
      active: this._inventoryForm.value.active,
      description: this._inventoryForm.value.description,
    };
    if (this._inventoryForm.value.id !== undefined) {
      this._store$.dispatch(saveInventory({ inventory: updatedInventory }));
    }
  }

  get routerId(): string | null {
    return this.route.snapshot.paramMap.get('id');
  }
}
