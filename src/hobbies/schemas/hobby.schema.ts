import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HobbyDocument = HydratedDocument<Hobby>;

@Schema()
export class Hobby {
  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  name: string;
}

export const HobbySchema = SchemaFactory.createForClass(Hobby);