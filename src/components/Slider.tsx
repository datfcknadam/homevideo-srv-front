import { SliderProps, Slider, Box, styled, Typography } from "@mui/material"

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
    color: 'white',
  });
const SliderComponent = (props: SliderProps) => {
    function formatDuration(value: number) {
        const minute = Math.floor(value / 60);
        const secondLeft = Math.round(value - minute * 60);
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }
    return (
        <div className={props.className}>
        <Slider
          aria-label="time-indicator"
          size="medium"
          value={props.value}
          min={0}
          step={1}
          max={props.max}
          onChange={props.onChange}
          sx={{
            color: '#fff',
            height: 4,
            '& .MuiSlider-thumb': {
              width: 8,
              height: 8,
              '&:before': { 
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${
                   'rgb(255 255 255 / 16%)'
                }`,
              },
              '&.Mui-active': {
                width: 20,
                height: 20,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.28,
            },
          }}
        />
        <Box
            sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: -2,
            }}
        >
            <TinyText>{formatDuration(props.value as number)}</TinyText>
            <TinyText>-{formatDuration(((props.max || 0) - (props.value as number)))}</TinyText>
        </Box>
        </div>
    )
}

export default SliderComponent;