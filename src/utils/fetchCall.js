export default async function fetchCall({ route, formatedData }) {
    let method = "";
    switch (route) {
        case "apiCreate":
            method = "POST";
            break;
        case "apiDelete":
            method = "DELETE";
            break;
        case "apiGet":
            method = "GET";
            break;
        case "apiUpdate":
            method = "PATCH";
            break;
        case "apiLogin":
            method = "POST";
            break;
    }
    console.log(`/api/${route}`)
    const response = await fetch(`/api/${route}`, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({formatedData})
    });
    
    return await response.json();
}
