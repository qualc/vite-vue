import * as core from "express-serve-static-core";

declare module "express-serve-static-core" {
  export interface Response {
    sendError: <T>(msg?: string, code?: number, data?: T) => void;
    // send: <T>(data?: T, code?: number) => void;
  }
}

// declare interface Response {
//   sendError: <T>(msg?: string, code?: number, data?: T) => e.Response;
// }

// declare namespace Express {
//   export interface Response extends core.Response {
//     sendError: <T>(msg?: string, code?: number, data?: T) => void;
//   }
// }
// import { Express } from "express";

// declare namespace Express {
//   interface Response extends core.Response {
//     sendError: <T>(msg?: string, code?: number, data?: T) => void;
//   }
// }
