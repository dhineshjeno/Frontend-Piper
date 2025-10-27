const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

export interface SpotifyTrack {
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  isPlaying: boolean;
  progress: number;
  duration: number;
  url: string;
}

export const getSpotifyAuthUrl = (): string => {
  const scopes = [
    'user-read-currently-playing',
    'user-read-playback-state',
  ].join('%20');

  return `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${scopes}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
};

export const exchangeCodeForToken = async (code: string): Promise<void> => {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const data = await response.json();
    localStorage.setItem('spotify_access_token', data.access_token);
    localStorage.setItem('spotify_refresh_token', data.refresh_token);
    localStorage.setItem('spotify_token_expiry', (Date.now() + data.expires_in * 1000).toString());
  } catch (error) {
    console.error('Token exchange error:', error);
    throw error;
  }
};

export const getTokens = (): { accessToken: string; refreshToken: string } | null => {
  const accessToken = localStorage.getItem('spotify_access_token');
  const refreshToken = localStorage.getItem('spotify_refresh_token');
  
  if (!accessToken || !refreshToken) {
    return null;
  }

  // Check if token is expired
  const expiry = localStorage.getItem('spotify_token_expiry');
  if (expiry && Date.now() > parseInt(expiry)) {
    // Token expired, clear it
    clearTokens();
    return null;
  }

  return { accessToken, refreshToken };
};

export const clearTokens = (): void => {
  localStorage.removeItem('spotify_access_token');
  localStorage.removeItem('spotify_refresh_token');
  localStorage.removeItem('spotify_token_expiry');
};

export const getSpotifyStatus = async (): Promise<SpotifyTrack | null> => {
  const tokens = getTokens();
  if (!tokens) {
    return null;
  }

  try {
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        'Authorization': `Bearer ${tokens.accessToken}`,
      },
    });

    if (response.status === 204) {
      // No content - not currently playing
      return null;
    }

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired
        clearTokens();
      }
      return null;
    }

    const data = await response.json();
    
    if (!data.item) {
      return null;
    }

    return {
      name: data.item.name,
      artist: data.item.artists.map((artist: any) => artist.name).join(', '),
      album: data.item.album.name,
      albumArt: data.item.album.images[0]?.url || '',
      isPlaying: data.is_playing,
      progress: data.progress_ms || 0,
      duration: data.item.duration_ms,
      url: data.item.external_urls.spotify,
    };
  } catch (error) {
    console.error('Error fetching Spotify status:', error);
    return null;
  }
};