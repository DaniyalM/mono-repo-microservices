import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      // server: {
      //   context: authContext
      // },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            // {
            //   name: 'user',
            //   url: 'http://localhost:3001/graphql'
            // },
            // {
            //   name: 'auth',
            //   url: 'http://localhost:3002/graphql'
            // }
          ]
        }),
        buildService({ url }) {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
              request.http.headers.set('user', context.user ? JSON.stringify(context.user) : null)
            }
          })
        }
      }

    })
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule { }
