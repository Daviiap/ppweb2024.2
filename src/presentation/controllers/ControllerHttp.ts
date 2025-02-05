import OutputDTO from "../dtos/output/OutputDTO";

export default interface ControllerHttp {
  setAllControllerRoutes(): void;
}

export type HttpResponse = {
  statusCode: number;
  body?: OutputDTO;
};

export type HttpRequest = {
  body: Record<string, unknown>;
  query: Record<string, unknown>;
  params: Record<string, unknown>;
};
