import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Genre } from "../models/genre.model";
import { environment } from "../../../environment";

@Injectable({
  providedIn: 'root'
 })
 export class GenreService {
  private apiUrl = `${environment.apiUrl}/api/v1/genre`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.apiUrl);
  }

  create(genre: Genre): Observable<any> {
    return this.http.post(this.apiUrl, genre);
  }

  getById(id: string): Observable<any> {
     return this.http.get(`${this.apiUrl}/${id}`);
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
 }

  update(id: string, genre: Genre): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, genre);
  }
 }
