import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps } from 'antd';
import { Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const items: MenuProps['items'] = [
    {
        key: 'dashboard',
        label: 'Dashboard'
    },
    {
        key: 'profile',
        label: 'Profile'
    },
    {
        key: 'user-management',
        label: 'User Management',
        children: [
            {
                key: 'create-admin',
                label: 'Crate Admin'
            },
            {
                key: 'create-student',
                label: 'Create Student'
            }
        ]

    }
]

const MainLayout = () => {

    return (
        <Layout style={{ height: '100vh' }}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div style={{ color: 'white', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h1 style={{ textAlign: 'center', fontSize: '20px', }}>PH Uni</h1>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0 }} />
                <Content style={{ margin: '24px 16px 0' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default MainLayout;