import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { UsersModule } from 'src/users/users.module'
import { UsersService } from 'src/users/users.service'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

import { CONFIG } from 'src/config'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
	providers: [AuthService, AuthResolver, UsersService],
	imports: [
		PrismaModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: CONFIG.JWT.getConfig
		}),
		UsersModule
	]
})
export class AuthModule {}
