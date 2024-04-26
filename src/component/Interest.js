import React, { useEffect, useState } from 'react';
import Header from "./Header"
import Select from 'react-select';
import Action from '../action/InterestAction'
import Store from '../store/InterestStore'
import withNavigateHook from '../common/Navigate'
function App(props) {
    var detail = Store.getDetail()
    var tempoDataAll = Store.getTempoData()
    const [form, setForm] = useState(detail)
    const [tempoData, setTempoData] = useState(tempoDataAll)

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [options, setOptions] = useState([
        // { value: 'Music', label: 'Music' },
        // { value: 'Fitness', label: 'Fitness' },
        // { value: 'Gymming', label: 'Gymming' },
        // { value: 'Baketball', label: 'Baketball' },
    ]);

    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setTempoData({ ...tempoData, success: false });       
        Store.addListener(onStoreChange)
        Action.getProfileForInterest()
    }, [])

    const onStoreChange = () => {
        var tempoDataAll = Store.getTempoData()
        var detail = Store.getDetail()
        if (tempoDataAll.success) {
            Store.clearAll()
            var obj={
                loading:false,
                success:false,
                message:""
            }
            setTempoData(obj);        
            props.navigation('/')
        }
        else {
            setTempoData({ ...tempoData, message: tempoDataAll.message });
            setForm(detail)
            setOptions(detail.interests)
            setSelectedOptions(detail.interests)
        }
    }

    const handleInputChange = (newValue, actionMeta) => {
        console.log('Input value changed:', newValue);
        setInputValue(newValue);
    };

    const insertOption = () => {
       
        var arr=[]
        for (let i = 0; i < selectedOptions.length; i++) {
            arr.push(selectedOptions[i].value)
        }
        
        detail.interests=arr
       
        Action.insertInterest(detail)
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const newOption = { value: inputValue, label: inputValue };
            setOptions([...options, newOption]);
            setSelectedOptions([...selectedOptions, newOption]);
            setInputValue('');
        }
    };

    const goBack=()=>{
        props.navigation('/')
    }



    return (
        <div>
            <Header />
            <div>

                <div className='form'>
                    <div style={{marginBottom:90}}>
                        <span
                            onClick={insertOption}
                            className="txtBlueGradient floatR txtCursor">
                            Save
                        </span>

                        <h4  onClick={goBack} className="editAboutText txtCursor">
                            &lt;  Back
                        </h4>
                    </div>
                    <div className="app">
                        <h4 className='tit03'>Tell everyone about yourself</h4>
                        <h3 className='tit03'>What interest you?</h3>
                        <br /><br />

                        <Select
                            isMulti
                            inputValue={inputValue}
                            onInputChange={handleInputChange}
                            options={options}
                            value={selectedOptions}
                            onChange={(selected) => setSelectedOptions(selected)}
                            className='multipleSelect'
                            onKeyDown={handleKeyDown}
                        />

                        {/* <button className='interestButton'

                            onClick={insertOption}
                        >
                            Save
                        </button> */}

                        <p className='text'>{tempoData.message}</p>

                        <p className='txt txtCenter marginT'>There is no data in option list.You can type any word and then press Enter Key to add option list</p>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default withNavigateHook(App);


