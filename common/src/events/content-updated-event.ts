import { Channels } from "./channels"

export interface ContentUpdatedEvent {
    channel: Channels.ContentUpdated;
    data: {
        id: string;
        userId: string;
        likestatus: boolean;
    };
}