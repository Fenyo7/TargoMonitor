import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { addContactDTO } from '../models/DTOs/addContact.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = `${environment.apiUrl}/Contact`;

  constructor(private http: HttpClient) { }

  addContact(contact: addContactDTO): Observable<any> {
    return this.http.post(this.baseUrl, contact);
  }

  getContactsOfClient(clientId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${clientId}`);
  }
}
