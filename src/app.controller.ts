import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dtos/create.order.dto';

interface data {
  item:string,
  total:number
}

@ApiTags("Orders")
@Controller('orders')
export class AppController {
  constructor(private readonly appService: AppService,@Inject('ORDERS_SERVICE') private client:ClientProxy) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get(':id')
   @ApiOperation({ summary: 'Get an order by ID' })
  @ApiResponse({ status: 200, description: 'Order found' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async getOrder(@Param('id') id:string ){
     return firstValueFrom(this.client.send({cmd:'get_order'},id))
  }


  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async createOrder(@Body() data:CreateOrderDto){
   return firstValueFrom(this.client.send({cmd:'create_order'},data))
  }
}
