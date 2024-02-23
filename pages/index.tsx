import PrimarySearchAppBar from '../src/PrimarySearchAppBar';
import ActionAreaCard from '../src/ActionAreaCard';
import { BottomNavigation, BottomNavigationAction, Container, Paper, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Pokemon } from '../src/Interfaces/Pokemon';

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(41);
  const [loading, setLoading] = useState<boolean>(false); 

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const fetchPokemons = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Pokemon[]>('/api/pokemons', {
        params: { search: searchTerm, page }
      });
      setPokemons(response.data);
    } catch (error) {
      console.error('Error fetching pokemons:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [searchTerm, page]);

  return (
    <>
      <PrimarySearchAppBar handleSearchChange={handleSearchChange} />
      <Container maxWidth="xl" sx={{ marginBottom: '56px' }}>
        <Grid container direction="row"
          justifyContent="center"
          alignItems="flex-start" >
          {loading ? ( 
            <CircularProgress size={100} sx={{ m: 10 }} /> 
          ) : (
            pokemons.map(pokemon => (
              <Grid key={pokemon.id}>
                <ActionAreaCard key={pokemon.id} id={pokemon.id} name={pokemon.name} type1={pokemon.type1} type2={pokemon.type2} />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation showLabels >
          <BottomNavigationAction sx={{ backgroundColor: page === 1 ? '' : '#FF0000', color: page === 1 ? 'lightgray' : 'white' }} label="previous" disabled={page === 1} onClick={() => setPage(prevPage => prevPage - 1)} icon={<NavigateBeforeIcon />} />
          <BottomNavigationAction sx={{ backgroundColor: page !== totalPages && pokemons.length === 27 ? '#FF0000' : '', color: page !== totalPages ? 'white' : 'lightgray' }} disabled={page === totalPages || pokemons.length !== 27} onClick={() => setPage(prevPage => prevPage + 1)} label="Next" icon={<NavigateNextIcon />} />
        </BottomNavigation>
      </Paper>
    </>
  );
}
