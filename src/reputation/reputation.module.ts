import { Module } from '@nestjs/common';
import { ReputationService } from './reputation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { ReputationController } from './reputation.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [ReputationController],
  providers: [ReputationService]
})

export class ReputationModule {}
