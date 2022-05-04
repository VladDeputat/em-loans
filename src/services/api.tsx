import { Loan } from '../model';

const axios = require('axios');

axios.defaults.baseURL = 'http://localhost:3001';

export const getLoans = async () => {
  try {
    const response = await axios.get('/loans');
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateLoan = async (updatedLoan: Loan) => {
  try {
    const response = await axios.put(`/loans/${updatedLoan.id}`, updatedLoan);
    return response.data.updatedLoan;
  } catch (error) {
    console.log(error);
  }
};
