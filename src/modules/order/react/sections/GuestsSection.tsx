"use client";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  TextField,
  Typography,
  Checkbox,
} from "@mui/material";
import React from "react";
import { useGuestsSection } from "@ratatouille/modules/order/react/sections/use-guests-section";
import DeleteIcon from "@mui/icons-material/Delete";
import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";

export const GuestsSection: React.FC<{}> = () => {
  const presenter = useGuestsSection();

  return (
    <Box data-cy="guests" sx={{ marginTop: 2 }}>
      <Typography variant="h5">Invités</Typography>
      <Grid sx={{ paddingTop: 2 }} rowSpacing={4}>
        {presenter.form.guests.map((guest) => (
          <Box key={guest.id}>
            <GuestRow
              id={guest.id}
              firstname={guest.firstname}
              lastname={guest.lastname}
              age={guest.age}
              isOrganizer={guest.id === presenter.form.organizerId}
              onChange={presenter.updateGuest}
              onRemove={presenter.removeGuest}
              changeOrganizer={presenter.changeOrganizer}
            />
          </Box>
        ))}
      </Grid>
      <Grid
        container
        direction={"row"}
        alignItems={"center"}
        spacing={1}
        marginTop={2}
      >
        <Grid item>
          <Button
            data-cy="add-guest"
            variant="contained"
            onClick={presenter.addGuest}
          >
            Ajouter
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={presenter.onNext}
            disabled={!presenter.isSubmitable}
          >
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
  isOrganizer: boolean;
  onChange: <T extends keyof OrderingDomainModel.Guest>(
    id: string,
    key: T,
    value: OrderingDomainModel.Guest[T]
  ) => void;
  onRemove: (id: string) => void;
  changeOrganizer: (id: string) => void;
}> = ({
  id,
  firstname,
  lastname,
  age,
  isOrganizer,
  onChange,
  onRemove,
  changeOrganizer,
}) => {
  return (
    <Box data-cy={"guest-row"}>
      <Grid container direction={"row"} alignItems={"center"} spacing={1}>
        <Grid item>
          <FormControl>
            <FormLabel>Prénom</FormLabel>
            <TextField
              value={firstname}
              onChange={(e) => onChange(id, "firstname", e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Nom</FormLabel>
            <TextField
              value={lastname}
              onChange={(e) => onChange(id, "lastname", e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Age</FormLabel>
            <TextField
              value={age}
              onChange={(e) => onChange(id, "age", parseInt(e.target.value))}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={isOrganizer}
                onChange={() => changeOrganizer(id)}
              />
            }
            label="Organisateur"
          />
        </Grid>
        <Box sx={{ marginTop: 2 }}>
          <Button
            data-cy="remove-guest"
            variant="contained"
            onClick={() => onRemove(id)}
            color="error"
            startIcon={<DeleteIcon />}
          >
            Supprimer
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};
