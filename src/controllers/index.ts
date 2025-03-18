import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import PokemonData from '../interfaces/PokemonData';


class Controller {
  public static async fetchPokemon(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { limit = '12', page = '1' } = req.query as Record<string, string>;

      const zukanIdFrom = page === '1' ? 1 : (parseInt(page) - 1) * parseInt(limit) + 1;
      const zukanIdTo = parseInt(page) * parseInt(limit);

      const { data } = await axios.get(`https://id.portal-pokemon.com/play/pokedex/api/v1?pokemon_ability_id=&zukan_id_from=${zukanIdFrom}&zukan_id_to=${zukanIdTo}`);

      const updatedData = data.pokemons.map((item: any) => {
        item.file_name = 'https://id.portal-pokemon.com/play/resources/pokedex' + item.file_name;
        return item;
      });

      function convertToPascalCase(key: string): string {
        return key.replace(/_([a-z])/g, (_, group1) => group1.toUpperCase());
      }

      const result = updatedData.map((item: PokemonData) => {
        const updatedItem: any = {}; // Gunakan Partial<PokemonData> di sini
        for (const key in item) {
          if (Object.prototype.hasOwnProperty.call(item, key)) {
            const typedKey = key as keyof PokemonData;
            updatedItem[convertToPascalCase(typedKey)] = item[typedKey];
          }
        }
        return updatedItem as PokemonData;
      });

      res.status(200).json({
        status: true,
        error: null,
        data: result,
        meta: {
          limit: parseInt(limit),
          page: parseInt(page),
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
        item.file_name = 'https://id.portal-pokemon.com/play/resources/pokedex' + item.file_name;
        return item;
      });

      res.status(200).json({
        status: true,
        error: null,
        data: updatedData,
        meta: {
          limit: limit,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  public static async fetchPokemonByWord(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id = '0001' } = req.params as Record<string, string>;

      const { data } = await axios.get(`https://id.portal-pokemon.com/play/pokedex/api/v1?key_word=${id}`);

      const updatedData = data.pokemons.map((item: any) => {
        item.file_name = 'https://id.portal-pokemon.com/play/resources/pokedex' + item.file_name;
        return item;
      });

      function convertToPascalCase(key: string): string {
        return key.replace(/_([a-z])/g, (_, group1) => group1.toUpperCase());
      }

      const result = updatedData.map((item: PokemonData) => {
        const updatedItem: any = {}; // Gunakan Partial<PokemonData> di sini
        for (const key in item) {
          if (Object.prototype.hasOwnProperty.call(item, key)) {
            const typedKey = key as keyof PokemonData;
            updatedItem[convertToPascalCase(typedKey)] = item[typedKey];
          }
        }
        return updatedItem as PokemonData;
      });

      res.status(200).json({
        status: true,
        error: null,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default Controller;
