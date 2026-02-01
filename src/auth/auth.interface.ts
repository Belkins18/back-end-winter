import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Role } from 'prisma/generated/prisma/enums'

export interface IAuthTokenData {
	id: string
	role: Role
}
// TODO: Codgen generate Models  for graphql from Prisma to graphqL
registerEnumType(Role, {
	name: 'Role'
})

@ObjectType()
export class UserModel {
	@Field()
	id: string

	@Field()
	email: string

	@Field(() => Role)
	role: Role
}

@ObjectType()
export class AuthResponse {
	@Field(() => UserModel)
	user: UserModel

	@Field()
	accessToken: string
}

// import { UserMinAggregateOutputType } from 'prisma/generated/prisma/models'

// export type IAuthTokenData = Required<
// 	Pick<UserMinAggregateOutputType, 'id' | 'role'>
// >
