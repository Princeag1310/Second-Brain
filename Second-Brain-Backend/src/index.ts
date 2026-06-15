
import express from 'express';
import mongoose from 'mongoose'; 
import jwt from 'jsonwebtoken';
import { UserModel, ContentModel, LinkModel } from './db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import { JWT_PASSWORD } from './config';
import { userMiddleware } from './middleware';
import { random } from './utils';
import cors from "cors";
import { getLinkPreview } from 'link-preview-js';
import dns from 'dns';

dotenv.config();


const app = express();

app.use(express.json());

app.use(cors());

const signupSchema = z.object({
    username: z.string().min(3).max(100),
    password: z.string().min(5).max(40)
});

app.post("/api/v1/signup", async (req, res) => {
    const parsedData = signupSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({
            message: "Invalid inputs",
            errors: parsedData.error
        });
        return;
    }

    const { username, password } = parsedData.data;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.create({
            username: username,
            password: hashedPassword
        });

        res.json({
            message: "User signed up"
        });
    } catch(e) {
        res.status(411).json({
            message: "User already exists"
        });
    }
});

app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    try {
        const existingUser = await UserModel.findOne({ username });
        if(!existingUser || !existingUser.password) {
            res.status(403).json({ message: "Incorrect Credentials" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (isPasswordValid) {
            const token = jwt.sign({
                id: existingUser._id
            }, JWT_PASSWORD);
            res.json({ token });
        } else {
            res.status(403).json({ message: "Incorrect Credentials" });
        }
    } catch(e) {
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
        link,
        type,
        title: req.body.title,
        //@ts-ignore
        userId: req.userId,
        tags: []
    })
    res.json({
        message: "Content added"
    })
})
app.get("/api/v1/content",userMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        content
    })
})
app.delete("/api/v1/content",userMiddleware, async  (req, res) => {
    const contentId = req.body.contentId;
    await ContentModel.deleteMany({
        _id: contentId,
        //@ts-ignore
        userId: req.userId
    })
    res.json({
        message: "Deleted"
    })
})

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;
    if(share){
        const existingLink = await LinkModel.findOne({
            //@ts-ignore
            userId: req.userId
        })
        if(existingLink){
            res.json({
                hash: existingLink.hash
            })
            return;
        }
        const hash = random(10)
        await LinkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        })
        res.json({
            hash
        })
    }
    else{
        await LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        })
        res.json({
            message: "Updated sharable link"
        })
    }
    
})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    });
    if(!link){
        res.status(411).json({
            message: "Sorry, Incorrect Input"
        })
        return;
    }

    // userId
    const content = await ContentModel.find({
        userId: link.userId
    })
    const user = await UserModel.findOne({
        _id: link.userId
    })
    
    if(!user){
        res.status(411).json({
            message: "Sorry, user not found"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })
})

app.post("/api/v1/preview", async (req, res) => {
    const url = req.body.url;
    if (!url) {
        res.status(400).json({ message: "URL is required" });
        return;
    }
    
    try {
        const preview = await getLinkPreview(url, {
            timeout: 5000,
            followRedirects: 'follow',
            resolveDNSHost: async (url: string) => {
                return new Promise((resolve, reject) => {
                    const hostname = new URL(url).hostname;
                    dns.lookup(hostname, (err, address) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(address);
                    });
                });
            }
        });
        res.json(preview);
    } catch (e) {
        console.error("Preview fetch failed for:", url, e);
        res.status(500).json({ message: "Failed to fetch preview" });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

export default app;
