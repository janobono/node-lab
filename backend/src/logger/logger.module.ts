import {Module} from '@nestjs/common';
import {NodeLabLogger} from "./node-lab-logger.service";

@Module({
    providers: [NodeLabLogger],
    exports: [NodeLabLogger]
})
export class LoggerModule {
}
