import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // FIXME: 개발중 임시 허용
  app.enableCors({
    origin: ["http://localhost:3000"],
  });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
