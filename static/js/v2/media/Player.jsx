import React from "react";
import useVideoPlayer from "./components/videoPlayer";
import { Icon_pause, Triangle_right } from '../icon/icons'

const Player = (props) => {
    const videoRef = React.useRef(null);
    const {
        playerState,
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        handleVideoSpeed,
        toggleMute,
        videoTime,
        progressbar, currentTime
    } = useVideoPlayer(videoRef);
    const [Vol, setVol] = React.useState(50);
    const [volumePosition, setVolumePosition] = React.useState(20)
    const [volumeDragStart, setVolumeDragStart] = React.useState(false)
    const [showControl, setShowControl] = React.useState(false);
    const Vchange = (e) => {
        setVol(e.target.value)
        videoRef.current.volume = Vol / 100;
    }

    const Move = (e) => {
        setVolumeDragStart(!volumeDragStart)
    }
    const DragOver = (e) => {
        if (volumeDragStart) {
            setVolumePosition(e.nativeEvent.offsetY)
        }
    }
    const onClickVolumeControlProgress = (e) => {
        var y = e.nativeEvent.layerY - 80;
        if (y <= -0 && y >= -80) {
            setVolumePosition(y)
        }
    }
    return <div className="TafarayPopMediaContainer" onMouseOver={() => setShowControl(true)} onMouseLeave={() => setShowControl(false)}>
            <video
                id="video1"
                src={props.video}
                ref={videoRef}
                className=" hty d2edcug0"
                onTimeUpdate={handleOnTimeUpdate}
                onClick={togglePlay}
                poster={props?.poster}
            >
            </video>
            <button className={`LCR hgf pIc shadowvg svgPlay`} style={{
                pointerEvents: showControl ? 'fill' : '',
            }} onClick={togglePlay}>
                {!playerState.isPlaying ? (
                        <Triangle_right size={32} />
                ) : ''}
            </button>
            <div className="tiktok-174tqkn-DivVideoControlContainer e1rpry1m5" style={{
                opacity: showControl && playerState.isPlaying ? 1 : '',
            }}>
                <div className="tiktok-bo5mth-DivSeekBarContainer e1rpry1m0">
                    <div className="tiktok-j48lkt-DivSeekBarProgress e1rpry1m2"></div>
                    <div className="tiktok-1ioucls-DivSeekBarCircle e1rpry1m4" style={{ left: `calc(${progressbar}%)` }}></div>
                    <div className="tiktok-kqqewi-DivSeekBar e1rpry1m3" style={{ transform: `scaleX(${progressbar}%) translateY(-50%)` }}></div>
                </div>
                <div className="tiktok-o2z5xv-DivSeekBarTimeContainer e1rpry1m1">
                    {Math.floor(currentTime / 60) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2)}
                    /{Math.floor(videoTime / 60) + ":" + ("0" + Math.floor(videoTime % 60)).slice(-2)}</div>
            </div>

            <div className="tiktok-go7hiw-DivVoiceControlContainer e11s2kul26">
                <div className="tiktok-t8cj5n-DivVolumeControlContainer e1exqkaz0" >
                    <div className="tiktok-m4h4si-DivVolumeControlProgress e1exqkaz1" onMouseMove={DragOver} onClick={onClickVolumeControlProgress}></div>
                    <div className="tiktok-1wejges-DivVolumeControlCircle e1exqkaz3" onDragStart={Move} style={{ transform: `translateY(${volumePosition - 80}px)` }}></div>
                    <div className="tiktok-zo7bs8-DivVolumeControlBar e1exqkaz2" style={{ transform: `scaleY(${Math.abs(volumePosition) / 100})` }}></div>
                </div>
                <button data-e2e="browse-sound" className="tiktok-1k03x17-ButtonVoiceControlNew e11s2kul25">
                    <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="24"></circle><path fillRule="evenodd" clipRule="evenodd" d="M21 16.9118C21 15.2513 20.8942 15.0909 20.709 15.0221C20.5238 14.9763 20.3122 14.9992 20.1799 15.1138L15.0741 19.5258H11.4762C11.2116 19.5258 11 19.7092 11 19.9384V28.084C11 28.3132 11.2116 28.4965 11.4762 28.4965H15.0741L20.1799 32.8862C20.3122 33.0008 20.5238 33.0237 20.709 32.9779C20.8942 32.9091 21 32.7487 21 32.5882V16.9118Z" fill="white"></path><path d="M30.6653 15C32.7348 17.2304 34.0001 20.2174 34.0001 23.5C34.0001 26.7826 32.7348 29.7696 30.6653 32" stroke="white" strokeWidth="2.5" strokeLinecap="round"></path><path d="M26.8799 17.8833C28.1994 19.381 28.9999 21.347 28.9999 23.5C28.9999 25.653 28.1994 27.6191 26.8799 29.1168" stroke="white" strokeWidth="2.5" strokeLinecap="round"></path></svg>
                </button>
            </div>
        </div>
};

export default Player



const VideoLectur = (props) => {
    const videoRef = useRef(null);
    const [playing, setPlaying] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [progress, setProgress] = React.useState(0);
    const {
        playerState,
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        handleVideoSpeed,
        toggleMute,
    } = useVideoPlayer(videoRef);
    const videoTime = playerState.duration
    const [Vol, setVol] = React.useState(50);
    const [width, setWidth] = React.useState(0);
    const videoHandler = (control) => {
        togglePlay
        /**
         * 
         if (control === "play") {
             videoRef.current.play();
             setPlaying(true);
             var vid = document.getElementById("video1");
             console.log(vid.volume);
             setVideoTime(vid.duration);
             videoRef.current.volume = 0.1
         } else if (control === "pause") {
             videoRef.current.pause();
             setPlaying(false);
         }
         */
    };
    window.setInterval(function () {
        setCurrentTime(videoRef.current?.currentTime);
        setProgress((videoRef.current?.currentTime / videoTime) * 100);
    }, 1000);
    const Vchange = (e) => {
        setVol(e.target.value)
        videoRef.current.volume = Vol / 100;
    }
    React.useEffect(() => {
        setWidth(videoRef.current.offsetWidth);
        window.addEventListener("resize", (e) => {
            setWidth(videoRef.current.offsetWidth);
        })
    })
    return (
        <div className="messages-text-container  RpG Fdo Aic Lns">

            <video
                id="video1"
                src={props.video}
                ref={videoRef}
                className=" hty d2edcug0"
                onTimeUpdate={handleOnTimeUpdate}
            >
            </video>
            <div className=" p1c nhd2j8a9" style={{ position: 'absolute' }}>

                <button className="LCR hgf shadowvg" onClick={togglePlay}>
                    {!playerState.isPlaying ? (
                            <Triangle_right size={32} />
                    ) : (
                        <></>
                    )}
                </button>
            </div>
            <div className="controlsContainer" style={{ maxWidth: width, width: '100%' }} >
                <input type="range" min="0" max={100} value={Vol} onChange={Vchange} />
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={playerState.progress}
                    onChange={(e) => handleVideoProgress(e)}
                />
                <div className="controls">

                </div>
                <div className="timecontrols">
                    <p className="controlsTime">
                        {Math.floor(videoTime / 60) + ":" + ("0" + Math.floor(videoTime % 60)).slice(-2)}
                    </p>
                    <div className="time_progressbarContainer">
                        <div style={{ width: `${progress}%` }} className="time_progressBar"></div>
                    </div>
                    <p className="controlsTime">
                        {Math.floor(currentTime / 60) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2)}
                    </p>
                </div>
            </div>
        </div>
    );
};