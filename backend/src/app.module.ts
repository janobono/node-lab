import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import configuration from './config/configuration';
import {LoggerModule} from './logger/logger.module';
import {InfoModule} from './info/info.module';

@Module({
    imports: [ConfigModule.forRoot({load: [configuration]}), LoggerModule, InfoModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
