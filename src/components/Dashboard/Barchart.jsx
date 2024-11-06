// src/Diagram.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
// import './index.css'; // Import Tailwind CSS

function Diagram() {
    const chartRef = useRef();
  const chartInstanceRef = useRef();

  useEffect(() => {
    const data = {
      labels: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5','item 6'],
      values: [10, 20, 15, 25, 30 ,100]
    };

    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [{
            label: 'Data',
            data: data.values,
            backgroundColor: '#10B981', // warna latar belakang batang
            borderColor: '#10B981', // warna garis batas batang
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* <h1 className="text-2xl font-bold mb-4">Bar Chart Example</h1> */}
        <div className="flex justify-center">
          <div className="w-full h-full">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Diagram;
