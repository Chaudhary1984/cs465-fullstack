const mongoose = require("mongoose");
const Trip = require("./trips");
const tripsData = require("../../data/trips.json");

const host = process.env.DB_HOST || "127.0.0.1";
const dbURI = `mongodb://${host}/travlr`;

mongoose.connect(dbURI);

mongoose.connection.on("connected", () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on("error", err => {
    console.log("Mongoose connection error: ", err);
});

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected");
});

const seedDB = async () => {
    try {
        await Trip.deleteMany({});
        console.log("Cleared existing trips");

        const result = await Trip.insertMany(tripsData);
        console.log(`${result.length} trips inserted successfully`);

        mongoose.connection.close();
    } catch (err) {
        console.error("Error seeding database:", err);
        mongoose.connection.close();
    }
};

seedDB();
