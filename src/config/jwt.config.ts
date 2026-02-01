import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'

export const getConfig = (coinfigService: ConfigService): JwtModuleOptions => {
	return {
		secret: coinfigService.get<string>('JWT_SECRET')
	}
}
