import mongoose from 'mongoose';
//An interface that defines user properties

interface ContentAttrs{
    title: string;
    content: string;
    userId: string;
    likes: number;
    createdAt: number;
}

//An Interface that defines the properties
//that a User Model has

interface ContentModel extends mongoose.Model<ContentDoc> {
    build(attrs: ContentAttrs): ContentDoc;
}

//An interface that defines propertes that a
// User Model has

interface ContentDoc extends mongoose.Document {
    title: string;
    content: string;
    userId: string;
    likes: number;
    createdAt: number;
}

const contentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Number,
        default: Date.now()
    }
}, {
    toJSON: {
       transform(doc, ret) {
           ret.id = ret._id;
           delete ret._id;
       } 
    }
});

contentSchema.statics.build = (attrs: ContentAttrs) => {
    return new Content(attrs)
}

const Content = mongoose.model<ContentDoc, ContentModel>('Content', contentSchema);

export { Content };