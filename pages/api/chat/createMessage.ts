import { NextApiRequest, NextApiResponse } from "next";

export default async function createMessage(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { messages } = req.body;
    const apiKey = process.env.OPENAI_KEY; 
    const url = 'https://api.openai.com/v1/chat/completions';

    const body = JSON.stringify({
        messages, // Array that stores messages
        model: 'gpt-3.5-turbo',
        stream: false,
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body,
        });
        const data = await response.json();
        res.status(200).json({ data });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}