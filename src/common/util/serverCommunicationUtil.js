import axios from "axios";
import { getConst } from "../common";
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;

async function getData(url, params) {
  try {
    const response = await axios.get(`${url}`, {
      params,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function postData(url, data) {
  try {
    const response = await axios.post(`${url}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export function serverCommunicationUtil(destination, method, path, data) {
  try {
    switch (destination) {
      case "main":
        let url = getConst("main_server_url") + path;
        switch (method) {
          case "axioGet":
            return getData(url, data);
          case "axioPost":
            return postData(url, data);
          default:
            throw "method Error";
        }
      default:
        throw "destination Error";
    }

    return response.data;
  } catch (error) {
    throw error;
  }
}
