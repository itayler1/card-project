import React from "react";
import { useUser } from "../../users/providers/UserProvider";
import useCards from "../hooks/useCards";
import useForm from "../../forms/hooks/useForm";
import initialCardForm from "../helpers/initialForms/initialCardForm";
import cardSchema from "../models/joi-schema/cardSchema";
import ROUTES from "../../routes/routesModel";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import CardForm from "../components/CardForm";

export default function AddNewCardPage() {
  const { user } = useUser();
  const { handleCreateCard } = useCards();
  const { value, ...rest } = useForm(
    initialCardForm,
    cardSchema,
    handleCreateCard
  );

  if (!user) return <Navigate replace to={ROUTES.CARDS} />;
  return (
    <Box
      display={'flex'}
      justifyContent='center'
      alignItems='center'
    >
      <CardForm
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        errors={value.errors}
        onFormChange={rest.validateForm}
        onInputChange={rest.handleChange}
        data={value.data}
        title="Create A New Card"
      />
    </Box>
  );
}