import { ConfigService } from '@nestjs/config'

export const isDev = (configService: ConfigService) => {
	return configService.get<string>('MODE') === 'development'
}
