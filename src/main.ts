import express from 'express';
import { nanoid } from 'nanoid';
import pool from './db.ts';

const app = express();

app.use(express.json());

app.post('/', (req: any, res: any) => {
    const { url } = req.body;
    try {
        const short = nanoid(6);

        pool.query("INSERT INTO urls (short_code, original_url) VALUES ($1, $2)", [short, url]);

        res.json({ shortUrl: `${req.protocol}://${req.get("host")}/${short}`})
    }
    catch (err) {
        res.status(500).json({ Server: "Internal Error"});
    }
})


app.get("/:short", async (req: any, res: any) => {
    const { short } = req.params;
    
    const result = await pool.query("SELECT original_url FROM urls WHERE short_code = $1", [short]);
    const url = result.rows[0].original_url;
    console.log(url);

    res.redirect(url)

})

app.listen( 3333, () => console.log("Server running"))
