import Action from "../action/LoginAction"
import AsyncStorage from '@react-native-async-storage/async-storage';
import dispatcher from "../common/dispatcher"
import { Store } from 'flux/utils';

class LoginStore extends Store {
    constructor() {
        super(dispatcher);
        this.detail={
            "email" : "",
            "password" : "",
            "username":""
        }
        this.tempoData={
            loading:false,
            success:false,
            message:""
        }
        
    }
    clearAll=()=>{
        this.detail={
            "email" : "",
            "password" : "",
            "username":""
        }
        this.tempoData={
            loading:false,
            success:false,
            message:""
        }
    }

    getTempoData=()=>{
        return this.tempoData
    }



    getDetail=()=>{
        return this.detail
    }

    

    __onDispatch = async (action) => {
       
        if(action.type===Action.actionType.LoginAction){
            if(action.data.ok){
                AsyncStorage.setItem('jwt', action.data.access_token)
                AsyncStorage.setItem('userInfo', JSON.stringify(action.data.userInfo))
                this.tempoData.success=true
            }
            else{
                this.tempoData.success=false
                this.tempoData.message=action.data.data
            }
        }
        else{
            return false
        }
        this.__emitChange()
        return true
        
    }
}

export default new LoginStore()