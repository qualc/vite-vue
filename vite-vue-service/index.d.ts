declare global {
  namespace Express {
    export interface Response {
      sendError(msg: string, code?: number, data: any): this;
    }
  }
}
