import dispatcher from "../common/dispatcher";
import API from '../api/customAxios';

class UserInfoAction{
    constructor(){
        this.actionType={}
        this.actionType.getProfile="getProfile"
        this.actionType.createProfileInUserInfo="createProfileInUserInfo"
        this.actionType.updateProfileInUserInfo="updateProfileInUserInfo"

        
        
    }
    
    getProfile =async()=>{
        
        try{
            var response={
                data:[],
                ok:false,
                
            }
            var res = await API.get(`/api/getProfile`)
            response.ok=true
            response.data=res.data.data
            
        }
        catch(e){
            response.ok=false
            response.data=e.message
            
        }
        dispatcher.dispatch({type:this.actionType.getProfile,data:response})
       
        
    }

    createProfile =async(request)=>{
        
        try{
            var response={
                data:[],
                ok:false,
            }
            
            var res = await API.post(`/api/createProfile`,request)
            response.ok=true
            response.data=res.data
        }
        catch(e){
            response.ok=false
            response.data=e.message
        }
        dispatcher.dispatch({type:this.actionType.createProfileInUserInfo,data:response})
        
    }

    updateProfile =async(request)=>{
        
        try{
            var response={
                data:[],
                ok:false,
            }
            var res = await API.put(`/api/updateProfile`,request)
            response.ok=true
            response.data=res.data
        }
        catch(e){
            response.ok=false
            response.data=e.message
        }
        dispatcher.dispatch({type:this.actionType.updateProfileInUserInfo,data:response})        
    }

}

export default new UserInfoAction()
