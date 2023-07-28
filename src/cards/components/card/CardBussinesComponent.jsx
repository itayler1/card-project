import {
  Card,
  CardActionArea,
} from "@mui/material";
import React, { useState } from "react";
import CardHead from "./CardHead";
import CardBody from "./CardBody";
import CardActionBar from "./CardActionBar";
import cardType from "../../models/types/cardType";
import { func } from "prop-types";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";
import { useUser } from "../../../users/providers/UserProvider";
import { changeLikeStatus } from "../../services/cardApiService";

export default function CardBussinesComponent({
  card,
  handleDelete,
  updateLike
}) {
  const navigate = useNavigate();
  const [isLiked, setLiked] = useState(false);
  const {user} = useUser();

  useState(()=>{
    const checkForLike = () =>{
      if (card.likes.includes(user.id)){
        setLiked(true);
      }
    };

    if(user) checkForLike();
  },[card]
  );

  return (
    <>
      <Card sx={{ width: 250, m: 2 }}>
        <CardActionArea
          onClick={() => navigate(`${ROUTES.CARD_INFO}/${card._id}`)}
        >
          <CardHead image={card.image} />
          <CardBody
            title={card.title}
            subtitle={card.subtitle}
            phone={card.phone}
            address={card.address}
            cardNumber={card.bizNumber}
          />
        </CardActionArea>
        <CardActionBar
          card={card}
          id={card._id}
          user_id={card.user_id}
          handleDelete={handleDelete}
          handleLike={changeLikeStatus}
          isLiked={isLiked}
          setLiked={setLiked}
          updateLike={updateLike}
        />
      </Card>
    </>
  );
}

CardBussinesComponent.propTypes = {
  card: cardType.isRequired,
  handleDelete: func,
};
