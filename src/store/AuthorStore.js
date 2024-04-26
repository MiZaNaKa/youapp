import Action from "../action/AuthorAction"
import dispatcher from "../common/dispatcher"
import { Store } from 'flux/utils';

class AuthorStore extends Store {
    constructor() {
        super(dispatcher);
        this.storyList=[]
        this.tempoData={
            current:1,
            listAll:[],
            ListPagination:[],
            offset: 0,
            data: [],
            perPage: 3,
            currentPage: 0
        }
        this.checkData={
            check:[],
            checkAll:false,
            pickerValue:[],
            selectedNo:0,
        }
    }

    getCheckData=()=>{
        return this.checkData
    }

    getStoryList=()=>{
        return this.storyList
    }

    getTempoData=()=>{
        return this.tempoData
    }

    __onDispatch = async (action) => {
       
        if(action.type===Action.actionType.getAuthorList){
            if(action.data.ok){
                
                this.tempoData.ListPagination=action.data.data.success.data.success.data
                  
                if(action.data.data.success.data.success.data.length===0){
                    this.storyList=[]
                    
                }
                else{
                    const data = this.tempoData.ListPagination;
                    const slice = data.slice(this.tempoData.offset, this.tempoData.offset + this.tempoData.perPage)
                    this.tempoData.pageCount=Math.ceil(data.length / this.tempoData.perPage)
                    this.storyList=slice

                    this.checkData.check=[]
                    this.checkData.pickerValue=[]
                    var i;
                    for (i = 0; i < this.storyList.length; i++) {
                        this.checkData.check.push(false)
                        this.checkData.pickerValue.push('1')
                        this.storyList[i].check=false
                        // this.checkData.check.push(true)
                    }
                }
                console.log(this.storyList)
                console.log(this.storyList)
                console.log(this.storyList)
            }
        }
        else if(action.type===Action.actionType.myStoryListPagination){
            const selectedPage = action.data.selected;
            const offset = selectedPage * this.tempoData.perPage;

            this.tempoData.currentpage=selectedPage
            this.tempoData.offset=offset

            const data = this.tempoData.ListPagination;
            const slice = data.slice(this.tempoData.offset, this.tempoData.offset + this.tempoData.perPage)
            
            this.tempoData.pageCount=Math.ceil(data.length / this.tempoData.perPage)
            this.storyList=slice

            this.checkData.check=[]
            this.checkData.pickerValue=[]
            var i;
            for (i = 0; i < this.storyList.length; i++) {
            this.checkData.check.push(false)
            }

            var i;
            for (i = 0; i < this.storyList.length; i++) {
                this.checkData.pickerValue.push('1')
            } 

            const filtered = this.checkData.check.filter(check => check == true);
            
            this.checkData.checkAll=false
            

            if(filtered !=0){
                this.checkData.selectedNo=filtered.length
            }
            else{
                this.checkData.selectedNo=0
            }
        }
        // else if(action.type===Action.actionType.clickCheck){
        //     console.log(this.storyList)
        //     console.log(this.storyList)
        //     this.storyList[action.data.index].check=action.data.data
        //     this.checkData.check[action.data.index]=action.data.data
        //     const filtered = this.checkData.check.filter(check => check == true);
        //     if(filtered !=0){
        //         this.checkData.selectedNo=filtered.length
        //         if(this.checkData.check.length ==filtered.length){
        //             this.checkData.checkAll=action.data.data
        //         }
        //     }
        //     else{
        //         this.checkData.selectedNo=0
        //     }
            
        //     var all=JSON.parse(JSON.stringify(this.storyList))
        //     var allTemp=JSON.parse(JSON.stringify(this.tempoData))
        //     this.storyList=all
        //     this.tempoData=allTemp

        // }
        else if(action.type===Action.actionType.checkAllAction){
            this.tempoData.checkAll=!this.tempoData.checkAll
            this.checkData.check=[]
            
            for (i = 0; i < this.storyList.length; i++) {
                this.checkData.check.push(this.tempoData.checkAll)
            }
            const filtered = this.checkData.check.filter(check => check == true);
            

            if(filtered !=0){
                this.checkData.selectedNo=filtered.length
            }
            else{
                this.checkData.selectedNo=0
            }
           
            var allTemp=JSON.parse(JSON.stringify(this.tempoData))
            this.tempoData=allTemp
        }

        else{
            return false
        }
        this.__emitChange()
        return true
        
    }
}

export default new AuthorStore()