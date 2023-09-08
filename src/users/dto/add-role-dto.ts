import {IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class AddRoleDto {
    @ApiProperty({example:'ADMIN', description:'What role'})
    @IsString({message: "Must be a string"})
    readonly value: string;

    @ApiProperty({example:'1', description:'Which user'})
    @IsNumber({},{message:"Must be a number"})
    readonly userId: number;
}