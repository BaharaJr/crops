import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpErrorFilter } from "./core/interceptors/error.interceptor";
import { LoggingInterceptor } from "./core/interceptors/logging.interceptor";
import { fileSystem } from "./core/system/system.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5001;
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new HttpErrorFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  fileSystem();
  await app.listen(PORT);
  Logger.debug(`App listening on PORT: ${PORT}`, "APP");
}
bootstrap();
