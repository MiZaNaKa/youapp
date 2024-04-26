import React from 'react';
import { useParams } from 'react-router-dom';

const useParam = (Component) => {
    return (props) => {
        const param = useParams();

        return <Component param={param} {...props} params={useParams()} />
    }
}

export default useParam;