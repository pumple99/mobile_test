import { Layout, Button, Switch, Space, Dropdown, Collapse, Table, Modal, FloatButton, Input } from "antd";
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import React, {useState} from 'react';
import styles from '../styles/header.module.css';
import {FormOutlined, UserOutlined} from '@ant-design/icons';
import Party from './party';

React.useLayoutEffect = React.useEffect;

const { TextArea } = Input;
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
        render: (text) => <p>{text}</p>,
    },
    {
        title: '파티 이름',
        dataIndex: 'partyTitle',
        key: 'partyTitle',
        render: (text) => <p>{text}</p>,
    },
    {
        title: '파티 인원',
        dataIndex: 'partyNum',
        key: 'partyNum',
        render: (text) => <p>{text}</p>,
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
      label: <p>hi</p>,
      key: '0',
      danger: true,
    },
    {
      label: <p>hihi</p>,
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

function UserComment({ comment } : any){
    return (
        <p style={{wordBreak: "break-all"}}>{comment.intraId}: {comment.content}</p>
    );
}

function UserCard({ card } : any){

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
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

    const comments = [
        {
            id: 0,
            intraId: "default",
            content: "sdlkfjlsjlskjsd",
        },
        {
            id: 1,
            intraId: "default",
            content: "sdlkfjlsjlskjsd",
        },
    ];

    return (
            <Collapse>
                <Panel header={card.title} key="1" showArrow={false}
                extra={<span>{"메뉴: " + card.menu + " "} <UserOutlined /> {card.currentPeople} / {card.maxPeople}</span>}>
                    <Space style={{display: "flex", justifyContent: "space-between"}} direction="horizontal">
                        <p>추가 정보:</p>
                        <Button type="primary" onClick={showModal}>
                            그룹에 참여하기
                        </Button>
                        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <Party />
                        </Modal>
                    </Space>
                    <p style={{wordBreak: "break-all"}}>{card.content}</p>
                    <Table columns={columns} dataSource={parties} pagination={false}/>

                    <Collapse ghost>
                        <Panel header="댓글 창" key='1'>
                            {comments.map(comment => (
                                <UserComment comment={comment} key={comment.id}/>
                            ))}
                            <Space.Compact block>
                                <TextArea placeholder="100자 제한" maxLength={100} />
                                <Button type="primary">Submit</Button>
                            </Space.Compact>
                        </Panel>
                    </Collapse>
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
            content: "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
            available: true,

        },
        {
            id: 2,
            title: "2.아무거나 드실 분",
            currentPeople: 6,
            maxPeople: 11,
            menu: "맛있는 거",
            deliveryPrice: 3000,
            content: "1234567890",
            available: false,
        },
    ];
    
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
        <FloatButton icon={<FormOutlined />} tooltip={<div>그룹 생성하기</div>} 
        shape="square" type="primary" href="/group" description="그룹 생성"/>
        <div className={styles.pad}>
            {cards.map(card => (
                <UserCard card={card} key={card.id}/>
            ))}
        </div>
        </>
        );
}

export default Main;