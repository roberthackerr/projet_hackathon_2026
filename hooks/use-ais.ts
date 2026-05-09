// hooks/use-ais.ts

"use client";

import { useEffect, useState } from "react";

export interface AIType {
  _id: string;

  name: string;

  description: string;

  domain: string;

  users: string;

  rating: number;

  gradient: string;
}

export function useAIs() {
  const [ais, setAIs] = useState<AIType[]>(
    []
  );

  const [loading, setLoading] =
    useState(true);

  async function fetchAIs() {
    try {
      const response = await fetch(
        "/api/ais"
      );

      const result =
        await response.json();

      setAIs(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAIs();
  }, []);

  return {
    ais,

    loading,

    refetch: fetchAIs,
  };
}