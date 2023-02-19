const express = require('express');
const admin = require('firebase-admin');
const app = express();
const path = require('path');
const cors = require('cors');

app.use(cors());

const serviceAccount = require('./doyopetcare-firebase-adminsdk-v83wi-4d895916be.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
// serve up production assets
app.use(express.static('frontend/build'));

app.get('/pets', (req, res) => {
    const db = admin.firestore();

    db.collection('pets').get()
        .then(documents => {
            const pets = [];
            documents.forEach(doc => {
                pets.push(doc.data());
            });
            res.status(200).send(pets);
        })
        .catch(err => {
            console.log('Error getting documents', err);
            res.status(500).send('Error getting documents');
        });
});

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
