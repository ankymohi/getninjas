import React from 'react';

const ProfitSummary = ({ contacts }) => {
  const totalCoins = contacts.reduce(
    (sum, contact) => sum + Number(contact.coinsUsed) + Number(contact.replacementCoins || 0),
    0
  );
  const totalRevenue = contacts.reduce(
    (sum, contact) => sum + Number(contact.revenue || 0),
    0
  );

  return (
    <div>
      <h3>Profit Summary</h3>
      <p>Total Coins Used: {totalCoins}</p>
      <p>Total Revenue: {totalRevenue}</p>
      <p>Profit: {totalRevenue - totalCoins}</p>
    </div>
  );
};

export default ProfitSummary;
