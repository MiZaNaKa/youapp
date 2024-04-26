import React from 'react';
import { useNavigate,useParams } from 'react-router-dom';

const withNavigateHook = (Component) => {
    return (props) => {
        const navigation = useNavigate();

        return <Component navigation={navigation} {...props} params={useParams()} />
    }
}

export default withNavigateHook;