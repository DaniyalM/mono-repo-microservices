import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GraphQLModule } from '@nestjs/graphql';
import { LoggerModule } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import * as Joi from 'joi';
import { GatewayResolver } from './gateway.resolver';


@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().required(),
      })
    }),
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      // server: {
      //   context: authContext
      // },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: 'authentication',
              url: 'http://auth:3001/graphql'
            }
          ]
        }),
        buildService({ url }) {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
              // request.http.headers.set('user', context.user ? JSON.stringify(context.user) : null)
            }
          })
        }
      }

    })
  ],
  providers: [GatewayService],
})
export class GatewayModule { }
