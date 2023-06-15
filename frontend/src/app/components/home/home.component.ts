import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { BlogEntriesPageable } from 'src/app/models/blog-entry.interface';
import { BlogService } from 'src/app/services/blog-service/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  blogEntries$: Observable<BlogEntriesPageable> = this.blogService.indexAll(1, 10);

  constructor(private blogService: BlogService) {}


  ngOnInit(): void {
    
  }

  onPaginateChange(event: PageEvent) {
    this.blogEntries$ = this.blogService.indexAll(event.pageIndex, event.pageSize);
  }

}
