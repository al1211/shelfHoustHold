import mongoose from "mongoose";
import crypto from "crypto";
import dotenv from "dotenv"
dotenv.config();
import { User } from "./schema/schema.js";          // Apne paths check kar lena
import { HouseHolded } from "./schema/houseHoldSchema.js"; 
import { Item } from "./schema/Item.js";

// Apne MongoDB local ya Atlas URI se replace karein
const MONGO_URI = process.env.MONGO_URL; 

const seedDatabase = async () => {
    try {
        console.log("🚀 Connecting to database...");
        await mongoose.connect(MONGO_URI);
        
        // 1. Purana Data Clear Karein (taaki bar-bar chalane pe duplicate na ho)
        console.log("🧹 Clearing old data...");
        await User.deleteMany({});
        await HouseHolded.deleteMany({});
        await Item.deleteMany({});

        // console.log("🏠 Creating a Sample Household...");
        // // Ek household create karte hain jiska waste score 78% hai
        // const sampleHousehold = await HouseHolded.create({
        //     name: "Sharma Residence",
        //     inviteCode: crypto.randomBytes(3).toString("hex").toUpperCase(), // 6 letter unique code
        //     wasteScore: 78,
        //     members: []
        // });

        // console.log("👥 Creating Sample Users...");
        // // Ek main user banate hain jisse dashboard access hoga
        // const mainUser = await User.create({
        //     name: "Aman Sharma",
        //     email: "aman@example.com",
        //     password: "hashed_password_here", // Real app mein bcrypt use karein
        //     household: sampleHousehold._id
        // });

        // const secondUser = await User.create({
        //     name: "Riya Sharma",
        //     email: "riya@example.com",
        //     password: "hashed_password_here",
        //     household: sampleHousehold._id
        // });

        // // Household ke andar members ki IDs update kar dete hain
        // sampleHousehold.members.push(mainUser._id, secondUser._id);
        // await sampleHousehold.save();

        // console.log("🍎 Creating Diverse Grocery Items...");
        
        // // Alag-alag expiry dates generate karne ke liye helper functions
        // const getPastDate = (days) => new Date(Date.now() - days * 24 * 60 * 60 * 1000);
        // const getFutureDate = (days) => new Date(Date.now() + days * 24 * 60 * 60 * 1000);

        // const sampleItems = [
        //     // --- FRESH ITEMS ---
        //     {
        //         houseHold: sampleHousehold._id,
        //         addedBy: mainUser._id,
        //         name: "Full Cream Milk",
        //         category: "dairy",
        //         quantity: 2,
        //         expiryDate: getFutureDate(7),
        //         status: "fresh"
        //     },
        //     {
        //         houseHold: sampleHousehold._id,
        //         addedBy: secondUser._id,
        //         name: "Chicken Breast",
        //         category: "meat",
        //         quantity: 1,
        //         expiryDate: getFutureDate(4),
        //         status: "fresh"
        //     },
        //     {
        //         houseHold: sampleHousehold._id,
        //         addedBy: mainUser._id,
        //         name: "Frozen Pizza",
        //         category: "frozen",
        //         quantity: 3,
        //         expiryDate: getFutureDate(60),
        //         status: "fresh"
        //     },

        //     // --- EXPIRING SOON ITEMS ---
        //     {
        //         houseHold: sampleHousehold._id,
        //         addedBy: mainUser._id,
        //         name: "Organic Bananas",
        //         category: "produce",
        //         quantity: 6,
        //         expiryDate: getFutureDate(1), // Kal expiry hai
        //         status: "expiring-soon"
        //     },
        //     {
        //         houseHold: sampleHousehold._id,
        //         addedBy: secondUser._id,
        //         name: "Brown Bread",
        //         category: "pantry",
        //         quantity: 1,
        //         expiryDate: getFutureDate(2),
        //         status: "expiring-soon"
        //     },

        //     // --- EXPIRED ITEMS ---
        //     {
        //         houseHold: sampleHousehold._id,
        //         addedBy: mainUser._id,
        //         name: "Greek Yogurt",
        //         category: "dairy",
        //         quantity: 1,
        //         expiryDate: getPastDate(3), // 3 din pehle expire ho chuka
        //         status: "expired"
        //     },
        //     {
        //         houseHold: sampleHousehold._id,
        //         addedBy: secondUser._id,
        //         name: "Spinach (Palak)",
        //         category: "produce",
        //         quantity: 1,
        //         expiryDate: getPastDate(5),
        //         status: "expired"
        //     },

        //     // --- HISTORICAL METRICS (Used / Wasted) ---
        //     {
        //         houseHold: sampleHousehold._id,
        //         addedBy: mainUser._id,
        //         name: "Eggs 12pc",
        //         category: "dairy",
        //         quantity: 1,
        //         expiryDate: getPastDate(1),
        //         status: "used" // Consume ho chuka hai
        //     },
        //     {
        //         houseHold: sampleHousehold._id,
        //         addedBy: secondUser._id,
        //         name: "Tomatoes",
        //         category: "produce",
        //         quantity: 4,
        //         expiryDate: getPastDate(2),
        //         status: "wasted" // Phenkna pada
        //     }
        // ];

        // await Item.insertMany(sampleItems);

        console.log("\n✨ Database Seeded Successfully!");
        console.log("-----------------------------------------");
        console.log(`📧 User Email for Login: `);
        console.log(`🆔 User MongoDB ID: `);
        console.log(`🏠 Household Name: `);
        console.log("-----------------------------------------");
        
        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
};

seedDatabase();