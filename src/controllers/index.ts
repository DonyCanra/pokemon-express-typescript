import { Request, Response, NextFunction } from 'express';
import axios, { AxiosRequestConfig } from 'axios';

class Controller {
  public static async fetchDatabase(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { limit = '10', page = '2' } = req.query as Record<string, string>;

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
        "info": {
          "limit": limit,
          "page": page
        }
      });
    } catch (err) {
      next(err);
    }
  }
}

export default Controller;
