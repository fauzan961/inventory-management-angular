import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; // Import MatDialog in the main.module.ts file also
import { ApiService } from 'src/app/api.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-sell-product-dialog',
  templateUrl: './sell-product-dialog.component.html',
  styleUrls: ['./sell-product-dialog.component.css']
})
export class SellProductDialogComponent {

  quantitySold: any = null
  product: any = {}
  action: any = null
  placeholderMessage: string = ""

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<SellProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.product = data.product
    this.action = data.action
    this.setPlaceholderMessage(data.action)
  }

  setPlaceholderMessage(action: any) {
    this.placeholderMessage = action == 'add' ? "Add Quantity" : "Quantity Sold"
  }

  confirmDisabled() {
    return this.quantitySold ? this.quantitySold < 1 : true
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.action == "sell") {
      this.apiService.removeProductQuantity({ 'quantity_sold': this.quantitySold }, this.product.id).pipe(
        catchError(error => {
          return of(null);
        })
      ).subscribe(
        (result: any) => {
          this.dialogRef.close("Refresh");
        }
      );
    }
    if (this.action == 'add') {
      this.apiService.addProductQuantity({ 'quantity_added': this.quantitySold }, this.product.id).pipe(
        catchError(error => {
          return of(null);
        })
      ).subscribe(
        (result: any) => {
          this.dialogRef.close("Refresh");
        }
      );
    }

  }

}
