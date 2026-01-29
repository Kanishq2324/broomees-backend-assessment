import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schemas/user.schema';
import { CreateUserDto } from './userDto/createUserDto';
import { ListUsersDto } from './userDto/list-users.dto';
import { Relationship } from 'src/relationships/schemas/relationship.schema';
import { UpdateUserDto } from './userDto/updateUser.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Relationship.name) private readonly relationshipModel: Model<Relationship>,) {}
     
  
    // Creating the User
    async createUser(dto: CreateUserDto) {
        try {
            const user = await this.userModel.create({
            username: dto.username,
            age: dto.age,
            reputationScore: 0,
            version: 0,
            });

            return {
                id: user._id,
                username: user.username,
                age: user.age,
                reputationScore: user.reputationScore,
                version: user.version,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            };
        } 
        catch (error) {

            // If username already exists
            if (error.code === 11000) {
                throw new ConflictException('Username already exists');
            }
            throw error;
        }
    }



    // Fetching all the users using DOM API : 
    // promise.all to run multiple async operations concurrently.
    async getUser(query: ListUsersDto) {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const skip = (page - 1) * limit;

        const [users, total] = await Promise.all([
            this.userModel
                .find()
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }),

            this.userModel.countDocuments(),
        ]);

        return {
        page,
        limit,
        total,
        data: users.map((user) => ({
            id: user._id,
            username: user.username,
            age: user.age,
            reputationScore: user.reputationScore,
            version: user.version,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        })),
        };
    }



    // Get user by id no authGuard
    async getUserByIds(id: string) {
        const user = await this.userModel.findById(id);

        if (!user) {
        throw new NotFoundException('User not found');
        }

        return {
            id: user._id,
            username: user.username,
            age: user.age,
            reputationScore: user.reputationScore,
            version: user.version,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }


    // Delete user by id with authGuard
    async deleteUserById(userId: string) {
        
        const user = await this.userModel.findById(userId);

        if (!user) {
            throw new NotFoundException('User not found');
        }
        
        // deletion if Reputation score > configurable threshold
        const threshold = Number(process.env.DELETE_REPUTATION_THRESHOLD ?? 0);
        if (user.reputationScore > threshold) {
            throw new ConflictException(
            `User cannot be deleted: reputationScore (${user.reputationScore}) is above threshold (${threshold})`,
            );
        }

        // Checking relationships if exists
        const hasRelationships = await this.relationshipModel.exists({
            status: "active",
            $or: [{ userId }, { friendId: userId }],
        });

        if (hasRelationships) {
            throw new ConflictException(
                'User cannot be deleted while relationships exist',
            );
        }

        // Delete
        await this.userModel.deleteOne({ _id: userId });

        return {
            message: 'User deleted successfully',
        };
    }


    // update user by _id in params and selecting one of the fields
    async updateUserById(userId: string, dto: UpdateUserDto) {

        const user = await this.userModel.findById(userId);
        if (!user) throw new NotFoundException('User not found');

        if (dto.username !== undefined) {
            user.username = dto.username;
        }


        if (dto.age !== undefined) {
            user.age = dto.age;
        }

        await user.save();

        return {
            id: user._id,
            username: user.username,
            age: user.age,
            reputationScore: user.reputationScore,
            version: user.version,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            message: "User Updated Successfully"
        };
  }


}
