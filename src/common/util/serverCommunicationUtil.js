import axios from "axios";
import { getConst } from "../common";

axios.defaults.withCredentials = true;

async function getData(url, params) {
  try {
    const response = await axios.get(`${url}`, {
      params,
      withCredentials: true,
      headers: {
        URL: window.location.href,
        Domain: window.location.origin,
        Path: window.location.pathname,
      },
    });

    if (window.location.pathname !== "/login") {
      if (serverValidation(response)) {
        return response.data;
      }
    }
  } catch (error) {
    throw error;
  }
}

async function postData(url, data) {
  try {
    const response = await axios.post(`${url}`, data, {
      withCredentials: true,
      headers: {
        URL: window.location.href,
        Domain: window.location.origin,
        Path: window.location.pathname,
      },
    });

    if (window.location.pathname !== "/login") {
      if (serverValidation(response)) {
        return response.data;
      }
    }
  } catch (error) {
    throw error;
  }
}

function serverValidation(result) {
  switch (result.data) {
    case "server-fail":
      alert("서버 장애.");
      break;
    case "session-fail:token":
      alert("부적절한 접근입니다.");
      break;
    case "session-fail:time":
      alert("세션시간 만료.");
      break;
    case "auth-fail:page unregistered":
      alert("페이지 미등록.");
      break;
    case "auth-fail:page permission denied":
      alert("페이지 권한없음");
      break;
    default:
      return true;
  }
  return false;
}

export async function serverCommunicationUtil(destination, method, path, data) {
  try {
    switch (destination) {
      case "main":
        let url = getConst("main_server_url") + path;
        switch (method) {
          case "axioGet":
            var result = await getData(url, data);
            return result;
          case "axioPost":
            var result = await postData(url, data);
            return result;
          default:
            throw "method Error";
        }
      default:
        throw "destination Error";
    }
  } catch (error) {
    throw error;
  }
}

export async function sessionChecker() {
  if (window.location.pathname !== "/login") {
    return serverCommunicationUtil("main", "axioPost", "/sessionCheck", {});
  }
}
