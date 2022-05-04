import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LoansListItem from './components/LoansListItem';
import Modal from './components/Modal';
import { formatNumber } from './helpers/commonFunctions';
import { Loan } from './model';
import { getLoans, updateLoan } from './services/api';

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
  const [loans, setLoans] = useState<Loan[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentLoan, setCurrentLoan] = useState<Loan | null>(null);
  const [invested, setInvested] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    getLoans().then((data) => setLoans(data));
  }, []);

  const total =
    loans.length > 0
      ? loans
          .map((loan) => +loan.available)
          .reduce((acc, amount) => acc + amount)
          .toString()
      : '0';

  const onModalOpen = (loan: Loan) => {
    setCurrentLoan(loan);
    setModalOpen(true);
  };

  const onInvest = async (loan: Loan) => {
    invested[loan.id] = true;
    await updateLoan(loan);
    await getLoans().then((data) => setLoans(data));
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
