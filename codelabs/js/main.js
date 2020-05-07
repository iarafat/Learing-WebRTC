'use strict';

const mediaStreamConstrains = {
    /*video: {
        width: {
            min: 1280
        },
        height: {
            min: 720
        }
    },*/
    video: true,
    audio: true,
};

const localVideo = document.querySelector('video');

let localStream;

function gotLocalMediaStream(mediaStream) {
    //console.log(mediaStream.getVideoTracks());

    localStream = mediaStream;
    localVideo.srcObject = mediaStream;
}

function handleLocalMediaStreamError(error) {
    console.log('navigator.getUserMedia error: ', error);
}

// init media stream
navigator.mediaDevices
    .getUserMedia(mediaStreamConstrains)
    .then(gotLocalMediaStream)
    .catch(handleLocalMediaStreamError);
