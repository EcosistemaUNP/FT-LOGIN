export const InicioSesionRequest = async (username: string, password: string, recaptchaToken: string | null) => {
    try {
        const response = await fetch("http://localhost:8000/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, recaptchaToken }),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || "Error en el servidor");
        }
    } catch (error) {
        throw new Error("Error de conexión.");
    }
};