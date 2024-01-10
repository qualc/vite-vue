import { Role } from "@/model/role";
import DB from "./data";

class RoleDb extends DB<Role> {
  constructor() {
    super("role");
  }
}

export default new RoleDb();
