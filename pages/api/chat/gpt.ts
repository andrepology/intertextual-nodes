import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_KEY = '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'; // Replace with your ChatGPT API key

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { text, question } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: `${text}\nQuestion: ${question}\nAnswer:`,
        max_tokens: 50,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const answer = response.data.choices[0].text.trim();

    res.status(200).json({ response: answer });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

export default handler;