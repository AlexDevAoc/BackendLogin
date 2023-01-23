import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from '../entities/auth.entity';
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { UnauthorizedException, Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy) {

    constructor(
        @InjectModel( User.name)
        private readonly userModel : Model<User>
    ){
        super({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }
    
    async validate(payload: JwtPayload ): Promise<User> {

        const { _id } = payload;

        const user = await this.userModel.findById({ _id });

        if(!user)
          throw new UnauthorizedException('Token not valid')

        if( !user.isActive)
          throw new UnauthorizedException('User is inactive, contact with administrator')
 
        return user;

    }
}