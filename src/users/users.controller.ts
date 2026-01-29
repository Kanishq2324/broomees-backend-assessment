import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './userDto/createUserDto';
import { ListUsersDto } from './userDto/list-users.dto';
import { IdParamDto } from 'src/common/reusable dto/IdParam.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserDto } from './userDto/updateUser.dto';

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    createUsers(@Body() dto: CreateUserDto){
        return this.usersService.createUser(dto);
    }

    @Get()
    getUsers(@Query() query: ListUsersDto){
        return this.usersService.getUser(query);
    }

    @Get(':id')
    getUserById(@Param() params: IdParamDto){
        return this.usersService.getUserByIds(params.id);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteUser(@Param() params: IdParamDto){
        return this.usersService.deleteUserById(params.id);
    }

    @Put(':id')
    updateUser(@Param() params: IdParamDto, @Body() dto: UpdateUserDto) {
        return this.usersService.updateUserById(params.id, dto);
    }

    
}



