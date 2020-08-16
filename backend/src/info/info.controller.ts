import {Controller, Get} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {INFO_MESSAGE} from "../config/configuration";
import {NodeLabLogger} from "../logger/node-lab-logger.service";

@Controller('/api/node-lab-backend/info')
export class InfoController {

    constructor(private configService: ConfigService, private logger: NodeLabLogger) {
        this.logger.setContext('InfoController');
    }

    @Get()
    getInfo(): String {
        this.logger.log('getInfo');
        return this.configService.get<String>(INFO_MESSAGE);
    }
}
