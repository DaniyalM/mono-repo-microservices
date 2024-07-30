import { Query, Resolver } from "@nestjs/graphql";

@Resolver(() => String)
export class GatewayResolver {
    @Query(() => String)
    async hello() {
        return 'Hello World!'
    }
}