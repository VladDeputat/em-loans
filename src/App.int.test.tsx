import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';

const server = setupServer(
  rest.get('http://localhost:3001/loans', (req, res, ctx) => {
    return res(
      ctx.json([
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
      ]),
    );
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App integration test', () => {
  it('should pass happy pass', async () => {
    render(<App />);
    const loanContainer = screen.getByTestId('loanContainer-5');
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
    expect(loanAmount).toHaveTextContent('£103,000.00');

    const totalAmount = screen.getByTestId('total-amount');
    expect(totalAmount).toHaveTextContent('£27,000.00');
    await waitFor(() => {
      expect(loanAmount).toHaveTextContent('£103,000.00');
    });
    await waitFor(() => {
      expect(totalAmount).toHaveTextContent('£27,000.00');
    });
  });

  it('should not render modal if closed', async () => {
    render(<App />);
    const loanContainer = screen.getByTestId('loanContainer-5');
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

describe('App unit test', () => {
  it('should render loans list', async () => {
    render(<App />);
    const loan1 = screen.getByTestId('loanContainer-1');
    const loan2 = screen.getByTestId('loanContainer-5');
    expect(loan1).toBeInTheDocument();
    expect(loan2).toBeInTheDocument();
  });
  it('should render main heading', async () => {
    render(<App />);
    const heading = screen.getByText('Current loans');
    expect(heading).toBeInTheDocument();
  });
  it('should render total', async () => {
    render(<App />);
    const total = screen.getByTestId('total-amount');
    await expect(total).toHaveTextContent('£27,000.00');
  });
});
