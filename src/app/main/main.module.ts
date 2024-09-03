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
import { EditProductDialogComponent } from './home/edit-product-dialog/edit-product-dialog.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'add-product', component: AddProductComponent },
  { path: 'login', component: LoginComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }
];



@NgModule({
  declarations: [
    HomeComponent,
    AddProductComponent,
    SellProductDialogComponent,
    EditProductDialogComponent,
    LoginComponent
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
