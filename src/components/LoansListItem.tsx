import React from 'react';
import styled from 'styled-components';
import { formatNumber } from '../helpers/commonFunctions';
import { Btn } from '../helpers/commonStyled';

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
  id: string;
  title: string;
  available: string;
  annualised_return: string;
  term_remaining: string;
  ltv: string;
  amount: string;
}
interface Props {
  loan: Loan;
  invested: boolean;
  onModalOpen: (loan: Loan) => void;
}

const LoansListItem: React.FC<Props> = ({ loan, invested, onModalOpen }) => {
  return (
    <MainContainer>
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
          <li>{formatNumber(loan.amount)}</li>
        </ul>

        <Btn type="button" onClick={() => onModalOpen(loan)}>
          invest
        </Btn>
      </InfoContainer>
    </MainContainer>
  );
};

export default LoansListItem;
