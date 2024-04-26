import Action from "../action/InterestAction"
import dispatcher from "../common/dispatcher"
import { Store } from 'flux/utils';

class InterestStore extends Store {
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
       
        if(action.type===Action.actionType.getProfileForInterest){
            if(action.data.ok){
                this.detail=action.data.data
                if(this.detail.interests.length>0){
                    var arr=[]
                    var total=this.detail.interests
                    for (let i = 0; i < total.length; i++) {
                        const newOption = { value: total[i], label: total[i] };
                        arr.push(newOption)
                    }
                    this.detail.interests=arr
                }
            }
            else{
                console.log(action.data.data)
                console.log(action.data.data)
                // this.tempoData.message=action.data.data
                this.tempoData.message='Session key is expired.Please Login agian'
            }
        }
        else if(action.type===Action.actionType.insertInterest){
            if(action.data.ok){
                
                if(action.data.data.message==='Profile has been updated successfully'){
                    this.detail=action.data.data.data
                    this.tempoData.success=true
                }
                else{
                    this.tempoData.success=false
                    this.tempoData.message=action.data.data.message
                }
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

export default new InterestStore()