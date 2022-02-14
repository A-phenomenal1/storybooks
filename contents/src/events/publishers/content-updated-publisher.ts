import { Publisher, Channels, ContentUpdatedEvent} from '@storybooks/common-service'

export class ContentUpdatedPublisher extends Publisher<ContentUpdatedEvent> {
    channel: Channels.ContentUpdated = Channels.ContentUpdated;
}