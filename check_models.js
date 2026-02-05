import axios from 'axios';
import fs from 'fs';

const API_KEY = 'AIzaSyBN62ugWbPhOHJ7ZrKfSZauSLriamk7RHs';

async function checkModels() {
    try {
        const response = await axios.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
        if (response.data && response.data.models) {
            const names = response.data.models.map(m => m.name.replace('models/', ''));
            fs.writeFileSync('models.json', JSON.stringify(names, null, 2));
        }
    } catch (error) {
        fs.writeFileSync('models.json', JSON.stringify({ error: error.message }));
    }
}
checkModels();
