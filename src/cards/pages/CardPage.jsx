import { Button, Container, Tooltip, makeStyles } from "@mui/material";
import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import Cards from "../components/Cards";
import Spinner from "./../../components/Spinner";
import Error from "./../../components/Error";
import useCards from "../hooks/useCards";
import CardsFeedback from "../components/CardsFeedback";
import { useSearchBar } from "../../providers/SearchBarProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../../users/providers/UserProvider";



export default function CardPage() {
  const { value, handleGetCards, handleDeleteCard } = useCards();
  const { cards, error, isLoading } = value;
  const {states} = useSearchBar();
  const searchBarInput = states.searchBarInput;
  const navigate = useNavigate();
  const {user} = useUser();


  useEffect(() => {
    handleGetCards(searchBarInput);
  },[searchBarInput]);

  const handleDelete = async (id) => {
    await handleDeleteCard(id);
    handleGetCards();
  };
  return (
    <div>
      <Container>
        <PageHeader
          title="Cards"
          subtitle={user? `Hello ${user.name}! on this page you can find all bussines cards from all categories.`
        : "Here you can find all bussines cards from all categories. Please log in or sign up for more features!"}
        />
        <CardsFeedback
          isLoading={isLoading}
          error={error}
          cards={cards}
          handleDelete={handleDelete}
        />
      </Container>
      
      {user&& <Tooltip title="Create a new card">
        <Button
          variant="contained"
          sx={
            {position: 'fixed',
            bottom : '20%',
            right : '10%',
            background : '#03a9f4',
            color : 'inherit',
            height : 60,
            fontSize : 35,
            borderRadius: '50%',}
          }
          onClick={()=>navigate(ROUTES.CREATE_CARD)}>
          +
        </Button>
      </Tooltip>}
    </div>
  );
}
