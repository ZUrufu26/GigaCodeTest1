const axios = require('axios');
const qs = require('qs');
const https = require('https');

const httpsAgent = new https.Agent({
        rejectUnauthorized: false
})
class GigaChatProvider {
    constructor(authToken) {
        this.authToken = authToken;
        this.token = null
    }

    async getToken() {
        let data = qs.stringify({ 'scope': 'GIGACHAT_API_PERS' });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'RqUID': this.uuid4(),
                'Authorization': 'Basic ' + this.authToken
            },
            data: data,
            httpsAgent
        };

        try {
            const response = await axios(config);
            this.token = response.data;
        } catch (error) {
            console.log(error);
        }
    }

    // uuid4 generator
    uuid4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    async sendMessage(message) {
        if (!this.token || Date.now() > this.tokenExpiration) {
            await this.getToken();
        }

        let data = JSON.stringify({
            "model": "GigaChat",
            "messages": [
                {
                    "role": "user",
                    "content": message
                }
            ],
            "stream": false,
            "update_interval": 0
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.token.access_token
            },
            data: data,
            httpsAgent
        };

        try {
            const response = await axios(config);
            return response.data.choices[0].message.content;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = GigaChatProvider;

