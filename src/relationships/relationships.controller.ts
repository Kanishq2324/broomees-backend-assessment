import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { RelationshipsService } from './relationships.service';
import { IdParamDto } from 'src/common/reusable_dto/IdParam.dto';
import { CreateRelationshipDto } from './relationshipDto/createRel.dto';
import { DeleteRelationshipDto } from './relationshipDto/deleteRel.dto';

@Controller('api/users/:id/relationships')
export class RelationshipsController {
    constructor(private readonly relationshipsService: RelationshipsService) {}


    // Create Relationship controller - 
    // passing user id into params and friend_id in DTO

    @Post()
    createRelationship(
        @Param() params: IdParamDto,
        @Body() dto: CreateRelationshipDto,
    ) {
        console.log('PARAMS:', params);
        return this.relationshipsService.createRelationships(params.id, dto.friendId);
    }

    @Delete()
    removeRelationship(@Param() params: IdParamDto, @Body() dto: DeleteRelationshipDto) {
        return this.relationshipsService.removeRelationships(params.id, dto.friendId);
    }

}
