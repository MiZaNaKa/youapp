import dispatcher from "../common/dispatcher";
import API from '../api/customAxios';

class AuthorAction{
    constructor(){
        this.actionType={}
        this.actionType.getAuthorList="getAuthorList";
        this.actionType.myStoryListPagination="myStoryListPagination"
        this.actionType.clickCheck="clickCheck"
        this.actionType.checkAllAction="checkAllAction"

        
    }
    checkAllAction = async (value) => {
		dispatcher.dispatch({ type: this.actionType.checkAllAction, data: value });
	}


    clickCheck = async (value) => {
		dispatcher.dispatch({ type: this.actionType.clickCheck, data: value });
	}

    myStoryListPagination = async (value) => {
		dispatcher.dispatch({ type: this.actionType.myStoryListPagination, data: value });
	}
   

    getAuthorList =async(value)=>{
        
        try{
            var response={
                data:[],
                ok:false
            }
            
            var res = await API.post(`memory/getAuthorList`,value)
            response.ok=true
            response.data=res.data
        }
        catch(e){
            response.ok=false
            response.data=e.message
        }
        dispatcher.dispatch({type:this.actionType.getAuthorList,data:response})
        
    }

    myStoryListStatusOnChange =async(value)=>{
        
        try{
            var response={
                data:[],
                ok:false
            }
            
            var res = await API.post(`memory/myStoryListStatus`,value)
            response.ok=true
            response.data=res.data
        }
        catch(e){
            response.ok=false
            response.data=e.message
        }
        dispatcher.dispatch({type:this.actionType.getAuthorList,data:response})
        
    }

    
    myStoryMultipleAction =async(value)=>{
        
        try{
            var response={
                data:[],
                ok:false
            }
            
            var res = await API.post(`memory/myStoryMultipleAction`,value)
            response.ok=true
            response.data=res.data
        }
        catch(e){
            response.ok=false
            response.data=e.message
        }
        dispatcher.dispatch({type:this.actionType.getAuthorList,data:response})
        
    }


    
    


}
export default new AuthorAction()
