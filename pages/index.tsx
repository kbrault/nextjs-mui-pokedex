import PrimarySearchAppBar from '../src/PrimarySearchAppBar';
import ActionAreaCard from '../src/ActionAreaCard';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';

const divCount = Array.from({ length: 30 }, (_, index) => index);

export default function Home() {
  return (
    <>
      <PrimarySearchAppBar />
      <Container sx={{ mt: 5 }} maxWidth="xl">
        <Grid container direction="row"
          justifyContent="center"
          alignItems="flex-start" >
          {divCount.map((index) => (
            <Grid key={index}>
              <ActionAreaCard key={index} />
            </Grid>))}
        </Grid>
      </Container>
    </>
  );
}
