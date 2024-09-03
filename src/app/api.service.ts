import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) { }

  // baseUrl = 'http://127.0.0.1:8000/api/inventory/products/' // For dev
  baseUrl = 'http://16.171.52.31/api/inventory/products/' // For prod

  getProducts() {
    return this.httpClient.get(this.baseUrl, { headers: this.getAuthHeaders() })
  }

  createProduct(body: object) {
    return this.httpClient.post(this.baseUrl, body, { headers: this.getAuthHeaders() })
  }

  editProduct(body: object, product_id: any) {
    body = Object.fromEntries(
      Object.entries(body)
        .filter(([_, value]) => value !== null)
    );
    return this.httpClient.patch(this.baseUrl + `${product_id}/`, body, { headers: this.getAuthHeaders() })
  }


  deleteProduct(product_id: number) {
    return this.httpClient.delete(this.baseUrl + `${product_id}/`, { headers: this.getAuthHeaders() })
  }

  removeProductQuantity(body: object, product_id: any) {
    return this.httpClient.patch(`${this.baseUrl}remove-quantity/${product_id}/`, body, { headers: this.getAuthHeaders() })
  }

  addProductQuantity(body: object, product_id: any) {
    return this.httpClient.patch(`${this.baseUrl}add-quantity/${product_id}/`, body, { headers: this.getAuthHeaders() })
  }

  // Preparing our header
  getAuthHeaders() {
    const token = this.cookieService.get('mr-token') // Getting value of our token from cookies

    // Storing our token using the HttpHeaders
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    })
  }
}
