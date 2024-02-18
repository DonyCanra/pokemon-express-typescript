import { Request, Response, NextFunction } from 'express';
import axios, { AxiosRequestConfig } from 'axios';

class Controller {
  public static async fetchPokemon(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { limit = '12', page = '1' } = req.query as Record<string, string>;

      const zukan_id_from = (page === '1') ? 1 : (parseInt(page) - 1) * parseInt(limit) + 1;
      const zukan_id_to = parseInt(page) * parseInt(limit);

      const { data } = await axios.get(`https://id.portal-pokemon.com/play/pokedex/api/v1?pokemon_ability_id=&zukan_id_from=${zukan_id_from}&zukan_id_to=${zukan_id_to}`);  
      
      const updatedData = data.pokemons.map((item: any) => {
        item.file_name = "https://id.portal-pokemon.com/play/resources/pokedex" + item.file_name;
        return item;
      });

      res.status(200).json({
        "status": true,
        "error": null,
        "data": updatedData,
        "meta": {
          "limit": limit,
          "page": page,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  public static async fetchPokemonRandom(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { limit = '12' } = req.query as Record<string, string>;


      const { data } = await axios.get(`https://id.portal-pokemon.com/play/pokedex/api/v1/random?limit=${limit}`);  
      
      const updatedData = data.pokemons.map((item: any) => {
        item.file_name = "https://id.portal-pokemon.com/play/resources/pokedex" + item.file_name;
        return item;
      });

      res.status(200).json({
        "status": true,
        "error": null,
        "data": updatedData,
        "meta": {
          "limit": limit,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  public static async fetchPokemonByWord(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { word = 'Mega' } = req.query as Record<string, string>;


      const { data } = await axios.get(`https://id.portal-pokemon.com/play/pokedex/api/v1?key_word=${word}`);  
      
      const updatedData = data.pokemons.map((item: any) => {
        item.file_name = "https://id.portal-pokemon.com/play/resources/pokedex" + item.file_name;
        return item;
      });

      res.status(200).json({
        "status": true,
        "error": null,
        "data": updatedData,
      });
    } catch (err) {
      next(err);
    }
  }

}

export default Controller;

// https://id.portal-pokemon.com/play/pokedex/api/v1?key_word=bul
// https://id.portal-pokemon.com/play/pokedex/api/v1/random?limit=13
