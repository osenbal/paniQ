import { useEffect, useState } from "react";

const IndexViewModel = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return {
    isLoading,
    setIsLoading,
  };
};

export default IndexViewModel;
