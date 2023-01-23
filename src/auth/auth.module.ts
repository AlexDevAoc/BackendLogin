import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/auth.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,

    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    }]),

    PassportModule.register({ defaultStrategy: 'jwt' }),

    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: {
    //     expiresIn: '2h',
    //   }
    // })

    JwtModule.registerAsync({
      imports:[],
      inject: [],
      useFactory: () => {
       
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
          expiresIn: '2h',
          }
        }
      }
    })


  ],

  exports: [ JwtStrategy, PassportModule, JwtModule ]
})
export class AuthModule {}
