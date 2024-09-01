import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { SellProductDialogComponent } from './sell-product-dialog/sell-product-dialog.component';
import { EditProductDialogComponent } from './edit-product-dialog/edit-product-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router,
    public dialog: MatDialog
  ) { }

  products: any = []
  currentPage: number = 1
  pageSize: number = 5

  addProduct() {
    this.router.navigate(['/add-product']);
  }

  editProduct(product: any) {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '350px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.apiService.getProducts().subscribe(
          (result: any) => {
            this.products = result
          }
        )
      }
    });
  }

  updateProductQty(product: any, action: any) {
    const dialogRef = this.dialog.open(SellProductDialogComponent, {
      width: '300px',
      data: { 'product': product, 'action': action }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.apiService.getProducts().subscribe(
          (result: any) => {
            this.products = result
          }
        )
      }
    });
  }

  deleteProduct(product_id: number) {
    this.apiService.deleteProduct(product_id).subscribe(
      (result: any) => {
        this.apiService.getProducts().subscribe(
          (result: any) => {
            this.products = result
            this.currentPage = 1
          }
        )
      }
    )
  }


  ngOnInit() {
    this.apiService.getProducts().subscribe(
      (result: any) => {
        this.products = result
      }
    )
  }

}
