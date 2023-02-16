import React,{ useEffect, useState, useRef } from "react";
 function Stream() {
	const [mystream, setmystream] = useState(null);
	const [videoswitch, setvideo] = useState(true);
	const [audioswitch, setaudio] = useState(true);
	const myvideo = useRef(null);

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				myvideo.current.srcObject = stream;
				myvideo.current.autoplay = true;
				myvideo.current.muted = false;
				setmystream(stream);
			});
	}, []);

	const handleVideo = () => {
		if (videoswitch) {
			setvideo(false);
			mystream.getTracks().forEach(function (track) {
				if (track.readyState === "live" &&
					track.kind === "video") {
					track.enabled = false;
				}
			});
		} else {
			setvideo(true);
			mystream.getTracks().forEach(function (track) {
				if (track.readyState === "live" &&
					track.kind === "video") {
					track.enabled = true;
				}
			});
		}
	};
	const handleAudio = () => {
		if (audioswitch) {
			setaudio(false);
			mystream.getTracks().forEach(function (track) {
				if (track.readyState === "live" &&
					track.kind === "audio") {
					track.enabled = false;
				}
			});
		} else {
			setaudio(true);
			mystream.getTracks().forEach(function (track) {
				if (track.readyState === "live" &&
					track.kind === "audio") {
					track.enabled = true;
				}
			});
		}
	};
	return (
		<div>
			<button onClick={handleVideo}>
				{videoswitch ? "Turn off video" :
					"Turn on video"}
			</button>
			<button onClick={handleAudio}>
				{audioswitch ? "Turn off audio" :
					"Turn on audio"}
			</button>
			<video ref={myvideo} style={{
				width: "500px", height: "500px" }}></video>
		</div>
	);
}
export default Stream