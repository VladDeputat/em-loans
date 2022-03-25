import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  padding: 30px;
  margin: 0 auto;
  width: 600px;
  border: 1px solid #454545;
  border-radius: 3px;
  background-color: #ffffff;
  margin-bottom: 10px;
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

const Button = styled.button`
  width: 150px;
  height: 50px;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 24px;

  color: gray;
  background: #ffff99;
  text-transform: uppercase;
  transition: all 150ms linear;
  &:hover,
  &:active {
    background: #ffff00;
    color: #0099cc;
  }
`;

// "title": "Voluptate et sed tempora qui quisquam.",
//       "tranche": "A",
//       "available": "11,959",
//       "annualised_return": "8.60",
//       "term_remaining": "864000",
//       "ltv": "48.80",
//       "amount": "85,754"

interface Loan {
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
  setModalOpen: (arg: boolean) => void;
  setCurrentLoan: (loan: object) => void;
}

const LoansListItem: React.FC<Props> = ({ loan, setModalOpen, setCurrentLoan }) => {
  const onModalOpen = () => {
    setCurrentLoan(loan);
    setModalOpen(true);
  };

  return (
    <MainContainer>
      <LoanName>{loan.title}</LoanName>
      <InfoContainer>
        <ul>
          <li>Annualised return</li>
          <li>Ltv</li>
          <li>Amount</li>
        </ul>
        <ul>
          <li>{loan.annualised_return}</li>
          <li>{loan.ltv}</li>
          <li>&#163;{loan.amount}</li>
        </ul>

        <Button type="button" onClick={onModalOpen}>
          invest
        </Button>
      </InfoContainer>
    </MainContainer>
  );
};

export default LoansListItem;
