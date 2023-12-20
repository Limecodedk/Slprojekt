import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Chart from 'chart.js/auto';
import { json } from 'react-router-dom';
import withAuth from '../components/WithAuthHOC';
import { handleDateRangeSelect } from '../APIConfig'

const Reports = () => {
  const [chart, setChart] = useState(null);

  const handleSubmit = async (e) => {
    handleDateRangeSelect(updateChart)
  };

  const updateChart = (data) => {
    if (!chart) {
      return;
    }
    const json_data = JSON.parse(data);
    const months = Object.keys(json_data.result);
    const salesData = months.map((month) => json_data.result[month]);

    chart.data.labels = months;
    chart.data.datasets[0].data = salesData;

    chart.update();
  };

  useEffect(() => {
    const ctx = document.getElementById('myChart').getContext('2d');

    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Sale',
          data: [],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    setChart(newChart);
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-row h-screen">
        <div className="lg:w-1/4 bg-menu rounded-r-lg">
          <Navbar />
        </div>
        <div className="lg:w-3/5 mt-5 mx-auto">
          <div className="flex flex-row mx-auto justify-center gap-3">
            <img src="/assets/report.png" alt="" className="object-cover w-6" />
            <h2 className="text-center text-xl font-bold">Reports</h2>
          </div>
          <hr className="w-80% h-1 mx-auto my-4 bg-gray-100 border-0 rounded"></hr>
          <div className="flex flex-row gap-2 mt-5 justify-end">
            <input type="date" name="dateFrom" id="dateFrom" className="dateSelect" />
            <p>To</p>
            <input type="date" name="dateTo" id="dateTo" className="dateSelect" />
            <button className="btn-search text-white font-bold px-2 rounded" onClick={handleSubmit}>Select</button>
          </div>
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </>
  )
}

export default withAuth(Reports);