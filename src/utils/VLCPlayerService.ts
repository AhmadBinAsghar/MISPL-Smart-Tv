import { RefObject } from 'react';
import { VLCPlayer } from 'react-native-vlc-media-player';

class VLCPlayerService {
    private static playerRef: RefObject<VLCPlayer> | null = null;

    static setPlayerRef(ref: RefObject<VLCPlayer>) {
        VLCPlayerService.playerRef = ref;
    }

    static stopAndRelease() {
        if (VLCPlayerService.playerRef?.current) {
            VLCPlayerService.playerRef.current?.pause(); // Use pause instead of stop
        }
    }
}

export default VLCPlayerService;
