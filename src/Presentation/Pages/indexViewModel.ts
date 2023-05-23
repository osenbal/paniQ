import { useEffect, useState, useRef } from "react";
import { RefHandlerModalQrcode } from "@/Presentation/Components/Modal/ModalQrcode";

const IndexViewModel = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const modalQrcode = useRef() as React.MutableRefObject<RefHandlerModalQrcode>;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return {
    isLoading,
    setIsLoading,
    modalQrcode,
  };
};

export default IndexViewModel;
