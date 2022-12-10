import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ReactPlayerProps } from 'react-player';
export interface MediaCardProps extends ReactPlayerProps {
  img: string,
  name: string,
  maxWidth?: string | number,
};

export default function MediaCard(props: MediaCardProps) {
  return (
      <Card sx={{ maxWidth: props.maxWidth || 500 }} onClick={props.onClick}>
        <CardMedia
          component="img"
          height="230"
          src={props.img}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            { props.name }
          </Typography>
        </CardContent>
      </Card>
  );
}