import { Layout, Button, Switch, Space, Dropdown, Collapse, Table } from "antd";
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import React, {} from 'react';
import styles from '../styles/header.module.css';
import {FormOutlined, UserOutlined} from '@ant-design/icons';

React.useLayoutEffect = React.useEffect;

const { Panel } = Collapse;
const { Header, Footer, Sider, Content } = Layout;

interface DataType {
    intraId: string;
    partyTitle: string;
    partyNum: number;
    joinable: boolean;
  }

const columns: ColumnsType<DataType> = [
    {
        title: '파티장',
        dataIndex: 'intraId',
        key: 'intraId',
        render: (text) => <a>{text}</a>,
    },
    {
        title: '파티 이름',
        dataIndex: 'partyTitle',
        key: 'partyTitle',
        render: (text) => <a>{text}</a>,
    },
    {
        title: '파티 인원',
        dataIndex: 'partyNum',
        key: 'partyNum',
        render: (text) => <a>{text}</a>,
    },
    {
        title: '공동 식사 여부',
        dataIndex: 'joinable',
        key: 'joinable',
        render: (joinable) => joinable == true ? <p>같이 먹어도 되요</p> : <p>따로 먹을게요</p>,
    },
];

const items: MenuProps['items'] = [
    {
      label: <a href="/login">logout</a>,
      key: '0',
      danger: true,
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
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
    //어떤 호출로 파티들을 받아옴
    const parties: DataType[] = [
        {
            intraId: "someone",
            partyTitle: "파티 이름",
            partyNum: 2,
            joinable: true,
        },
        {
            intraId: "someone",
            partyTitle: "파티 이름",
            partyNum: 2,
            joinable: true,
        },
        {
            intraId: "seunghoy",
            partyTitle: "seunghoy의 파티",
            partyNum: 3,
            joinable: false,
        },
    ];
    return (
            <Collapse>
                <Panel header={card.title} key="1" showArrow={false}
                extra={<span>{"메뉴: " + card.menu + " "} <UserOutlined /> {card.currentPeople} / {card.maxPeople}</span>}>
                    <div>추가 정보: {card.content}</div>
                    <Table columns={columns} dataSource={parties} pagination={false}/>
                </Panel>
            </Collapse>
    );
}

const Main: React.FC = () => {

    const cards = [
        {
            id: 1,
            title: "1.아무거나",
            currentPeople: 5,
            maxPeople: 10,
            menu: "미정",
            deliveryPrice: 3000,
            content: "뭔가 하고 싶은 말",
            available: true,

        },
        {
            id: 2,
            title: "2.아무거나 드실 분",
            currentPeople: 6,
            maxPeople: 11,
            available: false,
        },
    ]
    
    return (
        <>
        <Header className={styles.headerStyle}>
            <Space className={styles.headerSpace}direction="horizontal">
                <Button href="/group" icon={<FormOutlined />}>글 쓰기</Button>
                <Switch checkedChildren="모집 중" unCheckedChildren="마감" defaultChecked />
                <Dropdown menu={{ items }} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                        Click me
                        </Space>
                    </a>
                </Dropdown>
            </Space>
        </Header>
        <div className={styles.pad}>
            {cards.map(card => (
                <UserCard card={card} key={card.id}/>
            ))}
        </div>
        </>
        );
}

export default Main;