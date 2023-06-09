import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { BlogEntry } from 'src/app/models/blog-entry.interface';
import { BlogService } from 'src/app/services/blog-service/blog.service';
import { WINDOW } from 'src/app/window-token';

@Component({
  selector: 'app-view-blog-entry',
  templateUrl: './view-blog-entry.component.html',
  styleUrls: ['./view-blog-entry.component.scss']
})
export class ViewBlogEntryComponent implements OnInit {

  // blogEntry$: Observable<BlogEntry> = this.activatedRoute.params.pipe(
  //   switchMap((params: Params) => {
  //     const 
  //   })
  // );

  blogIdForDisplay: number;
  
  blogEntry$: Observable<BlogEntry>;

  origin = this.window.location.origin;

  constructor(
    private blogService: BlogService,
    @Inject(WINDOW) private window: Window,
  ) { }
  
  ngOnInit(): void {
    if(localStorage.getItem('blogIdForDisplay')) {
      this.blogIdForDisplay = Number(localStorage.getItem('blogIdForDisplay'));
    } else {
      localStorage.setItem('blogIdForDisplay', String(this.blogIdForDisplay));
    }
    this.blogEntry$ = this.blogService.findOne(this.blogIdForDisplay);
  }

}
