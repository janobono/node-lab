import {Controller, Get} from '@nestjs/common';

@Controller('/api/node-lab-backend/info')
export class InfoController {
    @Get()
    getInfo(): String {
        return 'Node lab application backend is running.';
    }
}
