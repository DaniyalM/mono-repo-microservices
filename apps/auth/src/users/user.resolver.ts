import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '@app/common';
import { UserDocument } from './models/users.schema';
import { UnprocessableEntityException } from '@nestjs/common';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  // @Mutation(() => UserDocument) 
  // async createUser(@Args('createUserInput') createUserDto: CreateUserDto) {
  //   try {
  //     await this.usersService.validateUserDto(createUserDto);
  //     return this.usersService.createUser(createUserDto);
  //   } catch (error) {
  //     throw new UnprocessableEntityException(error);
  //   }
  // }

  @Query(() => UserDocument)
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: UserDocument) {
    return user;
  }
}
