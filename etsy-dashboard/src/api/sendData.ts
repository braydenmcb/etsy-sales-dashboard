export const sendDataToBackend = async (payload: any) => {
    const response = await fetch('http://127.0.0.1:8888/api/submitted-files/', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error('Failed to send data to backend');
    }

    return response.json();
}