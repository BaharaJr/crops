import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { VerifyModule } from "./modules/verify.module";

@Module({
  imports: [
    /*TypeOrmModule.forRoot({
      name: "default",
      type: "postgres",
      host: "localhost",
      port: 5434,
      username: "postgres",
      password: "postgres",
      database: "shamba",
      logging: false,
      synchronize: true,

    }),*/
    VerifyModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
