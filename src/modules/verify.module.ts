import { Module } from "@nestjs/common";
import { VerifyController } from "./controllers/verify.controller";
import { VerifyService } from "./services/verify.service";

@Module({
  providers: [VerifyService],
  controllers: [VerifyController],
})
export class VerifyModule {}
