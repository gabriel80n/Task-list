/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, IsString, Length, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @Length(5, 20)
  @IsString()
  name: string;
  
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string; 

  @IsNotEmpty()
  @IsEmail()
  email: string;
  
}
