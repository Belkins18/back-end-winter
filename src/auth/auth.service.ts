import { hash } from 'argon2'

import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { AuthInput } from './auth.input'
import { IAuthTokenData } from './auth.interface'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private configService: ConfigService,
		private jwt: JwtService
	) {}

	private EXPIRE_DAY_REFRESH_TOKEN = 3 // day
	REFRESH_TOKEN_NAME = 'refreshToken'

	async register(input: AuthInput) {
		try {
			const email = input.email.toLowerCase()
			const isUserExist = await this.prisma.user.findFirst({
				where: {
					email: {
						equals: email,
						mode: 'insensitive'
					}
				}
			})

			if (isUserExist) {
				throw new BadRequestException('User email is already exist')
			}
			//  TODO: Move to user.service
			const user = await this.prisma.user.create({
				data: {
					email: email,
					password: await hash(input.password)
				}
			})

			const tokens = this.generateTokens({
				id: user.id,
				role: user.role
			})

			return { user, ...tokens }
		} catch (error) {
			throw new BadRequestException('Register failed: ' + error)
		}
	}

	private generateTokens(data: IAuthTokenData) {
		const accessToken = this.jwt.sign(data, {
			expiresIn: '1h'
		})

		const refreshToken = this.jwt.sign(
			{ id: data.id },
			{
				expiresIn: `${this.EXPIRE_DAY_REFRESH_TOKEN}d`
			}
		)

		return { accessToken, refreshToken }
	}
}
