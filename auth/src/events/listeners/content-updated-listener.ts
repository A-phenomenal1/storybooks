import {Channels, Listener, ContentUpdatedEvent} from '@storybooks/common-service'
import { Message } from 'node-nats-streaming';
import { User } from '../../models/user';

export class ContentUpdatedListener extends Listener<ContentUpdatedEvent> {
    channel: Channels.ContentUpdated = Channels.ContentUpdated;
    queueGroupName = 'like-service';

    async onMessage(data: ContentUpdatedEvent['data'], msg: Message) {
        const {id, userId, likestatus} = data;

        const user = await User.findById(userId);

        if(!user) {
            throw new Error('User not found...');
        }

        if(likestatus){
            await User.updateOne(
                {_id: userId},
                {$push: {likedContent: id}}
            );
        }else{
            await User.updateOne(
                {_id: userId},
                {$pull: {likedContent: id}}
            );
        }

        msg.ack();
    }
}