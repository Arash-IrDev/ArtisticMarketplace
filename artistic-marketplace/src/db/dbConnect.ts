import mongoose from 'mongoose';

const connection: any = {};

/**
 * Function to connect to the database.
 * If the connection is already established, it returns immediately.
 * Otherwise, it establishes a new connection.
 */
async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  // Connect to the MongoDB database using the provided MONGO_URI
  const db = await mongoose.connect(process.env.MONGO_URI as string, {});

  // Store the connection state
  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
