export default async function fetchCall({ method, formatedData }) {
    let route = "";
    switch (method) {
        case "POST":
            route = "apiCreate";
            break;
        case "DELETE":
            route = "apiDelete";
            break;
        case "GET":
            route = "apiGet";
            break;
        case "PATCH":
            route = "apiUpdate";
            break;
    }
    console.log(`/api/${route}`);
    const response = await fetch(`/api/${route}`, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({formatedData})
    });

    return await response.json();
}
