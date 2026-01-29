import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { User } from '../users/schemas/user.schema';
import { Hobby } from './schemas/hobby.schema';
import { UserHobby } from './schemas/user-hobby.schema';

@Injectable()
export class HobbiesService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    @InjectModel(Hobby.name)
    private readonly hobbyModel: Model<Hobby>,

    @InjectModel(UserHobby.name)
    private readonly userHobbyModel: Model<UserHobby>,
  ) {}

    async addHobbies(userId: string, hobbyName: string) {

        const userExists = await this.userModel.exists({ _id: userId });
        if (!userExists) throw new NotFoundException('User not found');

        // Normalizing hobby name to match schema
        const normalizedHobby = hobbyName.trim().toLowerCase();

        // Create hobby if it doesn't exist
        let hobby = await this.hobbyModel.findOne({ name: normalizedHobby });

        if (!hobby) {
        try {
            hobby = await this.hobbyModel.create({ name: normalizedHobby });
        } 

            catch (err: any) {
                // In case of race condition (two requests create same hobby)
                if (err?.code === 11000) {
                    hobby = await this.hobbyModel.findOne({ name: normalizedHobby });
                } 
                else {
                    throw err;
                }
            }
        }

        if (!hobby) {
            throw new Error('Failed to create or fetch hobby');
        }



        // Create mapping user <-> hobby 
        // as i have used Mongo DB so i have to create another schema which
        // stores user and hobby together

        try {
        await this.userHobbyModel.create({
            userId: new Types.ObjectId(userId),
            hobbyId: hobby._id,
        });

        } catch (err: any) {

            // unique index (userId, hobbyId) prevents duplicates
            if (err?.code === 11000) {
                throw new ConflictException('Hobby already added to user');
            }
            throw err;
        }

        // (Later) trigger reputation recalculation here

        return {
            message: 'Hobby added successfully',
            userId,
            hobby: {
                id: hobby._id,
                name: hobby.name,
            },
        };
  }

   async removeHobbies(userId: string, hobbyId: string) {

        const userExists = await this.userModel.exists({ _id: userId });
        if (!userExists) throw new NotFoundException('User not found');

        // validate hobby exists or not
        const hobbyExists = await this.hobbyModel.exists({ _id: hobbyId });
        if (!hobbyExists) throw new NotFoundException('Hobby not found');

        // delete mapping
        const result = await this.userHobbyModel.deleteOne({
            userId: new Types.ObjectId(userId),
            hobbyId: new Types.ObjectId(hobbyId),
        });

        if (result.deletedCount === 0) {
            throw new NotFoundException('Hobby not assigned to this user');
        }

        // (Later) trigger reputation recalculation here

        return {
            message: 'Hobby removed successfully',
            userId,
            hobbyId,
        };
  }

  
}
