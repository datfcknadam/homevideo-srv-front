import { ReactPlayerProps } from "react-player";
import ReactPlayer from "react-player";
import IconButton from '@mui/material/IconButton';
import { 
    Replay30,
    Forward30,
    Replay10,
    Forward10,
    Pause,
    PlayArrow,
    Fullscreen,
    ViewStream,
    FullscreenExit,
} from '@mui/icons-material';
import styles from '../styles/ui/VideoPlayer.module.sass';
import commonStyles from '../styles/Common.module.sass';
import { useRef, useState, useEffect, useMemo } from "react";
import { classNames, multyListener, setDomFullscreen } from '../common';
import Slider from '../components/Slider';
import { movie } from "../store/movie/reducer";
import EpisodesList from "../components/EpisodesList";
export interface IProps extends ReactPlayerProps {
    url: string,
    width?: string,
    height?: string,
    episodes?: movie[],
    serverStream?: boolean,
};

const VideoPlayer = (props: IProps) => {
    const [fullscreen, setFullscreen] = useState(false);
    const [step, setStep] = useState(0);
    const [play, setPlay] = useState(false);
    const [ui, setUi] = useState(false);
    const [time, setTime] = useState(0);
    const [visEpisodes, setVisEpisodes] = useState(false);
    const [url, setUrl] = useState('');
    const iteration = useMemo(() => ({
        replay: 0,
        forward: 0,
        _step: 0,
        set next(val: number) {
            if (val > 0) {
                this.replay = 0;
                this.forward = this.forward === 0 ? 1 : 3;
            } else {
                this.forward = 0;
                this.replay = this.replay === 0 ? -1 : -3;
            }
        },
        reset() {
            this.replay = 0;
            this.forward = 0;
        },
        get step(): number {
            return this.forward || this.replay;
        },
    }), []);
    useEffect(() => {
        document.body.addEventListener("mousemove", function (e) {
            document.exitPointerLock();
        });
    }, [])
    useEffect(() => {
        setPlay(false);
    }, [props.url]);
    useEffect(() => {
        const timeout = setTimeout(() => {
          setStep(0);
          iteration.reset();
        }, 2000);
      
        return () => clearTimeout(timeout);
    }, [step, iteration]);
    useEffect(() => {
        const timeout = setTimeout(() => {
          if (play) {
            document.body.requestPointerLock();
            setUi(false);
          }
        }, 8000);
      
        return () => clearTimeout(timeout);
    }, [ui, play]);
    const rootRef = useRef<HTMLDivElement | null>(null);
    const player = useRef<ReactPlayer | null>(null);
    const htmlPlayer: HTMLVideoElement | null = player.current && player.current.getInternalPlayer() as HTMLVideoElement;

    const showUi = (val: boolean) => {
        if (val || !play) {
            setUi(true);
        }
    };
    const isReady = () => 
    {
        htmlPlayer?.addEventListener('timeupdate', () => {
            setTime(htmlPlayer.currentTime);
        });
        setUi(true);
    };

    const { current } = rootRef;
    if (current) {
        multyListener(current, 'webkitfullscreenchange mozfullscreenchange fullscreenchange', () => {
            // @ts-ignore
            const state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
            if (!state) {
                setFullscreen(false);
            }
        });
    }
    const addHide = (className: string) => {
        return classNames({
            [commonStyles.hide]: !ui,
            [className]: true,
        })
    };
    const switchFullscreen = () => {
        setFullscreen(!fullscreen);
        setDomFullscreen(current, !fullscreen);
    };
    const switchPlay = () => {
        if (!htmlPlayer) return;
        setPlay(!play);
        if (player.current) {
            
            if (play) {
                setUi(true);
                return htmlPlayer.pause()
            }
            htmlPlayer.play();
        }
    };
    const rewind = (direction: 'left' | 'right') => {
        const dir: number = direction === 'left' ? -1 : 1;
        iteration.next = dir;
        const val = iteration.step * 10;
        setStep(val);
        setTimePlayer(val, { fromCurrent: true })
        
    };
    const setTimePlayer = (val: number, opts?: ({ fromCurrent: boolean })) => {
        if (!htmlPlayer) return;
        if (opts &&opts.fromCurrent) {
            htmlPlayer.currentTime += val;
            return;    
        }
        htmlPlayer.currentTime = val;
    };
    const episodes = props.episodes && props.episodes.length ? 
        (<><EpisodesList items={props.episodes} open={visEpisodes} container={rootRef.current} onClose={() => setVisEpisodes(false)} onOpen={() => setVisEpisodes(true)} onClickEpisode={props.onClick} />
        <IconButton className={addHide(styles.btnEpisodes)} color="default" onClick={() => setVisEpisodes(!visEpisodes)}>
            <ViewStream fontSize="large"/>
        </IconButton></>)
        : (<></>);
    const iconFullscreen = fullscreen ? <FullscreenExit fontSize="large"/> : <Fullscreen fontSize="large"/>;
    const iconPlay = play ?  <Pause fontSize="large" /> : <PlayArrow fontSize="large" />
    return (
        <div
            className={props.className}
            ref={rootRef} 
            onMouseOver={() => showUi(true)}
            onMouseLeave={(() => showUi(false))}
        >
            <ReactPlayer
                url={props.url}
                height={props.height}
                width={props.width}
                ref={player}
                config={{
                    file: {
                        attributes: {
                            type: props.serverStream ? 'video/mp4' : ''
                        }
                    }
                }}
                onReady={isReady}
            />
            <Slider className={addHide(styles.Slider)} max={htmlPlayer?.duration || 0} value={time} onChange={(e, v) => setTimePlayer(v as number)}/>
            <IconButton className={addHide(styles.btnFullscreen)} color="default" onClick={switchFullscreen}>
                { iconFullscreen }
            </IconButton>
            {episodes}
            <IconButton className={addHide(styles.btnPlay)} color="default" onClick={switchPlay} >
                { iconPlay }
            </IconButton>
            <IconButton className={addHide(styles.btnPlayCenter)} color="default" onClick={switchPlay} disableRipple>
                
            </IconButton>
            <IconButton className={styles.btnLeft} color="default" onDoubleClick={() => rewind('left')} disableRipple>
                <Replay10 fontSize="large" className={classNames({ [commonStyles.hide]: step !== -10 })}/>
                <Replay30 fontSize="large" className={classNames({ [commonStyles.hide]: step !== -30 })}/>
            </IconButton>
            <IconButton className={styles.btnRight} color="default" onDoubleClick={() => rewind('right')} disableRipple>
                <Forward10 fontSize="large" className={classNames({ [commonStyles.hide]: step !== 10 })} />
                <Forward30 fontSize="large" className={classNames({ [commonStyles.hide]: step !== 30 })} />
            </IconButton>
        </div>
    );
};

export default VideoPlayer;