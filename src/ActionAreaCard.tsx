import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Pokemon } from './Interfaces/Pokemon';

const ActionAreaCard: React.FC<Pokemon> = ({ id, name, type1, type2 }) => {

  const image = "pokemon/" + String(id).padStart(3, '0') + ".png";
  const type1image = "types/" + String(type1).toLowerCase() + ".png";
  const type2image = "types/" + String(type2).toLowerCase() + ".png";
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
            <img src={type1image} alt="{type1}" />
            {type2.length > 0 && <img src={type2image} alt={type2} />}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ActionAreaCard;