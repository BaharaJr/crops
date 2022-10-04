import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { config } from "./core/system/system.config";
import { VerifyModule } from "./modules/verify.module";

@Module({
  imports: [
    /*TypeOrmModule.forRoot({
      ...config,
      name: "default",
      type: "postgres",
      logging: false,
      synchronize: true,
    }),*/
    VerifyModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
