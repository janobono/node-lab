import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {LoggerModule} from "../logger/logger.module";

import {InfoController} from './info.controller';

@Module({
    imports: [ConfigModule, LoggerModule],
    controllers: [InfoController]
})
export class InfoModule {
}
