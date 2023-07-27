import axios, { AxiosInstance } from "axios";

export class AxiosService {
  private baseUrl;
  public instance: AxiosInstance;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;

    this.instance = axios.create({
      timeout: 30000,
      timeoutErrorMessage: "Request Timeout",
      baseURL: this.baseUrl,
    });

    this.instance.interceptors.request.use(
      (config: any) => {
        let token = JSON.parse(localStorage.getItem("auth")!).tokens.access.token
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        } else {
          window.location.href = "/signin"
        }

        return config;
      },
      (error) => {

          console.log(error);
        
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {

          console.log("SUC Resp: ", response.data);

        return response;
      },
      (error) => {
        if (error.response) {
          if (error.response?.status === 401) {
            console.log(`Error: 401, redirect to sign in page`)
            // log out
            window.location.href = "/signin"
          }
          
            console.log("ERR Resp: ", error.response);
          
          return Promise.reject(error.response);
        }

          console.log("Err: ", error);

        return Promise.reject(error);
      }
    );
  }
}

const appService = new AxiosService("https://test.tracnghiem.bfd.vn/v1").instance

export default appService
