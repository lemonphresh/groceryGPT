const express = require('express');

const app = express();
const bodyParser = require('body-parser');
require('dotenv').config({ path: `${__dirname}/../.env` });

const { Configuration, OpenAIApi } = require('openai');

const cors = require('cors');
const { prompt2 } = require('./prompt2');

app.use(cors());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generatePrompt = (prompt) => (text) => prompt(text);

app.use(bodyParser.json());

app.get('/', (req, res) => res.status(200).json({ message: 'Hello world' }));

app.post('/chat', async (req, res) => {
  const { prompt } = req.body;

  try {
    if (prompt == null) {
      throw new Error('Uh oh, no prompt was provided');
    }
    const response = await openai.createCompletion({
      max_tokens: 2008,
      model: 'text-davinci-003',
      prompt: generatePrompt(prompt2)(prompt),
    });
    const completion = response.data.choices[0].text;
    console.log('sending data', response.data);
    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    return error.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001/');
});
