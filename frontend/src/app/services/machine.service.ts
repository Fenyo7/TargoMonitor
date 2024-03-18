import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { addMachineDTO } from '../models/DTOs/addMachine.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MachineService {
  private baseUrl = `${environment.apiUrl}/Machine`;

  constructor(private http: HttpClient) { }

  addMachine(machine: addMachineDTO): Observable<any> {
    return this.http.post(this.baseUrl, machine);
  }

  getAllMachines(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getMachinesByClientId(clientId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/ByClient/${clientId}`);
  }
}
