import { IsEmail, IsStrongPassword } from "class-validator";
import { ObjectType, Field } from '@nestjs/graphql';
@ObjectType()
export class CreateUserDto {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsStrongPassword()
    password: string;


}