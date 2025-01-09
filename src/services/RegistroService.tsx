import { urlRequest } from "../utils/Url";

export const RegistroService = async (username: string, email: string) => {
  try {
    const response = await fetch(`${urlRequest}/registro/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuario: username, correo: email }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(data.error);

      throw new Error(data.error);
    }

    return { message: data.message };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
