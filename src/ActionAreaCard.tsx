import { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Pokemon } from './Interfaces/Pokemon';

interface ActionAreaCardProps extends Pokemon {}

const ActionAreaCard: FC<ActionAreaCardProps> = ({ id, name, type1, type2 }) => {
  const paddedId = String(id).padStart(3, '0');
  const image = `pokemon/${paddedId}.png`;
  const type1image = `types/${type1.toLowerCase()}.png`;
  const type2image = type2 ? `types/${type2.toLowerCase()}.png` : null;

  return (
    <Card sx={{ maxWidth: 140, width: 140, height: 230, maxHeight: 230, m: 1 }}>
      <CardActionArea>
        <CardMedia
          sx={{ backgroundColor: '#fcd7d7' }}
          key={id}
          component="img"
          image={image}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {name}
          </Typography>
          <Typography sx={{ fontSize: 14, m: 0, textAlign: 'right' }} color="text.secondary" gutterBottom>
            <img src={type1image} alt={type1} />
            {type2image && <img src={type2image} alt={type2} />}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ActionAreaCard;