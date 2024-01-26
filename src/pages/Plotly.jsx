import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const fetchData = async () => {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/plotly/datasets/master/api_docs/mt_bruno_elevation.csv',
    );
    const csvData = await response.text();
    const rows = csvData
      .trim()
      .split('\n')
      .map((row) => row.split(','));

    const unpack = (rows, key) => rows.map((row) => row[key]);

    const z_data = [];
    for (let i = 0; i < 24; i++) {
      z_data.push(unpack(rows, i));
    }

    return z_data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const Plotly = () => {
  const [zData, setZData] = useState([]);

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      const data = await fetchData();
      setZData(data);
    };

    fetchDataAndSetState();
  }, []);

  const data = [
    {
      z: zData,
      type: 'surface',
    },
  ];

  const layout = {
    title: 'Mt Bruno Elevation',
    autosize: false,
    width: 820,
    height: 500,
    margin: {
      l: 65,
      r: 50,
      b: 65,
      t: 90,
    },
  };

  return (
    <section className="max-container items-center flex flex-col">
      <h1 className="head-text py-12">Surface Plot</h1>

      <div className="flex p-4 space-x-4 items-center justify-center">
        <Plot
          data={[
            {
              x: [1, 2, 3, 4],
              y: [4, 5, 6, -3, 5],
              type: 'bar',
              mode: 'lines+markers',
              marker: { color: 'rgb(18, 36, 37)' },
            },
          ]}
          layout={{ width: 400, height: 400, title: 'Simple Bar Plot' }}
        />

        <Plot
          data={[
            {
              values: [24, 26, 5, 20, 25],
              labels: ['React', 'Vue', 'ThreeJS', 'Plotly', '3D'],
              type: 'pie',
              marker: {
                colors: ['rgb(56, 75, 126)', 'rgb(18, 36, 37)', 'rgb(34, 53, 101)', 'rgb(36, 55, 57)', 'rgb(6, 4, 4)'],
              },
            },
          ]}
          layout={{ width: 400, height: 400, title: 'Pie chart' }}
        />
      </div>
      <Plot data={data} layout={layout} />
    </section>
  );
};

export default Plotly;
