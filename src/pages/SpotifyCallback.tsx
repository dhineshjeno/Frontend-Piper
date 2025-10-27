import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, CheckCircle, XCircle } from 'lucide-react';
import { exchangeCodeForToken } from '../utils/spotify';

export const SpotifyCallback: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const error = urlParams.get('error');

      if (error) {
        setStatus('error');
        setError(error);
        return;
      }

      if (!code) {
        setStatus('error');
        setError('No authorization code received');
        return;
      }

      try {
        await exchangeCodeForToken(code);
        setStatus('success');
        
        // Redirect to settings after a brief delay
        setTimeout(() => {
          navigate('/settings');
        }, 2000);
      } catch (err) {
        setStatus('error');
        setError('Failed to connect to Spotify');
        console.error('Spotify connection error:', err);
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-8 max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-slate-100 mb-2">Connecting to Spotify</h2>
            <p className="text-slate-400">Please wait while we connect your account...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="bg-green-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-100 mb-2">Connected Successfully!</h2>
            <p className="text-slate-400 mb-4">Your Spotify account has been connected.</p>
            <p className="text-sm text-slate-500">Redirecting to settings...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="bg-red-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-100 mb-2">Connection Failed</h2>
            <p className="text-slate-400 mb-4">{error || 'An error occurred while connecting to Spotify.'}</p>
            <button
              onClick={() => navigate('/settings')}
              className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-medium"
            >
              Back to Settings
            </button>
          </>
        )}
      </div>
    </div>
  );
};  