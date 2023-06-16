import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/models/user.interface';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateJWT(user: User): Observable<string>;
    hashPassword(password: string): Observable<string>;
    comparePasswords(newPassword: string, passwordHash: string): Observable<any | boolean>;
}
