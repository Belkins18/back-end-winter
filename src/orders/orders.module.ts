import { Module } from '@nestjs/common'
import { OrdersResolver } from './orders.resolver'
import { OrdersService } from './orders.service'

import './order.enum'

@Module({
	providers: [OrdersResolver, OrdersService]
})
export class OrdersModule {}
