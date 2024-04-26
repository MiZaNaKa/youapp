
import dispatcher from "../common/dispatcher";
import API from '../api/customAxios';

class InterestAction{
    constructor(){
        this.actionType={}
        this.actionType.getProfileForInterest="getProfileForInterest"
        this.actionType.insertInterest="insertInterest"
        
    }
    
    getProfileForInterest =async()=>{
        
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
        dispatcher.dispatch({type:this.actionType.getProfileForInterest,data:response})
       
        
    }

    insertInterest =async(request)=>{
        
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
        dispatcher.dispatch({type:this.actionType.insertInterest,data:response})
       
        
    }


    

}

export default new InterestAction()
