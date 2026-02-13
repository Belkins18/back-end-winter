import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'

import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

import './user.enum'

@Module({
	providers: [UsersResolver, UsersService],
	imports: [PrismaModule],
	exports: [UsersService]
})
export class UsersModule {}
