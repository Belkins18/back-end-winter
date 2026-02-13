import { Field, ObjectType } from '@nestjs/graphql'
import { UserModel } from 'src/users/models/user.model'

export type TAuthTokenData = Pick<UserModel, 'id' | 'role'>

export type TCurrentUser = Omit<UserModel, 'password'>

export type TRequestWithUser = {
	user?: TCurrentUser
}

@ObjectType()
export class AuthResponse {
	@Field(() => UserModel)
	user: UserModel

	@Field()
	accessToken: string
}
