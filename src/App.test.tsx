import { render, screen } from '@testing-library/react';
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

describe('App unit test', () => {
  it('should render loans list', async () => {
    render(<App />);
    const loan1 = await screen.findByTestId('loanContainer-1');
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
