import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {

    @ApiProperty({example:'user@gmail.com', description:'Email'})
    @IsString({message: "Must be string"})
    @IsEmail({}, {message: 'Incorrect email address'})
    readonly email:string;
    @ApiProperty({example:'123456', description:'Password'})
    @IsString({message: "Must be string"})
    @Length(4, 16, {message:"Must contain 4 - 16 symbols"})
    readonly password:string;

}