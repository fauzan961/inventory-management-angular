import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private apiService: ApiService,
    private router: Router, private cookieService: CookieService
  ) { }

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required, Validators.min(1)]),
    actual_price: new FormControl('', [Validators.required, Validators.min(0)]),
    offer_price: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  formDisabled() {
    const name = this.productForm.value.name?.trim();
    return this.productForm.invalid || !name;
  }

  ngOnInit() {
    const mrToken = this.cookieService.get('mr-token')
    if (!mrToken) {
      this.router.navigate(['/login'])
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.apiService.createProduct(this.productForm.value).pipe(
        catchError(error => {
          console.log(error)
          return of(null);
        })
      ).subscribe(
        (result: any) => {
          this.router.navigate(['/home'])
        }
      );
    }
  }
}
