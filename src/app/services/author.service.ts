import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environment";
import { Author } from "../models/author.model";

@Injectable({
  providedIn: 'root'
 })
 export class AuthorService {
  private apiUrl = `${environment.apiUrl}/v1/authors`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl);
  }

  create(author: Author): Observable<any> {
    return this.http.post(this.apiUrl, author);
  }

  getById(id: string): Observable<any> {
     return this.http.get(`${this.apiUrl}/${id}`);
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
 }

  update(id: string, author: Author): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, author);
  }
 }
