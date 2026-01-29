import { IsMongoId } from 'class-validator';

export class RemoveHobbyDto {
  @IsMongoId()
  hobbyId: string;
}
