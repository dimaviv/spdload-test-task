import {Body, Controller, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-users.dto";
import {AuthService} from "./auth.service";



@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @ApiOperation({summary: 'Signing in (returns jwt token)'})
    @ApiResponse({status:200})
    @ApiResponse({status:401})
    @Post('/login')
    login(@Body() userDto: CreateUserDto){
        return this.authService.login(userDto)
    }

    @ApiOperation({summary: 'Signing up (returns jwt token)'})
    @ApiResponse({status:200})
    @ApiResponse({status:400})
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto){
        return this.authService.registration(userDto)
    }
}
