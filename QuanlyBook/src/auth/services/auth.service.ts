import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../users/services/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRole } from '../../users/entity/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async register(username: string, password: string, role: UserRole = UserRole.USER) {
        return this.usersService.create({ username, password, role });
    }

    async login(username: string, password: string) {
        const user = await this.usersService.findByUsername(username);
        if(!user) throw new UnauthorizedException('User not found');

        const valid = await bcrypt.compare(password, user.password);
        if(!valid) throw new UnauthorizedException('Invalid password'); 

        const payload = {sub: user.id, username: user.username, role: user.role};
        const token = this.jwtService.sign(payload);

        return { access_token: token};
    }
}
