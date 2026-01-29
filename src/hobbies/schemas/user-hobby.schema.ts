import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserHobbyDocument = HydratedDocument<UserHobby>;

@Schema({ timestamps: true })
export class UserHobby  {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Hobby',
    required: true,
  })
  hobbyId: Types.ObjectId;
}

export const UserHobbySchema =
  SchemaFactory.createForClass(UserHobby);

// Prevent duplicate hobby assignments
UserHobbySchema.index(
  { userId: 1, hobbyId: 1 },
  { unique: true },
);
