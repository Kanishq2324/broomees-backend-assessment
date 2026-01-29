import { IsMongoId } from 'class-validator';

export class IssueTokenDto {
  @IsMongoId()
  userId: string;
}