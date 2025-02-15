import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import { Modal } from 'antd';
import AddExpenseModal from './Modals/AddExpense';
import AddIncomeModal from './Modals/AddIncome';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import moment from 'moment';
import TransactionSearch from './TransactionSearch';


const Dashboard = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const showExpenseModal = () => setIsExpenseModalVisible(true);
  const showIncomeModal = () => setIsIncomeModalVisible(true);
  const handleExpenseCancel = () => setIsExpenseModalVisible(false);
  const handleIncomeCancel = () => setIsIncomeModalVisible(false);

  // **Handles Adding a New Transaction**
  const onFinish = async (values, type) => {
    const newTransaction = {
      type: type,
      date: moment(values.date).format('YYYY-MM-DD'),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };

    try {
      await addDoc(collection(db, `users/${user.uid}/transactions`), newTransaction);
      toast.success('Transaction Added');
      fetchTransactions(); // **Refetch transactions after adding a new one**
    } catch (e) {
      console.error('Error adding document: ', e);
      toast.error("Couldn't add transaction");
    }
  };

  // **Fetch Transactions from Firestore**
  async function fetchTransactions() {
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];

      querySnapshot.forEach((doc) => transactionsArray.push(doc.data()));
      
      setTransactions(transactionsArray); // **Set Transactions Correctly**
      console.log('Transactions Fetched:', transactionsArray);
      toast.success('Transactions Fetched!');
    }
  }

  // **Calculate Balance Whenever Transactions Change**
  useEffect(() => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpense(expensesTotal);
    setBalance(incomeTotal - expensesTotal);
  }, [transactions]); // **Runs only when `transactions` update**

  // **Fetch Transactions on Component Mount**
  useEffect(() => {
    fetchTransactions();
  }, [user]); // **Runs again if `user` changes**

  return (
    <div>
      <Cards
        income={income}
        expense={expense}
        balance={balance}
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
      />

      <AddExpenseModal
        isExpenseModalVisible={isExpenseModalVisible}
        handleExpenseCancel={handleExpenseCancel}
        onFinish={onFinish}
      />
      <AddIncomeModal
        isIncomeModalVisible={isIncomeModalVisible}
        handleIncomeCancel={handleIncomeCancel}
        onFinish={onFinish}
      />

      <TransactionSearch transactions={transactions}/>    
    </div>
  );
};

export default Dashboard;
