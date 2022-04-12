import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import LoansListItem from './LoansListItem';

describe('Loan list item component', () => {
  const loan = {
    id: '1',
    title: 'Loan1',
    available: '300.5',
    annualised_return: '4.5',
    term_remaining: '23232323',
    ltv: '3.4',
    amount: '400.9',
  };
  const onModalOpenMock = jest.fn();

  it('should render loan details with invested label', () => {
    //given
    const invested = true;

    //when
    render(<LoansListItem loan={loan} invested={invested} onModalOpen={onModalOpenMock} />);
    // screen.debug();
    //then
    testLoanDetails();
    const investedSign = screen.getByText('Invested');
    expect(investedSign).toBeInTheDocument();
  });
  it('should render loan details without invested label', () => {
    //given
    const invested = false;

    //when
    render(<LoansListItem loan={loan} invested={invested} onModalOpen={onModalOpenMock} />);
    // screen.debug();
    //then
    testLoanDetails();
    const investedSign = screen.queryByText('Invested');
    expect(investedSign).not.toBeInTheDocument();
  });

  it('should trigger onModalOpen on invest button click', () => {
    render(<LoansListItem loan={loan} invested={true} onModalOpen={onModalOpenMock} />);
    const loanButton = screen.getByRole('button', { name: /invest/i });
    userEvent.click(loanButton);
    expect(onModalOpenMock).toHaveBeenCalledWith(loan);
    expect(onModalOpenMock).toHaveBeenCalledTimes(1);
  });

  function testLoanDetails() {
    const loanTitle = screen.getByRole('heading', { name: 'Loan1' });
    expect(loanTitle).toBeInTheDocument();

    const loanAmount = screen.getByText('£400.90');
    expect(loanAmount).toBeInTheDocument();

    const loanButton = screen.getByRole('button', { name: /invest/i });
    expect(loanButton).toBeInTheDocument();
  }
});
