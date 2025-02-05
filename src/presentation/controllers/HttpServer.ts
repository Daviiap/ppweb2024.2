import { HttpRequest, HttpResponse } from "./ControllerHttp";

export default interface HttpServer {
  addRoute(config: routeConfig): void;
}

export type routeConfig = {
  method: "get" | "post" | "put" | "delete" | "patch";
  url: string;
  auth: "company" | "microservice" | "none";
  file?: boolean;
  handle: (request: HttpRequest) => Promise<HttpResponse>;
};
