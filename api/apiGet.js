export default async function apiGet(req, res) {
    const url = process.env.URL;
    const { id } = req.query;
    console.log(4, id)
    try {
        if (id) {
            const payload = encodeURIComponent(JSON.stringify([{ id }]));

            response = await fetch(`${url}?route=readOne&lista=${payload}`);
        } else {
            response = await fetch(url);
        }

        const data = await response.json();
        console.log(15, data)
        res.status(200).json({ data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
