import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { map } from 'rxjs/internal/operators/map';
import { User } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  
  userId: number = null;
  private sub: Subscription;
  user: User = null;
  url: string = '';
  console = console;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.userId = params['id'];
      this.userService.findOne(this.userId).pipe(
        map((user: User) => {
          this.user = user;
          // this.url = `http://localhost:3000/api/users/profile-image/${this.user.profileImage}`;
        })
      ).subscribe();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
