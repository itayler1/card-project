import { Container, Grid , Typography, List, ListItem, ListItemText} from "@mui/material";
import React from "react";
import PageHeader from "../components/PageHeader";

export default function AboutPage() {
  return (
    <Container>
      <PageHeader
        title="About BCard"
        subtitle="Welcome to BCard, the one-stop solution for all your business card needs. Designed with business professionals in mind, we've streamlined the process of creating, managing, and showcasing your professional identity. With a focus on ease of use, intuitive design, and functionality, BCard brings a new dimension to professional networking."
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} alignSelf="center">
        <Typography variant="h4" gutterBottom>
        Our Features
      </Typography>
      <Typography variant="body1" paragraph>
        At BCard, we understand the importance of making a great first impression. Our platform offers a diverse set of features including:
      </Typography>
      <List>
        <ListItem>
          <ListItemText 
            primary="Business Card Creation" 
            secondary="Craft your unique business card with just a few clicks. Use our easy-to-navigate design interface to make a card that truly reflects your professional identity."
          />
        </ListItem>
        <ListItem>
          <ListItemText 
            primary="Card Management" 
            secondary="Manage all your business cards in one place. Edit them whenever your details change, ensuring your information is always up to date."
          />
        </ListItem>
        <ListItem>
          <ListItemText 
            primary="Favorite Cards" 
            secondary="Found a card that you love? With our liking feature, you can add them to your favorites page for easy access in the future."
          />
        </ListItem>
        <ListItem>
          <ListItemText 
            primary="Card Details Page" 
            secondary="Each card comes with a detailed page, displaying comprehensive information about the business, including its location on Google Maps. A handy feature for when you need to find your way to a meeting."
          />
        </ListItem>
        <ListItem>
          <ListItemText 
            primary="Admin Sandbox" 
            secondary="For our admin users, we offer a sandbox feature for you to experiment and play around with various components."
          />
        </ListItem>
      </List>

      <Typography variant="h4" gutterBottom>
        How to Use BCard
      </Typography>
      <Typography variant="body1" paragraph>
        Getting started with BCard is easy:
      </Typography>
      <List>
        <ListItem>
          <ListItemText 
            primary="Sign Up" 
            secondary="Register for a free account to start creating and managing your business cards."
          />
        </ListItem>
        <ListItem>
          <ListItemText 
            primary="Create Your Card" 
            secondary="Use our intuitive design interface to craft your unique business card."
          />
        </ListItem>
        <ListItem>
          <ListItemText 
            primary="Manage Your Cards" 
            secondary="Keep track of all your created cards. Edit them as required, and delete any you no longer need."
          />
        </ListItem>
        <ListItem>
          <ListItemText 
            primary="Like and Favorite" 
            secondary="Like the cards that catch your eye and add them to your favorites for easy future reference."
          />
        </ListItem>
        <ListItem>
          <ListItemText 
            primary="Explore Card Details" 
            secondary="Click on any card to view detailed information about the business and its location."
          />
        </ListItem>
      </List>

      <Typography variant="body1" paragraph>
        We invite you to join BCard today, and experience a new and innovative way of managing your professional identity.
      </Typography>
        </Grid>
        <Grid
          item
          md={4}
          sx={{ display: { md: "flex", xs: "none" }, justifyContent: "center" }}
        >
          <img src="/assets/images/card.jpg" alt="card" width="100%" height="50%"/>
        </Grid>
      </Grid>
    </Container>
  );
}
