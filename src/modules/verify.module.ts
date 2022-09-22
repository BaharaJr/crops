import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VerifyController } from "./controllers/verify.controller";
import { Crop } from "./entities/verify.entity";
import { VerifyService } from "./services/verify.service";

@Module({
  providers: [VerifyService],
  controllers: [VerifyController],
})
export class VerifyModule {}
