import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<ApiToken>;

@Schema({ timestamps: true })
export class ApiToken {
  
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: Types.ObjectId;

  // Store HASHED token only
  @Prop({
    required: true,
  })
  tokenHash: string;

  @Prop({
    required: true,
  })
  expiresAt: Date;

  @Prop({
    default: false,
  })
  revoked: boolean;
}

export const ApiTokenSchema = SchemaFactory.createForClass(ApiToken);

ApiTokenSchema.index({ tokenHash: 1 });