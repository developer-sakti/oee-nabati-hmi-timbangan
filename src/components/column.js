import React from 'react';
import { Layout } from 'element-react';

const Column = () => {
    return (
    <Layout.Row gutter="0" className="pl-10 pr-10 pt-10 select-none">
        <Layout.Col span="8">
          <div className="uppercase font-bold bg-blue-600 p-2 rounded-l-lg text-center text-white">info</div>
        </Layout.Col>
        <Layout.Col span="8">
          <div className="uppercase font-bold bg-blue-600 p-2 text-center text-white">weight</div>
        </Layout.Col>
        <Layout.Col span="8">
          <div className="uppercase font-bold bg-blue-600 p-2 rounded-r-lg text-center text-white">history</div>
        </Layout.Col>
    </Layout.Row>
    );
};

export default Column;