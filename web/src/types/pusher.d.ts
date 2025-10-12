import { Pusher } from 'pusher-js';

declare global {
    interface Window {
        Pusher: typeof Pusher;
        forceUpdateMessages: (fakeMessage?: any) => void;
    }
}