import dispatcher from "../common/dispatcher";
import API from '../api/customAxios';

class LoginAction{
    constructor(){
        this.actionType={}
        this.actionType.LoginAction="LoginAction"
    }
    
    LoginAction =async(request)=>{
        
        try{
            var response={
                data:[],
                ok:false,
                userInfo:"",
                access_token:''
            }
            
            var res = await API.post(`/api/login`,request)
            delete request.password
            response.userInfo=request
            response.ok=true
            response.data=res.data.message
            response.access_token=res.data.access_token
        }
        catch(e){
            response.ok=false
            response.data=e.message
        }
        dispatcher.dispatch({type:this.actionType.LoginAction,data:response})
        
    }

}

export default new LoginAction()
