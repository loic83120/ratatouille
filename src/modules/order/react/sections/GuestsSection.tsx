'use client';

import { Box, Button, FormControl, FormLabel, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { useGuestsSection } from '@ratatouille/modules/order/react/sections/use-guests-section';
import DeleteIcon from '@mui/icons-material/Delete';

export const GuestsSection: React.FC<{}> = () => {
  const presenter = useGuestsSection();

  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant='h5'>Invités</Typography>
      <Grid sx={{ paddingTop: 2 }} rowSpacing={4}>
        {presenter.form.guests.map((guest) => (
          <Box key={Math.random()}>
            <GuestRow
              id={guest.id}
              firstname={guest.firstname}
              lastname={guest.lastname}
              age={guest.age}
              onChange={presenter.updateGuest}
              onRemove={presenter.removeGuest}
            />
          </Box>
        ))}
      </Grid>
      <Grid container direction={'row'} alignItems={'center'} spacing={1} marginTop={2}>
        <Grid item>
          <Button variant='contained' onClick={presenter.addGuest}>
            Ajouter
          </Button>
        </Grid>
        <Grid item>
          <Button variant='contained' onClick={presenter.onNext}>
            Suivant
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const GuestRow: React.FC<{
  id: string;
  firstname: string;
  lastname: string;
  age: number;
  onChange: (id: string, key: string, value: any) => void;
  onRemove: (id: string) => void;
}> = ({ id, firstname, lastname, age, onChange, onRemove }) => {
  return (
    <Box>
      <Grid container direction={'row'} alignItems={'center'} spacing={1}>
        <Grid item>
          <FormControl>
            <FormLabel>Prénom</FormLabel>
            <TextField value={firstname} onChange={(e) => onChange(id, 'firstname', e.target.value)} />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Nom</FormLabel>
            <TextField value={lastname} onChange={(e) => onChange(id, 'name', e.target.value)} />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Age</FormLabel>
            <TextField value={age} onChange={(e) => onChange(id, 'age', parseInt(e.target.value))} />
          </FormControl>
        </Grid>
        <Box sx={{ marginTop: 2 }}>
          <Button variant='contained' onClick={() => onRemove(id)} color='error' startIcon={<DeleteIcon />}>
            Supprimer
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};
