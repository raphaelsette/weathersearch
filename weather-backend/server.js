import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors()); // permite o front se comunicar com o backend

app.get('/api/weather', async (req, res) => {
    const { city } = req.query;
    const apiKey = process.env.WEATHER_API_KEY;

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                units: 'metric',
                appid: apiKey,
                lang: 'pt_br'
            }
        });
        
        // retorna os dados necessários para o frontend
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: "Erro ao buscar clima." });
    }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));