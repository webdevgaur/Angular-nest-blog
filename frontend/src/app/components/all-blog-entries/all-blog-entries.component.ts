import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit } from '@angular/core';
import { BlogEntriesPageable } from 'src/app/models/blog-entry.interface';
import { BlogService } from 'src/app/services/blog-service/blog.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-all-blog-entries',
  templateUrl: './all-blog-entries.component.html',
  styleUrls: ['./all-blog-entries.component.scss']
})
export class AllBlogEntriesComponent implements OnInit {

  dataSource: Observable<BlogEntriesPageable> = this.blogService.indexAll(1, 10);

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {

  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let limit = event.pageSize;

    page += 1;

    this.dataSource = this.blogService.indexAll(page, limit);

  }

}
