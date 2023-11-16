import React from 'react';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import axios from 'axios';
const em_map = {
  1: 'sadness',
  5: 'joy',
  6: 'love',
  3: 'anger',
  2: 'fear',
  4: 'surprise',
};
const emotions = [
  {
    icon: '🥳',
    id: 6,
    name: 'celebration',
  },
  {
    icon: '😄',
    id: 5,
    name: 'happy',
  },
  {
    icon: '😇',
    id: 4,

    name: 'grateful',
  },
  {
    icon: '🤩',
    id: 3,
    name: 'spunky',
  },
  {
    icon: '🙂',
    id: 2,
    name: 'it is what it is',
  },
  {
    icon: '😥',
    id: 1,
    name: 'sad',
  },
];
export default function MoodTrend({}) {
  const [mood, setmood] = useState({ x: [], y: [] });
  useEffect(() => {
    axios.get('http://localhost:8000/api/emotion').then((e) => setmood(e.data));
  }, []);
  return (
    <div className="flex p-2 pt-4 h-64">
      <div className="flex flex-col gap-2">
        {emotions.map((e) => (
          <div>{e.icon}</div>
        ))}
      </div>
      <div className="w-full">
        <Line
          datasetIdKey="id"
          height={'250px'}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            backgroundColor: '#fff',
            barThickness: 20,
            borderRadius: 0,
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
                  label: (context) => em_map[context.parsed.y],
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
                  display: false,
                  beginAtZero: true,
                  steps: 2,
                  stepSize: 1,
                  min: 1,
                  max: 10,
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
                label: mood.y.map((el) => em_map[el]),
                data: mood.y,
                tension: 0.4,
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
