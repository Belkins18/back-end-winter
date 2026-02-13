import { Request, Response } from 'express'

import { ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigService } from '@nestjs/config'
import { UTILS } from 'src/utils'

interface GraphQLContext {
	req: Request
	res: Response
}

export const getConfig = (
	configService: ConfigService
): ApolloDriverConfig => ({
	autoSchemaFile: true,
	sortSchema: true,
	playground: UTILS.isDev(configService),
	context: ({ req, res }: GraphQLContext) => ({ req, res })
})
