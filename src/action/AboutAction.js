import dispatcher from "../common/dispatcher";
import API from '../api/customAxios';

class AboutAction{
    constructor(){
        this.actionType={}
        this.actionType.createProfile="createProfile"
        this.actionType.getDataForUpdate="getDataForUpdate"
        this.actionType.getProfileForAbout="getProfileForAbout"
        this.actionType.updateProfile="updateProfile"
        
    }

    getDataForUpdate = async (value) => {
		dispatcher.dispatch({ type: this.actionType.getDataForUpdate, data: value });
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
        dispatcher.dispatch({type:this.actionType.createProfile,data:response})
        
    }

    getProfile =async()=>{
        
        try{
            var response={
                data:[],
                ok:false,
            }
            var res = await API.get(`/api/getProfile`)
            response.ok=true
            response.data=res.data
        }
        catch(e){
            response.ok=false
            response.data=e.message
            
        }
        dispatcher.dispatch({type:this.actionType.getProfileForAbout,data:response})
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
        dispatcher.dispatch({type:this.actionType.updateProfile,data:response})        
    }

}

export default new AboutAction()
