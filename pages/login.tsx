import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';

const UID = 'u-s4t2ud-19980a5b8fe8b9e7250f2b1239c325f3f6579c38cc696313f5c761013195ef93';
const SECRET = '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';
const redirect_uri = "http://localhost:3000/";

async function getAuthorizationCode() {
  const auth_url = `https://api.intra.42.fr/oauth/authorize?client_id=${UID}&response_type=code&redirect_uri=${redirect_uri}`;
  window.location.href = auth_url;
}

async function getToken() {
  const { data } = await axios.post('https://api.intra.42.fr/oauth/token', {
    grant_type: 'client_credentials',
    client_id: UID,
    client_secret: SECRET,
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