import Action from "../action/CreateAccountAction"
import dispatcher from "../common/dispatcher"
import { Store } from 'flux/utils';

class CreateAccountStore extends Store {
    constructor() {
        super(dispatcher);
        this.detail={
            "username":"",
            "email" : "",
            "password" : "",
            "retypePassword":"" 
        }
       
        this.tempoData={
            loading:false,
            success:false,
            message:"",
        }
        
    }
    clearAll=()=>{
        this.detail={
            "username":"",
            "email" : "",
            "password" : "",
            "retypePassword":""
            
        }
        this.tempoData={
            loading:false,
            success:false,
            message:"",
        }
    }

    getTempoData=()=>{
        return this.tempoData
    }



    getDetail=()=>{
        return this.detail
    }

    

    __onDispatch = async (action) => {
       
        if(action.type===Action.actionType.getOtpForCreateAcc){
            if(action.data.ok){
                this.tempoData.getOTP=true
            }
            else{
                this.tempoData.getOTP=false
                this.tempoData.message=action.data.data
            }
        }
        else if(action.type===Action.actionType.createAccountAPI){
            if(action.data.ok){
                this.tempoData.message=action.data.data
            }
            else{
                this.tempoData.message=action.data.data
            }
        }

        else if(action.type===Action.actionType.emailOnChangeInCreateAcc){
            this.detail.email=action.data
        }
        else if(action.type===Action.actionType.passwordOnChangeInCreateAcc){
            this.detail.password=action.data
        }
        else if(action.type===Action.actionType.nameOnChangeInCreateAcc){
            this.detail.username=action.data
        }
        else if(action.type===Action.actionType.rePasswordOnChange){
            this.detail.retypePassword=action.data
        }
        
        

        
        else{
            return false
        }
        this.__emitChange()
        return true
        
    }
}

export default new CreateAccountStore()