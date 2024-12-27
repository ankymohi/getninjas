import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Button, TextField } from '@mui/material';
import ContactForm from './components/ContactForm';
import ContactTable from './components/ContactTable';
import ProfitSummary from './components/ProfitSummary';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const App = () => {
  // Function to generate PDF
const generatePDF = (contacts) => {
  const doc = new jsPDF();

  doc.text('Daily Report', 14, 10);
  const tableColumn = ['Date', 'Project', 'Category', 'Coins Used', 'Status', 'Revenue'];
  const tableRows = [];

  contacts.forEach((contact) => {
    const rowData = [
      contact.date,
      contact.project,
      contact.category,
      contact.coinsUsed,
      contact.status,
      contact.revenue,
    ];
    tableRows.push(rowData);
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  });

  doc.save('daily_report.pdf');
};
  const [contacts, setContacts] = useState([]);

  const addContact = (contact) => {
    setContacts([...contacts, contact]);
  };

  const calculateProfit = () => {
    const totalCoinsUsed = contacts.reduce((acc, contact) => acc + parseInt(contact.coinsUsed || 0, 10), 0);
    const totalRevenue = contacts.reduce((acc, contact) => acc + parseFloat(contact.revenue || 0), 0);
    const investment = (totalCoinsUsed / 4800) * 716; // Calculate based on coin price
    const profit = totalRevenue - investment;

    return { investment: investment.toFixed(2), profit: profit.toFixed(2), totalRevenue };
  };

  const { investment, profit, totalRevenue } = calculateProfit();

  return (
    <>
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 5 }}>
      <Container>
        <Typography variant="h3" align="center" gutterBottom>
          GetNinjas Profit Management
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ContactForm addContact={addContact} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: '10px', bgcolor: 'white' }}>
              <Typography variant="h6" gutterBottom>
                Profit Summary
              </Typography>
              <Typography>Total Coins Used: {contacts.reduce((acc, contact) => acc + parseInt(contact.coinsUsed || 0, 10), 0)}</Typography>
              <Typography>Total Revenue: R$ {totalRevenue.toFixed(2)}</Typography>
              <Typography>Investment: R$ {investment}</Typography>
              <Typography>Profit: R$ {profit}</Typography>
            </Box>
          </Grid>
        </Grid>

        <Box mt={5}>
          <ContactTable contacts={contacts} setContacts={setContacts} />
        </Box>
      </Container>
    </Box>
    <Button
    variant="contained"
    color="secondary"
    onClick={() => generatePDF(contacts)}
    sx={{ mt: 2 }}
  >
    Generate PDF
  </Button>
  </>
  );
};

export default App;
