import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';

const ContactTable = ({ contacts, setContacts }) => {
  const [editingId, setEditingId] = useState(null);

  const handleEditToggle = (id) => {
    setEditingId(editingId === id ? null : id);
  };

  const handleInputChange = (id, field, value) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === id ? { ...contact, [field]: value } : contact
      )
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Project</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Coins Used</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Revenue</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>
                {editingId === contact.id ? (
                  <TextField
                    value={contact.date}
                    onChange={(e) => handleInputChange(contact.id, 'date', e.target.value)}
                    type="date"
                    fullWidth
                  />
                ) : (
                  contact.date
                )}
              </TableCell>
              <TableCell>
                {editingId === contact.id ? (
                  <TextField
                    value={contact.project}
                    onChange={(e) => handleInputChange(contact.id, 'project', e.target.value)}
                    fullWidth
                  />
                ) : (
                  contact.project
                )}
              </TableCell>
              <TableCell>
                {editingId === contact.id ? (
                  <TextField
                    value={contact.category}
                    onChange={(e) => handleInputChange(contact.id, 'category', e.target.value)}
                    fullWidth
                  />
                ) : (
                  contact.category
                )}
              </TableCell>
              <TableCell>
                {editingId === contact.id ? (
                  <TextField
                    value={contact.coinsUsed}
                    onChange={(e) => handleInputChange(contact.id, 'coinsUsed', e.target.value)}
                    type="number"
                    fullWidth
                  />
                ) : (
                  contact.coinsUsed
                )}
              </TableCell>
              <TableCell>
                {editingId === contact.id ? (
                  <TextField
                    value={contact.status}
                    onChange={(e) => handleInputChange(contact.id, 'status', e.target.value)}
                    fullWidth
                  />
                ) : (
                  contact.status
                )}
              </TableCell>
              <TableCell>
                {editingId === contact.id ? (
                  <TextField
                    value={contact.revenue}
                    onChange={(e) => handleInputChange(contact.id, 'revenue', e.target.value)}
                    type="number"
                    fullWidth
                  />
                ) : (
                  contact.revenue
                )}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleEditToggle(contact.id)}
                  variant="contained"
                  color={editingId === contact.id ? 'primary' : 'default'}
                >
                  {editingId === contact.id ? 'Save' : 'Edit'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContactTable;
