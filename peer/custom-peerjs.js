var constraints = { audio: true, video: true };
navigator.getWebcam = navigator.mediaDevices.getUserMedia;

var peer = new Peer({
    host: "custom-peerserver.test",
    // port: 443,
    // key: 'lwjd5qra8257b9',
    debug: 3,
    config: {
        'iceServers': [
            { url: 'stun:stun.l.google.com:19302' },
            { url: 'stun:stun1.l.google.com:19302' },
            { url: 'turn:numb.viagenie.ca', username: "", credential: "" }
        ]
    }
});

peer.on('open', function (id) {
    console.log('My peer ID is: ' + id);
});

// on open, set the peer id
peer.on('open', function () {
    $('#my-id').text(peer.id);
});


// peer call
peer.on('call', function (call) {
    // answer automaticlly for demo
    call.answer(window.localStream);
    stepThree(call);
});

// click hanler setup
$(function () {
    // call connection
    $('#make-call').on('click', function () {
        var call = peer.call($('#callto-id').val(), window.localStream);
        stepThree(call);
    });

    // end call
    $('#end-call').on('click', function () {
        //window.existingCall.close();
        // peer.disconnect();
        peer.destroy();
        location.reload();
        setpTwo();
    });

    // retry if getUserMedia fails
    $('#step1-retry').on('click', function () {
        $('#step1-error').hide();
        setpOne();
    })

    // get things started
    setpOne();
});

function setpOne() {
    // get audio/video streem
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (streem) {
            $('#my-video').prop('srcObject', streem);

            window.localStream = streem;
            setpTwo();
        })
        .catch(function (err) {
            console.log(err)
            $('#step1-error').show();
        });
}

function setpTwo() {
    // adjust the UI
    $('#step1', '#step3').hide();
    $('#step2').show();
}

function stepThree(call) {
    // hang up on an existing call if present
    if (window.existingCall) {
        window.existingCall.close();
    }

    // wait for stream on the call, then setup peer video
    call.on('stream', function (remoteStream) {
        $('#friend').prop('srcObject', remoteStream);
    });

    $('#step1', '#step2').hide();
    $('#step3').show();
}

