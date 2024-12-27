import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Button, TextField } from '@mui/material';
import ContactForm from './components/ContactForm';
import ContactTable from './components/ContactTable';
import ProfitSummary from './components/ProfitSummary';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const App = () => {
  const [currentDate, setCurrentDate] = useState('');

  // Update the date when the component mounts
  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      // Update state with the new date
      setCurrentDate(formattedDate);
    }, 1000); // Update every second

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  // Function to generate PDF
  const generatePDF = (contacts, currentDate) => {
    const doc = new jsPDF();

    // Add real-time date to the PDF
    doc.text(`Date: ${currentDate}`, 14, 10);

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

          <h1>Today's Date</h1>
          <div style={{ fontSize: '1.5em', color: '#555' }}>{currentDate}</div>

          <Box mt={5}>
            <ContactTable contacts={contacts} setContacts={setContacts} />
          </Box>
        </Container>
      </Box>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => generatePDF(contacts, currentDate)} // Pass currentDate to PDF generation
        sx={{ mt: 2 }}
      >
        Generate PDF
      </Button>
    </>
  );
};

export default App;
