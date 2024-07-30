import { AbstractDocument } from "@app/common";
import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })
@ObjectType()
export class UserDocument extends AbstractDocument {

    @Prop()
    @Field()
    email: string;
    
    @Prop()
    @Field()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
