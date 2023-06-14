import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { File } from 'src/app/models/blog-entry.interface';
import { BlogService } from 'src/app/services/blog-service/blog.service';

@Component({
  selector: 'app-create-blog-entry',
  templateUrl: './create-blog-entry.component.html',
  styleUrls: ['./create-blog-entry.component.scss']
})
export class CreateBlogEntryComponent implements OnInit {
  

  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef;

  form: FormGroup;

  file: File = {
    data: null,
    progress: 0,
    inProgress: false,
  }

  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [{value: null, disabled: true}],
      title: [null, [Validators.required]],
      slug: [{value: null, disabled: true}],
      description: [null, [Validators.required]],
      body: [null, [Validators.required]],
      headerImage: [null],
    });
  }

  post() {
    this.blogService.post(this.form.getRawValue()).pipe(
      tap(() => this.router.navigate(['../'])),
    ).subscribe();
  }

  onClick() {
    const fileInput = this.fileUpload.nativeElement;
    fileInput.click();
    fileInput.onchange = () => {
      this.file = {
        data: fileInput.files[0],
        progress: 0,
        inProgress: false,
      }
      this.fileUpload.nativeElement.value = '';
      this.uploadFile();
    }
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.file.data);
    this.file.inProgress = true;
    this.blogService.uploadHeaderImage(formData).pipe(
      map((event: HttpEvent<any>) => {
        switch(event.type) {
          case HttpEventType.UploadProgress:
            this.file.progress = Math.round(event.loaded * 100/ event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.file.inProgress = false;
        return of(error.message);
      })
    ).subscribe((event: any) => {
      if (typeof(event) === 'object') {
        this.form.patchValue({
          headerImage: event.body.filename,
        })
      }
    });
  }

}
