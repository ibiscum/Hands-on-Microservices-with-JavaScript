import mongoose from 'mongoose';

let mongoUrl;
export  async function connect({ mongo: { url } }) {
    mongoUrl = url;
    try {
        await mongoose.connect(mongoUrl);
    } catch (err) {
        console.log('MongoDB connection unsuccessful, retry after 8 seconds.', err);
        setTimeout(mongoose.connect, 8000);
    }
}

const dbConnection = mongoose.connection;

export function disconnect() {
    dbConnection.removeAllListeners();
    return mongoose.disconnect();
}

// export default {
//     connect,
//     disconnect,
// };
