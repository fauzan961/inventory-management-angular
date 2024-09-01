import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  baseUrl = 'http://127.0.0.1:8000/api/inventory/products/'
  headers = {
    'Content-Type': 'application/json',
    Authorization: `Token c91dd16e3daf1be6b5164c30e966f0a2c594cf99`
  }

  getProducts() {
    return this.httpClient.get(this.baseUrl, { headers: this.headers })
  }

  createProduct(body: object) {
    return this.httpClient.post(this.baseUrl, body, { headers: this.headers })
  }

  editProduct(body: object, product_id: any) {
    body = Object.fromEntries(
      Object.entries(body)
        .filter(([_, value]) => value !== null)
    );
    return this.httpClient.patch(this.baseUrl + `${product_id}/`, body, { headers: this.headers })
  }


  deleteProduct(product_id: number) {
    return this.httpClient.delete(this.baseUrl + `${product_id}/`, { headers: this.headers })
  }

  removeProductQuantity(body: object, product_id: any) {
    return this.httpClient.patch(`${this.baseUrl}remove-quantity/${product_id}/`, body, { headers: this.headers })
  }

  addProductQuantity(body: object, product_id: any) {
    return this.httpClient.patch(`${this.baseUrl}add-quantity/${product_id}/`, body, { headers: this.headers })
  }
}
