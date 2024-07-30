import { IsNotEmpty, IsString } from "class-validator";
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class GetUserDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    _id: string;
}