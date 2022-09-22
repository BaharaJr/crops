import { Controller, Get, Param } from "@nestjs/common";
import { VerifyService } from "../services/verify.service";

@Controller("api/verify")
export class VerifyController {
  constructor(private service: VerifyService) {}
  @Get(":code")
  async verifyCrops(@Param("code") code: string) {
    await this.service.verifyCrops(code);
  }
}
