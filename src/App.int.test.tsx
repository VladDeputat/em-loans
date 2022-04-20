import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';

jest.mock('../db.json', () => {
  return {
    __esModule: true,
    default: {
      loans: [
        {
          id: '1',
          title: 'MockTitle1',
          tranche: 'A',
          available: '10000',
          annualised_return: '8.60',
          term_remaining: '1648243234000',
          ltv: '48.80',
          amount: '80000',
        },
        {
          id: '5',
          title: 'MockTitle2',
          tranche: 'B',
          available: '20000',
          annualised_return: '7.10',
          term_remaining: '1651316711000',
          ltv: '48.80',
          amount: '100000',
        },
      ],
    },
  };
});

describe('App integration test', () => {
  it('should pass happy pass', async () => {
    render(<App />);
    const loanContainer = await screen.findByTestId('loanContainer-5');
    const loanBtn = within(loanContainer).getByRole('button', { name: /invest/i });
    userEvent.click(loanBtn);
    const modalInput = await screen.findByLabelText('Number');
    expect(modalInput).toBeInTheDocument();

    // screen.debug();
    userEvent.type(modalInput, '4000');
    expect(modalInput).toHaveValue(4000);

    fireEvent.change(modalInput, { target: { value: '3000' } });
    expect(modalInput).toHaveValue(3000);

    const modalContainer = screen.getByTestId('modal');
    const submitBtn = within(modalContainer).getByRole('button', { name: /invest/i });
    userEvent.click(submitBtn);

    expect(await screen.findByTestId('modal')).not.toBeInTheDocument();

    const investedSign = within(loanContainer).queryByText('Invested');
    expect(investedSign).toBeInTheDocument();

    const loanAmount = within(loanContainer).getByTestId('loan-amount');
    const totalAmount = screen.getByTestId('total-amount');

    await waitFor(() => {
      expect(loanAmount).toHaveTextContent('£103,000.00');
      // expect(totalAmount).toHaveTextContent('£27,000.00');
    });
  });

  it('should not render modal if closed', async () => {
    render(<App />);
    const loanContainer = await screen.findByTestId('loanContainer-5');
    const loanBtn = within(loanContainer).getByRole('button', { name: /invest/i });
    userEvent.click(loanBtn);
    const modalContainer = screen.getByTestId('modal');
    expect(modalContainer).toBeInTheDocument();
    const closeBtn = screen.getByTestId('modal-close');
    expect(closeBtn).toBeInTheDocument();
    userEvent.click(closeBtn);
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});
