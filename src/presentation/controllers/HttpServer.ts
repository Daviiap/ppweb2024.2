import { HttpRequest, HttpResponse } from "./ControllerHttp";

export default interface HttpServer {
  addRoute(config: routeConfig): void;
}

export type routeConfig = {
  method: "get" | "post" | "put" | "delete" | "patch";
  url: string;
  auth: "none" | "jwt";
  handle: (request: HttpRequest) => Promise<HttpResponse>;
};
