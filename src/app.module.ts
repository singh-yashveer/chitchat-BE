import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatMessageModule } from './chat-message/chat-message.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ChatroomModule } from './chatroom/chatroom.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-autumn-snowflake-a1qymmk4.ap-southeast-1.aws.neon.tech',
      port: 5432,
      username: 'chitchat-db_owner',
      password: 'PoT9SjBtKH3d',
      database: 'chitchat-db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      ssl: true,
      synchronize: true,
      logging: true,
    }),
    ChatMessageModule,
    AuthModule,
    ChatroomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
