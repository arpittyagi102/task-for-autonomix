import { Router, Request, Response, RequestHandler } from "express";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

const router: Router = Router();
dotenv.config({ path: '.env.local' });
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

router.post("/getActionItems", (async (req: Request, res: Response) => {
    try {
        const { transcript } = req.body;

        if (!transcript || typeof transcript !== "string") { 
            res.status(400).json({ error: "Invalid or missing transcript" });
            throw new Error("Invalid or missing transcript");
        }
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: transcript,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                systemInstruction: "Extract clear and concise action items from the provided transcript of a conversation or meeting. Each action item should include a task description and a priority level (1-3).",
            }
        });

        const responseData = JSON.parse(response.text);
        if (!responseData || !Array.isArray(responseData.actionItems)) {
            throw new Error("Invalid response format");
        }

        const actionItems = responseData.actionItems.map((item: any) => ({
            task: item.task || "No task provided",
            priority: item.priority || 0
        }));

        res.json({ actionItems });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }   
}));

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        actionItems: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    task: { type: Type.STRING },
                    priority: { type: Type.NUMBER },
                },
                required: ["task", "priority"]
            }
        }
    },
    required: ["actionItems"]
};

    

export default router;