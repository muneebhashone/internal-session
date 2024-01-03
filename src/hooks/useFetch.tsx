import { useEffect, useState } from "react";

export const useFetch = (fetcher: () => any) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const someData = fetcher();
    setData(someData);
  }, []);

  return { data };
};
