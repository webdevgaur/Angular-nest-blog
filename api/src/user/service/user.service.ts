import { Injectable } from '@nestjs/common';
import { UserEntity } from '../models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User, UserRole } from '../models/user.interface';
import { Observable, catchError, from, map, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/auth/service/auth.service';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private authService: AuthService,
    ) {}

    create(user: User): Observable<User> {
        // return from(this.userRepository.save(user));
        return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
                const newUser = new UserEntity();
                newUser.name = user.name;
                newUser.username = user.username;
                newUser.email = user.email;
                newUser.password = passwordHash;
                newUser.role = UserRole.USER;

                return from(this.userRepository.save(newUser)).pipe(
                    map((user: User) => {
                        const {password, ...result} = user;
                        return result;
                    }),
                    catchError(err => throwError(() => err))
                )
            })
        );
    }

    findOne(id: number): Observable<User> {
        return from(this.userRepository.findOne({
            where: {
                id: id,
            },
            relations: {
                blogEntries: true,
            }
        })).pipe(
            map((user: User) => {
                const {password, ...result} = user;
                return result;
            })
        )
    }

    findAll(): Observable<User[]> {
        return from(this.userRepository.find()).pipe(
            map((users: User[]) => {
                users.forEach(user => delete user.password);
                return users;
            })
        );
    }

    paginate(options: IPaginationOptions): Observable<Pagination<User>> {
        return from(paginate<User>(this.userRepository, options)).pipe(
            map((usersPageable: Pagination<User>) => {
                usersPageable.items.forEach(user => delete user.password);
                return usersPageable;
            })
        )
    }

    paginateFilterByUsername(options: IPaginationOptions, user: User): Observable<Pagination<User>> {
        return from(this.userRepository.findAndCount({
            skip: +options.page * +options.limit || 0,
            take: +options.limit || 10,
            order: {id: "ASC"},
            select: ['id', 'name', 'username', 'email', 'role'],
            // relations: ['blogEntries'],
            where: [{
                username: Like(`%${user.username}%`)
            }]
        })).pipe(
            map(([users, totalUsers]) => {

                const userPageable: Pagination<User> = {
                    items: users,
                    links: {
                        first: options.route + `?limit=${options.limit}`,
                        previous: options.route + ``,
                        next: options.route + `?limit=${options.limit}&page=${+options.page + 1}`,
                        last: options.route + `?limit=${options.limit}&page=${Math.ceil(totalUsers / +options.limit)}`,
                    },
                    meta: {
                        itemCount: users.length,
                        itemsPerPage: +options.limit,
                        currentPage: +options.page,
                        totalItems: totalUsers,
                        totalPages: Math.ceil(totalUsers / +options.limit),
                    }
                };

                return userPageable;
            })
        )
    }

    deleteOne(id: number): Observable<any> {
        return from(this.userRepository.delete(id));
    }

    updateOne(id: number, user: User): Observable<any> {
        delete user.email;
        delete user.password;
        delete user.role;
        return from(this.userRepository.update(id, user)).pipe(
            switchMap(() => this.findOne(id))
        );
    }

    updateRoleOfUser(id: number, user: User): Observable<any> {
        return from(this.userRepository.update(id, user));
    }

    login(user: User): Observable<string> {
        return this.validateUser(user.email, user.password).pipe(
            switchMap((user: User) => {
                if(user) {
                    return this.authService.generateJWT(user).pipe(map((jwt: string) => jwt));
                } else {
                    return 'Wrong Credentials';
                }
            })
        )
    }

    validateUser(email: string, password: string): Observable<User> {
        return from(this.userRepository.findOne({
            where: {
                email: email
            },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                password: true,
                role: true,
                profileImage: true
            }
        })).pipe(
            switchMap((user: User) => this.authService.comparePasswords(password, user.password).pipe(
                map((match: boolean) => {
                    if(match){
                        const {password, ...result} = user;
                        return result;
                    } else {
                        throw Error;
                    }
                })
            )  )
        )
    }

    findByMail(email: string): Observable<User> {
        return from(this.userRepository.findOneBy({email: email}));
    }

    


}
