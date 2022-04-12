import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Modal from './Modal';

const currentLoan = {
  id: '1',
  title: 'MockTitle1',
  tranche: 'A',
  available: '10000',
  annualised_return: '8.60',
  term_remaining: '1682852711000',
  ltv: '48.80',
  amount: '80000',
};
const setModalOpenMock = jest.fn();
const onInvestMock = jest.fn();
describe('Modal component', () => {
  it('should not render modal before click', async () => {
    const modalContainer = screen.queryByTestId('modal');
    expect(modalContainer).not.toBeInTheDocument();
  });

  it('should render modal loan info', async () => {
    render(<Modal currentLoan={currentLoan} setModalOpen={setModalOpenMock} onInvest={onInvestMock} />);
    const modalContainer = screen.queryByTestId('modal');
    expect(modalContainer).toBeInTheDocument();

    const title = screen.getByTestId('title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('MockTitle1');

    const available = screen.getByTestId('available');
    expect(available).toBeInTheDocument();
    expect(available).toHaveTextContent('£10,000.00');

    const daysLeft = screen.getByTestId('days-left');
    expect(daysLeft).toBeInTheDocument();
    expect(daysLeft).toHaveTextContent('384 days');
  });
});

describe('Modal input validation', () => {
  it('should not render error message as default', async () => {
    render(<Modal currentLoan={currentLoan} setModalOpen={setModalOpenMock} onInvest={onInvestMock} />);
    const modalContainer = screen.getByTestId('modal');
    await expect(within(modalContainer).queryByTestId('error')).not.toBeInTheDocument();
  });
  it('should render error message with zero input', async () => {
    render(<Modal currentLoan={currentLoan} setModalOpen={setModalOpenMock} onInvest={onInvestMock} />);
    const modalContainer = screen.getByTestId('modal');
    const modalInput = await within(modalContainer).findByLabelText('Number');
    const submitBtn = within(modalContainer).getByRole('button', { name: /invest/i });

    expect(modalInput).toHaveValue(0);
    userEvent.click(submitBtn);
    expect(await screen.findByTestId('error')).toHaveTextContent('You might want to invest at least something');
  });
  it('should render error message with too big number in input', async () => {
    render(<Modal currentLoan={currentLoan} setModalOpen={setModalOpenMock} onInvest={onInvestMock} />);
    const modalContainer = screen.getByTestId('modal');
    const modalInput = await within(modalContainer).findByLabelText('Number');
    const submitBtn = within(modalContainer).getByRole('button', { name: /invest/i });

    userEvent.type(modalInput, '1000000');
    expect(modalInput).toHaveValue(1000000);
    userEvent.click(submitBtn);
    expect(await screen.findByTestId('error')).toHaveTextContent('You cant invest more then you have');
  });
  it('should not accept text or negative value in input', async () => {
    render(<Modal currentLoan={currentLoan} setModalOpen={setModalOpenMock} onInvest={onInvestMock} />);
    const modalContainer = screen.getByTestId('modal');
    const modalInput = await within(modalContainer).findByLabelText('Number');
    const submitBtn = within(modalContainer).getByRole('button', { name: /invest/i });

    userEvent.type(modalInput, 'testtest');
    expect(modalInput).not.toHaveValue('testtest');
    userEvent.type(modalInput, '-1');
    expect(modalInput).toHaveValue(-1);
    userEvent.click(submitBtn);
    expect(await screen.findByTestId('error')).toHaveTextContent('You might want to invest at least something');
  });
  it('should not accept empty input', async () => {
    render(<Modal currentLoan={currentLoan} setModalOpen={setModalOpenMock} onInvest={onInvestMock} />);
    const modalContainer = screen.getByTestId('modal');
    const modalInput = await within(modalContainer).findByLabelText('Number');
    const submitBtn = within(modalContainer).getByRole('button', { name: /invest/i });

    userEvent.clear(modalInput);
    expect(modalInput).toHaveValue(null);
    userEvent.click(submitBtn);
    expect(await screen.findByTestId('error')).toHaveTextContent('Please, enter your amount');
  });
  it('should not render error message on success', async () => {
    render(<Modal currentLoan={currentLoan} setModalOpen={setModalOpenMock} onInvest={onInvestMock} />);
    const modalContainer = screen.getByTestId('modal');
    const modalInput = await within(modalContainer).findByLabelText('Number');
    const submitBtn = within(modalContainer).getByRole('button', { name: /invest/i });
    await userEvent.type(modalInput, '3000');

    expect(modalInput).toHaveValue(3000);
    userEvent.click(submitBtn);
    await expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    await waitFor(() => expect(onInvestMock).toHaveBeenCalledWith(currentLoan));
  });
});
