const API_URL = 'http://localhost:3001/loans';

export const getLoans = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
