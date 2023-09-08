import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";

interface UserCreationAttrs{
    email: string;
    password: string;
    activationLink: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs>{

    @ApiProperty({example: '1', description: 'Unique ID'})
    @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number;

    @ApiProperty({example:'user@gmail.com', description:'Email address'})
    @Column({type: DataType.STRING, unique:true, allowNull:false})
    email:string;

    @ApiProperty({example:'123456', description:'User\'s password'})
    @Column({type: DataType.STRING, allowNull:false})
    password:string;

    @ApiProperty({example:'123456', description:'User\'s nickname'})
    @Column({type: DataType.STRING, allowNull:true})
    nickname:string;

    @ApiProperty({example:'2002-12-18', description:'User\'s date of birth'})
    @Column({type: DataType.DATEONLY, allowNull:true})
    dateOfBirth: Date;

    @ApiProperty({example:'320e2400-a29b-81d4-a716-734665440000.jpg', description:'User\'s avatar'})
    @Column({type: DataType.STRING, allowNull:true})
    avatar:string;

    @ApiProperty({example:'550e8400-e29b-41d4-a716-446655440000', description:'Hash for generating email verification link'})
    @Column({type: DataType.STRING, allowNull:false})
    activationLink:string;

    @ApiProperty({example:'true', description:'Whether user has verified his email'})
    @Column({type: DataType.BOOLEAN, allowNull:false, defaultValue:false})
    isActivated:boolean;

    @ApiProperty({example:'true', description:'Whether user is banned'})
    @Column({type: DataType.BOOLEAN, defaultValue:false})
    banned: boolean;

    @ApiProperty({example:'For spamming', description:'Ban reason'})
    @Column({type: DataType.STRING, allowNull:true})
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

}