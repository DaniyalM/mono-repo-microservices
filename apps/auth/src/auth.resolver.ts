import { Resolver, Mutation, Context, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CurrentUser } from '@app/common';
import { UserDocument } from './users/models/users.schema';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
// import { GqlAuthGuard } from './guards/gql-auth.guard'; // Assuming you have a custom GqlAuthGuard

@Resolver('Auth')
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Mutation(() => UserDocument) 
    @UseGuards(LocalAuthGuard)
    async login(
        @CurrentUser() user: UserDocument,
        @Context() context: any
    ) {
        const response = context.res; 
        await this.authService.login(user, response);
        return user;
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => UserDocument) 
    async authenticate(@Args('data') data: any) {
        return data.user;
    }
}
