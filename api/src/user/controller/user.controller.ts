import { Observable, catchError, map, of } from 'rxjs';
import { Body, Controller, Get, Post, Param, Delete, Put, UseGuards, DefaultValuePipe, ParseIntPipe, Query } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User, UserRole } from '../models/user.interface';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }

    @Post()
    create(@Body() user: User): Observable<User | Object> {
        return this.userService.create(user).pipe(
            map((user: User) => user),
            catchError(err => of({ error: err.message }))
        );
    }

    @Post('login')
    login(@Body() user: User): Observable<Object> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return { access_token: jwt }
            })
        )
    }

    @Get(':id')
    findOne(@Param() params: any): Observable<User> {
        return this.userService.findOne(params.id);
    }

    @Get()
    index( @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
           @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
           @Query('username') username: string,
           ): Observable<Pagination<User>>{
            
                limit = limit > 100 ? 100 : limit;

                if(username === null || username === undefined) {
                    return this.userService.paginate({ page: Number(page), limit: Number(limit), route: 'http://localhost:3000/api/users'});
                } else {
                    return this.userService.paginateFilterByUsername({ page: Number(page), limit: Number(limit), route: 'http://localhost:3000/api/users'}, {username});
                }

                
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string): Observable<any> {
        return this.userService.deleteOne(Number(id));
    }

    @Put(':id')
    updateOne(@Param('id') id: string, @Body() user: User): Observable<any> {
        return this.userService.updateOne(Number(id), user);
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id/role')
    updateRoleOfUser(@Param('id') id: string, @Body() user: User): Observable<User> {
        return this.userService.updateRoleOfUser(Number(id), user);
    }


}
