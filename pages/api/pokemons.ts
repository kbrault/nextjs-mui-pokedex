import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { Pokemon } from '../../src/Interfaces/Pokemon';

interface ErrorResponse {
  error: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Pokemon[] | ErrorResponse>) {
  if (req.method === 'GET') {
    try {
      const filePath = path.join(process.cwd(), 'data.json');
      const pokemonsData = fs.readFileSync(filePath, 'utf8');
      const pokemons: Pokemon[] = JSON.parse(pokemonsData);

      const { search, page } = req.query;
      let filteredPokemons = pokemons;
      if (search) {
        const searchTerm = (search as string);
        filteredPokemons = filteredPokemons.filter(pokemons =>
          pokemons.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      const pageSize = 27; 
      const currentPage = page ? parseInt(page as string, 10) : 1;
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedPokemons = filteredPokemons.slice(startIndex, endIndex);


      res.status(200).json(paginatedPokemons);
    } catch (error) {
      console.error('Error reading pokemons data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
