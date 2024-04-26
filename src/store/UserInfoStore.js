import Action from "../action/UserInfoAction"
import dispatcher from "../common/dispatcher"
import { Store } from 'flux/utils';

class UserInfoStore extends Store {
    constructor() {
        super(dispatcher);
        this.detail={
            "name": "",
            "birthday": "",
            "height": "",
            "weight": "",
            "horoscope": "",
            "zodiac ": "",
            "gender ": "",
            "interests":[]
        }

        this.form={
            "name": "",
            "birthday": "",
            "height": "",
            "weight": "",
            "horoscope": "",
            "zodiac ": "",
            "gender ": "",
            "interests":[]
        }


        this.tempoData={
            loading:false,
            success:false,
            message:""
        }
        
    }
    clearAll=()=>{
        this.detail={
            "name": "string",
            "birthday": "string",
            "height": 0,
            "weight": 0,
            "horoscope": "",
            "zodiac ": "",
            "gender ": "",
            "interests":[]
        }
        this.tempoData={
            loading:false,
            success:false,
            message:""
        }
        this.form={
            "name": "",
            "birthday": "",
            "height": "",
            "weight": "",
            "horoscope": "",
            "zodiac ": "",
            "gender ": "",
            "interests":[]
        }
    }

    
    getForm=()=>{
        return this.form
    }


    getTempoData=()=>{
        return this.tempoData
    }



    getDetail=()=>{
        return this.detail
    }

    

    __onDispatch = async (action) => {
       
        if(action.type===Action.actionType.getProfile){
            if(action.data.ok){
                this.detail=action.data.data
                this.form=action.data.data
            }
            else{
                this.tempoData.message=action.data.data
            }
        }
        else if(action.type===Action.actionType.createProfileInUserInfo){
            if(action.data.ok){
                if(action.data.data.message==='Profile has been created successfully'){
                    this.detail=action.data.data.data
                    this.form=action.data.data.data
                    this.tempoData.success=true
                }
                else{
                    this.tempoData.success=false
                    this.tempoData.message=action.data.data.message
                }
            }
            else{
                this.tempoData.success=false
                this.tempoData.message='Session key is expired.Please Login agian'
            }
        }

        else if(action.type===Action.actionType.updateProfileInUserInfo){
            if(action.data.ok){
                if(action.data.data.message==='Profile has been updated successfully'){
                    this.detail=action.data.data.data
                    this.form=action.data.data.data
                    this.tempoData.success=true
                }
                else{
                    this.tempoData.success=false
                    this.tempoData.message=action.data.data.message
                }
            }
            else{
                this.tempoData.success=false
                // this.tempoData.message=action.data.data
                this.tempoData.message='Session key is expired.Please Login agian'
            }
        }

        
        else{
            return false
        }
        this.__emitChange()
        return true
        
    }
}

export default new UserInfoStore()