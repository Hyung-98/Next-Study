'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  email: string;
  id: string;
  exp: number;
}

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
    } else {
      try {
        const decoded: DecodedToken = jwtDecode(token);

        if (decoded.exp * 1000 > Date.now()) router.replace('/');
        else router.push('/login');
      } catch (error) {
        console.error('토큰 만료', error);
      }
    }
  }, []);

  return (
    <div>
      <h1>Dashboard Protected</h1>
      <p>Welcome to your dashboard!</p>
    </div>
  );
};

export default Dashboard;
