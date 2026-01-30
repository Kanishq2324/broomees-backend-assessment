import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { HobbiesService } from './hobbies.service';
import { IdParamDto } from '../common/reusable_dto/IdParam.dto';
import { AddHobbyDto } from './hobbyDto/addHobby.dto';
import { RemoveHobbyDto } from './hobbyDto/removeHobby.dto';

@Controller('api/users/:id/hobbies')
export class HobbiesController {
  constructor(private readonly hobbiesService: HobbiesService) {}

  @Post()
  addHobby(@Param() params: IdParamDto, @Body() dto: AddHobbyDto) {
    return this.hobbiesService.addHobbies(params.id, dto.name);
  }

  @Delete()
  removeHobby(@Param() params: IdParamDto, @Body() dto: RemoveHobbyDto) {
    return this.hobbiesService.removeHobbies(params.id, dto.hobbyId);
  }
}