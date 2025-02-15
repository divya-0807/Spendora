import { Button, Card, Row, Col } from "antd";
import React from "react";

const Cards = ({income,expense,balance,showExpenseModal, showIncomeModal}) => {
  return (
    <div className="m-5 p-5">
      <Row gutter={[16, 16]} justify="space-between">
        <Col>
          <Card className="shadow-xl w-[400px] h-[170px] text-left text-4xl" title="Current Balance">
            <p className="text-left text-xl mb-2.5">{balance}</p>
            <button className="shadow cursor-pointer mb-4 ml-[40px] w-[250px] text-xl bg-blue-500 text-white rounded-sm h-[30px] 
              hover:bg-white hover:text-blue-500 border border-blue-500 transition-all duration-300">
              Reset Balance
            </button>
          </Card>
        </Col>
        <Col>
          <Card className="shadow-xl w-[400px] h-[170px] text-left text-4xl" title="Total Income">
            <p className="text-left text-xl mb-2.5">{income}</p>
            <button 
            onClick={showIncomeModal}
            className="shadow cursor-pointer mb-4 ml-[40px] w-[250px] text-xl bg-blue-500 text-white rounded-sm h-[30px] 
              hover:bg-white hover:text-blue-500 border border-blue-500 transition-all duration-300">
            Add Income
            </button>
          </Card>
        </Col>
        <Col>
          <Card className="shadow-xl w-[400px] h-[170px] text-left text-4xl" title="Total Expenses">
            <p className="text-left text-xl mb-2.5">{expense}</p>
            <button
            onClick={showExpenseModal}
            className="shadow cursor-pointer mb-4 ml-[40px] w-[250px] text-xl bg-blue-500 text-white rounded-sm h-[30px] 
              hover:bg-white hover:text-blue-500 border border-blue-500 transition-all duration-300">
              Add Expenses
            </button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Cards;
