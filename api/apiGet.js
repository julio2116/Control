export default async function apiGet(req, res) {
    const url = process.env.URL;
    const { id } = req.query;
    let response;

    try {
        if (id) {
            const payload = encodeURIComponent(JSON.stringify([{ id: id }]));
            response = await fetch(`${url}?route=readOne&lista=${payload}`);
        } else {
            response = await fetch(url);
        }

        const myResponse = await response.json();
        const result = myResponse.item || myResponse.items;
        res.status(200).json({ result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
