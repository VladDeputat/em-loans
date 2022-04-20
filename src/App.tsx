import React, { useState } from 'react';
import styled from 'styled-components';
import LoansListItem from './components/LoansListItem';
import Modal from './components/Modal';
import { formatNumber } from './helpers/commonFunctions';
import data from './helpers/current-loans.json';
import { Loan } from './model';

const Heading = styled.h1`
  width: 600px;
  margin: 10px auto;
`;

const AvailableAmount = styled.p`
  font-weight: 500;
  font-size: 20px;
  line-height: 1.2;
  margin-top: 20px;
  width: 600px;
  margin: 0 auto 30px auto;
`;

const Amount = styled.span`
  font-weight: 700;
`;

const App: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>(data.loans);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentLoan, setCurrentLoan] = useState<Loan | null>(null);
  const [invested, setInvested] = useState<{ [key: string]: boolean }>({});

  const total = loans
    .map((loan) => +loan.available)
    .reduce((acc, amount) => acc + amount)
    .toString();

  const onModalOpen = (loan: Loan) => {
    setCurrentLoan(loan);
    setModalOpen(true);
  };

  const onInvest = (loan: Loan) => {
    invested[loan.id] = true;
    setLoans(oldLoans => {
      const newLoans = [...oldLoans];
      const loanIndex = newLoans.findIndex(newLoan => newLoan.id === loan.id);
      newLoans[loanIndex] = loan;
      return newLoans;
    });
    setInvested(invested);
    setModalOpen(false);
  };

  return (
    <div>
      {modalOpen && currentLoan && <Modal setModalOpen={setModalOpen} currentLoan={currentLoan} onInvest={onInvest} />}

      <Heading>Current loans</Heading>
      {loans.map((loan) => (
        <LoansListItem key={loan.id} loan={loan} invested={invested[loan.id]} onInvest={onModalOpen} />
      ))}
      <AvailableAmount>
        Total amount avaiable for ivestments:
        <Amount data-testid="total-amount">{formatNumber(total)}</Amount>
      </AvailableAmount>
    </div>
  );
};

export default App;
