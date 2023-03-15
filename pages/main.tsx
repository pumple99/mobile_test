import { Card, Layout, Button, Switch, Space, Dropdown } from "antd";
import type { MenuProps } from 'antd';
import React, {} from 'react';
import styles from '../styles/header.module.css';
import {FormOutlined} from '../node_modules/@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;
const items: MenuProps['items'] = [
    {
      label: <a href="https://www.antgroup.com">logout</a>,
      key: '0',
    },
    {
      label: <a href="https://www.aliyun.com">something</a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: '3rd menu item',
      key: '3',
    },
  ];

function UserCard({ card } : any){
    return (
        <Card title={card.title}>

        </Card>
    );
}

const Main: React.FC = () => {

    const cards = [
        {
            id: 1,
            title: "1.아무거나 드실 분",
            currentPeople: 5,
            maxPeople: 10
        },
        {
            id: 2,
            title: "2.아무거나 드실 분",
            currentPeople: 6,
            maxPeople: 11
        },
        {
            id: 3,
            title: "맛있는 거 드실 분",
            currentPeople: 1,
            maxPeople: 100
        },
        {
            id: 3,
            title: "맛있는 거 드실 분",
            currentPeople: 1,
            maxPeople: 100
        },
        {
            id: 3,
            title: "맛있는 거 드실 분",
            currentPeople: 1,
            maxPeople: 100
        },
        {
            id: 3,
            title: "맛있는 거 드실 분",
            currentPeople: 1,
            maxPeople: 100
        },
        {
            id: 3,
            title: "맛있는 거 드실 분",
            currentPeople: 1,
            maxPeople: 100
        },
        {
            id: 3,
            title: "맛있는 거 드실 분",
            currentPeople: 1,
            maxPeople: 100
        },
        {
            id: 3,
            title: "맛있는 거 드실 분",
            currentPeople: 1,
            maxPeople: 100
        },
        {
            id: 3,
            title: "맛있는 거 드실 분",
            currentPeople: 1,
            maxPeople: 100
        },
        {
            id: 3,
            title: "맛있는 거 드실 분",
            currentPeople: 1,
            maxPeople: 100
        },
        {
            id: 3,
            title: "맛있는 거 드실 분",
            currentPeople: 1,
            maxPeople: 100
        },
        {
            id: 3,
            title: "맛있는 거 드실 분",
            currentPeople: 1,
            maxPeople: 100
        },
    ]
    
    return (
        <>
        <Header className={styles.headerStyle}>
            <Space direction="horizontal">
                <Button icon={<FormOutlined />}>글 쓰기</Button>
                <Switch checkedChildren="모집 중" unCheckedChildren="마감" defaultChecked />
                <Dropdown menu={{ items }} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            seunghoy
                        </Space>
                    </a>
                </Dropdown>
            </Space>
        </Header>
        <div className={styles.pad}>
            {cards.map(card => (
        <UserCard card={card} />
    ))}
        </div>
        </>
        );
}

export default Main;