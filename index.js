const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

const app = express().use(bodyParser.json());


// Identificador de la app
// 1186973585537678

//Secreto de la app
// 2711c34f916db69562da27a2f3f20d11

//Identificador de la pagina de facebook
// 266440486547261

// Token de acceso a la pagina de facebook
// EAAQ3i9Lseo4BO74zqlzQvPffe8Qz1EWiUcGG2PPpMYwaoKF5iCtuiYjkGKSFyi6LcWvo3Nw0A7vvUofHcuXG4gxjStZAvBWqqsAJYLnRKEjs4zignmZCRRjttvwBglRcObQVOIEZCHiKVkRShWtoHS2sqjpHxfEqMInz2bmMcuo2fFPf6ZC1KZBrMeAjVStspl0iyyBTi

app.post('/webhook', (req, res) => {
    const body = req.body;

    if(body.object === 'page') {
        body.entry.forEach((entry) => {
            const webhookEvent = entry.messaging[0];
            console.log(webhookEvent);
        });

        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});


app.get('/webhook', (req, res) => {
    const verify_token = 'EAAQ3i9Lseo4BO74zqlzQvPffe8Qz1EWiUcGG2PPpMYwaoKF5iCtuiYjkGKSFyi6LcWvo3Nw0A7vvUofHcuXG4gxjStZAvBWqqsAJYLnRKEjs4zignmZCRRjttvwBglRcObQVOIEZCHiKVkRShWtoHS2sqjpHxfEqMInz2bmMcuo2fFPf6ZC1KZBrMeAjVStspl0iyyBTi'

    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === verify_token) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge); // Envía la respuesta aquí después de verificar el token
        } else {
            res.sendStatus(403);
        }
    } else {
        res.send('GET request received'); // Envía una respuesta por defecto si los parámetros no están presentes
    }
});



app.listen(PORT, () => {
    console.log('Servidor iniciado');
});