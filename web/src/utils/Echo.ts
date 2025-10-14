import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from 'axios';

// Create a singleton instance that will be lazily initialized
let echoInstance: Echo<any> | null = null;

// Function to initialize Echo only on client-side
const initEcho = (): Echo<any> | null => {
    // Check if we're running on the client side
    if (typeof window === 'undefined') {
        return null;
    }

    // Only initialize once
    if (echoInstance) {
        return echoInstance;
    }

    // Assign Pusher to window object
    window.Pusher = Pusher;

    // Create new Echo instance
    echoInstance = new Echo({
        broadcaster: 'reverb',
        key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
        wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
        wsPort: process.env.NEXT_PUBLIC_REVERB_PORT,
        wssPort: process.env.NEXT_PUBLIC_REVERB_PORT,
        scheme: process.env.NEXT_PUBLIC_REVERB_SCHEME,
        enabledTransports: ['ws'],
        forceTLS: process.env.NEXT_PUBLIC_REVERB_SCHEME === 'https',
        disableStats: true,
        path: '/app',
        authEndpoint: `${process.env.NEXT_PUBLIC_API_URL}/broadcasting/auth`,
        authorizer: (channel, options) => {
            return {
                authorize: (socketId, callback) => {
                    axios.post(
                        `${process.env.NEXT_PUBLIC_API_URL}/broadcasting/auth`,
                        {
                            socket_id: socketId,
                            channel_name: channel.name
                        },
                        {
                            withCredentials: true, // Send laravel_session cookie
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        }
                    )
                        .then(response => {
                            callback(false, response.data);
                        })
                        .catch(error => {
                            console.error('[Broadcasting Auth Error]', error);
                            callback(true, error);
                        });
                }
            };
        }
    });

    return echoInstance;
};

// Export a function that returns the Echo instance
export default function getEcho(): Echo<any> | null {
    return initEcho();
}