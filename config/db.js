const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://kavinsrimaticz:6irM1lner9t576wd@cluster0k.jvwzsft.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0k");
        console.log('✅ MongoDB connected');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;