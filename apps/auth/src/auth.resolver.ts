import { Resolver, Mutation, Context, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CurrentUser } from '@app/common';
import { UserDocument } from './users/models/users.schema';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthType } from './users/gql/authtype.schema';

@Resolver(() => AuthType)
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Query(() => AuthType)
    async getAllAuths(): Promise<AuthType> {
        return {
            id: "`123456789`",
            name: 'Running'
        };
    }

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

    // @UseGuards(JwtAuthGuard)
    // @Mutation(() => UserDocument)
    // async authenticate(@Args('data') data: any) {
    //     return data.user;
    // }


}
