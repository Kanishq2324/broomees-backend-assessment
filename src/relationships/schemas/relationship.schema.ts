import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RelationshipDocument = HydratedDocument<Relationship>;

export type RelationshipStatus = 'active' | 'blocked';

@Schema({ timestamps: true })
export class Relationship {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  friendId: Types.ObjectId;

  @Prop({ 
    type: String, 
    enum: ['active', 'blocked'], 
    default: 'active' 
  })
  status: RelationshipStatus;

  createdAt: Date;
}

export const RelationshipSchema = SchemaFactory.createForClass(Relationship);


// Uniquness in relationship
RelationshipSchema.index(
  { userId: 1, friendId: 1 },
  { unique: true },
);
