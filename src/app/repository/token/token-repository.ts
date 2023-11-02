import { Meli } from "src/app/core/models/Meli";

export class TokenRepository {
    
public saveAccessToken(meli : Meli){
    
    localStorage.setItem('@meli', JSON.stringify(meli));
}
    
public getAccessToken(): Meli | null{
    let strJSON: string | null = localStorage.getItem('@meli');
    let meli: Meli | null = null;
    if(strJSON){
        const objJSON= JSON.parse(strJSON);
        meli = new Meli(objJSON.access_token, objJSON.token_type, objJSON.expires_in, objJSON.scope, objJSON.user_id, objJSON.refresh_token);
    }
    
    return meli; 
}
}