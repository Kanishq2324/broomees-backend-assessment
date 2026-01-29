import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';

import { Relationship } from './schemas/relationship.schema';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class RelationshipsService {
  constructor(
    @InjectModel(Relationship.name)
    private readonly relationshipModel: Model<Relationship>,

    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    @InjectConnection()
    private readonly connection: Connection,
  ) {}



  async createRelationships(userId: string, friendId: string) {

    // Prevent self-linking
    if (userId === friendId) {
      throw new BadRequestException('User cannot create relationship with self');
    }



    // Validate both users exist
    const [userExists, friendExists] = await Promise.all([
      this.userModel.exists({ _id: userId }),
      this.userModel.exists({ _id: friendId }),
    ]);

    // console.log('userExists:', userExists);
    // console.log('friendExists:', friendExists);
    // console.log('usersCount:', await this.userModel.countDocuments());


    

    if (!userExists) throw new NotFoundException('User not found');
    if (!friendExists) throw new NotFoundException('Friend user not found');




    // Transaction to ensure mutual relationship is atomic
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const userObjId = new Types.ObjectId(userId);
      const friendObjId = new Types.ObjectId(friendId);

      // Create both directions A->B and B->A
      await this.relationshipModel.insertMany(
        [
          { userId: userObjId, friendId: friendObjId , status: 'active'},
          { userId: friendObjId, friendId: userObjId,  status: 'active' },
        ],
        { session },
      );

      await session.commitTransaction();

      return {
        message: 'Relationship created successfully',
        userId,
        friendId,
      };
    } 
    catch (err: any) {
      await session.abortTransaction();

      // Mongo duplicate key error (unique index { userId, friendId })
      if (err?.code === 11000) {
        throw new ConflictException('Relationship already exists');
      }

      throw err;

    } 
    finally {
      session.endSession();
    }
  }



  // Remove the relationships and we have to delete both ways
  async removeRelationships(userId: string, friendId: string) {
    if (userId === friendId) {
      throw new BadRequestException('User cannot remove relationship with self');
    }

    const userObjId = new Types.ObjectId(userId);
    const friendObjId = new Types.ObjectId(friendId);

    const result = await this.relationshipModel.deleteMany({
      $or: [
        { userId: userObjId, friendId: friendObjId },
        { userId: friendObjId, friendId: userObjId },
      ],
    });

    if (result.deletedCount === 0) {
      throw new NotFoundException('Relationship not found');
    }

    return {
      message: 'Relationship removed successfully',
      userId,
      friendId,
    };
  }


}
