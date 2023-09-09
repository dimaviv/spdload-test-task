import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Redirect, Req, UploadedFile,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {UsersService} from "./users.service";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {User} from "./users.model";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddRoleDto} from "./dto/add-role-dto";
import {BanUserDto} from "./dto/ban-user.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpdateUserDto } from "./dto/update-user.dto";


@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {

    constructor(private usersService: UsersService) {}


    @ApiOperation({summary: 'Update user\'s profile'})
    @ApiResponse({status:200, type: User})
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Patch()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                nickname: { type: 'string' },
                dateOfBirth: { type: 'Date' },
                avatar: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor('avatar'))
    update(@Req() req, @Body() dto: UpdateUserDto, @UploadedFile() avatar){
        const userId = req.user.id;
        return this.usersService.updateProfile(userId, dto, avatar)
    }


    @ApiOperation({summary: 'Verifying user\'s email'})
    @Get('/activate/:activationLink')
    @Redirect()
     activate(@Param('activationLink') activationLink){
        const user = this.usersService.activate(activationLink)
        const statusCode = (user) ? 200 : 500
        return { url: process.env.CLIENT_URL, statusCode };
    }

    @ApiOperation({summary: 'Getting all users'})
    @ApiResponse({status:200, type: [User]})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getAll(){
        return this.usersService.getAllUsers()
    }


    @ApiOperation({summary: 'Issuing the roles'})
    @ApiResponse({status:200, type: User})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto){
        return this.usersService.addRole(dto)
    }

    @ApiOperation({summary: 'Ban user'})
    @ApiResponse({status:200, type: User})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto){
        return this.usersService.ban(dto)
    }
}
