import {Injectable, Logger, Scope} from '@nestjs/common';

@Injectable({scope: Scope.TRANSIENT})
export class NodeLabLogger extends Logger {
}
