// src/components/Projects.js
import React, { useState } from 'react';

const Projects = () => {
  const [projects, setProjects] = useState([
    { name: 'Project A', status: 'In Progress', value: 5000, investment: 2000 },
    { name: 'Project B', status: 'Completed', value: 8000, investment: 3000 },
  ]);

  const totalValue = projects.reduce((acc, p) => acc + p.value, 0);
  const totalInvestment = projects.reduce((acc, p) => acc + p.investment, 0);
  const totalProfit = totalValue - totalInvestment;

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            {project.name}: {project.status} (Value: {project.value}, Investment: {project.investment})
          </li>
        ))}
      </ul>
      <p>Total Value: {totalValue}</p>
      <p>Total Investment: {totalInvestment}</p>
      <p>Total Profit: {totalProfit}</p>
    </div>
  );
};

export default Projects;
