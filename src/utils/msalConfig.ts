import { Configuration, LogLevel } from "@azure/msal-browser";
import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID
      ? process.env.REACT_APP_CLIENT_ID
      : "",
    authority: process.env.REACT_APP_AUTHORITY,
    redirectUri: process.env.REACT_APP_REDIRECT_URL,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true,
  },
  system: {
    loggerOptions: {
      logLevel: LogLevel.Info,
      loggerCallback: (level, message, containsPii) => {
        console.log(message);
      },
    },
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
