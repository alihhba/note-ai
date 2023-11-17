"use client";

import { useEffect, useState } from "react";

const HydrationProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div>loading</div>;
  return <div>{children}</div>;
};

export default HydrationProvider;
