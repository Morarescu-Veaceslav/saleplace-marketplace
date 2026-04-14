import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';


@Injectable()
export class EventbusService {
    private readonly logger = new Logger(EventbusService.name);
    private readonly eventBus = new EventEmitter2();

    // Emiterea unui eveniment
    emit(event: string, payload: any) {
        this.logger.debug(`Emitting event: ${event} with payload: ${JSON.stringify(payload)}`);
        this.eventBus.emit(event, payload);
    }

    // Ascultarea unui eveniment
    on(event: string, listener: (...args: any[]) => void) {
        this.eventBus.on(event, listener);
    }

    // Ascultare o singură dată
    once(event: string, listener: (...args: any[]) => void) {
        this.eventBus.once(event, listener);
    }
}
