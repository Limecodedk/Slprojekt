export const baseUrl = 'http://localhost/slproject/backend/api.php';

//Create New Sale HTTP POST Request
export async function createNewSale(newData, setData) {
  try {
    const response = await fetch(`${baseUrl}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });
    const result = await response.text()
    setData(result);
  } catch (error) {
    console.error('Fejl ved oprettelse af data:', error.message);
  }
};
//Search Vehicles HTTP GET Request
export async function fetchDataSearch(searchQuery, setData) {
  try {
    const response = await fetch(`${baseUrl}?search=${searchQuery}`);
    if (!response.ok) {
      throw new Error('Netværksfejl: Anmodning mislykkedes');
    }
    const result = await response.json();
    const filtreretData = result.filter((item) =>
      item.sale_vehicles_number.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setData(filtreretData);
  } catch (error) {
    console.error('Fejl ved hentning af data:', error.message);
  }
};
//Reports HTTP GET Request
export async function handleDateRangeSelect(updateChart) {
  const fromDate = document.getElementById('dateFrom').value;
  const toDate = document.getElementById('dateTo').value;

  if (!fromDate || !toDate) {
    alert('Vælg både fra- og tildatoer.');
    return;
  }
  const apiUrl = `${baseUrl}?monthlySales&fromDate=${fromDate}&toDate=${toDate}`;
  try {
    const response = await fetch(apiUrl);

    if (response.status === 200) {
      const data = await response.text();

      const fromDate = data;
      const toDate = data;

      updateChart(fromDate, toDate);
    } else {
      console.error('Anmodning mislykkedes:', response.statusText);
    }
  } catch (error) {
    console.error('Fejl ved anmodning:', error);
  }
};
//Login HTTP POST Request
export async function handleFormSubmit(email, password) {
  try {
    const response = await fetch(`${baseUrl}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, login: true }),
    });
    if (response.ok) {
      const responseData = await response.json();
      const token = responseData.token;
      if (token) {
        localStorage.setItem('token', token);
        window.location.href = '/';
      } else {
        console.error('Token mangler i responsen.');
      }
    } else {
      const responseData = await response.json();
      alert(responseData.error || 'Login mislykkedes');
    }
  } catch (error) {
    console.error('Fejl:', error);
  }
};
