import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user.interface';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { File } from '../../../models/blog-entry.interface'
import { WINDOW } from 'src/app/window-token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.scss']
})
export class UpdateUserProfileComponent implements OnInit {

  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef;

  form: FormGroup;
  userId: number;

  file: File = {
    data: null,
    progress: 0,
    inProgress: false,
  }

  isLoading: boolean = false;

  origin = this.window.location.origin;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private userService: UserService,
    @Inject(WINDOW) private window: Window,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [{value: null, disabled: true}, [Validators.required]],
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      profileImage: [null],
    });
    this.authService.getUserId().pipe(
      switchMap((id: number) => this.userService.findOne(id).pipe(
        tap((user: User) => {
          this.form.patchValue({
            id: user.id,
            name: user.name,
            username: user.username,
            profileImage: user.profileImage,
          });
          this.userId = user.id;
        })
      ))
    ).subscribe();
  }

  uploadFile() {
    const fileInput = this.fileUpload.nativeElement;
    fileInput.click();
    fileInput.onchange = () => {
      this.file = {
        data: fileInput.files[0],
        progress: 0,
        inProgress: false,
      }
      this.fileUpload.nativeElement.value = '';
      this.upload();
    }
  }

  upload() {
    const formData = new FormData();
    formData.append('file', this.file.data);
    this.file.inProgress = true;
    this.userService.uploadProfileImage(formData).pipe(
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
          profileImage: event.body.profileImage,
        })
      }
    });
  }

  update() {
    this.isLoading = true;
    localStorage.getItem('userId');
    this.userService.updateOne(this.form.getRawValue()).subscribe(() => this.isLoading = false);
    this.router.navigate([`../users/${this.userId}`]);

  }

}
