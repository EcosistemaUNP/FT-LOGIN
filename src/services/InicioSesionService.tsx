import { urlRequest } from "../utils/Url";

export const InicioSesionService = async (
  username: string,
  password: string,
  recaptcha: string | null
) => {
  try {
    const response = await fetch(`${urlRequest}/auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        recaptcha,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const Validar2FA = async (code: string, username: string) => {
  try {
    const response = await fetch(`${urlRequest}/auth/2fa/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code2fa: code, username: username }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error validating 2FA code", error);
    throw new Error("Error validating 2FA code");
  }
};
