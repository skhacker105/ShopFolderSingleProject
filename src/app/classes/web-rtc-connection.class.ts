export class WebRTCConnection {
    
    peerConnection: RTCPeerConnection;
    dataChannel: RTCDataChannel | null;

    constructor() {
        this.peerConnection = new RTCPeerConnection();
        this.dataChannel = null;
    }

    createDataChannel(channelName: string, onMessageCallback: any) {
        this.dataChannel = this.peerConnection.createDataChannel(channelName);
        this.dataChannel.onmessage = (event) => onMessageCallback(event.data);
        this.dataChannel.onopen = () => console.log("Data channel opened");
        this.dataChannel.onclose = () => console.log("Data channel closed");
    }

    setRemoteDescription(offerOrAnswer: RTCSessionDescriptionInit) {
        return this.peerConnection.setRemoteDescription(new RTCSessionDescription(offerOrAnswer));
    }

    addIceCandidate(candidate: RTCIceCandidateInit) {
        return this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    }

    createOffer() {
        return this.peerConnection.createOffer().then((offer) => {
            this.peerConnection.setLocalDescription(offer);
            return offer;
        });
    }

    createAnswer() {
        return this.peerConnection.createAnswer().then((answer) => {
            this.peerConnection.setLocalDescription(answer);
            return answer;
        });
    }

    handleIceCandidate(callback: any) {
        this.peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                callback(event.candidate);
            }
        };
    }

    setOnDataChannel(onDataChannelCallback: any) {
        this.peerConnection.ondatachannel = (event) => {
            this.dataChannel = event.channel;
            this.dataChannel.onmessage = (msgEvent) => onDataChannelCallback(msgEvent.data);
        };
    }
}