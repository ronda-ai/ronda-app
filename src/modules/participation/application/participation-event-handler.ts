
import { container } from "@/lib/dependency-container";
import { SystemEvent, SystemEventPayloads } from "@/lib/event-bus/event-bus";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IParticipationService } from "../domain/interfaces/participation-service.interface";

export class ParticipationEventHandler {
    private participationService: IParticipationService;

    constructor() {
        this.participationService = container.resolve<IParticipationService>(SERVICE_KEYS.ParticipationService);
        this.registerListeners();
    }

    private registerListeners(): void {
        const eventBus = require('@/lib/event-bus/event-bus').eventBus;
        eventBus.register(SystemEvent.CHALLENGE_ACCEPTED, this.handleChallengeAccepted.bind(this));
    }

    private async handleChallengeAccepted(event: SystemEvent, payload: SystemEventPayloads[SystemEvent.CHALLENGE_ACCEPTED]): Promise<void> {
        try {
            for (const studentId of payload.studentIds) {
                await this.participationService.addParticipation(studentId);
            }
        } catch (error) {
            console.error(`[ParticipationEventHandler] Failed to handle ${event}:`, error);
        }
    }
}
