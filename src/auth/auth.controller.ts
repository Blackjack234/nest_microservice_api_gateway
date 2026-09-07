import { Body, Controller, Inject, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto, RegisterDto } from './dtos/auth.dto';
import { firstValueFrom } from 'rxjs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags("Auth")
@Controller('auth')
@UsePipes(new ValidationPipe({whitelist:true}))
export class AuthController {
   constructor(
    @Inject('ORDERS_SERVICE') private orderClient:ClientProxy,
    @Inject('AUTH_SERVICE') private authClient:ClientProxy
   ){

   }

   @Post('register')
   @ApiOperation({summary:"Register a new user."})
   @ApiResponse({status:201,description:"User created successfully."})
   @ApiResponse({status:409,description:"Email already registered."})
   async register (@Body() dto : RegisterDto){
     return firstValueFrom(this.authClient.send({cmd:'register'},dto))
   }

   @Post('login')
   @ApiOperation({ summary: 'Log in and receive a JWT' })
   @ApiResponse({ status: 200, description: 'Returns access_token' })
   @ApiResponse({ status: 401, description: 'Invalid credentials' })
   async login(@Body() dto :LoginDto){
       return firstValueFrom(this.authClient.send({cmd:'login'},dto))
   }
}
