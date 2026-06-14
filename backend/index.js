import express from "express"
import cors from "cors"
import { connectMongoDB } from "./config/db.js";
import dotenv from "dotenv"
import { User } from "./schema/schema.js";
import bcrypt from 'bcryptjs'
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { createUser, housrHold } from "./zod.js";
dotenv.config();
import cookie from "cookie-parser"
import { middleware } from "./middleware/auth.js";
import { HouseHolded } from "./schema/houseHoldSchema.js";
import { generateInviteCode } from "./utils/InviteCode.js";
import { Item } from "./schema/Item.js";



const app = express();
app.use(cookie())
    app.use(cors({
        origin: "https://householdshelf.netlify.app",
        credentials: true
    }));
connectMongoDB();
app.use(express.json())
const privatekey = process.env.PRIVATEKEY || "my-secret key"

// check health

app.get("/", async (req, res) => {
    res.send("hello")
})

app.post("/api/auth/register", async (req, res) => {
    try {
        const { data, success, error } = createUser.safeParse(req.body);
        if (!success) {
            res.status(402).json({
                message: "invalid req.body",
                error: error.message
            })
            return;
        }
        // validation if user does not wrote in form name email and password
        const { name, email, password } = data;
        if (!name || !email || !password) {
            res.status(401).json({
                success: true,
                message: "Please enter the deatails",
                data: null

            });
            return;
        }

        // check user is exist or not
        const checkUserExist = await User.findOne({ email: email });
        if (checkUserExist) {
            res.status(400).json({
                success: true,
                message: "User already exists",
                data: null
            })
            return;
        }
        const haspassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: haspassword,
        });
        const token = await jwt.sign({ id: user._id }, privatekey)

        res.status(201).json({
            message: "User succesfull create",
            data: user,
            token,
            success: true,

        })



    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
})
app.post("/api/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(403).json({
                message: "Inavlid user name and schema"
            })
            return;
        }

        const checkUserExist = await User.findOne({ email });
        if (!checkUserExist) {
            res.status(402).json({
                message: "User does not exist"
            })
        }
        const comparepassword = await bcrypt.compare(password, checkUserExist.password);
        if (!comparepassword) {
            res.status(403).json({
                message: "Invalid usernam and password"
            })
        }
        const token = await jwt.sign({ id: checkUserExist._id }, privatekey, { expiresIn: "1d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000
        })




        res.status(200).json({
            message: "succesfull login",
            data: checkUserExist,
            token,
            success: true
        })

    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

// houseHold apis

app.post("/api/households", middleware, async (req, res) => {
    try {
        const id = req.user.id;

        const { data, success } = housrHold.safeParse(req.body);
        if (!success) {
            res.status(403).json({
                message: "Inalid body"
            })
            return;
        }
        const invitationCode = generateInviteCode();
        const findInviteCodeisAlreadyexitst = await HouseHolded.findOne({ invitationCode });
        if (findInviteCodeisAlreadyexitst) {
            res.status(403).json({
                message: "Already exits code"
            })
            return;
        }
        const { name } = data;
        const holdeddata = await HouseHolded.create({
            name,
            inviteCode: invitationCode,
            members: [id],

        });
        await User.findByIdAndUpdate(
            id, {
            household: holdeddata._id
        }
        )


       return res.status(200).json({
            message: "succesfull create houst hold",
            data: holdeddata,
            success: true
        })

    } catch (err) {
        console.log("err", err);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return;

    }
})
app.post("/api/households/join", middleware, async (req, res) => {
    try {
        const { code } = req.body;
        const id = req.user.id;
        const findInviteCode = await HouseHolded.findOne({ inviteCode: code });
        if (!findInviteCode) {
            res.status(402).json({
                message: "Invalid invite code"
            })
            return
        }

        findInviteCode.members.addToSet(id);
        await findInviteCode.save();
       return res.status(200).json({
            message: "you are joined room",
            data: findInviteCode
        })

    } catch (err) {
        console.log("err", err);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return

    }
})
app.get("/api/households/me", middleware, async (req, res) => {
    try {
        const id = req.user.id;

        const currentUser = await HouseHolded.findOne({
            members: id
        }).populate("members", "name email");

        if (!currentUser) {
            return res.status(404).json({
                message: "Household not found"
            });
        }


       return res.status(200).json({
            message: "Current user's household",
            data: currentUser
        })


    } catch (err) {
        console.log("err", err);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return;
    }
})
app.get("/api/households/:id/members", middleware, async (req, res) => {
    try {
        const id = req.params.id;
        const listAllmember = await HouseHolded.findById(id).select("members");

        if (!listAllmember) return res.status(403).json({ message: "no member" });

      return  res.status(200).json({
            message: "get all members",
            data: listAllmember
        })

    } catch (err) {
        console.log("err", err)
        res.status(500).json({
            message: "internal server error"
        })
        return;
    }
})


//Items

