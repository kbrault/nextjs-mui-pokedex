import { FC } from 'react';
import { styled, alpha, createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';

interface SearchAppBarProps {
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: '#e3e3e3',
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'black',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '30ch',
      '&:focus': {
        width: '50ch',
      },
    },
  },
}));

const appBarTheme = createTheme({
  palette: {
    primary: {
      main: '#FF0000',
    },
  },
});

const SearchAppBar: FC<SearchAppBarProps> = ({ handleSearchChange }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={appBarTheme}>
        <AppBar position="static">
          <Toolbar variant='dense'>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              NEXTJS MATERIAL UI POKEDEX
            </Typography>
            <Button variant="contained" color="success" href="https://github.com/kbrault/nextjs-mui-pokedex" startIcon={<GitHubIcon />}>Source</Button>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearchChange}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}

export default SearchAppBar;
