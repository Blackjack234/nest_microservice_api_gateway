import { IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: 'Laptop' })
  @IsString()
  item!: string;

  @ApiProperty({ example: 999 })
  @IsNumber()
  @Min(0)
  total!: number;
}