import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RelationshipsModule } from './relationships/relationships.module';
import { HobbiesModule } from './hobbies/hobbies.module';
import { ReputationModule } from './reputation/reputation.module';
import { CommonModule } from './common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    AuthModule, 
    UsersModule, 
    RelationshipsModule, 
    HobbiesModule, 
    ReputationModule, 
    CommonModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL as string)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
