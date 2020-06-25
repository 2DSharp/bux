import React from 'react';
import {Spin} from "antd";
import {LoadingOutlined} from '@ant-design/icons';

const GeneralSpin = (props: { size?: number }) => {
    const antIcon = <LoadingOutlined style={{fontSize: props.size ? props.size : 24}} spin/>;
    return (
        <Spin indicator={antIcon}/>
    );
};

export default GeneralSpin;
