import { useAppDispatch } from "@/Domain/Store/hooks";
import { UserUseCaseImpl } from "@/Domain/UseCase/User/UserUseCaseImpl";
import { setUser } from "@/Domain/Reducer/authSlice";

export default function ProtectedLayoutViewModel() {
  const userUseCase = UserUseCaseImpl.getInstance();
  const dispatch = useAppDispatch();

  const getCurrentUser = async (): Promise<void> => {
    await userUseCase
      .getCurrentUser()
      .then((res) => {
        dispatch(setUser(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    getCurrentUser,
  };
}
