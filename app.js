import express from 'express';
import pg from 'pg';

const { Client } = pg;
const PORT = 8080;
const app = express();
const db = new Client({
    database: "project"
});

(async () => {
    try {
        await db.connect()
        console.log('Connected to PSQL');
    } catch (error) {
        console.error('Error connecting to PSQL:', error);
    }
})();

app.use(express.json());
app.use(express.static('public'));
app.use(logger);

app.get('/roger', async (req, res) => {
    try {
        const data = await db.query('SELECT title as "Title", note_text as "Note" FROM notes WHERE user_id = 1;')
        console.log(data)
        res.status(200).send(data.rows);
    } catch (error) {
        console.error(error)
        res.status(500).send('Error!')
    }
})

app.get('/dev', async (req, res) => {
    try {
        const data = await db.query('SELECT title as "Title", note_text as "Note" FROM notes WHERE user_id = 2;')
        console.log(data)
        res.status(200).send(data.rows);
    } catch (error) {
        console.error(error)
        res.status(500).send('Error!')
    }
})

app.post('/roger', async (req, res) => {
    try {
        let title = "Roger's note"
        let note_text = req.body
        console.log(note_text)
        let user_id = 1
        let newNote = await db.query('INSERT INTO notes (title, note_text, user_id) VALUES ($1, $2, $3);', [title, note_text, user_id]);
        let rogersNotes = await db.query('SELECT * FROM notes WHERE user_id = 1')
        res.status(200).send(rogersNotes)
    } catch (err) {
        console.error(err)
        res.status(500).send('Error!')
    }
})




app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
})

function logger(req, res, next) {
    console.log('Request method: ', req.method);
    console.log('Request path: ', req.path);
    next();
}