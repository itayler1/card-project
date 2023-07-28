import { useCallback, useMemo, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useSnack } from "../../providers/SnackbarProvider";
import { useUser } from "../../users/providers/UserProvider";
import {
  changeLikeStatus,
  createCard,
  deleteCard,
  editCard,
  getCard,
  getCards,
  getMyCards,
} from "../services/cardApiService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import normalizeCard from "../helpers/normalization/normalizeCard";

export default function useCards() {

  const [cards, setCards] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [card, setCard] = useState(null);
  useAxios();
  const snack = useSnack();
  const { user } = useUser();
  const navigate = useNavigate();

  const requestStatus = (loading, errorMessage, cards, card = null) => {
    setLoading(loading);
    setError(errorMessage);
    setCards(cards);
    setCard(card);
  };

  const filterCards = (searchBarInput, cards)=>{
    const filteredCards = cards.filter((card)=>card.title.includes(searchBarInput));
    if (searchBarInput) return filteredCards
    else return cards;
  };


  const handleGetCards = async (searchBarInput) => {
    setLoading(true);
    try {
      const cards = await getCards();
      setLoading(false);
      const filteredCards = filterCards(searchBarInput, cards);
      setCards(filteredCards);
      snack('success', 'The cards are loaded');
    } catch (err) {
      setLoading(false);
      setError(err.message);
      snack('error', 'The card loading has failed');
    }
  };

  const handleGetMyCards = useCallback(async (searchBarInput) => {
    try {
      setLoading(true);
      const cards = await getMyCards();
      const filteredCards = filterCards(searchBarInput, cards)
      requestStatus(false, null, filteredCards);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const handleDeleteCard = useCallback(async (cardId) => {
    try {
      setLoading(true);
      await deleteCard(cardId);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }, []);


  const handleGetCard = useCallback(async (cardId) => {
    try {
      setLoading(true);
      const card = await getCard(cardId);
      requestStatus(false, null, null, card);
      return card;
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);


  const handleUpdateCard = useCallback(async (cardId, cardFromClient) => {
    try {
      setLoading(true);
      const card = await editCard(cardId, cardFromClient);
      requestStatus(false, null, null, card);
      snack("success", "The business card has been successfully updated");
      navigate('/');
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);


  const handleLikeCard = useCallback(async (cardId) => {
    try {
      const card = await changeLikeStatus(cardId);
      requestStatus(false, null, cards, card);
      snack("success", "The business card has been Liked");
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const handleGetFavCards = useCallback(async (searchBarInput) => {
    try {
      setLoading(true);
      const cards = await getCards();
      const favCards = cards.filter((card) => card.likes.includes(user.id));
      const filteredCards = filterCards(searchBarInput, favCards);
      requestStatus(false, null, filteredCards);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const handleCreateCard = useCallback(
    async (cardFromClient) => {
      try {
        setLoading(true);
        const normalizedCard = normalizeCard(cardFromClient);
        normalizedCard.user_id = user.id;
        const card = await createCard(normalizedCard);
        requestStatus(false, null, null, card);
        snack("success", "A new business card has been created");
        navigate(ROUTES.CARDS);
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [navigate, snack]
  );

  const value = useMemo(() => {
    return { isLoading, cards, card, error };
  }, [isLoading, cards, card, error]);

  return {
    value,
    handleGetCards,
    handleGetMyCards,
    handleDeleteCard,
    handleGetCard,
    handleUpdateCard,
    handleCreateCard,
    handleGetFavCards,
    handleLikeCard,
  };
}
