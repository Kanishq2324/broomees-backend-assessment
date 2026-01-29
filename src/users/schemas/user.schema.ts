import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type UserDocument = HydratedDocument<User>;

@Schema({timestamps: true})
export class User {
   @Prop({
    required: true,
    unique: true,
    trim: true,
  })
  username: string;


  @Prop({
    required: true,
    min: 0,
  })
  age: number;


  @Prop({
    default: 0,
  })
  reputationScore: number;


  @Prop({
    default: 0,
  })
  version: number;

  createdAt: Date;
  updatedAt: Date;

} 

export const UserSchema = SchemaFactory.createForClass(User);
 