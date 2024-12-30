'use client'

import { useState, useEffect } from 'react';
import Preloader from './Preloader';

export default function ClientLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return loading ? <Preloader /> : children;
}
