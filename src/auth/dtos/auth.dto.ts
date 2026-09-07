import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";


export class RegisterDto {
  @ApiProperty({example:"you@example.com"})
  @IsEmail()
  email!: string;


  @ApiProperty({example:'password@123',minLength:6,description:"password field"})
  @IsString()
  @MinLength(6)
  password!: string;
}



export class LoginDto {

  @ApiProperty({example:"you@example.com"})
  @IsEmail()
  email!: string;


  @ApiProperty({example:"password@123"})
  @IsString()
  password!: string;
}