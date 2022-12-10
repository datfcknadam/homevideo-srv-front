import { Box, Card, CardActionArea, CardMedia, List, ListItem, SwipeableDrawer, SwipeableDrawerProps } from "@mui/material";
import { useRef, useState } from "react";
import { pathToImage } from "../api";
import { movie } from "../store/movie/reducer";

interface EpisodesListProps extends SwipeableDrawerProps {
    items: movie[],
    onClickEpisode: Function,
};

const EpisodesList = (props: EpisodesListProps) => {
    const list = (
        <Box
          sx={{ width: 400 }}
        >
          <List>
            {props.items.map((it, key) => (
              <ListItem key={key}>
                 <Card sx={{ maxWidth: 'auto' }} onClick={(event) => { props.onClickEpisode(it.name); props.onClose(event) }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            src={`${pathToImage}${it.img}`}
                        />
                    </CardActionArea>
                </Card>
              </ListItem>
            ))}
          </List>
        </Box>
      );

    return (
        <SwipeableDrawer
            anchor={'right'}
            open={props.open}
            container={props.container}
            onOpen={props.onOpen}
            onClose={props.onClose}
        >
            {list}
        </SwipeableDrawer>
    )
};

export default EpisodesList;