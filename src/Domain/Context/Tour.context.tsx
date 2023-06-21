import { createContext, useContext, useMemo, useState } from "react";
import { Step } from "react-joyride";
import LocalStorage from "@/Data/DataSource/LocalStorage/LocalStorage";

interface TourStateType {
  run: boolean;
  steps: Step[];
  tourActive: boolean;
}
const mainTour = LocalStorage.get("@mainTour") !== "done" ? true : false;

const tourState = {
  run: mainTour,
  steps: [
    {
      target: "#my-first-step",
      content: "Temukan Barang hilang terbaru disini",
    },
    {
      target: "#my-second-step",
      content: "Buat post jika anda menemukan barang hilang",
    },
    {
      target: "#my-third-step",
      content: "Lihat profile anda disini",
    },
    {
      target: "#my-forth-step",
      content: "Lihat notifikasi temuan barang hilang terbaru disini",
    },
    {
      target: "#my-fifth-step",
      content: "Temukan temuan barang hilang anda disini",
    },
    {
      target: "#my-sixth-step",
      content: "Fitur chatting dengan sesama pengguna",
    },
    {
      target: "#my-seventh-step",
      content:
        "Anda bisa memberikan komentar pada setiap postingan (fitur dalam pengembangan)",
    },
    {
      target: "#my-eighth-step",
      content: "Scan code ini jika barang anda telah ditemukan oleh orang lain",
    },
    {
      target: "#my-ninth-step",
      content: "Anda bisa menyimpan postingan anda",
    },
  ],
  tourActive: mainTour,
};

export const TourContext = createContext({
  tourState,
  setTourState: () => undefined,
});

TourContext.displayName = "TourContext";

export const TourProvider = (props: any) => {
  const [state, setState] = useState(tourState);

  const value = useMemo(() => {
    return {
      tourState: state,
      setTourState: setState,
    };
  }, [state, setState]);

  return <TourContext.Provider value={value} {...props} />;
};

export function useTourContext(): {
  setState: (
    patch:
      | Partial<TourStateType>
      | ((previousState: TourStateType) => Partial<TourStateType>)
  ) => void;
  state: TourStateType;
} {
  const context = useContext(TourContext);

  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }

  const { tourState, setTourState } = context;
  return {
    state: tourState,
    setState: setTourState,
  };
}
