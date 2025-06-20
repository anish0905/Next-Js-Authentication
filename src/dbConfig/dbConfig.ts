import mongoose from 'mongoose';

export async function connect() {
    try {
    //   console.log(process.env.MONGO_URL) // ✅ Correct

        if (!process.env.MONGO_URL) {
            throw new Error("MongoDB URL not found in environment variables");
        }

        await mongoose.connect(process.env.MONGO_URL);

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('✅ Mongoose connected successfully');
        });

        connection.on('error', (err) => {
            console.error('❌ MongoDB connection error. Please ensure MongoDB is running.', err);
            process.exit(1);
        });
    } catch (error) {
        console.error("❌ Error while connecting to MongoDB:", error);
        process.exit(1);
    }
}
