import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'

import type { IGqlContext } from 'src/app.interface'

import { AuthInput } from './auth.input'
import { AuthResponse } from './auth.interface'
import { AuthService } from './auth.service'

@Resolver()
export class AuthResolver {
	constructor(private authService: AuthService) {}

	// TODO: Captcha
	@Mutation(() => AuthResponse)
	async login(@Args('data') input: AuthInput, @Context() { res }: IGqlContext) {
		const { refreshToken, ...response } = await this.authService.login(input)

		this.authService.toggleRefreshTokenCookie(res, refreshToken)

		return response
	}

	// TODO: Captcha
	@Mutation(() => AuthResponse)
	async register(
		@Args('data') input: AuthInput,
		@Context() { res }: IGqlContext
	) {
		const { refreshToken, ...response } = await this.authService.register(input)

		this.authService.toggleRefreshTokenCookie(res, refreshToken)

		return response
	}

	/* new tokens */
	/* logout */
	/* roles guard, auth guars*/
}
