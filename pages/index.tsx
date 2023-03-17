import { Layout, Button, Switch, Space, Dropdown, Collapse, Table, Modal, 
    FloatButton, Input, Form, Checkbox, InputNumber } from "antd";
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import React, {useState} from 'react';
import styles from '../styles/header.module.css';
import {FormOutlined, UserOutlined} from '@ant-design/icons';
import axios from "axios";

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

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  
const tailLayout = {
wrapperCol: { offset: 8, span: 16 },
};


function UserComment({ comment } : any){
    return (
        <p style={{wordBreak: "break-all"}}>{comment.intraId}: {comment.content}</p>
    );
}

function UserCard({ card } : any){

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();
    const totalPrice = card.deliveryPrice;
    const peopleBefore = card.currentPeople;
    const [values, setValues] = useState({peopleNum: peopleBefore + 1,
      expectedPrice: totalPrice != undefined ? Math.round(totalPrice/(peopleBefore + 1)) : undefined});
    const maxP = card.maxPeople - peopleBefore;
    const {peopleNum, expectedPrice} = values;

    const [text, setText] = useState("");

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        //party를 post 하는 부분
        let partyBody = form.getFieldsValue(["partyTitle", "joinable", "partyNum"]);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onChange = () => {
      setValues({
        peopleNum: peopleBefore + form.getFieldValue("partyNum"),
        expectedPrice: totalPrice != undefined ?
        Math.round(totalPrice / (peopleBefore + form.getFieldValue("partyNum"))) : undefined
      });
    };

    function onCommentSubmit() {
        //comment를 post 하는 부분
        let commentBody = {
            content: text,
        };
    }

    function onTextChange(e : any) {
        setText(e.target.value);
        console.log(e.target.value);
    }

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
                            <h1 className={styles.title}>파티 추가</h1>
                            <div style={{textAlign:'right', paddingRight:'20%'}}>
                                예상 배달 팁: {totalPrice}/{peopleNum}={expectedPrice}원
                            </div>
                            <Form
                            {...layout}
                            form={form}
                            name="control-hooks"
                            initialValues={{
                                ["joinable"]: false,
                                ["partyNum"]: 1
                            }}
                            className={styles.form}
                            >
                            <Form.Item name="partyTitle" label="파티 이름" rules={[{ required: true }]}>
                                <Input placeholder='파티 이름을 적어주세요'/>
                            </Form.Item>
                            <Form.Item name="joinable" rules={[{ required: false }]} valuePropName="checked">
                                <Checkbox defaultChecked={false}>따로 먹을게요</Checkbox>
                            </Form.Item>
                            <Form.Item name="partyNum" label="파티 인원" rules={[{ required: true }]}>
                                <InputNumber min={1} max={maxP} onChange={onChange} />
                            </Form.Item>
                            </Form>
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
                                <TextArea placeholder="100자 제한" maxLength={100} onChange={onTextChange}/>
                                <Button type="primary" onClick={onCommentSubmit}>Submit</Button>
                            </Space.Compact>
                        </Panel>
                    </Collapse>
                </Panel>
            </Collapse>
    );
}

const Main: React.FC = () => {
    const [switchValue, setSwitchValue] = useState(true);

    const handleSwitchChange = (checked: boolean) => {
        setSwitchValue(checked);
    };

    const cards = [
        {
            id: 1,
            title: "1.아무거나",
            currentPeople: 5,
            maxPeople: 10,
            menu: "미정",
            deliveryPrice: 4000,
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
    let availableCard = Array();
    let unavailableCard = Array();
    cards.map(c => (
        c.available ? availableCard.push(c) : unavailableCard.push(c)
    ));
    
    return (
        <>
        <Header className={styles.headerStyle}>
            <Space className={styles.headerSpace}direction="horizontal">
                <Button href="/group" icon={<FormOutlined />}>글 쓰기</Button>
                <Switch checkedChildren="모집 중" unCheckedChildren="마감" defaultChecked={true} onChange={handleSwitchChange}/>
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
            {switchValue ? availableCard.map(card => (<UserCard card={card} key={card.id}/>))
            : unavailableCard.map(card => (<UserCard card={card} key={card.id}/>))}
        </div>
        </>
        );
}

export default Main;