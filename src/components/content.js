import React from 'react';
import { Layout } from 'element-react';
import Info from './info';
import Weight from './weight';
import History from './history';

const Content = () => {
    return (
    <Layout.Row gutter="2" className="pl-10 pr-10 mt-2">
        <Layout.Col span="8">
            <Info/>
        </Layout.Col>
        <Layout.Col span="8">
            <Weight/>
        </Layout.Col>
        <Layout.Col span="8">
          <History/>
        </Layout.Col>
    </Layout.Row>
    );
};

export default Content;