import Action from "../action/AboutAction"
import dispatcher from "../common/dispatcher"
import { Store } from 'flux/utils';

class AboutStore extends Store {
    constructor() {
        super(dispatcher);
        this.detail={
            "name": "",
            "birthday": "",
            "height": "",
            "weight": "",
            "horoscope": "",
            "zodiac": "",
            "gender": "",
            "interests": []
        }
        this.tempoData={
            loading:false,
            success:false,
            message:"",
            update:false
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
            "interests": []
        }
        this.tempoData={
            loading:false,
            success:false,
            message:"",
            update:false
        }
    }

    getTempoData=()=>{
        return this.tempoData
    }



    getDetail=()=>{
        return this.detail
    }

    

    __onDispatch = async (action) => {
       
        if(action.type===Action.actionType.createProfile){
            if(action.data.ok){
                if(action.data.data.message==='Profile has been created successfully'){
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
        else if(action.type===Action.actionType.getDataForUpdate){
            this.detail=action.data
        }

        else if(action.type===Action.actionType.getProfileForAbout){
            if(action.data.ok){
                if(action.data.data.message==='Profile has been found successfully'){
                    if(action.data.data.data.horoscope==='Error'|| !action.data.data.data.horoscope){
                        this.detail={
                            "name": "",
                            "birthday": "",
                            "height": "",
                            "weight": "",
                            "horoscope": "",
                            "zodiac": "",
                            "gender": "",
                            "interests": action.data.data.data.interests
                        }
                    }
                    else if(action.data.data.data.horoscope){
                        this.detail=action.data.data.data
                    }
                    console.log(this.detail)
                    console.log(this.detail)
                    // this.detail=action.data.data.data
                    this.tempoData.update=true
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

        else if(action.type===Action.actionType.updateProfile){
            if(action.data.ok){
                
                if(action.data.data.message==='Profile has been updated successfully'){
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

export default new AboutStore()