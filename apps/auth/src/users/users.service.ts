import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from "bcryptjs";
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {

    constructor(
        private readonly usersRepository: UsersRepository
    ) { }
    async validateUserDto(createUserDto: CreateUserDto) {
        try {
            await this.usersRepository.findOne({ email: createUserDto.email });

        } catch (error) {
            return;
        }

        return new UnprocessableEntityException("Email Already Exists..");

    }
    async createUser(createUserDto: CreateUserDto) {
        return this.usersRepository.create({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10)
        })
    }

    async validateUser(email: string, password: string) {
        const user = await this.usersRepository.findOne({ email });
        const passwordIsValid = await bcrypt.compare(password, user.password);
        this.usersRepository.logger.error(passwordIsValid);
        console.log("userPassword", passwordIsValid);
        if (!passwordIsValid) {
            throw new UnauthorizedException('Credentials are not valid.');
        }
        this.usersRepository.logger.error(user);
        return user;
    }


    async findAll() {
        return this.usersRepository.find({});
    }

    async findUser(getUserDto: GetUserDto) {
        return this.usersRepository.findOne(getUserDto);
    }



}
