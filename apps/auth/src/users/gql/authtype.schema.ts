import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class AuthType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}
