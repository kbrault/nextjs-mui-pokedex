import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface ActionAreaCardProps {
  id: number; 
  name: string;
}

const ActionAreaCard: React.FC<ActionAreaCardProps> = ({ id, name }) => {

  const image = "pokemon/" + String(id).padStart(3, '0') + ".png";
  return (
    <Card sx={{ maxWidth: 190, m: 1 }}>
      <CardActionArea>
        <CardMedia
        sx={{backgroundColor:'#fcd7d7'}}
          key={id}
          component="img"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ActionAreaCard;