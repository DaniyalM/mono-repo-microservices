import { Body, Controller, Get, Post, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../current-user.decorator';
import { UserDocument } from './models/users.schema';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) { }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        try {
            await this.usersService.validateUserDto(createUserDto);
            return this.usersService.createUser(createUserDto);
        } catch (error) {
            return new UnprocessableEntityException(error);
        }

    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getUser(@CurrentUser() user: UserDocument) {
        return user;
    }
}
