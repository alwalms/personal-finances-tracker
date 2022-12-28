import 'antd/dist/reset.css';
import { useState, useEffect } from 'react';
import { Layout, Table, Button, Form, Input, InputNumber, Card, Row, Col } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const { Header, Footer, Content } = Layout;

function Home() {
  const [showOutgoing, setShowOutgoing] = useState(false)
  const [showIncome, setShowIncome] = useState(false)
  const [showSavings, setShowSavings] = useState(false)

  // OUTGOING
  const [outgoing, setOutgoing] = useState(() => {
    return JSON.parse(localStorage.getItem("outgoing")) || []
  });

  useEffect(() => {
    localStorage.setItem("outgoing", JSON.stringify(outgoing));
  }, [outgoing]);
  
  function triggerAddOutgoing(values) {
    setOutgoing([
      ...outgoing,
      { key: uuidv4(), name: values.name, amount: values.amount }
    ]);
  }
  
  function triggerShowOutgoing() {
    setShowIncome(false);
    setShowSavings(false);
    setShowOutgoing(!showOutgoing);
  }

  const outgoingTotal = outgoing && outgoing.reduce((a,v) =>  a = a + v.amount , 0 )

  // INCOME
  const [income, setIncome] = useState(() => {
    return JSON.parse(localStorage.getItem("income")) || []
  });
  
  useEffect(() => {
    localStorage.setItem("income", JSON.stringify(income));
  }, [income]);
  
  function triggerAddIncome(values) {
    setIncome([
      ...income,
      { key: uuidv4(), name: values.name, amount: values.amount }
    ]);
  }

  function triggerShowIncome() {
    setShowIncome(!showIncome);
    setShowSavings(false);
    setShowOutgoing(false);
  }

  const incomeTotal = income && income.reduce((a,v) =>  a = a + v.amount , 0 )


  // SAVINGS
  const [savings, setSavings] = useState(() => {
    return JSON.parse(localStorage.getItem("savings")) || []
  });
  
  useEffect(() => {
    localStorage.setItem("savings", JSON.stringify(savings));
  }, [savings]);
  
  function triggerAddSavings(values) {
    setSavings([
      ...savings,
      { key: uuidv4(), name: values.name, amount: values.amount }
    ]);
  }

  function triggerShowSavings() {
    setShowIncome(false);
    setShowSavings(!showSavings);
    setShowOutgoing(false);
  }

  const savingsTotal = savings && savings.reduce((a,v) =>  a = a + v.amount , 0 )

  // FORECAST STUFF HERE
  const predRemainingMonthly = incomeTotal - outgoingTotal

  // GENERIC STUFF HERE
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
  ];

  return (
    <>
      <Layout>
        <Header>
          <h1 style={{ color:"white" }}>This is a website about finances.</h1>
        </Header>
        <Content style={{ padding: '50px' }}>
          <div className="site-layout-content" style={{ background: "white", padding: "25px" }}>
            <Row gutter={24} style={{ marginBottom: "20px" }}>
              <Col span={8}>
                <Card title="Summary">
                  Monthly outgoing total: <b>£{outgoingTotal}</b>
                  <Button type="primary" style={{ marginLeft: "20px" }} onClick={triggerShowOutgoing}>
                    Show/Hide Outgoings
                  </Button>
                  <br></br>
                  Monthly income total: <b>£{incomeTotal}</b>
                  <Button type="primary" style={{ marginLeft: "20px", marginTop: "20px" }} onClick={triggerShowIncome}>
                    Show/Hide Income
                  </Button>
                  <br></br>
                  Current savings total: <b>£{savingsTotal}</b>
                  <Button type="primary" style={{ marginLeft: "20px", marginTop: "20px" }} onClick={triggerShowSavings}>
                    Show/Hide Savings
                  </Button>
                </Card>
              </Col>
              <Col span={16}>
                <Card title="Forecast">
                  You have <b>£{predRemainingMonthly}</b> remaining each month.
                  Over 12 months this is <b>£{predRemainingMonthly*12}</b>.
                  In 12 months your savings should be <b>£{savingsTotal + (predRemainingMonthly*12)}</b>.

                </Card>
              </Col>
            </Row>
            { showOutgoing ? <div>
              <h2 style={{ padding:"25px 0 25px 0" }}>Outgoings</h2>
              <Form
                name="basic"
                labelCol={{ span: 2}}
                wrapperCol={{ span: 6 }}
                onFinish={triggerAddOutgoing}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: 'Please input the name!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Amount"
                  name="amount"
                  rules={[{ required: true, message: 'Please input the amount!' }]}
                >
                  <InputNumber min={0} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 2, span: 8 }}>
                  <Button type="primary" htmlType="submit">
                    Add Outgoing
                  </Button>
                </Form.Item>
              </Form>
              <Table
                columns={columns}
                dataSource={outgoing}
              />
            </div> : null }
            { showIncome ? <div>
              <h2 style={{ padding:"25px 0 25px 0" }}>Income</h2>
              <Form
                name="basic"
                labelCol={{ span: 2}}
                wrapperCol={{ span: 6 }}
                onFinish={triggerAddIncome}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: 'Please input the name!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Amount"
                  name="amount"
                  rules={[{ required: true, message: 'Please input the amount!' }]}
                >
                  <InputNumber min={0} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 2, span: 8 }}>
                  <Button type="primary" htmlType="submit">
                    Add Income
                  </Button>
                </Form.Item>
              </Form>
              <Table
                columns={columns}
                dataSource={income}
              />
            </div> : null }
            { showSavings ? <div>
              <h2 style={{ padding:"25px 0 25px 0" }}>Savings</h2>
              <Form
                name="basic"
                labelCol={{ span: 2}}
                wrapperCol={{ span: 6 }}
                onFinish={triggerAddSavings}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: 'Please input the name!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Amount"
                  name="amount"
                  rules={[{ required: true, message: 'Please input the amount!' }]}
                >
                  <InputNumber min={0} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 2, span: 8 }}>
                  <Button type="primary" htmlType="submit">
                    Add Savings
                  </Button>
                </Form.Item>
              </Form>
              <Table
                columns={columns}
                dataSource={savings}
              />
            </div> : null }
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>This is some pointless information at the bottom</Footer>
      </Layout>
    </>
  )
}

export default Home;