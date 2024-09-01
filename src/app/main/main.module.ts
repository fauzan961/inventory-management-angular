import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms'; // Imported to use ngModel directives in any components.
import { MatIconModule } from '@angular/material/icon';

import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddProductComponent } from './add-product/add-product.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { ReactiveFormsModule } from '@angular/forms';
import { SellProductDialogComponent } from './home/sell-product-dialog/sell-product-dialog.component';
import { EditProductDialogComponent } from './home/edit-product-dialog/edit-product-dialog.component'; // Import FormsModule here



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'add-product', component: AddProductComponent }
];



@NgModule({
  declarations: [
    HomeComponent,
    AddProductComponent,
    SellProductDialogComponent,
    EditProductDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    NgxPaginationModule,
    MatIconModule
  ],
  exports: [RouterModule],
})
export class MainModule { }
