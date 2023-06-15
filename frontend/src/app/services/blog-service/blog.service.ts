import { BlogEntriesPageable, BlogEntry } from './../../models/blog-entry.interface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  blogIdForDisplay: number;

  findOne(id: number): Observable<BlogEntry> {
    return this.http.get<BlogEntry>(`/api/blog-entries/${id}`);
  }

  indexAll(page: number, limit: number): Observable<BlogEntriesPageable> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get<BlogEntriesPageable>('/api/blog-entries', {params});
  }

  indexByUser(userId: number, page: number, limit: number): Observable<BlogEntriesPageable> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get<BlogEntriesPageable>(`/api/blog-entries/user/${userId}`, {params});
  }

  post(blogEntry: BlogEntry): Observable<BlogEntry> {
    return this.http.post<BlogEntry>('/api/blog-entries', blogEntry);
  }

  uploadHeaderImage(formData: FormData): Observable<any> {
    return this.http.post<FormData>('/api/blog-entries/image/upload', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }


}
