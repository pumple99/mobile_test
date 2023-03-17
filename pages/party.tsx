import { Button, Form, Input, Select, Checkbox, InputNumber } from 'antd';
import React, {useState} from 'react';
import styles from '../styles/party.module.css';
import axios from 'axios';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Party: React.FC = () => {
  const [form] = Form.useForm();
  const totalPrice = undefined;
  const peopleBefore = 3;
  const [values, setValues] = useState({peopleNum: peopleBefore + 1,
    expectedPrice: totalPrice != undefined ? totalPrice/(peopleBefore + 1) : undefined});
  const maxP = 20 - peopleBefore;

  const {peopleNum, expectedPrice} = values;

  const onChange = () => {
    setValues({
      peopleNum: peopleBefore + form.getFieldValue("partyNum"),
      expectedPrice: totalPrice != undefined ?
      Math.round(totalPrice / (peopleBefore + form.getFieldValue("partyNum"))) : undefined
    });
  };

  const onFinish = () => {
    let body = form.getFieldsValue(['partyTitle', 'joinable', 'partyNum']);
    axios.post("http://localhost:5000", body);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({ partyTitle: '???의 파티', partyNum: 1});
  };

  return (
    <>
    <h1 className={styles.title}>파티 추가</h1>
    <div style={{textAlign:'right', paddingRight:'20%'}}>
        예상 배달 팁: {totalPrice}/{peopleNum}={expectedPrice}원
    </div>
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
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
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          제출
        </Button>
        <Button htmlType="button" danger onClick={onReset}>
          취소
        </Button>
        <Button type="link" htmlType="button" onClick={onFill}>
          자동 채우기
        </Button>
      </Form.Item>
    </Form>
    </>
  );
};

export default Party;