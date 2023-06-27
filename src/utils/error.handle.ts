import { Response } from "express";

const handleHttp = (res: Response, error: string, errorRaw?: any) => {
  console.log(errorRaw);
  res.status(500);
  res.send({ error });
};

export { handleHttp };

const createErrorFactory = (name: string) => {
  return class CostumizedError extends Error {
    constructor(message: string) {
      super(message)
      this.name = name
    }
  }
}

export const ConnectionError = createErrorFactory('ConnectionError')
export const ValidationError = createErrorFactory('ValidationError')
export const ValidationCredencialError = createErrorFactory('ValidationCredencialError')
export const ValidationEmailError = createErrorFactory('ValidationEmailError')
export const ValidationPasswordError = createErrorFactory('ValidationPasswordError')
export const ValidationRegisterError = createErrorFactory('ValidationPasswordError')
export const ValidationLoginError = createErrorFactory('ValidationLoginError')
