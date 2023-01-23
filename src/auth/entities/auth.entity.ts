import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'

@Schema()
export class User extends Document{

    @Prop({
        unique: true,
        index: true
    })
    email: string;
    @Prop({
        select: false
    })
    password: string;

    @Prop()
    fullName: string;

    @Prop({
        default: true
    })
    isActive: boolean;

    @Prop([String])
    roles: string[];
    
}

export const UserSchema = SchemaFactory.createForClass( User )