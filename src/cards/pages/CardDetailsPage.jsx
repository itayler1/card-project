import { Container, Typography, Card, CardContent, CardMedia, List, ListItem, ListItemText, Grid, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { getCard } from "../services/cardApiService";
import { alignProperty } from "@mui/material/styles/cssUtils";
import Spinner from "../../components/Spinner";

export default function CardDetailsPage() {
  const { id } = useParams();
  const [card, setCard] = useState(null);

  useEffect(()=>{
    const fetchCard = async () =>{
      const fetchedCard = await getCard(id);
      setCard(fetchedCard);

    };
    
    fetchCard();
  },[id,setCard]);
  
  if (!card) {
    return <Spinner/>;
  }

  const fullAddress = `${card.address.street} ${card.address.houseNumber}, ${card.address.city}, ${card.address.state}, ${card.address.country}, ${card.address.zip}`;


  return (
    <Box
    display={'flex'}
    justifyContent='center'
    alignItems='center'
    >
      <Grid
      padding={5}
      item
      xs={12} sm={8} md={6}>
      <Card
      sx={{
        padding:5,
      }}
          >
            <CardMedia
              component="img"
              height="140"
              image={`../${card.image.url}`}
              alt={card.image.alt}
            />

            <Typography variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {card.subtitle}
              </Typography>
              <Typography variant="body2">
                {card.description}
              </Typography>
            <List>
                <ListItem>
                  <ListItemText 
                    primary="Phone" 
                    secondary={card.phone}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Email" 
                    secondary={card.email}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Website" 
                    secondary={card.web}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Address" 
                    secondary={fullAddress}
                  />
                </ListItem>
              </List>
        </Card>
      </Grid>
    </Box>
  );
};
