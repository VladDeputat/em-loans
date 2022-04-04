import React, { useState } from 'react';
import styled from 'styled-components';
import LoansListItem from './components/LoansListItem';
import Modal from './components/Modal';
import { formatNumber } from './helpers/commonFunctions';
import data from './helpers/current-loans.json';

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
  const [modalOpen, setModalOpen] = useState(false);
  const [currentLoan, setCurrentLoan] = useState({});
  const [invested, setInvested] = useState<{ [key: string]: boolean }>({});

  const total = data.loans
    .map((loan) => +loan.available)
    .reduce((acc, amount) => acc + amount)
    .toString();

  return (
    <div>
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} invested={invested} setInvested={setInvested} currentLoan={currentLoan} />
      )}

      <Heading>Current loans</Heading>
      {data.loans.map((loan) => (
        <LoansListItem
          key={loan.id}
          loan={loan}
          invested={invested}
          setModalOpen={setModalOpen}
          setCurrentLoan={setCurrentLoan}
        />
      ))}
      <AvailableAmount>
        Total amount avaiable for ivestments:
        <Amount>{formatNumber(total)}</Amount>
      </AvailableAmount>
    </div>
  );
};

export default App;
