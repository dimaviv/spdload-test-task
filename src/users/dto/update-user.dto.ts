import {ApiProperty} from "@nestjs/swagger";
import {IsDate, IsOptional, IsString, Length, MaxDate, MinDate} from "class-validator";

export class UpdateUserDto {
    @ApiProperty({example:'cool_nick23', description:'Nickname'})
    @IsOptional()
    @IsString({message: "Must be string"})
    @Length(6, 20, {message:"Must contain 6 - 20 symbols"})
    readonly nickname?:string;
    @ApiProperty({example:'2002-12-18', description:'Date of birth'})
    @IsOptional()
    @IsDate({ message: 'Invalid date format' })
    @MinDate(new Date('1900-01-01'), { message: 'Date of birth is too early' })
    @MaxDate(new Date(), { message: 'Date of birth is in the future' })
    readonly dateOfBirth?: Date;
    @ApiProperty({example:'2002-12-18', description:'Date of birth'})
    @IsOptional()
    @IsDate({ message: 'Invalid date format' })
    @MinDate(new Date('1900-01-01'), { message: 'Date of birth is too early' })
    @MaxDate(new Date(), { message: 'Date of birth is in the future' })
    readonly avatar?: string;
}