import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Btn } from '../helpers/commonStyled';
import { formatNumber } from '../helpers/commonFunctions';
import { Loan } from '../model';

const BackDrop = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  background: rgba(16, 16, 18, 0.4);
`;

const ModalWrapper = styled.div`
  position: relative;
  padding: 40px;
  width: 500px;
  background: #ffffff;
  box-shadow: 0px 0px 1px rgba(12, 26, 75, 0.1), 0px 4px 20px -2px rgba(50, 50, 71, 0.08);
  border-radius: 5px;

  p {
    font-weight: 400;
    font-size: 20px;
    line-height: 1.2;
    &:first-child {
      font-weight: 700;
      font-size: 20px;
      line-height: 1.2;
    }
    &:nth-child(3) {
      margin-bottom: 10px;
    }
    &:last-child {
      margin-bottom: 20px;
    }
  }

  form {
    display: flex;
  }

  label {
    display: none;
  }

  input {
    height: 50px;
    width: 250px;
    font-size: 28px;
    padding-left: 5px;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 50px;
  cursor: pointer;
  background-color: #999999;
  font-size: 20px;
  box-shadow: 0px 0px 1px rgba(12, 26, 75, 0.1), 0px 4px 20px -2px rgba(50, 50, 71, 0.08);
`;

const SubmitBtn = styled(Btn)`
  display: block;
  margin-left: auto;
`;

const Title = styled.h3`
  font-weight: 900;
  font-size: 24px;
  line-height: 1.2;
  margin-bottom: 10px;
`;

const StyledErrorMessage = styled(ErrorMessage)`
  margin-top: 8px;
  font-size: 11px;
  line-height: 12px;
  color: red;
`;

interface Props {
  currentLoan: Loan;
  setModalOpen: (modalOpen: boolean) => void;
  onInvest: (loan: Loan) => void;
}

const Modal: React.FC<Props> = ({ onInvest, currentLoan, setModalOpen }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, []);

  const onLoanEdit = (investValue: number): Loan => {
    return {
      ...currentLoan,
      available: (+currentLoan.available - investValue).toString(),
      amount: (+currentLoan.amount + investValue).toString(),
    };
  };

  const getDaysLeft = () => {
    const diff = +currentLoan.term_remaining - Date.now();
    return Math.round(diff / (1000 * 60 * 60 * 24));
  };

  const FormSchema = Yup.object().shape({
    number: Yup.number()
      .moreThan(0, 'You might want to invest at least something')
      .max(+currentLoan.available, 'You cant invest more then you have')
      .required('Please, enter your amount'),
  });

  const initialValues = {
    number: 0,
  };

  return (
    <BackDrop>
      <ModalWrapper data-testid="modal">
        <CloseBtn data-testid="modal-close" type="button" onClick={() => setModalOpen(false)}>
          x
        </CloseBtn>
        <div>
          <p>Invest in loan</p>
          <Title data-testid="title">{currentLoan.title}</Title>
          <p data-testid="available">
            Amount available:
            {formatNumber(currentLoan.available)}
          </p>
          <p data-testid="days-left">Loan ends in: {getDaysLeft()} days</p>
          <p>Investment amount (&#163;)</p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={FormSchema}
          onSubmit={({ number }) => {
            onInvest(onLoanEdit(number));
          }}
        >
          {({ errors }) => (
            <Form>
              <div>
                <label htmlFor="number">Number</label>
                <Field id="number" errors={errors.number} autoComplete="off" name="number" type="number" />
                <StyledErrorMessage data-testid="error" name="number" component="div" />
              </div>
              <SubmitBtn type="submit">Invest</SubmitBtn>
            </Form>
          )}
        </Formik>
      </ModalWrapper>
    </BackDrop>
  );
};

export default Modal;
