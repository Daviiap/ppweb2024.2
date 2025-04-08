import NotFoundError from "../../errors/NotFoundError";

export default class CardNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`Card with id "${id}" not found`);
  }
}
