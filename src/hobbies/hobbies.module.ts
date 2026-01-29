import { Module } from '@nestjs/common';
import { HobbiesController } from './hobbies.controller';
import { HobbiesService } from './hobbies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Hobby, HobbySchema } from './schemas/hobby.schema';
import { UserHobby, UserHobbySchema } from './schemas/user-hobby.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Hobby.name, schema: HobbySchema }, 
    { name: UserHobby.name, schema: UserHobbySchema}]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
    
  controllers: [HobbiesController],
  providers: [HobbiesService]
})

export class HobbiesModule {}
