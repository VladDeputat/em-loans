import React, { useState } from 'react';
import styled from 'styled-components';
import { addComas } from '../helpers/commonFunctions';
import { Btn } from '../helpers/commonStyled';
import Modal from './Modal';

const MainContainer = styled.div`
  position: relative;
  padding: 30px;
  margin: 0 auto;
  width: 600px;
  border: 1px solid #454545;
  border-radius: 3px;
  background-color: #ffffff;
  margin-bottom: 10px;
`;

const InvestedSign = styled.p`
  position: absolute;
  top: 30px;
  right: 30px;
  font-weight: 500;
  font-size: 20px;
  color: green;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  li {
    font-weight: 500;
    font-size: 20px;
    line-height: 1.2;
    margin-bottom: 10px;
  }
`;

const LoanName = styled.h3`
  width: 400px;
  font-weight: 600;
  font-size: 24px;
  line-height: 1.2;
  margin-bottom: 10px;
`;
export interface Loan {
  id: String;
  title: String;
  available: String;
  annualised_return: String;
  term_remaining: String;
  ltv: String;
  amount: String;
}
interface Props {
  loan: Loan;
}

const LoansListItem: React.FC<Props> = ({ loan }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [invested, setInvested] = useState(false);

  return (
    <MainContainer>
      {modalOpen && <Modal setModalOpen={setModalOpen} setInvested={setInvested} currentLoan={loan} />}

      <LoanName>{loan.title}</LoanName>
      {invested && <InvestedSign>Invested</InvestedSign>}
      <InfoContainer>
        <ul>
          <li>Annualised return</li>
          <li>Ltv</li>
          <li>Amount</li>
        </ul>
        <ul>
          <li>{loan.annualised_return}</li>
          <li>{loan.ltv}</li>
          <li>&#163;{addComas(loan.amount)}</li>
        </ul>

        <Btn type="button" onClick={() => setModalOpen(true)}>
          invest
        </Btn>
      </InfoContainer>
    </MainContainer>
  );
};

export default LoansListItem;
