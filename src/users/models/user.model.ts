import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Role } from 'prisma/generated/enums'

import { BodyMeasurementModel } from './body-measurement.input'
import { ProfileModel } from './profile.model'

@ObjectType()
export class UserModel {
	@Field(() => ID)
	id!: string

	@Field(() => String)
	email!: string

	@Field(() => Role)
	role!: Role

	@Field(() => ProfileModel, { nullable: true })
	profile?: ProfileModel | null

	@Field(() => BodyMeasurementModel, { nullable: true })
	measurements?: BodyMeasurementModel | null

	@Field(() => Date)
	createdAt!: Date

	@Field(() => Date)
	updatedAt!: Date
}
