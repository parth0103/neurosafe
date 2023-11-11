import React from 'react';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import axios from 'axios';

export default function EmotionBar() {
  const [mood, setmood] = useState({ x: [], y: [] });
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/emotion/bars')
      .then((e) => setmood(e.data));
  }, []);
  return (
    <>
      <div className="w-full">
        <Bar
          datasetIdKey="id"
          height={'250px'}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            barThickness: 50,
            borderWidth: 1,
            borderColor: 'rgba(255, 99, 132)',
            layout: {
              padding: {
                left: 0,
                right: 30,
                top: 5,
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => `Count: ${context.parsed.y}`,
                },
              },
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                grid: {
                  display: false,
                },
                ticks: {
                  display: true,
                  beginAtZero: true,
                  steps: 1,
                  stepSize: 1,
                  min: 1,
                  max: 100,
                },
                grid: {
                  display: false,
                  borderColor: '#fff',
                },
              },
              x: {
                grid: {
                  display: false,
                },
              },
            },
          }}
          data={{
            labels: mood.x,
            datasets: [
              {
                borderColor: '#ff7a00',
                id: 1,
                label: mood.y,
                data: mood.y,
                tension: 0.4,
              },
            ],
          }}
        />
      </div>
    </>
  );
}
