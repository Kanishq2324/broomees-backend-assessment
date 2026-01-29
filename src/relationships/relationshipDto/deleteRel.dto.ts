import { IsMongoId } from 'class-validator';

export class DeleteRelationshipDto {
  @IsMongoId()
  friendId: string;
}
