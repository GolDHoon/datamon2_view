const config = {
  main_server_url: process.env.REACT_APP_MAIN_SERVER_BASE_URL,
  encription_key: process.env.REACT_APP_MAIN_AES_KEY,
  MAST: process.env.REACT_APP_MAST,
  DEVL: process.env.REACT_APP_DEVL,
  INME: process.env.REACT_APP_INME,
  CLNT: process.env.REACT_APP_CLNT,
  ADAC: process.env.REACT_APP_ADAC,
  CLME: process.env.REACT_APP_CLME,
  AAME: process.env.REACT_APP_AAME,
  CRAC: process.env.REACT_APP_CRAC,
  CAME: process.env.REACT_APP_CAME,
};

let variable = {};

const common = () => {
  return;
};

export const getConst = (key) => {
  return config[key];
};

export const setSessionStorage = (key, value) => {
  // Check if the given value is a string or not
  if (typeof value === "string") {
    sessionStorage.setItem(key, value);
  } else {
    // Convert non-string values to a string using JSON.stringify
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export const getSessionStorage = (key) => {
  const value = sessionStorage.getItem(key);

  // Try to parse the retrieved string as JSON
  try {
    return JSON.parse(value);
  } catch (err) {
    // If parsing failed (which means the value is a regular string), return the string
    return value;
  }
};

export default common;
