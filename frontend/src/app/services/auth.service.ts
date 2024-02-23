import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { registerDTO } from '../models/DTOs/register.dto';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { loginDTO } from '../models/DTOs/login.dto';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/User`;

  constructor(private http: HttpClient) { }

  register(user: registerDTO): Observable<any> {
    const url = `${this.baseUrl}/register`;
    return this.http.post(url, user);
  }

  login(user: loginDTO): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post<AuthResponse>(url, user).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('email', user.email);
        if (this.getIdFromToken(response.token) != '') {
          localStorage.setItem('id', this.getIdFromToken(response.token));
        }
      })
    );
  }

  getIdFromToken(token: string): string {
    try {
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        return '';
      }

      const decodedPayload = atob(tokenParts[1]);
      const payloadObj = JSON.parse(decodedPayload);
      const userId = payloadObj.nameid;

      return userId;
    } catch (error) {
      console.error('Error decoding token:', error);
      return '';
    }
  }
}
