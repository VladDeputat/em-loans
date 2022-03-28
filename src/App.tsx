import React from 'react';
import styled from 'styled-components';
import LoansListItem from './components/LoansListItem';
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
  const total = data.loans
    .map((loan) => +loan.available)
    .reduce((acc, amount) => acc + amount)
    .toString();

  return (
    <div>
      <Heading>Current loans</Heading>
      {data.loans.map((loan) => (
        <LoansListItem key={loan.id} loan={loan} />
      ))}
      <AvailableAmount>
        Total amount avaiable for ivestments: <Amount>&#163;{addComas(total)}</Amount>
      </AvailableAmount>
    </div>
  );
};

export default App;
