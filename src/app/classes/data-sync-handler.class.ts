import { IAccessControl, ISyncTransactionData } from "../interfaces";
import { WebRTCConnection } from "./";

export class DataSyncHandler {

    currentUserId: string;
    connections: Map<string, WebRTCConnection>;
    failedTransactions: Map<string, any>;

    constructor(currentUserId: string) {
        this.currentUserId = currentUserId;
        this.connections = new Map(); // { userId: WebRTCConnection }
        this.failedTransactions = new Map(); // { transactionId: {data, targetUserId} }
    }

    establishConnection(targetUserId: string, receiveData: Function): Promise<void> {
        return new Promise((resolve, reject) => {
            const connection = new WebRTCConnection();

            connection.handleIceCandidate((candidate: RTCIceCandidateInit) => {
                this.sendIceCandidate(targetUserId, candidate);
            });

            connection.createDataChannel("syncChannel", (data: ISyncTransactionData) => receiveData(data));

            this.connections.set(targetUserId, connection);

            connection.createOffer().then((offer) => {
                this.sendOffer(targetUserId, offer);
                resolve();
            }).catch((error) => {
                console.error(`Failed to create offer for ${targetUserId}:`, error);
                reject(error);
            });
        });
    }

    handleOffer(targetUserId: string, offer: RTCSessionDescriptionInit, receiveData: Function) {
        const connection = new WebRTCConnection();

        connection.handleIceCandidate((candidate: RTCIceCandidateInit) => {
            this.sendIceCandidate(targetUserId, candidate);
        });

        connection.setOnDataChannel((data: ISyncTransactionData) => receiveData(data));

        this.connections.set(targetUserId, connection);

        return connection.setRemoteDescription(offer).then(() => {
            return connection.createAnswer().then((answer) => {
                this.sendAnswer(targetUserId, answer);
            });
        });
    }

    handleAnswer(targetUserId: string, answer: RTCSessionDescriptionInit) {
        const connection = this.connections.get(targetUserId);
        if (connection) {
            connection.setRemoteDescription(answer);
        }
    }

    addIceCandidate(targetUserId: string, candidate: RTCIceCandidateInit) {
        const connection = this.connections.get(targetUserId);
        if (connection) {
            connection.addIceCandidate(candidate);
        }
    }

    sendData(targetUserId: string, data: ISyncTransactionData) {
        const connection = this.connections.get(targetUserId);
        if (connection && connection.dataChannel && connection.dataChannel.readyState === "open") {
            try {
                connection.dataChannel.send(JSON.stringify(data));
                return { success: true };
            } catch (error) {
                console.error(`Failed to send data to ${targetUserId}:`, error);
                return { success: false, reason: 'Network Error' };
            }
        } else {
            console.error(`No connection established with ${targetUserId}`);
            return { success: false, reason: 'No Connection' };
        }
    }

    syncData(data: ISyncTransactionData, accessControls: IAccessControl[]): { success: boolean, failedTargets: { userId: string, reason: string }[] } {
        const failedTargets: { userId: string, reason: string }[] = [];

        accessControls.forEach(accessControl => {
            if (accessControl.userId && accessControl.hasDataAccess(data) && accessControl.hasFeatrureAccess(data)) {
                const result = this.sendData(accessControl.userId, data);
                if (!result.success) {
                    failedTargets.push({ userId: accessControl.userId, reason: result.reason || 'Unknown Error' });

                    if (result.reason !== 'Access Denied') {
                        this.storeFailedTransaction(data, accessControl.userId);
                    }
                }
            }
        });

        return {
            success: failedTargets.length === 0,
            failedTargets
        };
    }

    storeFailedTransaction(data: ISyncTransactionData, targetUserId: string) {
        const transactionId = data.id || Date.now().toString();
        this.failedTransactions.set(transactionId, { data, targetUserId });
    }

    retryFailedTransactions() {
        this.failedTransactions.forEach(({ data, targetUserId }, transactionId) => {
            const result = this.sendData(targetUserId, data);
            if (result.success) {
                this.failedTransactions.delete(transactionId);
            }
        });
    }

    sendOffer(targetUserId: string, offer: RTCSessionDescriptionInit) {
        console.log(`Sending offer to ${targetUserId}`, offer);
        // Simulate sending offer via signaling
    }

    sendAnswer(targetUserId: string, answer: RTCSessionDescriptionInit) {
        console.log(`Sending answer to ${targetUserId}`, answer);
        // Simulate sending answer via signaling
    }

    sendIceCandidate(targetUserId: string, candidate: RTCIceCandidateInit) {
        console.log(`Sending ICE candidate to ${targetUserId}:`, candidate);
        // Simulate sending ICE candidate via signaling
    }
}
