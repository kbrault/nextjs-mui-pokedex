import PrimarySearchAppBar from '../src/PrimarySearchAppBar';
import ActionAreaCard from '../src/ActionAreaCard';
import { BottomNavigation, BottomNavigationAction, Box, ButtonGroup, Container, Paper, createTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages] = useState<number>(2) // New state to track total pages

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset page number when searching
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get<Book[]>('/api/books', {
        params: { search: searchTerm, page }
      });
      setBooks(response.data);

    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, page]);

  return (
    <>
      <PrimarySearchAppBar handleSearchChange={handleSearchChange} />
      <Container maxWidth="xl" sx={{ marginBottom: '56px' }}>
        <Grid container direction="row"
          justifyContent="center"
          alignItems="flex-start" >
          {books.map(book => (
            <Grid key={book.id}>
              <ActionAreaCard key={book.id} id={book.id} name={book.title} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation showLabels >
          <BottomNavigationAction sx={{ backgroundColor: page === 1 ? '' : '#FF0000', color: page === 1 ? 'lightgray' : 'white' }} label="previous" disabled={page === 1} onClick={() => setPage(prevPage => prevPage - 1)} icon={<NavigateBeforeIcon />} />
          <BottomNavigationAction sx={{ backgroundColor: page !== totalPages ? '#FF0000' : '', color: page !== totalPages ? 'white' : 'lightgray' }} disabled={page === totalPages} onClick={() => setPage(prevPage => prevPage + 1)} label="Next" icon={<NavigateNextIcon />} />
        </BottomNavigation>
      </Paper>
    </>
  );
}
