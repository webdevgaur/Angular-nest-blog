import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map, tap } from 'rxjs/operators';
import { UserData, UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  dataSource: UserData = null;
  displayColumns: string[] = ['id', 'name', 'username', 'email', 'role'];
  filterValue: string;
  
  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
    this.initDataSource()
  }

  initDataSource() {
    this.userService.findAll(1, 10).pipe( 
      map((userData: UserData) => this.dataSource = userData)
    ).subscribe();
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;

    if (this.filterValue == null) {
      page += 1;
      this.userService.findAll(page, size).pipe(
        map((userData: UserData) => this.dataSource = userData)
      ).subscribe();
    } else {
      this.userService.paginateByName(page, size, this.filterValue).pipe(
        map((userData: UserData) => this.dataSource = userData)
      ).subscribe();
    }
    
  }

  findByName(username: string) {
    this.userService.paginateByName(0, 10, username).pipe(
      map((userData: UserData) => this.dataSource = userData)
    ).subscribe();
  }

}
