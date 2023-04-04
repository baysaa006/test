import React, { createContext, useState } from 'react';
import decode from 'jwt-decode';

export interface Payload {
  sub: string;
  iss: string;
  exp: number;
  aud: string[];
  branch: string;
  currency: string;
  languages: string[];
}

export const setAccessToken = (token: string) => localStorage.setItem('token', token);

export const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token && isValidToken(token)) return token;
  }
  return 'oe6A8CGyhdPU3xS0AJRZlnUUapJAnRWKw4d4HcJGYkhpaWCm7v';
};

export const isValidToken = (token?: string) => {
  if (!token) return false;
  try {
    const { exp }: Payload = decode(token);
    if (exp * 1000 < new Date().getTime()) return false;
    return true;
  } catch (e) {
    return false;
  }
};

export const getPayload = (): Payload | null => {
  const token = getAccessToken();
  if (!token) return null;
  try {
    const payload: Payload = decode(token);
    return payload;
  } catch (e) {
    return null;
  }
};

interface AuthContextType {
  isAuthenticated: boolean;
  authenticate: (token: string, cb: Function) => void;
  signOut: () => void;
  qr: string;
  changeQr: (qr: string) => void;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setAuthenticated] = useState(isValidToken(getAccessToken()));
  const [qr, setQr] = useState('');

  const changeQr = (qr: string) => {
    setQr(qr);
    localStorage.setItem('qr', qr);
  };
  const authenticate = (token: string, cb: Function) => {
    setAccessToken(token);
    setAuthenticated(true);
    if (cb) setTimeout(cb, 100);
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
  };

  const defaultContext: AuthContextType = { isAuthenticated, authenticate, signOut, qr, changeQr };

  return <AuthContext.Provider value={defaultContext}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
