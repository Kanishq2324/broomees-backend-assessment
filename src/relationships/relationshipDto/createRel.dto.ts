import { IsMongoId } from 'class-validator';

export class CreateRelationshipDto {
  @IsMongoId()
  friendId: string;
}
