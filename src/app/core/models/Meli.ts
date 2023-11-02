

export class Meli {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    user_id: number;
    refresh_token: string;

    constructor(access_token: string, token_type: string, expires_in: number, scope: string, user_id: number, refresh_token: string) {
        this.access_token = access_token
        this.token_type = token_type
        this.expires_in = expires_in
        this.scope = scope
        this.user_id = user_id
        this.refresh_token = refresh_token
    }

    
}
