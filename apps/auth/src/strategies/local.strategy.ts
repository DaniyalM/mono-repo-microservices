import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UsersService } from "../users/users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly usersService: UsersService
    ) {
        super(
            { usernameField: 'email' }
        )
    }


    async validate(username: string, password: string) {
        try {
            return await this.usersService.validateUser(username, password)

        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }

}