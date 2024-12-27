// src/components/Report.js
import React, { useState } from 'react';
import dayjs from 'dayjs';

const Report = () => {
  const [startDate] = useState(dayjs('2024-01-06')); // Start date
  const [currentDate] = useState(dayjs()); // Current date
  const coinsPerPack = 4800; // Coins per pack
  const packCost = 716; // Cost in BRL
  const coinsPerContact = 250; // Coins per contact
  const valuePerClosedContact = 1000; // Revenue from one closed contact
  const workingDaysPerWeek = 6; // No Sundays

  // Calculate total working days since the start
  const totalDays = currentDate.diff(startDate, 'day');
  const totalWorkingDays = Math.floor(totalDays / 7) * workingDaysPerWeek + (totalDays % 7);

  // Contacts unlocked and closed
  const contactsUnlocked = totalWorkingDays;
  const contactsClosed = Math.floor(contactsUnlocked * 0.8); // Assuming 80% conversion rate

  // Investments and revenue
  const coinsUsed = contactsUnlocked * coinsPerContact;
  const packsUsed = Math.ceil(coinsUsed / coinsPerPack);
  const totalInvestment = packsUsed * packCost;
  const totalRevenue = contactsClosed * valuePerClosedContact;

  // Profits
  const profit = totalRevenue - totalInvestment;

  return (
    <div>
      <h2>Reports</h2>
      <p>Start Date: {startDate.format('DD MMM YYYY')}</p>
      <p>Current Date: {currentDate.format('DD MMM YYYY')}</p>
      <p>Total Working Days: {totalWorkingDays}</p>
      <p>Contacts Unlocked: {contactsUnlocked}</p>
      <p>Contacts Closed: {contactsClosed}</p>
      <p>Total Coins Used: {coinsUsed}</p>
      <p>Packs Purchased: {packsUsed}</p>
      <p>Total Investment: {totalInvestment.toFixed(2)} BRL</p>
      <p>Total Revenue: {totalRevenue.toFixed(2)} BRL</p>
      <p>Profit: {profit.toFixed(2)} BRL</p>
    </div>
  );
};

export default Report;
