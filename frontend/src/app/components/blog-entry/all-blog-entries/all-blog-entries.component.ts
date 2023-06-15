import { Observable } from 'rxjs/internal/Observable';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlogEntriesPageable } from 'src/app/models/blog-entry.interface';
import { BlogService } from 'src/app/services/blog-service/blog.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-blog-entries',
  templateUrl: './all-blog-entries.component.html',
  styleUrls: ['./all-blog-entries.component.scss']
})
export class AllBlogEntriesComponent implements OnInit {

  @Input() blogEntries: BlogEntriesPageable;
  @Output() paginate: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  pageEvent: PageEvent;
  // console = console;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  setBlogIdForDisplay(id: number, slug: string): void {
    localStorage.setItem('blogIdForDisplay', String(id));
    this.router.navigateByUrl(`/blog-entries/${slug}`);
  }

  onPaginateChange(event: PageEvent) {
    event.pageIndex += 1;
    this.paginate.emit(event);
  }

}
