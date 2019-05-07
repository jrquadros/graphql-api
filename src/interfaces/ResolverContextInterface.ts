import { AuthUser } from "./AuthUserInterface";
import { DbConnection } from "./DbConnectionInterface";

export interface ResolverContext {

    db?: DbConnection;
    autorization?: string; //token
    user?: AuthUser;

}