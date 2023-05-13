import { useAppSelector, useAppDispatch } from "@/Domain/Store/hooks";
import { selectSearch } from "@/Domain/Reducer/globalSlice";
import { setSearch } from "@/Domain/Reducer/globalSlice";

export default function DashboardLayoutViewModel() {
  const search = useAppSelector(selectSearch);
  const dispatch = useAppDispatch();

  return {
    search,
    setSearch: (search: string) => dispatch(setSearch(search)),
  };
}
