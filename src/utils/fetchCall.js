export default async function fetchCall(data) {
    const response = await fetch("/api/apiCall", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return await response.json();
}