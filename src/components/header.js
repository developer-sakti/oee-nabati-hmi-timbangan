import React, { useContext } from 'react';
import { Layout, Icon } from 'element-react';
import { Context } from '../context/reducers';

const Disconnected = () => {
    return (
        <div className="p-2 text-center uppercase font-bold border-solid border-2 border-red-600 text-red-600 rounded">
            <span><Icon name="circle-close"/> Disconnected</span>
        </div>
    );
};

const Connected = () => {
    return (
        <div className="p-2 text-center uppercase font-bold border-solid border-2 border-green-600 text-green-600 rounded">
            <span><Icon name="circle-check"/> Connected</span>
        </div>
    );
};

const Header = () => {
    const { store, dispatch } = useContext(Context);

    return (
    <Layout.Row gutter="2" className="select-none">
        <Layout.Col span="6" offset="3">
        <div className="bg-blue-600 p-2 text-center uppercase text-white font-bold rounded border-solid border-2 border-blue-600">
            timbangan
        </div>
        </Layout.Col>
        <Layout.Col span="6">
        <div className="p-2 text-center uppercase font-bold border-solid border-2 border-blue-600 rounded">
            {store.time}
        </div>
        </Layout.Col>
        <Layout.Col span="6">
            {store.isConnected ? <Connected/>:<Disconnected/>}
        </Layout.Col>
    </Layout.Row>
    );
};

export default Header;