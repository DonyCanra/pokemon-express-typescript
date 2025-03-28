import express from 'express';
import Controller from '../controllers';
const router = express.Router();

// define the home page route
router.get('/', Controller.fetchPokemon);
router.get('/random', Controller.fetchPokemonRandom);
router.get('/:id', Controller.fetchPokemonByWord);

export default router;