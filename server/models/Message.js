import mongoose from 'mongoose';

// Define schema for chat history
const messageSchema = new mongoose.Schema({
    userMessage: {
        type: String,
        required: true,
    },
    botMessage: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
