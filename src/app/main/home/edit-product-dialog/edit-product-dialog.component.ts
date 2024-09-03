import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; // Import MatDialog in the main.module.ts file also
import { ApiService } from 'src/app/api.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css']
})
export class EditProductDialogComponent {

  constructor(public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService
  ) {
    this.product = data
  }
  product: any = {}

  editProductForm = new FormGroup({
    name: new FormControl({ value: this.data.name, disabled: true }, [Validators.required]),
    quantity: new FormControl(null, [Validators.min(0)]),
    actual_price: new FormControl(null, [Validators.min(0)]),
    offer_price: new FormControl(null, [Validators.min(0)]),
  });

  onSubmit() {
    if (this.editProductForm.valid) {
      this.apiService.editProduct(this.editProductForm.value, this.product.id).pipe(
        catchError(error => {
          return of(null);
        })
      ).subscribe(
        (result: any) => {
          this.dialogRef.close("Refresh")
        }
      );
    }

  }

}
