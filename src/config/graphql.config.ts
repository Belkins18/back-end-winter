import { Request, Response } from 'express'

import { ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigService } from '@nestjs/config'

interface GraphQLContext {
	req: Request
	res: Response
}

export const getGraphQLConfig = (
	configService: ConfigService
): ApolloDriverConfig => ({
	autoSchemaFile: true,
	sortSchema: true,
	playground: configService.get<string>('MODE') === 'development',
	context: ({ req, res }: GraphQLContext) => ({ req, res })
})
