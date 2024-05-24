const config = {
  main_server_url: process.env.REACT_APP_MAIN_SERVER_BASE_URL,
  encription_key: process.env.REACT_APP_MAIN_AES_KEY,
};

let sessionId = "";

const common = () => {
  return;
};

export const getConst = (key) => {
  return config[key];
};

export const setSessionId = (value) => {
  sessionId = value;
};

export const getSessionId = () => {
  return sessionId;
};

export default common;
