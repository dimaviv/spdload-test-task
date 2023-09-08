import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class BanUserDto {
    @ApiProperty({example:'1', description:'Which user'})
    @IsNumber({},{message:"Must be a number"})
    readonly userId: number;

    @ApiProperty({example:'For spamming', description:'Reason of ban'})
    @IsString({message: "Must be string"})
    readonly banReason: string;

}