import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

import { CONFIG } from 'src/config'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
	providers: [AuthService, AuthResolver],
	imports: [
		PrismaModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: CONFIG.JWT.getConfig
		})
	]
})
export class AuthModule {}
