import pkg from 'mongoose';
const { connect: _connect, connection, disconnect: _disconnect } = pkg;

let mongoUrl;
export async function connect({ mongo: { url } }) {
  mongoUrl = url;

  try {
    await _connect(mongoUrl);
  }
  catch (err) {
    console.log('MongoDB connection unsuccessful, retry after 8 seconds.', err);
    setTimeout(connect, 8000);
    throw err;
  }
}

const dbConnection = connection;

export function disconnect() {
    dbConnection.removeAllListeners();
    return _disconnect();
}
