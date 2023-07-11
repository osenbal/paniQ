import { asyncMe } from "@/Domain/Reducer/authSlice";
import { useAppDispatch } from "@/Domain/Store/hooks";

export default function ProtectedLayoutViewModel() {
  const dispatch = useAppDispatch();

  const getCurrentUser = async (): Promise<void> => {
    try {
      await dispatch(asyncMe());
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getCurrentUser,
  };
}
