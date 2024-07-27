import { useEffect, useState } from "react";
import { getJournalEntries } from "./actions/journal.actions";

interface UseAppwriteProps {
  fn: () => void;
}

export default function useAppwrite(fn: () => any) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any>();

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fn();
      if (response) {
        setData(response);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { isLoading, data, refetch };
}
