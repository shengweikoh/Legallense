const geminiApi = {

    sendPrompt: async (prompt) => {
        try {
            const response = await fetch("http://localhost:8080/api/gemini/chat", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( {prompt} )
            });
    
            if (!response.ok) {
                throw new Error("Network error detected");
            }
    
            const answer = await response.text();
            return answer
        } catch (error) {
            console.error("Error sending prompt: " + error);
        }
    } 
}

export default geminiApi;