import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Book } from "../models/book.model";
import { environment } from "../../../environment";

@Injectable({
  providedIn: 'root'
 })
 export class BookService {
  private apiUrl = `${environment.apiUrl}/v1/book`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  create(book: Book): Observable<any> {
    return this.http.post(this.apiUrl, book);
  }

  getById(id: string): Observable<any> {
     return this.http.get(`${this.apiUrl}/${id}`);
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
 }

  update(id: string, book: Book): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, book);
  }
 }
