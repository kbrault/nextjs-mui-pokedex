import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { Pokemon } from '../../src/Interfaces/Pokemon';

interface ErrorResponse {
  error: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Pokemon[] | ErrorResponse>) {
  if (req.method === 'GET') {
    try {
      const filePath = path.join(process.cwd(), 'data.json');
      const pokemonsData = await fs.promises.readFile(filePath, 'utf8');
      const pokemons: Pokemon[] = JSON.parse(pokemonsData);

      const { search, page } = req.query;
      let filteredPokemons = pokemons;
      if (search) {
        const searchTerm = (search as string);
        filteredPokemons = filterPokemonsByName(filteredPokemons, searchTerm);
      }

      const paginatedPokemons = paginatePokemons(filteredPokemons, page?.toString());

      res.status(200).json(paginatedPokemons);
    } catch (error: any) {
      console.error('Error reading pokemons data:', error);
      res.status(500).json({ error: (error as Error).message || 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function filterPokemonsByName(pokemons: Pokemon[], searchTerm: string): Pokemon[] {
  return pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

function paginatePokemons(pokemons: Pokemon[], page: string | undefined): Pokemon[] {
  const pageSize = 27;
  const currentPage = page ? parseInt(page, 10) : 1;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return pokemons.slice(startIndex, endIndex);
}