app.get("/api/items", middleware, async (req, res) => {
    try {
        const { status, category } = req.query;

        // Current user ka household nikalo
        const user = await User.findById(req.user.id).select("household");

        if (!user?.household) {
            return res.status(400).json({
                message: "User is not part of any household"
            });
        }

        // Query object
        const query = {
            houseHold: user.household
        };

        // Optional filters
        if (status) {
            query.status = status;
        }

        if (category) {
            query.category = category;
        }

        // Items fetch
        const houseHoldItems = await Item.find(query)
            .populate("addedBy", "name email");

        if (houseHoldItems.length === 0) {
            return res.status(404).json({
                message: "No items found",
                data: []
            });
        }

        return res.status(200).json({
            message: "All household items",
            count: houseHoldItems.length,
            data: houseHoldItems
        });

    } catch (err) {
        console.log("err", err);
        res.status(500).json({
            message: "internal Server Error"
        })
        return;
    }

})
app.post("/api/items", middleware, async (req, res) => {
    try {
        const { name, category, quantity, status, expiryDate } = req.body;
        const id = req.user.id;
        if (!name || !category || !quantity || !status || !expiryDate) {
            res.status(400).json({
                message: "please fill the all things"
            })
            return;
        }
        const houseId = await User.findById(id).select("household");
        if (!houseId?.household) {
            return res.status(400).json({
                message: "User is not part of any household"
            });
        }
        const item = await Item.create({
            name,
            category,
            quantity,
            expiryDate,
            status,
            addedBy: id,
            houseHold: houseId.household

        });
        res.status(201).json({
            message: "item created",
            data: item
        })


    } catch (err) {
        console.log("err", err);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return;
    }

})
app.put("/api/items/:id", middleware, async (req, res) => {
    try {
        const id = req.params.id;
        const { name, category, quantity, status, expiryDate } = req.body;
        const updateItem = await Item.findByIdAndUpdate(
            id,
            {
                name,
                category,
                quantity,
                expiryDate,
                status
            },


        );
       return res.status(200).json({
            message: "User is collected",
            data: updateItem,
        })
    } catch (err) {
        console.log("err", err);
        res.status(500).json({
            message: "Internal Server"
        })
    }
})
app.patch("/api/items/:id/status", async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;

        const item = await Item.findByIdAndUpdate(id, { status });
        return res.status(200).json({
            message: "succesful updated",
            data: item
        })

    } catch (err) {
        console.log("err", err);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})
app.delete("/api/items/:id", middleware, async (req, res) => {
    try {
        const id = req.params.id;

        const deletedItem = await Item.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        return res.status(200).json({
            message: "Item deleted successfully"
        });

    } catch (err) {
        console.log("err", err);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return;
    }
})

//Dashborad Items

app.get("/api/dashboard/stats", middleware, async (req, res) => {
    try {
        const id = req.user.id;

        const user = await User.findById(id)
            .select("household");

        if (!user?.household) {
            return res.status(403).json({
                message: "Not a household member"
            });
        }

        const household = await HouseHolded.findById(
            user.household
        );

        const totalItem = await Item.countDocuments({
            houseHold: user.household
        });

        const fresh = await Item.countDocuments({
            houseHold: user.household,
            status: "fresh"
        });

        const used = await Item.countDocuments({
            houseHold: user.household,
            status: "used"
        });

        const wasted = await Item.countDocuments({
            houseHold: user.household,
            status: "wasted"
        });

        const expired = await Item.countDocuments({
            houseHold: user.household,
            status: "expired"
        });

        const expiringSoon = await Item.countDocuments({
            houseHold: user.household,
            status: "expiring-soon"
        });
        const topContributors = await Item.aggregate([
            {
                $match: {
                    houseHold: user.household
                }
            },
            {
                $group: {
                    _id: "$addedBy",
                    totalItems: { $sum: 1 }
                }
            },
            {
                $sort: {
                    totalItems: -1
                }
            },
            {
                $limit: 3
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $project: {
                    _id: 0,
                    name: "$user.name",
                    totalItems: 1
                }
            }
        ]);

        return res.status(200).json({
            wasteScore: household.wasteScore,
            totalItem,
            fresh,
            used,
            wasted,
            expired,
            expiringSoon,
            topContributors
        });

    } catch (err) {
        console.log("err", err);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
})

app.get("/api/dashboard/expiry", middleware, async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id).select("household");
        if (user?.household) {
            res.status(400).json({
                message: "User is not part of any household"
            })
            return;
        }
        const now = new Date();
        const next24Hours = new Date(
            now.getTime() + 24 * 60 * 60 * 1000
        )
        const expirignItem = await Item.find({
            houseHold: user.household,
            expiryDate: {
                $gte: now,
                $lte: next24Hours
            }
        }).select("name category quantity expiryDate status");

        return res.status(200).json({
            message: "Items expiring within 24 hours",
            count: expirignItem.length,
            data: expirignItem
        })


    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }

})
app.listen(8000, () => {
    console.log("hello")
})