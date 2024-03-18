import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { addClientDTO } from '../models/DTOs/addClient.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = `${environment.apiUrl}/Client`;

  constructor(private http: HttpClient) { }

  addClient(client: addClientDTO): Observable<any> {
    return this.http.post(this.baseUrl, client);
  }

  getAllClients(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}
