import { BlogEntriesPageable } from './../../models/blog-entry.interface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  indexAll(page: number, limit: number): Observable<BlogEntriesPageable> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get<BlogEntriesPageable>('/api/blog-entries', {params}).pipe(
      tap((a) => console.log(a))
    );
  }

}
