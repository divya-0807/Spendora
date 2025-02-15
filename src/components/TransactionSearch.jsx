import { Table } from 'antd';
import React from 'react';

const TransactionSearch = ({ transactions }) => {  // Destructure transactions properly
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: 'Tag',
          dataIndex: 'tag',
          key: 'tag',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
    ];

    // Ensure dataSource items have unique keys
    const dataSource = transactions.map((transaction, index) => ({
        ...transaction,
        key: transaction.id || index, // Use existing id if available, otherwise use index
    }));

    return <Table dataSource={dataSource} columns={columns} />;
}

export default TransactionSearch;
