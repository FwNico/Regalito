import { ApiService } from "src/app/core/services/api.service"


class UserRepository{
    constructor(private apiService: ApiService){}
    user = this.apiService.getUserInfo(this.apiService.myAccessToken);

}