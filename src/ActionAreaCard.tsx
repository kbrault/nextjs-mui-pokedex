import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface ActionAreaCardProps {
  id: number; // Example type, replace with your actual type
  name: string; // Example type, replace with your actual type
}

const ActionAreaCard: React.FC<ActionAreaCardProps> = ({ id, name }) => {
  return (
    <Card sx={{ maxWidth: 180, m: 1 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image="avatar.png"
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