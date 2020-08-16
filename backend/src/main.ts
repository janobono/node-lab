import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {NodeLabLogger} from "./logger/node-lab-logger.service";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: false
    });
    app.useLogger(new NodeLabLogger());
    await app.listen(3000);
}

bootstrap();
