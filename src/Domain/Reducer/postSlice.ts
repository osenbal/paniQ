import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../Store/store';
import { toast } from 'react-toastify';
import { IPost } from '@/Contracts/Response/IPostsResponse';
import PostUseCaseImpl from '@/Domain/UseCase/Posts/PostUseCaseImpl';
import { ISearchPostRequest } from '@/Contracts/Requests/IPostRequest';

const postUseCase = PostUseCaseImpl.getInstance();

// Define a type for the slice state
interface IPostState {
  searchText: string;
  posts: IPost[];
  searchResult: IPost[];
  isLoadingSearch: boolean;
}

// Define the initial state using that type
const initialState: IPostState = {
  searchText: '',
  posts: [],
  searchResult: [],
  isLoadingSearch: false,
};

// methdos for Post
export const postMethods = {
  getAllPost: '/post/list',
  searchPost: '/post/search',
  requestValidatePost: '/post/request-validate',
  getDetailPost: '/post/detail',
  getPostByUserId: '/post/list/user_id',
};

export const asyncGetAllPost = createAsyncThunk(
  postMethods.getAllPost,
  async (page: number, { rejectWithValue }) => {
    try {
      const res = await postUseCase.getPosts(page);
      if (res.status_code === 200) {
        return res.data;
      } else {
        toast.error(res?.status_code || 'Something went wrong');
        return rejectWithValue(res?.status_code || 'Something went wrong');
        // return rejectWithValue('Something went wrong');
      }
    } catch (error) {
      toast.error('Something went wrong');
      return rejectWithValue('Something went wrong');
    }
  }
);

export const asyncSearchPost = createAsyncThunk(
  postMethods.searchPost,
  async (data: ISearchPostRequest, { rejectWithValue }) => {
    try {
      const res = await postUseCase.searchPost(data);
      if (res.status_code === 200) {
        // if res.status === true
        return res.data;
      } else {
        // if res.status === false
        toast.error('Something went wrong');
        return rejectWithValue('Something went wrong');
      }
    } catch (error) {
      toast.error('Something went wrong');
      return rejectWithValue('Something went wrong');
    }
  }
);

export const requestValidatePost = createAsyncThunk(
  postMethods.requestValidatePost,
  async (post_id: string, { rejectWithValue }) => {
    try {
      const res = await postUseCase.requestValidatePost(post_id);
      if (res.status_code === 200) {
        // if res.status === true
        return res.data;
      } else {
        // if res.status === false
        return rejectWithValue('Something went wrong');
      }
    } catch (error) {
      toast.error('Something went wrong');
      return rejectWithValue('Something went wrong');
    }
  }
);

export const getDetailPost = createAsyncThunk(
  postMethods.getDetailPost,
  async (post_id: string | number, { rejectWithValue }) => {
    try {
      const res = await postUseCase.getDetailPost(post_id);
      if (res.status_code === 200) {
        return res.data as IPost;
      } else {
        return null;
      }
    } catch (error) {
      toast.error('Something went wrong');
      return rejectWithValue('Something went wrong');
    }
  }
);

export const asyncGetPostByUserId = createAsyncThunk(
  postMethods.getPostByUserId,
  async (
    {
      page,
      user_id,
    }: {
      page: number;
      user_id: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await postUseCase.getPosts(page, user_id);
      if (res.status_code === 200) {
        return res.data;
      } else {
        return rejectWithValue('Something went wrong');
      }
    } catch (error) {
      toast.error('Something went wrong');
      return rejectWithValue('Something went wrong');
    }
  }
);

export const postSlice = createSlice({
  name: 'post',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    appendPost: (state, action: PayloadAction<IPost>) => {
      state.posts.push(action.payload);
    },
    setPosts: (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setSearchResult: (state, action: PayloadAction<IPost[]>) => {
      state.searchResult = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncGetAllPost.fulfilled, (state, action) => {
      state.posts.push(...action.payload);
    });
    builder
      .addCase(asyncSearchPost.pending, (state) => {
        state.isLoadingSearch = true;
      })
      .addCase(asyncSearchPost.fulfilled, (state, action) => {
        state.searchResult = action.payload;
        state.isLoadingSearch = false;
      })
      .addCase(asyncSearchPost.rejected, (state) => {
        state.searchResult = [];
        state.isLoadingSearch = false;
      });
  },
});

export const { appendPost, setPosts, setSearchText, setSearchResult } =
  postSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getPosts = (state: RootState) => state.post.posts;

export default postSlice.reducer;
