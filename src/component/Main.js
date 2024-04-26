import React from 'react';
import Header from "./Header"
import noData from "../img/noData.png"
import withNavigateHook from '../common/Navigate'
function Index (props){
    
    return<div className='body'>
        <Header/>
        
        <div className='header'>
            <div className='noDataBox'>
              <img src={noData} className='noData'/>
            </div>
        </div>
        
    </div>
}

export default withNavigateHook(Index)