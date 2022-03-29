import React, { useState } from 'react';
import styled from 'styled-components';
import LoansListItem from './components/LoansListItem';
import Modal from './components/Modal';
import { addComas } from './helpers/commonFunctions';
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

  const total = data.loans
    .map((loan) => +loan.available)
    .reduce((acc, amount) => acc + amount)
    .toString();

  return (
    <div>
      {modalOpen && <Modal setModalOpen={setModalOpen} currentLoan={currentLoan} />}

      <Heading>Current loans</Heading>
      {data.loans.map((loan) => (
        <LoansListItem key={loan.id} loan={loan} setModalOpen={setModalOpen} setCurrentLoan={setCurrentLoan} />
      ))}
      <AvailableAmount>
        Total amount avaiable for ivestments: <Amount>&#163;{addComas(total)}</Amount>
      </AvailableAmount>
    </div>
  );
};

export default App;
