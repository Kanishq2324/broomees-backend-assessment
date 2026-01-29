import { Module } from '@nestjs/common';
import { RelationshipsController } from './relationships.controller';
import { RelationshipsService } from './relationships.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Relationship, RelationshipSchema } from './schemas/relationship.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Relationship.name, schema: RelationshipSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [RelationshipsController],
  providers: [RelationshipsService]
})
export class RelationshipsModule {}
