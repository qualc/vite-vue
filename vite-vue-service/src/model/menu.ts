import * as model from "../db/cache/menu.json";

export type Menu = (typeof model)[0] & { children: Menu[]; parentName: string };
