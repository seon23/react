import { useEffect, useState } from 'react';

const cacheUrlData: Record<string, unknown> = {};

const fetchByCache = async (url: string, init: RequestInit) => {
  console.log('fetchByCache>>>>>', url, cacheUrlData);
  if (url in cacheUrlData) return cacheUrlData[url];

  const res = await fetch(url, init);
  console.log('fetched res>>>', res);
  const data = await res.json();
  console.log('fetched data>>>', data);
  cacheUrlData[url] = data;
  return data;
};

export const useFetch = <T>(url: string, cachedData?: T) => {
  const [data, setData] = useState<T | undefined>(cachedData);

  useEffect(() => {
    if (data) return;
    const controller = new AbortController();
    const { signal } = controller;

    fetchByCache(url, { signal })
      .then((data) => setData(data))
      .catch(console.error);

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return data;
};
