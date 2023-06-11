import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { BlogService } from '../service/blog.service';
import { Observable } from 'rxjs';
import { BlogEntry } from '../model/blog-entry.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { UserIsAuthorGuard } from '../guards/user-is-author.guard';

export const BLOG_ENTRIES_URL = 'http://localhost:3000/blog-entries';

@Controller('blog-entries')
export class BlogController {

    constructor(
        private blogService: BlogService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() blogEntry: BlogEntry, @Request() req): Observable<BlogEntry> {
        const user = req.user;
        return this.blogService.create(user, blogEntry);
    }

    @Get()
    index(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ) {
        limit = limit > 100 ? 100 : limit;
        return this.blogService.paginateAll({
            page,
            limit,
            route: BLOG_ENTRIES_URL,
        });
    }

    @Get('user/:userId')
    indexByUser(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
        @Param('userId') userId: number,
    ) {
        limit = limit > 100 ? 100 : limit;
        return this.blogService.paginateByUser({
            page,
            limit,
            route: BLOG_ENTRIES_URL,
        }, Number(userId));
    }

    @Get(':id')
    findOne(@Param('id') id: number): Observable<BlogEntry> {
        return this.blogService.findOne(id);
    }

    @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
    @Put(':id')
    updateOne(@Body() blogEntry: BlogEntry, @Param('id') id: number): Observable<BlogEntry> {
        return this.blogService.updateOne(Number(id), blogEntry);
    }

    @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
    @Delete(':id')
    deleteOne(@Param('id') id: number) {
        return this.blogService.deleteOne(id);
    }

}
