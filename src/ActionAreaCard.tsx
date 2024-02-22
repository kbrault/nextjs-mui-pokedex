import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 180, m: 1 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="150"
          image="avatar.png"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Name
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}