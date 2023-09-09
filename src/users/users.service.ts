import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {BanUserDto} from "./dto/ban-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AddRoleDto } from "./dto/add-role-dto";
import { FilesService } from "../files/files.service";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService,
                private fileService: FilesService,
                ) {}

    async updateProfile(userId:number, dto: UpdateUserDto, avatar: any) {
        const fileName = await this.fileService.saveAvatar(avatar);
        const [rowsUpdated, [updatedUser]] = await this.userRepository.update({ ...dto, avatar:fileName },
          {where:{ id:userId }, returning: true})
        return updatedUser;
    }

    async activate(activationLink: string){
        const user = await this.userRepository.findOne({where:{activationLink}});
        user.isActivated = true
        await user.save()
        return user;

    }


    async createUser(dto: CreateUserDto, activationLink: string){
        const user = await this.userRepository.create({...dto, activationLink:activationLink});
        const role = await this.roleService.getRoleByValue('USER')
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user;

    }

    async getAllUsers(){
        const users = await this.userRepository.findAll({include:{all:true}})
        return users;
    }

    async getUserByEmail(email:string){
        const user = await this.userRepository.findOne({where: {email}, include:{all:true}})
        return user;

    }

    async addRole(dto: AddRoleDto){
        const user = await this.userRepository.findByPk(dto.userId)
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user){
            await user.$add('role', role.id)
            return dto;
        }
        throw new HttpException('User or role wasn\'t found', HttpStatus.NOT_FOUND)
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        if (!user){
            throw new HttpException('User wasn\'t found', HttpStatus.NOT_FOUND)
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }


}
