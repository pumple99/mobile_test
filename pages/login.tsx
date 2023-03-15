import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';

const UID = 'u-s4t2ud-ff7aa4e44f7e531dc6eb95c1bf10a691270038d8b7508d6f07cd4daaac81ca35';
const SECRET = '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';
const REDIRECT_URI = "https://mobile-test-snowy.vercel.app/";

async function getAuthorizationCode() {
  const auth_url = `https://api.intra.42.fr/oauth/authorize?client_id=${UID}&response_type=code&redirect_uri=${REDIRECT_URI}`;
  window.location.href = auth_url;
}

async function getToken() {
  const { data } = await axios.post('https://api.intra.42.fr/oauth/token', {
    grant_type: 'client_credentials',
    client_id: UID,
    client_secret: SECRET,
    redirect_uri: REDIRECT_URI
  });
  return data.access_token;
}

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const token = await getToken();
    console.log(token); // Check that token is being retrieved correctly
    setLoading(false);
    getAuthorizationCode();
  };

  return (
    <div>
      <h1>Login</h1>
      <button disabled={loading} onClick={handleLogin}>
        {loading ? 'Loading...' : 'Login with 42'}
      </button>
    </div>
  );
}