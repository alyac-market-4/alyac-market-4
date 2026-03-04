const IMAGE_ROOT = '/image';
const USER_ROOT = '/user';
const POST_ROOT = '/post';
const PRODUCT_ROOT = '/product';
const PROFILE_ROOT = '/profile';

export const API_ENDPOINTS = {
  IMAGE: {
    UPLOAD_SINGLE: `${IMAGE_ROOT}/uploadfile`,
    UPLOAD_MULTI: `${IMAGE_ROOT}/uploadfiles`,
  },

  USER: {
    REGISTER: `${USER_ROOT}`,
    UPDATE_PROFILE: `${USER_ROOT}`,
    SIGN_IN: `${USER_ROOT}/signin`,
    REFRESH_TOKEN: `${USER_ROOT}/refresh`,
    GET_MY_INFO: `${USER_ROOT}/myinfo`,
    CHECK_TOKEN: `${USER_ROOT}/checktoken`,
    VALID_EMAIL: `${USER_ROOT}/emailvalid`,
    VALID_ACCOUNT: `${USER_ROOT}/accountnamevalid`,
    SEARCH: `${USER_ROOT}/searchuser`,
  },

  PROFILE: {
    GET_PROFILE: (accountname: string) => `${PROFILE_ROOT}/${accountname}`,
    FOLLOW: (accountname: string) => `${PROFILE_ROOT}/${accountname}/follow`,
    UNFOLLOW: (accountname: string) => `${PROFILE_ROOT}/${accountname}/unfollow`,
    GET_FOLLOWINGS: (accountname: string) => `${PROFILE_ROOT}/${accountname}/following`,
    GET_FOLLOWERS: (accountname: string) => `${PROFILE_ROOT}/${accountname}/follower`,
  },

  POST: {
    CREATE: `${POST_ROOT}`,
    GET_ALL: `${POST_ROOT}`,
    GET_FEED: `${POST_ROOT}/feed`,
    GET_DETAIL: (postId: string) => `${POST_ROOT}/${postId}`,
    UPDATE: (postId: string) => `${POST_ROOT}/${postId}`,
    DELETE: (postId: string) => `${POST_ROOT}/${postId}`,
    GET_USER_POSTS: (accountname: string) => `${POST_ROOT}/${accountname}/userpost`,
    REPORT: (postId: string) => `${POST_ROOT}/${postId}/report`,
    TOGGLE_HEART: (postId: string) => `${POST_ROOT}/${postId}/heart`,
    UNHEART: (postId: string) => `${POST_ROOT}/${postId}/unheart`,

    COMMENTS: {
      CREATE: (postId: string) => `${POST_ROOT}/${postId}/comments`,
      GET_LIST: (postId: string) => `${POST_ROOT}/${postId}/comments`,
      DELETE: (postId: string, commentId: string) => `${POST_ROOT}/${postId}/comments/${commentId}`,
      REPORT: (postId: string, commentId: string) =>
        `${POST_ROOT}/${postId}/comments/${commentId}/report`,
    },
  },

  PRODUCT: {
    CREATE: `${PRODUCT_ROOT}`,
    GET_USER_PRODUCTS: (accountname: string) => `${PRODUCT_ROOT}/${accountname}`,
    GET_DETAIL: (productId: string) => `${PRODUCT_ROOT}/detail/${productId}`,
    UPDATE: (productId: string) => `${PRODUCT_ROOT}/${productId}`,
    DELETE: (productId: string) => `${PRODUCT_ROOT}/${productId}`,
  },
} as const;

export type ApiEndpoints = typeof API_ENDPOINTS;
