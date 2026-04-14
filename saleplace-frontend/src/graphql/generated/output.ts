import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type ActorModel = {
  __typename?: 'ActorModel';
  avatar?: Maybe<Scalars['String']['output']>;
  avatarType?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type AuthModel = {
  __typename?: 'AuthModel';
  message?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserModel>;
};

export type BlockUser = {
  __typename?: 'BlockUser';
  avatar?: Maybe<Scalars['String']['output']>;
  avatarType: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type BlockUserInput = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type BlockUserPagination = {
  __typename?: 'BlockUserPagination';
  items: Array<BlockUser>;
  skip: Scalars['Int']['output'];
  take: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type CanceledSubscription = {
  __typename?: 'CanceledSubscription';
  id: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type CategoryModel = {
  __typename?: 'CategoryModel';
  children?: Maybe<Array<Maybe<CategoryModel>>>;
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  parentId?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
};

export type ChangeEmailInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type ChangePresetAvatarInput = {
  preset: Scalars['String']['input'];
};

export type ChangePresetAvatarModel = {
  __typename?: 'ChangePresetAvatarModel';
  avatar?: Maybe<Scalars['String']['output']>;
  avatarType: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type ChangeProfileInfoInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type ChatParticipantModel = {
  __typename?: 'ChatParticipantModel';
  avatar?: Maybe<Scalars['String']['output']>;
  avatarType: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isOnline?: Maybe<Scalars['Boolean']['output']>;
  username: Scalars['String']['output'];
};

export type ChatUserModel = {
  __typename?: 'ChatUserModel';
  avatar?: Maybe<Scalars['String']['output']>;
  avatarType?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isOnline?: Maybe<Scalars['Boolean']['output']>;
  username: Scalars['String']['output'];
};

export type CheckoutResponse = {
  __typename?: 'CheckoutResponse';
  checkoutUrl: Scalars['String']['output'];
};

export type ConversationListItemModel = {
  __typename?: 'ConversationListItemModel';
  id: Scalars['ID']['output'];
  lastMessage?: Maybe<MessageModel>;
  participant: UserModel;
  unreadCount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  isActive: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateProductInput = {
  categoryId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  title: Scalars['String']['input'];
};

export type CreateProductModel = {
  __typename?: 'CreateProductModel';
  id: Scalars['ID']['output'];
};

export type CreateReviewInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['String']['input'];
  rating?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type DeactivateAccountInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  pin?: InputMaybe<Scalars['String']['input']>;
};

export type DeactivateAccountResult = {
  __typename?: 'DeactivateAccountResult';
  deactivatedAt?: Maybe<Scalars['DateTime']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  userId?: Maybe<Scalars['ID']['output']>;
};

export type DeleteProductImagesInput = {
  imageIds: Array<Scalars['ID']['input']>;
  productId: Scalars['ID']['input'];
};

export type DeleteProductInput = {
  productId: Scalars['ID']['input'];
};

export type DeleteReviewInput = {
  reviewId: Scalars['String']['input'];
};

export type DeviceModel = {
  __typename?: 'DeviceModel';
  browser: Scalars['String']['output'];
  os: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type EditMessage = {
  messageId: Scalars['ID']['input'];
  newContent: Scalars['String']['input'];
};

export type EnableTotpInput = {
  pin: Scalars['String']['input'];
  secret: Scalars['String']['input'];
};

export type FollowPagination = {
  __typename?: 'FollowPagination';
  items: Array<FollowingUser>;
  skip: Scalars['Int']['output'];
  take: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type FollowUserInput = {
  targetUserId: Scalars['ID']['input'];
};

export type FollowingUser = {
  __typename?: 'FollowingUser';
  avatar?: Maybe<Scalars['String']['output']>;
  avatarType: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isFollowedByCurrentUser?: Maybe<Scalars['Boolean']['output']>;
  username: Scalars['String']['output'];
};

export type FollowingsInput = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type GetSubscriptionResponse = {
  __typename?: 'GetSubscriptionResponse';
  currentPeriodEnd: Scalars['DateTime']['output'];
  currentPeriodStart: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  interval?: Maybe<Scalars['String']['output']>;
  plan: PlanModel;
  productUser: Scalars['Float']['output'];
  status: Scalars['String']['output'];
};

export type ItemPaginationInput = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type LocationModel = {
  __typename?: 'LocationModel';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};

export type LoginInput = {
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
  pin?: InputMaybe<Scalars['String']['input']>;
};

export type MessageChangeModel = {
  __typename?: 'MessageChangeModel';
  conversationId: Scalars['ID']['output'];
  lastMessage: MessageModel;
  participant: ChatParticipantModel;
  type: Scalars['String']['output'];
  unreadCount: Scalars['Int']['output'];
};

export type MessageModel = {
  __typename?: 'MessageModel';
  content: Scalars['String']['output'];
  conversationId: Scalars['ID']['output'];
  createdAt: Scalars['String']['output'];
  deleted: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  sender?: Maybe<ChatUserModel>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type MessagePage = {
  __typename?: 'MessagePage';
  messages: Array<MessageModel>;
  totalCount: Scalars['Int']['output'];
};

export type MessageUpdated = {
  __typename?: 'MessageUpdated';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Meta = {
  __typename?: 'Meta';
  limit: Scalars['Float']['output'];
  page: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  blockUser: BlockUser;
  byProduct: CheckoutResponse;
  cancelSubscription: CanceledSubscription;
  changeEmail: UserEmailModel;
  changePassword: Scalars['Boolean']['output'];
  changeProfileAvatar?: Maybe<ChangePresetAvatarModel>;
  changeProfileInfo: UserInfoModel;
  clearSessionCookie: Scalars['Boolean']['output'];
  createCategory: Scalars['Boolean']['output'];
  createProduct: CreateProductModel;
  createReview: ReviewModel;
  createSocialLink: PublicSocialLinkModel;
  createUser: Scalars['Boolean']['output'];
  deactivateAccount: DeactivateAccountResult;
  deleteConversation: Scalars['Boolean']['output'];
  deleteMessage: Scalars['Boolean']['output'];
  deleteNotification: Scalars['Boolean']['output'];
  deleteProduct: Scalars['Boolean']['output'];
  deleteProductImages: Scalars['Boolean']['output'];
  deleteReview: Scalars['Boolean']['output'];
  disableTotp: TotpDisable;
  editCategory: Scalars['Boolean']['output'];
  editMessage: MessageUpdated;
  editReview: ReviewModel;
  enableTotp: TotpEnable;
  followUser: Scalars['Boolean']['output'];
  loginUser: AuthModel;
  logoutUser: Scalars['Boolean']['output'];
  markAllNotificationsAsRead: Scalars['Boolean']['output'];
  markConversationAsRead: Scalars['Boolean']['output'];
  newPassword: Scalars['Boolean']['output'];
  publishProduct: Scalars['Boolean']['output'];
  refund: RefundResponse;
  removeProfileAvatar: ChangePresetAvatarModel;
  removeSession: RemoveSession;
  removeSocialLink: Scalars['Boolean']['output'];
  reorderSocialLinks: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  restoreReview: Scalars['Boolean']['output'];
  sendMessage: MessageModel;
  startConversation: ConversationListItemModel;
  subscription: SubscriptionResponse;
  trackProductView: Scalars['Boolean']['output'];
  unblockUser: Scalars['Boolean']['output'];
  unfollowUser: Scalars['Boolean']['output'];
  updateImagesPosition: Scalars['Boolean']['output'];
  updateProduct: Scalars['Boolean']['output'];
  updateSocialLink: PublicSocialLinkModel;
  verifyAccount: UserModel;
};


export type MutationBlockUserArgs = {
  blockedId: Scalars['String']['input'];
};


export type MutationByProductArgs = {
  productId: Scalars['String']['input'];
};


export type MutationChangeEmailArgs = {
  data: ChangeEmailInput;
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationChangeProfileAvatarArgs = {
  data?: InputMaybe<ChangePresetAvatarInput>;
};


export type MutationChangeProfileInfoArgs = {
  data: ChangeProfileInfoInput;
};


export type MutationCreateCategoryArgs = {
  data: CreateCategoryInput;
};


export type MutationCreateProductArgs = {
  data: CreateProductInput;
};


export type MutationCreateReviewArgs = {
  data: CreateReviewInput;
};


export type MutationCreateSocialLinkArgs = {
  data: SocialLinkInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeactivateAccountArgs = {
  data: DeactivateAccountInput;
};


export type MutationDeleteConversationArgs = {
  conversationId: Scalars['String']['input'];
};


export type MutationDeleteMessageArgs = {
  messageId: Scalars['String']['input'];
};


export type MutationDeleteNotificationArgs = {
  notificationId: Scalars['String']['input'];
};


export type MutationDeleteProductArgs = {
  data: DeleteProductInput;
};


export type MutationDeleteProductImagesArgs = {
  data: DeleteProductImagesInput;
};


export type MutationDeleteReviewArgs = {
  data: DeleteReviewInput;
};


export type MutationEditCategoryArgs = {
  data: UpdateCategoryInput;
  id: Scalars['String']['input'];
};


export type MutationEditMessageArgs = {
  data: EditMessage;
};


export type MutationEditReviewArgs = {
  data: UpdateReviewInput;
};


export type MutationEnableTotpArgs = {
  data: EnableTotpInput;
};


export type MutationFollowUserArgs = {
  data: FollowUserInput;
};


export type MutationLoginUserArgs = {
  data: LoginInput;
};


export type MutationMarkConversationAsReadArgs = {
  conversationId: Scalars['String']['input'];
};


export type MutationNewPasswordArgs = {
  data: NewPasswordInput;
};


export type MutationPublishProductArgs = {
  productId: Scalars['String']['input'];
};


export type MutationRefundArgs = {
  orderId: Scalars['String']['input'];
};


export type MutationRemoveSessionArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveSocialLinkArgs = {
  id: Scalars['String']['input'];
};


export type MutationReorderSocialLinksArgs = {
  list: Array<SocialLinkOrderInput>;
};


export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};


export type MutationRestoreReviewArgs = {
  data: RestoreReviewInput;
};


export type MutationSendMessageArgs = {
  content: Scalars['String']['input'];
  conversationId: Scalars['String']['input'];
};


export type MutationStartConversationArgs = {
  data: StartConversationInput;
};


export type MutationSubscriptionArgs = {
  planId: Scalars['String']['input'];
};


export type MutationTrackProductViewArgs = {
  productId: Scalars['String']['input'];
};


export type MutationUnblockUserArgs = {
  blockedId: Scalars['String']['input'];
};


export type MutationUnfollowUserArgs = {
  data: UnfollowUserInput;
};


export type MutationUpdateImagesPositionArgs = {
  data: DeleteProductImagesInput;
};


export type MutationUpdateProductArgs = {
  data: UpdateProductInput;
};


export type MutationUpdateSocialLinkArgs = {
  data: SocialLinkInput;
  id: Scalars['String']['input'];
};


export type MutationVerifyAccountArgs = {
  data: VerificationInput;
};

export type MyReviewModel = {
  __typename?: 'MyReviewModel';
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isDeleted: Scalars['Boolean']['output'];
  product: MyReviewProductModel;
  rating?: Maybe<Scalars['Int']['output']>;
};

export type MyReviewProductModel = {
  __typename?: 'MyReviewProductModel';
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type NewPasswordInput = {
  password: Scalars['String']['input'];
  passwordRepeat: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type NotificationModel = {
  __typename?: 'NotificationModel';
  actor?: Maybe<ActorModel>;
  createdAt: Scalars['DateTime']['output'];
  entityId?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  isRead: Scalars['Boolean']['output'];
  type: NotificationType;
  url?: Maybe<Scalars['String']['output']>;
};

/** Notification type */
export enum NotificationType {
  CommentCreated = 'COMMENT_CREATED',
  Followed = 'FOLLOWED',
  InvoicePaid = 'INVOICE_PAID',
  Liked = 'LIKED',
  OrderPaid = 'ORDER_PAID',
  OrderRefunded = 'ORDER_REFUNDED',
  OrderRefundedFailed = 'ORDER_REFUNDED_FAILED',
  OrderRefundedSeller = 'ORDER_REFUNDED_SELLER',
  PostCreated = 'POST_CREATED',
  ProductSold = 'PRODUCT_SOLD',
  SubscriptionCanceled = 'SUBSCRIPTION_CANCELED',
  SubscriptionCancelScheduled = 'SUBSCRIPTION_CANCEL_SCHEDULED',
  SubscriptionDeleted = 'SUBSCRIPTION_DELETED'
}

export type NotificationsListResponse = {
  __typename?: 'NotificationsListResponse';
  items: Array<NotificationModel>;
  total: Scalars['Int']['output'];
};

export type PaginatedProducts = {
  __typename?: 'PaginatedProducts';
  items: Array<ProductModel>;
  meta: Meta;
};

export type PaginationInput = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type PlanModel = {
  __typename?: 'PlanModel';
  id: Scalars['String']['output'];
  limit?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
};

export type ProductImageModel = {
  __typename?: 'ProductImageModel';
  id: Scalars['ID']['output'];
  position: Scalars['Float']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type ProductModel = {
  __typename?: 'ProductModel';
  averageRating: Scalars['Float']['output'];
  category?: Maybe<CategoryModel>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  images?: Maybe<Array<ProductImageModel>>;
  price: Scalars['Float']['output'];
  reviews?: Maybe<Array<ReviewModel>>;
  reviewsCount: Scalars['Float']['output'];
  slug?: Maybe<Scalars['String']['output']>;
  status: ProductStatus;
  title: Scalars['String']['output'];
  user: PublicUserModel;
  views: Scalars['Float']['output'];
};

export type ProductResponse = {
  __typename?: 'ProductResponse';
  hasMore: Scalars['Boolean']['output'];
  items: Array<ProductsModel>;
  nextCursor?: Maybe<Scalars['String']['output']>;
};

export enum ProductStatus {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Deleted = 'DELETED',
  Draft = 'DRAFT',
  Sold = 'SOLD'
}

export type ProductsFilterInput = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsModel = {
  __typename?: 'ProductsModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  images?: Maybe<Scalars['String']['output']>;
  price: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type PublicSocialLinkModel = {
  __typename?: 'PublicSocialLinkModel';
  id: Scalars['ID']['output'];
  position: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type PublicUserModel = {
  __typename?: 'PublicUserModel';
  avatar?: Maybe<Scalars['String']['output']>;
  avatarType: Scalars['String']['output'];
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isFollowedByCurrentUser?: Maybe<Scalars['Boolean']['output']>;
  isOnline?: Maybe<Scalars['Boolean']['output']>;
  username: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  allCategory: Array<CategoryModel>;
  filters: PaginatedProducts;
  findCurrentSession: SessionModel;
  findMyFollowers: FollowPagination;
  findMyFollowings: FollowPagination;
  findNotificationsByUser: NotificationsListResponse;
  findProfile?: Maybe<UserModel>;
  findSessionsByUser: Array<SessionModel>;
  findUnreadNotificationCount: Scalars['Int']['output'];
  generateTotpSecret: TotpModel;
  getBlockUser: BlockUserPagination;
  getConversations: Array<ConversationListItemModel>;
  getMessages: MessagePage;
  getOne: ProductModel;
  getSubscription: Array<GetSubscriptionResponse>;
  getUnreadCount: Scalars['String']['output'];
  getUserProducts: ProductResponse;
  myReviews: Array<MyReviewModel>;
  onlineUsers: Array<Scalars['String']['output']>;
  publicProfile?: Maybe<PublicUserModel>;
  socialLinks: Array<PublicSocialLinkModel>;
  subscriptionPlans: Array<SubscriptionPlanResponse>;
  transactionsList: TransactionsListResponse;
};


export type QueryFiltersArgs = {
  filters?: InputMaybe<ProductsFilterInput>;
};


export type QueryFindMyFollowersArgs = {
  pagination?: InputMaybe<FollowingsInput>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindMyFollowingsArgs = {
  pagination?: InputMaybe<FollowingsInput>;
};


export type QueryFindNotificationsByUserArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryGetBlockUserArgs = {
  pagination?: InputMaybe<BlockUserInput>;
};


export type QueryGetMessagesArgs = {
  conversationId: Scalars['String']['input'];
  pagination?: InputMaybe<ItemPaginationInput>;
};


export type QueryGetOneArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetUnreadCountArgs = {
  conversationId: Scalars['String']['input'];
};


export type QueryGetUserProductsArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  username: Scalars['String']['input'];
};


export type QueryPublicProfileArgs = {
  username: Scalars['String']['input'];
};


export type QuerySocialLinksArgs = {
  username: Scalars['String']['input'];
};


export type QueryTransactionsListArgs = {
  pagination?: InputMaybe<TransactionsPaginationInput>;
};

export type RefundResponse = {
  __typename?: 'RefundResponse';
  refundId: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type RemoveSession = {
  __typename?: 'RemoveSession';
  removedSessionId: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  userId: Scalars['String']['output'];
};

export type ResetPasswordInput = {
  email: Scalars['String']['input'];
};

export type RestoreReviewInput = {
  reviewId: Scalars['String']['input'];
};

export type ReviewModel = {
  __typename?: 'ReviewModel';
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  rating?: Maybe<Scalars['Int']['output']>;
  user: PublicUserModel;
};

export type SessionMetadataModel = {
  __typename?: 'SessionMetadataModel';
  device: DeviceModel;
  ip: Scalars['String']['output'];
  location: LocationModel;
};

export type SessionModel = {
  __typename?: 'SessionModel';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  metadata: SessionMetadataModel;
  userId: Scalars['String']['output'];
};

export type SocialLinkInput = {
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type SocialLinkOrderInput = {
  id: Scalars['String']['input'];
  position: Scalars['Float']['input'];
};

export type StartConversationInput = {
  userId: Scalars['ID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  chatChange: MessageChangeModel;
  messageChange: MessageModel;
  notificationCreated: NotificationModel;
};


export type SubscriptionMessageChangeArgs = {
  conversationId: Scalars['String']['input'];
};


export type SubscriptionNotificationCreatedArgs = {
  userId: Scalars['String']['input'];
};

export type SubscriptionPlanResponse = {
  __typename?: 'SubscriptionPlanResponse';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  productLimit?: Maybe<Scalars['Float']['output']>;
};

export type SubscriptionResponse = {
  __typename?: 'SubscriptionResponse';
  url: Scalars['String']['output'];
  warning?: Maybe<SubscriptionWarning>;
};

export type SubscriptionWarning = {
  __typename?: 'SubscriptionWarning';
  code: Scalars['String']['output'];
  params: SubscriptionWarningParams;
};

export type SubscriptionWarningParams = {
  __typename?: 'SubscriptionWarningParams';
  remaining: Scalars['Int']['output'];
};

export type TotpDisable = {
  __typename?: 'TotpDisable';
  id: Scalars['ID']['output'];
  isTotpEnabled: Scalars['Boolean']['output'];
};

export type TotpEnable = {
  __typename?: 'TotpEnable';
  id: Scalars['ID']['output'];
  isTotpEnabled: Scalars['Boolean']['output'];
};

export type TotpModel = {
  __typename?: 'TotpModel';
  qrcodeUrl: Scalars['String']['output'];
  secret: Scalars['String']['output'];
};

export type TransactionListItem = {
  __typename?: 'TransactionListItem';
  amount: Scalars['Float']['output'];
  counterpartyId: Scalars['String']['output'];
  counterpartyUsername: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  id: Scalars['String']['output'];
  orderId: Scalars['String']['output'];
  productTitle: Scalars['String']['output'];
  status: TransactionStatus;
  viewerRole: Scalars['String']['output'];
};

/** Transaction status enum */
export enum TransactionStatus {
  Canceled = 'CANCELED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Refunded = 'REFUNDED',
  RefundFailed = 'REFUND_FAILED',
  RefundRequested = 'REFUND_REQUESTED',
  Success = 'SUCCESS'
}

export type TransactionsListResponse = {
  __typename?: 'TransactionsListResponse';
  items: Array<TransactionListItem>;
  pagination: TransactionsPagination;
};

export type TransactionsPagination = {
  __typename?: 'TransactionsPagination';
  skip: Scalars['Int']['output'];
  take: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type TransactionsPaginationInput = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type UnfollowUserInput = {
  targetUserId: Scalars['ID']['input'];
};

export type UpdateCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductInput = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  productId: Scalars['String']['input'];
  status?: InputMaybe<ProductStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateReviewInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Float']['input']>;
  reviewId: Scalars['String']['input'];
};

export type UserEmailModel = {
  __typename?: 'UserEmailModel';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type UserInfoModel = {
  __typename?: 'UserInfoModel';
  bio?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type UserModel = {
  __typename?: 'UserModel';
  avatar?: Maybe<Scalars['String']['output']>;
  avatarType: Scalars['String']['output'];
  bio?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isOnline?: Maybe<Scalars['Boolean']['output']>;
  isTotpEnabled: Scalars['Boolean']['output'];
  username: Scalars['String']['output'];
};

export type VerificationInput = {
  token: Scalars['String']['input'];
};

export type ConversationItemFieldsFragment = { __typename: 'ConversationListItemModel', id: string, unreadCount: number, updatedAt: any, participant: { __typename: 'UserModel', id: string, username: string, avatar?: string | null, avatarType: string, isOnline?: boolean | null }, lastMessage?: { __typename: 'MessageModel', id: string, content: string, conversationId: string, updatedAt?: string | null, createdAt: string, deleted: boolean, sender?: { __typename: 'ChatUserModel', id: string, username: string, avatar?: string | null, avatarType?: string | null } | null } | null };

export type FollowPaginationFieldsFragment = { __typename?: 'FollowPagination', total: number, take: number, skip: number, items: Array<{ __typename?: 'FollowingUser', id: string, username: string, displayName: string, avatar?: string | null, avatarType: string, createdAt: any, isFollowedByCurrentUser?: boolean | null }> };

export type ClearSessionCookieMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearSessionCookieMutation = { __typename?: 'Mutation', clearSessionCookie: boolean };

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: boolean };

export type DeactivateAccountMutationVariables = Exact<{
  data: DeactivateAccountInput;
}>;


export type DeactivateAccountMutation = { __typename?: 'Mutation', deactivateAccount: { __typename?: 'DeactivateAccountResult', userId?: string | null, success: boolean, message?: string | null, deactivatedAt?: any | null } };

export type DeleteNotificationMutationVariables = Exact<{
  notificationId: Scalars['String']['input'];
}>;


export type DeleteNotificationMutation = { __typename?: 'Mutation', deleteNotification: boolean };

export type LoginUserMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'AuthModel', message?: string | null, user?: { __typename?: 'UserModel', username: string, email: string } | null } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser: boolean };

export type MarkAllNotificationsAsReadMutationVariables = Exact<{ [key: string]: never; }>;


export type MarkAllNotificationsAsReadMutation = { __typename?: 'Mutation', markAllNotificationsAsRead: boolean };

export type NewPasswordMutationVariables = Exact<{
  data: NewPasswordInput;
}>;


export type NewPasswordMutation = { __typename?: 'Mutation', newPassword: boolean };

export type ResetPasswordMutationVariables = Exact<{
  data: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type VerifyAccountMutationVariables = Exact<{
  data: VerificationInput;
}>;


export type VerifyAccountMutation = { __typename?: 'Mutation', verifyAccount: { __typename?: 'UserModel', email: string, username: string } };

export type BlockUserMutationVariables = Exact<{
  blockedId: Scalars['String']['input'];
}>;


export type BlockUserMutation = { __typename?: 'Mutation', blockUser: { __typename?: 'BlockUser', id: string, username: string, displayName: string, avatar?: string | null, avatarType: string, createdAt: any } };

export type DeleteConversationMutationVariables = Exact<{
  conversationId: Scalars['String']['input'];
}>;


export type DeleteConversationMutation = { __typename?: 'Mutation', deleteConversation: boolean };

export type EditMessageMutationVariables = Exact<{
  data: EditMessage;
}>;


export type EditMessageMutation = { __typename?: 'Mutation', editMessage: { __typename?: 'MessageUpdated', id: string, content: string, updatedAt?: any | null } };

export type MarkConversationAsReadMutationVariables = Exact<{
  conversationId: Scalars['String']['input'];
}>;


export type MarkConversationAsReadMutation = { __typename?: 'Mutation', markConversationAsRead: boolean };

export type SendMessageMutationVariables = Exact<{
  conversationId: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'MessageModel', id: string, content: string, createdAt: string, updatedAt?: string | null, deleted: boolean, type?: string | null, conversationId: string, sender?: { __typename?: 'ChatUserModel', id: string, username: string, avatar?: string | null, avatarType?: string | null } | null } };

export type StartConversationMutationVariables = Exact<{
  data: StartConversationInput;
}>;


export type StartConversationMutation = { __typename?: 'Mutation', startConversation: { __typename: 'ConversationListItemModel', id: string, unreadCount: number, updatedAt: any, participant: { __typename: 'UserModel', id: string, username: string, avatar?: string | null, avatarType: string, isOnline?: boolean | null }, lastMessage?: { __typename: 'MessageModel', id: string, content: string, conversationId: string, updatedAt?: string | null, createdAt: string, deleted: boolean, sender?: { __typename: 'ChatUserModel', id: string, username: string, avatar?: string | null, avatarType?: string | null } | null } | null } };

export type ByProductMutationVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type ByProductMutation = { __typename?: 'Mutation', byProduct: { __typename?: 'CheckoutResponse', checkoutUrl: string } };

export type CreateProductMutationVariables = Exact<{
  data: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'CreateProductModel', id: string } };

export type DeleteProductMutationVariables = Exact<{
  data: DeleteProductInput;
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct: boolean };

export type DeleteProductImagesMutationVariables = Exact<{
  data: DeleteProductImagesInput;
}>;


export type DeleteProductImagesMutation = { __typename?: 'Mutation', deleteProductImages: boolean };

export type PublishProductMutationVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type PublishProductMutation = { __typename?: 'Mutation', publishProduct: boolean };

export type UpdateImagesPositionMutationVariables = Exact<{
  data: DeleteProductImagesInput;
}>;


export type UpdateImagesPositionMutation = { __typename?: 'Mutation', updateImagesPosition: boolean };

export type UpdateProdcutMutationVariables = Exact<{
  data: UpdateProductInput;
}>;


export type UpdateProdcutMutation = { __typename?: 'Mutation', updateProduct: boolean };

export type FollowUserMutationVariables = Exact<{
  data: FollowUserInput;
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser: boolean };

export type UnfollowUserMutationVariables = Exact<{
  data: UnfollowUserInput;
}>;


export type UnfollowUserMutation = { __typename?: 'Mutation', unfollowUser: boolean };

export type CreateReviewMutationVariables = Exact<{
  data: CreateReviewInput;
}>;


export type CreateReviewMutation = { __typename?: 'Mutation', createReview: { __typename?: 'ReviewModel', id: string, rating?: number | null, comment?: string | null, createdAt: any, user: { __typename?: 'PublicUserModel', id: string, username: string, displayName: string, avatar?: string | null, avatarType: string } } };

export type DeleteReviewMutationVariables = Exact<{
  data: DeleteReviewInput;
}>;


export type DeleteReviewMutation = { __typename?: 'Mutation', deleteReview: boolean };

export type UpdateReviewMutationVariables = Exact<{
  data: UpdateReviewInput;
}>;


export type UpdateReviewMutation = { __typename?: 'Mutation', editReview: { __typename?: 'ReviewModel', id: string, rating?: number | null, comment?: string | null, createdAt: any, user: { __typename?: 'PublicUserModel', id: string, username: string, displayName: string, avatar?: string | null, avatarType: string } } };

export type CancelSubscriptionMutationVariables = Exact<{ [key: string]: never; }>;


export type CancelSubscriptionMutation = { __typename?: 'Mutation', cancelSubscription: { __typename?: 'CanceledSubscription', id: string, status: string } };

export type SubscriptionMutationVariables = Exact<{
  planId: Scalars['String']['input'];
}>;


export type SubscriptionMutation = { __typename?: 'Mutation', subscription: { __typename?: 'SubscriptionResponse', url: string, warning?: { __typename?: 'SubscriptionWarning', code: string, params: { __typename?: 'SubscriptionWarningParams', remaining: number } } | null } };

export type ChangeEmailMutationVariables = Exact<{
  data: ChangeEmailInput;
}>;


export type ChangeEmailMutation = { __typename?: 'Mutation', changeEmail: { __typename?: 'UserEmailModel', id: string, email: string } };

export type ChangePasswordMutationVariables = Exact<{
  data: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: boolean };

export type ChangeProfileAvatarMutationVariables = Exact<{
  data: ChangePresetAvatarInput;
}>;


export type ChangeProfileAvatarMutation = { __typename?: 'Mutation', changeProfileAvatar?: { __typename?: 'ChangePresetAvatarModel', id: string, avatar?: string | null, avatarType: string } | null };

export type ChangeProfileInfoMutationVariables = Exact<{
  data: ChangeProfileInfoInput;
}>;


export type ChangeProfileInfoMutation = { __typename?: 'Mutation', changeProfileInfo: { __typename?: 'UserInfoModel', id: string, username: string, displayName: string, bio?: string | null } };

export type CreateSocialLinkMutationVariables = Exact<{
  data: SocialLinkInput;
}>;


export type CreateSocialLinkMutation = { __typename?: 'Mutation', createSocialLink: { __typename?: 'PublicSocialLinkModel', id: string, title: string, position: number } };

export type DisableTotpMutationVariables = Exact<{ [key: string]: never; }>;


export type DisableTotpMutation = { __typename?: 'Mutation', disableTotp: { __typename?: 'TotpDisable', id: string, isTotpEnabled: boolean } };

export type EnableTotpMutationVariables = Exact<{
  data: EnableTotpInput;
}>;


export type EnableTotpMutation = { __typename?: 'Mutation', enableTotp: { __typename?: 'TotpEnable', id: string, isTotpEnabled: boolean } };

export type RemoveProfileAvatarMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveProfileAvatarMutation = { __typename?: 'Mutation', removeProfileAvatar: { __typename?: 'ChangePresetAvatarModel', id: string, avatar?: string | null, avatarType: string } };

export type RemoveSessionMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveSessionMutation = { __typename?: 'Mutation', removeSession: { __typename?: 'RemoveSession', success: boolean, removedSessionId: string, userId: string } };

export type RemoveSocialLinkMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveSocialLinkMutation = { __typename?: 'Mutation', removeSocialLink: boolean };

export type ReorderSocialLinksMutationVariables = Exact<{
  list: Array<SocialLinkOrderInput> | SocialLinkOrderInput;
}>;


export type ReorderSocialLinksMutation = { __typename?: 'Mutation', reorderSocialLinks: boolean };

export type UpdateSocialLinkMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: SocialLinkInput;
}>;


export type UpdateSocialLinkMutation = { __typename?: 'Mutation', updateSocialLink: { __typename?: 'PublicSocialLinkModel', id: string, title: string, url: string } };

export type ProductsQueryVariables = Exact<{
  filters?: InputMaybe<ProductsFilterInput>;
}>;


export type ProductsQuery = { __typename?: 'Query', filters: { __typename?: 'PaginatedProducts', items: Array<{ __typename?: 'ProductModel', id: string, title: string, price: number, status: ProductStatus, averageRating: number, reviewsCount: number, createdAt: any, images?: Array<{ __typename?: 'ProductImageModel', url?: string | null }> | null, category?: { __typename?: 'CategoryModel', id: string, name: string } | null, user: { __typename?: 'PublicUserModel', username: string, displayName: string, avatar?: string | null } }>, meta: { __typename?: 'Meta', total: number, page: number, limit: number, totalPages: number } } };

export type AllCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCategoryQuery = { __typename?: 'Query', allCategory: Array<{ __typename?: 'CategoryModel', id: string, name: string, slug: string, description?: string | null, icon?: string | null, parentId?: string | null, children?: Array<{ __typename?: 'CategoryModel', id: string, name: string, slug: string, description?: string | null } | null> | null }> };

export type DeleteMessageMutationVariables = Exact<{
  messageId: Scalars['String']['input'];
}>;


export type DeleteMessageMutation = { __typename?: 'Mutation', deleteMessage: boolean };

export type GetConversationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConversationsQuery = { __typename?: 'Query', getConversations: Array<{ __typename: 'ConversationListItemModel', id: string, unreadCount: number, updatedAt: any, participant: { __typename: 'UserModel', id: string, username: string, avatar?: string | null, avatarType: string, isOnline?: boolean | null }, lastMessage?: { __typename: 'MessageModel', id: string, content: string, conversationId: string, updatedAt?: string | null, createdAt: string, deleted: boolean, sender?: { __typename: 'ChatUserModel', id: string, username: string, avatar?: string | null, avatarType?: string | null } | null } | null }> };

export type GetMessagesQueryVariables = Exact<{
  conversationId: Scalars['String']['input'];
  pagination?: InputMaybe<ItemPaginationInput>;
}>;


export type GetMessagesQuery = { __typename?: 'Query', getMessages: { __typename?: 'MessagePage', totalCount: number, messages: Array<{ __typename?: 'MessageModel', id: string, content: string, createdAt: string, updatedAt?: string | null, deleted: boolean, type?: string | null, conversationId: string, sender?: { __typename?: 'ChatUserModel', id: string, username: string, avatar?: string | null, avatarType?: string | null } | null }> } };

export type GetUnreadCountQueryVariables = Exact<{
  conversationId: Scalars['String']['input'];
}>;


export type GetUnreadCountQuery = { __typename?: 'Query', getUnreadCount: string };

export type MessagePageFieldsFragment = { __typename?: 'MessagePage', totalCount: number, messages: Array<{ __typename?: 'MessageModel', id: string, content: string, createdAt: string, updatedAt?: string | null, deleted: boolean, type?: string | null, conversationId: string, sender?: { __typename?: 'ChatUserModel', id: string, username: string, avatar?: string | null, avatarType?: string | null } | null }> };

export type MessageFieldsFragment = { __typename?: 'MessageModel', id: string, content: string, createdAt: string, updatedAt?: string | null, deleted: boolean, type?: string | null, conversationId: string, sender?: { __typename?: 'ChatUserModel', id: string, username: string, avatar?: string | null, avatarType?: string | null } | null };

export type OnlineUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type OnlineUsersQuery = { __typename?: 'Query', onlineUsers: Array<string> };

export type FindMyFollowersQueryVariables = Exact<{
  username: Scalars['String']['input'];
  pagination?: InputMaybe<FollowingsInput>;
}>;


export type FindMyFollowersQuery = { __typename?: 'Query', findMyFollowers: { __typename?: 'FollowPagination', total: number, take: number, skip: number, items: Array<{ __typename?: 'FollowingUser', id: string, username: string, displayName: string, avatar?: string | null, avatarType: string, createdAt: any, isFollowedByCurrentUser?: boolean | null }> } };

export type FindMyFollowingsQueryVariables = Exact<{
  pagination?: InputMaybe<FollowingsInput>;
}>;


export type FindMyFollowingsQuery = { __typename?: 'Query', findMyFollowings: { __typename?: 'FollowPagination', total: number, take: number, skip: number, items: Array<{ __typename?: 'FollowingUser', id: string, username: string, displayName: string, avatar?: string | null, avatarType: string, createdAt: any, isFollowedByCurrentUser?: boolean | null }> } };

export type SubscriptionPlansQueryVariables = Exact<{ [key: string]: never; }>;


export type SubscriptionPlansQuery = { __typename?: 'Query', subscriptionPlans: Array<{ __typename?: 'SubscriptionPlanResponse', id: string, name: string, productLimit?: number | null, price: number }> };

export type GetAllProductsQueryVariables = Exact<{
  filters?: InputMaybe<ProductsFilterInput>;
}>;


export type GetAllProductsQuery = { __typename?: 'Query', filters: { __typename?: 'PaginatedProducts', items: Array<{ __typename?: 'ProductModel', id: string, title: string, slug?: string | null, price: number, status: ProductStatus, averageRating: number, reviewsCount: number, createdAt: any, images?: Array<{ __typename?: 'ProductImageModel', url?: string | null }> | null, category?: { __typename?: 'CategoryModel', id: string, name: string } | null, user: { __typename?: 'PublicUserModel', username: string, displayName: string, avatar?: string | null } }>, meta: { __typename?: 'Meta', total: number, page: number, limit: number, totalPages: number } } };

export type GetOneQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetOneQuery = { __typename?: 'Query', getOne: { __typename?: 'ProductModel', id: string, title: string, slug?: string | null, price: number, views: number, averageRating: number, description: string, status: ProductStatus, reviewsCount: number, createdAt: any, images?: Array<{ __typename?: 'ProductImageModel', id: string, url?: string | null, position: number }> | null, category?: { __typename?: 'CategoryModel', id: string, name: string, description?: string | null, icon?: string | null, isActive: boolean, parentId?: string | null, children?: Array<{ __typename?: 'CategoryModel', id: string, name: string } | null> | null } | null, user: { __typename?: 'PublicUserModel', id: string, username: string, displayName: string, avatar?: string | null, avatarType: string }, reviews?: Array<{ __typename?: 'ReviewModel', id: string, rating?: number | null, comment?: string | null, createdAt: any, user: { __typename?: 'PublicUserModel', id: string, username: string, displayName: string, avatar?: string | null, avatarType: string, createdAt: any } }> | null } };

export type GetOneProductStep3QueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetOneProductStep3Query = { __typename?: 'Query', getOne: { __typename?: 'ProductModel', id: string, title: string, slug?: string | null, description: string, price: number, status: ProductStatus, category?: { __typename?: 'CategoryModel', id: string, name: string, parentId?: string | null, children?: Array<{ __typename?: 'CategoryModel', id: string, name: string } | null> | null } | null, images?: Array<{ __typename?: 'ProductImageModel', id: string, url?: string | null, position: number }> | null } };

export type GetUserProductsQueryVariables = Exact<{
  username: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetUserProductsQuery = { __typename?: 'Query', getUserProducts: { __typename?: 'ProductResponse', nextCursor?: string | null, hasMore: boolean, items: Array<{ __typename?: 'ProductsModel', id: string, title: string, slug: string, price: number, images?: string | null, createdAt: any }> } };

export type GetSubscriptionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSubscriptionQuery = { __typename?: 'Query', getSubscription: Array<{ __typename?: 'GetSubscriptionResponse', id: string, status: string, interval?: string | null, productUser: number, currentPeriodStart: any, currentPeriodEnd: any, plan: { __typename?: 'PlanModel', id: string, name: string, price: number, limit?: number | null } }> };

export type TransactionsListQueryVariables = Exact<{
  pagination?: InputMaybe<TransactionsPaginationInput>;
}>;


export type TransactionsListQuery = { __typename?: 'Query', transactionsList: { __typename?: 'TransactionsListResponse', items: Array<{ __typename?: 'TransactionListItem', id: string, orderId: string, productTitle: string, amount: number, currency: string, status: TransactionStatus, viewerRole: string, counterpartyId: string, counterpartyUsername: string, createdAt: any }>, pagination: { __typename?: 'TransactionsPagination', total: number, take: number, skip: number } } };

export type FindCurrentSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type FindCurrentSessionQuery = { __typename?: 'Query', findCurrentSession: { __typename?: 'SessionModel', id: string, userId: string, createdAt: string, metadata: { __typename?: 'SessionMetadataModel', ip: string, device: { __typename?: 'DeviceModel', browser: string, os: string, type: string }, location: { __typename?: 'LocationModel', country: string, city: string, latitude: number, longitude: number } } } };

export type FindNotificationsByUserQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationInput>;
}>;


export type FindNotificationsByUserQuery = { __typename?: 'Query', findNotificationsByUser: { __typename?: 'NotificationsListResponse', total: number, items: Array<{ __typename?: 'NotificationModel', id: string, type: NotificationType, isRead: boolean, createdAt: any, entityId?: string | null, actor?: { __typename?: 'ActorModel', username: string, avatar?: string | null, avatarType?: string | null } | null }> } };

export type FindProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type FindProfileQuery = { __typename?: 'Query', findProfile?: { __typename?: 'UserModel', id: string, username: string, displayName: string, email: string, avatar?: string | null, avatarType: string, bio?: string | null, isTotpEnabled: boolean, isOnline?: boolean | null } | null };

export type FindSessionsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FindSessionsByUserQuery = { __typename?: 'Query', findSessionsByUser: Array<{ __typename?: 'SessionModel', id: string, userId: string, createdAt: string, metadata: { __typename?: 'SessionMetadataModel', ip: string, device: { __typename?: 'DeviceModel', browser: string, os: string, type: string }, location: { __typename?: 'LocationModel', country: string, city: string, latitude: number, longitude: number } } }> };

export type SocialLinksQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type SocialLinksQuery = { __typename?: 'Query', socialLinks: Array<{ __typename?: 'PublicSocialLinkModel', id: string, url: string, title: string, position: number }> };

export type FindUnreadNotificationsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type FindUnreadNotificationsCountQuery = { __typename?: 'Query', findUnreadNotificationCount: number };

export type GenerateTotpSecretQueryVariables = Exact<{ [key: string]: never; }>;


export type GenerateTotpSecretQuery = { __typename?: 'Query', generateTotpSecret: { __typename?: 'TotpModel', qrcodeUrl: string, secret: string } };

export type GetBlockUserQueryVariables = Exact<{
  pagination: BlockUserInput;
}>;


export type GetBlockUserQuery = { __typename?: 'Query', getBlockUser: { __typename?: 'BlockUserPagination', total: number, items: Array<{ __typename?: 'BlockUser', id: string, username: string, displayName: string, avatar?: string | null, avatarType: string, createdAt: any }> } };

export type PublicProfileQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type PublicProfileQuery = { __typename?: 'Query', publicProfile?: { __typename?: 'PublicUserModel', id: string, username: string, displayName: string, avatar?: string | null, avatarType: string, bio?: string | null, createdAt: any, isOnline?: boolean | null, isFollowedByCurrentUser?: boolean | null } | null };

export type UnblockUserMutationVariables = Exact<{
  blockedId: Scalars['String']['input'];
}>;


export type UnblockUserMutation = { __typename?: 'Mutation', unblockUser: boolean };

export type ChatChangeSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ChatChangeSubscription = { __typename?: 'Subscription', chatChange: { __typename?: 'MessageChangeModel', type: string, conversationId: string, unreadCount: number, lastMessage: { __typename?: 'MessageModel', id: string, content: string, conversationId: string, createdAt: string, updatedAt?: string | null, deleted: boolean, type?: string | null, sender?: { __typename?: 'ChatUserModel', id: string, username: string, avatar?: string | null, avatarType?: string | null, isOnline?: boolean | null } | null }, participant: { __typename?: 'ChatParticipantModel', id: string, username: string, avatar?: string | null, avatarType: string, isOnline?: boolean | null } } };

export type MessageChangeSubscriptionVariables = Exact<{
  conversationId: Scalars['String']['input'];
}>;


export type MessageChangeSubscription = { __typename?: 'Subscription', messageChange: { __typename?: 'MessageModel', id: string, content: string, createdAt: string, updatedAt?: string | null, deleted: boolean, type?: string | null, conversationId: string, sender?: { __typename?: 'ChatUserModel', id: string, username: string, avatar?: string | null, avatarType?: string | null } | null } };

export type NotificationCreatedSubscriptionVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type NotificationCreatedSubscription = { __typename?: 'Subscription', notificationCreated: { __typename?: 'NotificationModel', id: string, type: NotificationType, actor?: { __typename?: 'ActorModel', username: string, avatar?: string | null } | null } };

export const ConversationItemFieldsFragmentDoc = gql`
    fragment ConversationItemFields on ConversationListItemModel {
  id
  participant {
    id
    username
    avatar
    avatarType
    isOnline
    __typename
  }
  lastMessage {
    id
    content
    sender {
      id
      username
      avatar
      avatarType
      __typename
    }
    conversationId
    updatedAt
    createdAt
    deleted
    __typename
  }
  unreadCount
  updatedAt
  __typename
}
    `;
export const FollowPaginationFieldsFragmentDoc = gql`
    fragment FollowPaginationFields on FollowPagination {
  items {
    id
    username
    displayName
    avatar
    avatarType
    createdAt
    isFollowedByCurrentUser
  }
  total
  take
  skip
}
    `;
export const MessageFieldsFragmentDoc = gql`
    fragment MessageFields on MessageModel {
  id
  content
  createdAt
  updatedAt
  deleted
  type
  conversationId
  sender {
    id
    username
    avatar
    avatarType
  }
}
    `;
export const MessagePageFieldsFragmentDoc = gql`
    fragment MessagePageFields on MessagePage {
  messages {
    ...MessageFields
  }
  totalCount
}
    ${MessageFieldsFragmentDoc}`;
export const ClearSessionCookieDocument = gql`
    mutation ClearSessionCookie {
  clearSessionCookie
}
    `;
export type ClearSessionCookieMutationFn = Apollo.MutationFunction<ClearSessionCookieMutation, ClearSessionCookieMutationVariables>;

/**
 * __useClearSessionCookieMutation__
 *
 * To run a mutation, you first call `useClearSessionCookieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearSessionCookieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearSessionCookieMutation, { data, loading, error }] = useClearSessionCookieMutation({
 *   variables: {
 *   },
 * });
 */
export function useClearSessionCookieMutation(baseOptions?: Apollo.MutationHookOptions<ClearSessionCookieMutation, ClearSessionCookieMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClearSessionCookieMutation, ClearSessionCookieMutationVariables>(ClearSessionCookieDocument, options);
      }
export type ClearSessionCookieMutationHookResult = ReturnType<typeof useClearSessionCookieMutation>;
export type ClearSessionCookieMutationResult = Apollo.MutationResult<ClearSessionCookieMutation>;
export type ClearSessionCookieMutationOptions = Apollo.BaseMutationOptions<ClearSessionCookieMutation, ClearSessionCookieMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($data: CreateUserInput!) {
  createUser(data: $data)
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeactivateAccountDocument = gql`
    mutation DeactivateAccount($data: DeactivateAccountInput!) {
  deactivateAccount(data: $data) {
    userId
    success
    message
    deactivatedAt
  }
}
    `;
export type DeactivateAccountMutationFn = Apollo.MutationFunction<DeactivateAccountMutation, DeactivateAccountMutationVariables>;

/**
 * __useDeactivateAccountMutation__
 *
 * To run a mutation, you first call `useDeactivateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeactivateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deactivateAccountMutation, { data, loading, error }] = useDeactivateAccountMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeactivateAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeactivateAccountMutation, DeactivateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeactivateAccountMutation, DeactivateAccountMutationVariables>(DeactivateAccountDocument, options);
      }
export type DeactivateAccountMutationHookResult = ReturnType<typeof useDeactivateAccountMutation>;
export type DeactivateAccountMutationResult = Apollo.MutationResult<DeactivateAccountMutation>;
export type DeactivateAccountMutationOptions = Apollo.BaseMutationOptions<DeactivateAccountMutation, DeactivateAccountMutationVariables>;
export const DeleteNotificationDocument = gql`
    mutation DeleteNotification($notificationId: String!) {
  deleteNotification(notificationId: $notificationId)
}
    `;
export type DeleteNotificationMutationFn = Apollo.MutationFunction<DeleteNotificationMutation, DeleteNotificationMutationVariables>;

/**
 * __useDeleteNotificationMutation__
 *
 * To run a mutation, you first call `useDeleteNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNotificationMutation, { data, loading, error }] = useDeleteNotificationMutation({
 *   variables: {
 *      notificationId: // value for 'notificationId'
 *   },
 * });
 */
export function useDeleteNotificationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNotificationMutation, DeleteNotificationMutationVariables>(DeleteNotificationDocument, options);
      }
export type DeleteNotificationMutationHookResult = ReturnType<typeof useDeleteNotificationMutation>;
export type DeleteNotificationMutationResult = Apollo.MutationResult<DeleteNotificationMutation>;
export type DeleteNotificationMutationOptions = Apollo.BaseMutationOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($data: LoginInput!) {
  loginUser(data: $data) {
    user {
      username
      email
    }
    message
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = gql`
    mutation LogoutUser {
  logoutUser
}
    `;
export type LogoutUserMutationFn = Apollo.MutationFunction<LogoutUserMutation, LogoutUserMutationVariables>;

/**
 * __useLogoutUserMutation__
 *
 * To run a mutation, you first call `useLogoutUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutUserMutation, { data, loading, error }] = useLogoutUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutUserMutation(baseOptions?: Apollo.MutationHookOptions<LogoutUserMutation, LogoutUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument, options);
      }
export type LogoutUserMutationHookResult = ReturnType<typeof useLogoutUserMutation>;
export type LogoutUserMutationResult = Apollo.MutationResult<LogoutUserMutation>;
export type LogoutUserMutationOptions = Apollo.BaseMutationOptions<LogoutUserMutation, LogoutUserMutationVariables>;
export const MarkAllNotificationsAsReadDocument = gql`
    mutation MarkAllNotificationsAsRead {
  markAllNotificationsAsRead
}
    `;
export type MarkAllNotificationsAsReadMutationFn = Apollo.MutationFunction<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>;

/**
 * __useMarkAllNotificationsAsReadMutation__
 *
 * To run a mutation, you first call `useMarkAllNotificationsAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkAllNotificationsAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markAllNotificationsAsReadMutation, { data, loading, error }] = useMarkAllNotificationsAsReadMutation({
 *   variables: {
 *   },
 * });
 */
export function useMarkAllNotificationsAsReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>(MarkAllNotificationsAsReadDocument, options);
      }
export type MarkAllNotificationsAsReadMutationHookResult = ReturnType<typeof useMarkAllNotificationsAsReadMutation>;
export type MarkAllNotificationsAsReadMutationResult = Apollo.MutationResult<MarkAllNotificationsAsReadMutation>;
export type MarkAllNotificationsAsReadMutationOptions = Apollo.BaseMutationOptions<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>;
export const NewPasswordDocument = gql`
    mutation NewPassword($data: NewPasswordInput!) {
  newPassword(data: $data)
}
    `;
export type NewPasswordMutationFn = Apollo.MutationFunction<NewPasswordMutation, NewPasswordMutationVariables>;

/**
 * __useNewPasswordMutation__
 *
 * To run a mutation, you first call `useNewPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newPasswordMutation, { data, loading, error }] = useNewPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useNewPasswordMutation(baseOptions?: Apollo.MutationHookOptions<NewPasswordMutation, NewPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewPasswordMutation, NewPasswordMutationVariables>(NewPasswordDocument, options);
      }
export type NewPasswordMutationHookResult = ReturnType<typeof useNewPasswordMutation>;
export type NewPasswordMutationResult = Apollo.MutationResult<NewPasswordMutation>;
export type NewPasswordMutationOptions = Apollo.BaseMutationOptions<NewPasswordMutation, NewPasswordMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($data: ResetPasswordInput!) {
  resetPassword(data: $data)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const VerifyAccountDocument = gql`
    mutation VerifyAccount($data: VerificationInput!) {
  verifyAccount(data: $data) {
    email
    username
  }
}
    `;
export type VerifyAccountMutationFn = Apollo.MutationFunction<VerifyAccountMutation, VerifyAccountMutationVariables>;

/**
 * __useVerifyAccountMutation__
 *
 * To run a mutation, you first call `useVerifyAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyAccountMutation, { data, loading, error }] = useVerifyAccountMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useVerifyAccountMutation(baseOptions?: Apollo.MutationHookOptions<VerifyAccountMutation, VerifyAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyAccountMutation, VerifyAccountMutationVariables>(VerifyAccountDocument, options);
      }
export type VerifyAccountMutationHookResult = ReturnType<typeof useVerifyAccountMutation>;
export type VerifyAccountMutationResult = Apollo.MutationResult<VerifyAccountMutation>;
export type VerifyAccountMutationOptions = Apollo.BaseMutationOptions<VerifyAccountMutation, VerifyAccountMutationVariables>;
export const BlockUserDocument = gql`
    mutation BlockUser($blockedId: String!) {
  blockUser(blockedId: $blockedId) {
    id
    username
    displayName
    avatar
    avatarType
    createdAt
  }
}
    `;
export type BlockUserMutationFn = Apollo.MutationFunction<BlockUserMutation, BlockUserMutationVariables>;

/**
 * __useBlockUserMutation__
 *
 * To run a mutation, you first call `useBlockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBlockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [blockUserMutation, { data, loading, error }] = useBlockUserMutation({
 *   variables: {
 *      blockedId: // value for 'blockedId'
 *   },
 * });
 */
export function useBlockUserMutation(baseOptions?: Apollo.MutationHookOptions<BlockUserMutation, BlockUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BlockUserMutation, BlockUserMutationVariables>(BlockUserDocument, options);
      }
export type BlockUserMutationHookResult = ReturnType<typeof useBlockUserMutation>;
export type BlockUserMutationResult = Apollo.MutationResult<BlockUserMutation>;
export type BlockUserMutationOptions = Apollo.BaseMutationOptions<BlockUserMutation, BlockUserMutationVariables>;
export const DeleteConversationDocument = gql`
    mutation DeleteConversation($conversationId: String!) {
  deleteConversation(conversationId: $conversationId)
}
    `;
export type DeleteConversationMutationFn = Apollo.MutationFunction<DeleteConversationMutation, DeleteConversationMutationVariables>;

/**
 * __useDeleteConversationMutation__
 *
 * To run a mutation, you first call `useDeleteConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteConversationMutation, { data, loading, error }] = useDeleteConversationMutation({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useDeleteConversationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteConversationMutation, DeleteConversationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteConversationMutation, DeleteConversationMutationVariables>(DeleteConversationDocument, options);
      }
export type DeleteConversationMutationHookResult = ReturnType<typeof useDeleteConversationMutation>;
export type DeleteConversationMutationResult = Apollo.MutationResult<DeleteConversationMutation>;
export type DeleteConversationMutationOptions = Apollo.BaseMutationOptions<DeleteConversationMutation, DeleteConversationMutationVariables>;
export const EditMessageDocument = gql`
    mutation EditMessage($data: EditMessage!) {
  editMessage(data: $data) {
    id
    content
    updatedAt
  }
}
    `;
export type EditMessageMutationFn = Apollo.MutationFunction<EditMessageMutation, EditMessageMutationVariables>;

/**
 * __useEditMessageMutation__
 *
 * To run a mutation, you first call `useEditMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editMessageMutation, { data, loading, error }] = useEditMessageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditMessageMutation(baseOptions?: Apollo.MutationHookOptions<EditMessageMutation, EditMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditMessageMutation, EditMessageMutationVariables>(EditMessageDocument, options);
      }
export type EditMessageMutationHookResult = ReturnType<typeof useEditMessageMutation>;
export type EditMessageMutationResult = Apollo.MutationResult<EditMessageMutation>;
export type EditMessageMutationOptions = Apollo.BaseMutationOptions<EditMessageMutation, EditMessageMutationVariables>;
export const MarkConversationAsReadDocument = gql`
    mutation MarkConversationAsRead($conversationId: String!) {
  markConversationAsRead(conversationId: $conversationId)
}
    `;
export type MarkConversationAsReadMutationFn = Apollo.MutationFunction<MarkConversationAsReadMutation, MarkConversationAsReadMutationVariables>;

/**
 * __useMarkConversationAsReadMutation__
 *
 * To run a mutation, you first call `useMarkConversationAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkConversationAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markConversationAsReadMutation, { data, loading, error }] = useMarkConversationAsReadMutation({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useMarkConversationAsReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkConversationAsReadMutation, MarkConversationAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkConversationAsReadMutation, MarkConversationAsReadMutationVariables>(MarkConversationAsReadDocument, options);
      }
export type MarkConversationAsReadMutationHookResult = ReturnType<typeof useMarkConversationAsReadMutation>;
export type MarkConversationAsReadMutationResult = Apollo.MutationResult<MarkConversationAsReadMutation>;
export type MarkConversationAsReadMutationOptions = Apollo.BaseMutationOptions<MarkConversationAsReadMutation, MarkConversationAsReadMutationVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($conversationId: String!, $content: String!) {
  sendMessage(conversationId: $conversationId, content: $content) {
    ...MessageFields
  }
}
    ${MessageFieldsFragmentDoc}`;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const StartConversationDocument = gql`
    mutation StartConversation($data: StartConversationInput!) {
  startConversation(data: $data) {
    ...ConversationItemFields
  }
}
    ${ConversationItemFieldsFragmentDoc}`;
export type StartConversationMutationFn = Apollo.MutationFunction<StartConversationMutation, StartConversationMutationVariables>;

/**
 * __useStartConversationMutation__
 *
 * To run a mutation, you first call `useStartConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startConversationMutation, { data, loading, error }] = useStartConversationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useStartConversationMutation(baseOptions?: Apollo.MutationHookOptions<StartConversationMutation, StartConversationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartConversationMutation, StartConversationMutationVariables>(StartConversationDocument, options);
      }
export type StartConversationMutationHookResult = ReturnType<typeof useStartConversationMutation>;
export type StartConversationMutationResult = Apollo.MutationResult<StartConversationMutation>;
export type StartConversationMutationOptions = Apollo.BaseMutationOptions<StartConversationMutation, StartConversationMutationVariables>;
export const ByProductDocument = gql`
    mutation ByProduct($productId: String!) {
  byProduct(productId: $productId) {
    checkoutUrl
  }
}
    `;
export type ByProductMutationFn = Apollo.MutationFunction<ByProductMutation, ByProductMutationVariables>;

/**
 * __useByProductMutation__
 *
 * To run a mutation, you first call `useByProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useByProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [byProductMutation, { data, loading, error }] = useByProductMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useByProductMutation(baseOptions?: Apollo.MutationHookOptions<ByProductMutation, ByProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ByProductMutation, ByProductMutationVariables>(ByProductDocument, options);
      }
export type ByProductMutationHookResult = ReturnType<typeof useByProductMutation>;
export type ByProductMutationResult = Apollo.MutationResult<ByProductMutation>;
export type ByProductMutationOptions = Apollo.BaseMutationOptions<ByProductMutation, ByProductMutationVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($data: CreateProductInput!) {
  createProduct(data: $data) {
    id
  }
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const DeleteProductDocument = gql`
    mutation DeleteProduct($data: DeleteProductInput!) {
  deleteProduct(data: $data)
}
    `;
export type DeleteProductMutationFn = Apollo.MutationFunction<DeleteProductMutation, DeleteProductMutationVariables>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteProductMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, options);
      }
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<DeleteProductMutation, DeleteProductMutationVariables>;
export const DeleteProductImagesDocument = gql`
    mutation DeleteProductImages($data: DeleteProductImagesInput!) {
  deleteProductImages(data: $data)
}
    `;
export type DeleteProductImagesMutationFn = Apollo.MutationFunction<DeleteProductImagesMutation, DeleteProductImagesMutationVariables>;

/**
 * __useDeleteProductImagesMutation__
 *
 * To run a mutation, you first call `useDeleteProductImagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductImagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductImagesMutation, { data, loading, error }] = useDeleteProductImagesMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteProductImagesMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductImagesMutation, DeleteProductImagesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProductImagesMutation, DeleteProductImagesMutationVariables>(DeleteProductImagesDocument, options);
      }
export type DeleteProductImagesMutationHookResult = ReturnType<typeof useDeleteProductImagesMutation>;
export type DeleteProductImagesMutationResult = Apollo.MutationResult<DeleteProductImagesMutation>;
export type DeleteProductImagesMutationOptions = Apollo.BaseMutationOptions<DeleteProductImagesMutation, DeleteProductImagesMutationVariables>;
export const PublishProductDocument = gql`
    mutation PublishProduct($productId: String!) {
  publishProduct(productId: $productId)
}
    `;
export type PublishProductMutationFn = Apollo.MutationFunction<PublishProductMutation, PublishProductMutationVariables>;

/**
 * __usePublishProductMutation__
 *
 * To run a mutation, you first call `usePublishProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishProductMutation, { data, loading, error }] = usePublishProductMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function usePublishProductMutation(baseOptions?: Apollo.MutationHookOptions<PublishProductMutation, PublishProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublishProductMutation, PublishProductMutationVariables>(PublishProductDocument, options);
      }
export type PublishProductMutationHookResult = ReturnType<typeof usePublishProductMutation>;
export type PublishProductMutationResult = Apollo.MutationResult<PublishProductMutation>;
export type PublishProductMutationOptions = Apollo.BaseMutationOptions<PublishProductMutation, PublishProductMutationVariables>;
export const UpdateImagesPositionDocument = gql`
    mutation UpdateImagesPosition($data: DeleteProductImagesInput!) {
  updateImagesPosition(data: $data)
}
    `;
export type UpdateImagesPositionMutationFn = Apollo.MutationFunction<UpdateImagesPositionMutation, UpdateImagesPositionMutationVariables>;

/**
 * __useUpdateImagesPositionMutation__
 *
 * To run a mutation, you first call `useUpdateImagesPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateImagesPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateImagesPositionMutation, { data, loading, error }] = useUpdateImagesPositionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateImagesPositionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateImagesPositionMutation, UpdateImagesPositionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateImagesPositionMutation, UpdateImagesPositionMutationVariables>(UpdateImagesPositionDocument, options);
      }
export type UpdateImagesPositionMutationHookResult = ReturnType<typeof useUpdateImagesPositionMutation>;
export type UpdateImagesPositionMutationResult = Apollo.MutationResult<UpdateImagesPositionMutation>;
export type UpdateImagesPositionMutationOptions = Apollo.BaseMutationOptions<UpdateImagesPositionMutation, UpdateImagesPositionMutationVariables>;
export const UpdateProdcutDocument = gql`
    mutation UpdateProdcut($data: UpdateProductInput!) {
  updateProduct(data: $data)
}
    `;
export type UpdateProdcutMutationFn = Apollo.MutationFunction<UpdateProdcutMutation, UpdateProdcutMutationVariables>;

/**
 * __useUpdateProdcutMutation__
 *
 * To run a mutation, you first call `useUpdateProdcutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProdcutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProdcutMutation, { data, loading, error }] = useUpdateProdcutMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProdcutMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProdcutMutation, UpdateProdcutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProdcutMutation, UpdateProdcutMutationVariables>(UpdateProdcutDocument, options);
      }
export type UpdateProdcutMutationHookResult = ReturnType<typeof useUpdateProdcutMutation>;
export type UpdateProdcutMutationResult = Apollo.MutationResult<UpdateProdcutMutation>;
export type UpdateProdcutMutationOptions = Apollo.BaseMutationOptions<UpdateProdcutMutation, UpdateProdcutMutationVariables>;
export const FollowUserDocument = gql`
    mutation FollowUser($data: FollowUserInput!) {
  followUser(data: $data)
}
    `;
export type FollowUserMutationFn = Apollo.MutationFunction<FollowUserMutation, FollowUserMutationVariables>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, options);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export const UnfollowUserDocument = gql`
    mutation UnfollowUser($data: UnfollowUserInput!) {
  unfollowUser(data: $data)
}
    `;
export type UnfollowUserMutationFn = Apollo.MutationFunction<UnfollowUserMutation, UnfollowUserMutationVariables>;

/**
 * __useUnfollowUserMutation__
 *
 * To run a mutation, you first call `useUnfollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowUserMutation, { data, loading, error }] = useUnfollowUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUnfollowUserMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowUserMutation, UnfollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(UnfollowUserDocument, options);
      }
export type UnfollowUserMutationHookResult = ReturnType<typeof useUnfollowUserMutation>;
export type UnfollowUserMutationResult = Apollo.MutationResult<UnfollowUserMutation>;
export type UnfollowUserMutationOptions = Apollo.BaseMutationOptions<UnfollowUserMutation, UnfollowUserMutationVariables>;
export const CreateReviewDocument = gql`
    mutation CreateReview($data: CreateReviewInput!) {
  createReview(data: $data) {
    id
    rating
    comment
    createdAt
    user {
      id
      username
      displayName
      avatar
      avatarType
    }
  }
}
    `;
export type CreateReviewMutationFn = Apollo.MutationFunction<CreateReviewMutation, CreateReviewMutationVariables>;

/**
 * __useCreateReviewMutation__
 *
 * To run a mutation, you first call `useCreateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewMutation, { data, loading, error }] = useCreateReviewMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateReviewMutation, CreateReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReviewMutation, CreateReviewMutationVariables>(CreateReviewDocument, options);
      }
export type CreateReviewMutationHookResult = ReturnType<typeof useCreateReviewMutation>;
export type CreateReviewMutationResult = Apollo.MutationResult<CreateReviewMutation>;
export type CreateReviewMutationOptions = Apollo.BaseMutationOptions<CreateReviewMutation, CreateReviewMutationVariables>;
export const DeleteReviewDocument = gql`
    mutation DeleteReview($data: DeleteReviewInput!) {
  deleteReview(data: $data)
}
    `;
export type DeleteReviewMutationFn = Apollo.MutationFunction<DeleteReviewMutation, DeleteReviewMutationVariables>;

/**
 * __useDeleteReviewMutation__
 *
 * To run a mutation, you first call `useDeleteReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReviewMutation, { data, loading, error }] = useDeleteReviewMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteReviewMutation(baseOptions?: Apollo.MutationHookOptions<DeleteReviewMutation, DeleteReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteReviewMutation, DeleteReviewMutationVariables>(DeleteReviewDocument, options);
      }
export type DeleteReviewMutationHookResult = ReturnType<typeof useDeleteReviewMutation>;
export type DeleteReviewMutationResult = Apollo.MutationResult<DeleteReviewMutation>;
export type DeleteReviewMutationOptions = Apollo.BaseMutationOptions<DeleteReviewMutation, DeleteReviewMutationVariables>;
export const UpdateReviewDocument = gql`
    mutation UpdateReview($data: UpdateReviewInput!) {
  editReview(data: $data) {
    id
    rating
    comment
    createdAt
    user {
      id
      username
      displayName
      avatar
      avatarType
    }
  }
}
    `;
export type UpdateReviewMutationFn = Apollo.MutationFunction<UpdateReviewMutation, UpdateReviewMutationVariables>;

/**
 * __useUpdateReviewMutation__
 *
 * To run a mutation, you first call `useUpdateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReviewMutation, { data, loading, error }] = useUpdateReviewMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateReviewMutation(baseOptions?: Apollo.MutationHookOptions<UpdateReviewMutation, UpdateReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateReviewMutation, UpdateReviewMutationVariables>(UpdateReviewDocument, options);
      }
export type UpdateReviewMutationHookResult = ReturnType<typeof useUpdateReviewMutation>;
export type UpdateReviewMutationResult = Apollo.MutationResult<UpdateReviewMutation>;
export type UpdateReviewMutationOptions = Apollo.BaseMutationOptions<UpdateReviewMutation, UpdateReviewMutationVariables>;
export const CancelSubscriptionDocument = gql`
    mutation CancelSubscription {
  cancelSubscription {
    id
    status
  }
}
    `;
export type CancelSubscriptionMutationFn = Apollo.MutationFunction<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>;

/**
 * __useCancelSubscriptionMutation__
 *
 * To run a mutation, you first call `useCancelSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelSubscriptionMutation, { data, loading, error }] = useCancelSubscriptionMutation({
 *   variables: {
 *   },
 * });
 */
export function useCancelSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>(CancelSubscriptionDocument, options);
      }
export type CancelSubscriptionMutationHookResult = ReturnType<typeof useCancelSubscriptionMutation>;
export type CancelSubscriptionMutationResult = Apollo.MutationResult<CancelSubscriptionMutation>;
export type CancelSubscriptionMutationOptions = Apollo.BaseMutationOptions<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>;
export const SubscriptionDocument = gql`
    mutation Subscription($planId: String!) {
  subscription(planId: $planId) {
    url
    warning {
      code
      params {
        remaining
      }
    }
  }
}
    `;
export type SubscriptionMutationFn = Apollo.MutationFunction<SubscriptionMutation, SubscriptionMutationVariables>;

/**
 * __useSubscriptionMutation__
 *
 * To run a mutation, you first call `useSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [subscriptionMutation, { data, loading, error }] = useSubscriptionMutation({
 *   variables: {
 *      planId: // value for 'planId'
 *   },
 * });
 */
export function useSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<SubscriptionMutation, SubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubscriptionMutation, SubscriptionMutationVariables>(SubscriptionDocument, options);
      }
export type SubscriptionMutationHookResult = ReturnType<typeof useSubscriptionMutation>;
export type SubscriptionMutationResult = Apollo.MutationResult<SubscriptionMutation>;
export type SubscriptionMutationOptions = Apollo.BaseMutationOptions<SubscriptionMutation, SubscriptionMutationVariables>;
export const ChangeEmailDocument = gql`
    mutation ChangeEmail($data: ChangeEmailInput!) {
  changeEmail(data: $data) {
    id
    email
  }
}
    `;
export type ChangeEmailMutationFn = Apollo.MutationFunction<ChangeEmailMutation, ChangeEmailMutationVariables>;

/**
 * __useChangeEmailMutation__
 *
 * To run a mutation, you first call `useChangeEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeEmailMutation, { data, loading, error }] = useChangeEmailMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeEmailMutation(baseOptions?: Apollo.MutationHookOptions<ChangeEmailMutation, ChangeEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeEmailMutation, ChangeEmailMutationVariables>(ChangeEmailDocument, options);
      }
export type ChangeEmailMutationHookResult = ReturnType<typeof useChangeEmailMutation>;
export type ChangeEmailMutationResult = Apollo.MutationResult<ChangeEmailMutation>;
export type ChangeEmailMutationOptions = Apollo.BaseMutationOptions<ChangeEmailMutation, ChangeEmailMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($data: ChangePasswordInput!) {
  changePassword(data: $data)
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ChangeProfileAvatarDocument = gql`
    mutation ChangeProfileAvatar($data: ChangePresetAvatarInput!) {
  changeProfileAvatar(data: $data) {
    id
    avatar
    avatarType
  }
}
    `;
export type ChangeProfileAvatarMutationFn = Apollo.MutationFunction<ChangeProfileAvatarMutation, ChangeProfileAvatarMutationVariables>;

/**
 * __useChangeProfileAvatarMutation__
 *
 * To run a mutation, you first call `useChangeProfileAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeProfileAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeProfileAvatarMutation, { data, loading, error }] = useChangeProfileAvatarMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeProfileAvatarMutation(baseOptions?: Apollo.MutationHookOptions<ChangeProfileAvatarMutation, ChangeProfileAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeProfileAvatarMutation, ChangeProfileAvatarMutationVariables>(ChangeProfileAvatarDocument, options);
      }
export type ChangeProfileAvatarMutationHookResult = ReturnType<typeof useChangeProfileAvatarMutation>;
export type ChangeProfileAvatarMutationResult = Apollo.MutationResult<ChangeProfileAvatarMutation>;
export type ChangeProfileAvatarMutationOptions = Apollo.BaseMutationOptions<ChangeProfileAvatarMutation, ChangeProfileAvatarMutationVariables>;
export const ChangeProfileInfoDocument = gql`
    mutation ChangeProfileInfo($data: ChangeProfileInfoInput!) {
  changeProfileInfo(data: $data) {
    id
    username
    displayName
    bio
  }
}
    `;
export type ChangeProfileInfoMutationFn = Apollo.MutationFunction<ChangeProfileInfoMutation, ChangeProfileInfoMutationVariables>;

/**
 * __useChangeProfileInfoMutation__
 *
 * To run a mutation, you first call `useChangeProfileInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeProfileInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeProfileInfoMutation, { data, loading, error }] = useChangeProfileInfoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeProfileInfoMutation(baseOptions?: Apollo.MutationHookOptions<ChangeProfileInfoMutation, ChangeProfileInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeProfileInfoMutation, ChangeProfileInfoMutationVariables>(ChangeProfileInfoDocument, options);
      }
export type ChangeProfileInfoMutationHookResult = ReturnType<typeof useChangeProfileInfoMutation>;
export type ChangeProfileInfoMutationResult = Apollo.MutationResult<ChangeProfileInfoMutation>;
export type ChangeProfileInfoMutationOptions = Apollo.BaseMutationOptions<ChangeProfileInfoMutation, ChangeProfileInfoMutationVariables>;
export const CreateSocialLinkDocument = gql`
    mutation CreateSocialLink($data: SocialLinkInput!) {
  createSocialLink(data: $data) {
    id
    title
    position
    position
  }
}
    `;
export type CreateSocialLinkMutationFn = Apollo.MutationFunction<CreateSocialLinkMutation, CreateSocialLinkMutationVariables>;

/**
 * __useCreateSocialLinkMutation__
 *
 * To run a mutation, you first call `useCreateSocialLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSocialLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSocialLinkMutation, { data, loading, error }] = useCreateSocialLinkMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSocialLinkMutation(baseOptions?: Apollo.MutationHookOptions<CreateSocialLinkMutation, CreateSocialLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSocialLinkMutation, CreateSocialLinkMutationVariables>(CreateSocialLinkDocument, options);
      }
export type CreateSocialLinkMutationHookResult = ReturnType<typeof useCreateSocialLinkMutation>;
export type CreateSocialLinkMutationResult = Apollo.MutationResult<CreateSocialLinkMutation>;
export type CreateSocialLinkMutationOptions = Apollo.BaseMutationOptions<CreateSocialLinkMutation, CreateSocialLinkMutationVariables>;
export const DisableTotpDocument = gql`
    mutation DisableTotp {
  disableTotp {
    id
    isTotpEnabled
  }
}
    `;
export type DisableTotpMutationFn = Apollo.MutationFunction<DisableTotpMutation, DisableTotpMutationVariables>;

/**
 * __useDisableTotpMutation__
 *
 * To run a mutation, you first call `useDisableTotpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisableTotpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disableTotpMutation, { data, loading, error }] = useDisableTotpMutation({
 *   variables: {
 *   },
 * });
 */
export function useDisableTotpMutation(baseOptions?: Apollo.MutationHookOptions<DisableTotpMutation, DisableTotpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DisableTotpMutation, DisableTotpMutationVariables>(DisableTotpDocument, options);
      }
export type DisableTotpMutationHookResult = ReturnType<typeof useDisableTotpMutation>;
export type DisableTotpMutationResult = Apollo.MutationResult<DisableTotpMutation>;
export type DisableTotpMutationOptions = Apollo.BaseMutationOptions<DisableTotpMutation, DisableTotpMutationVariables>;
export const EnableTotpDocument = gql`
    mutation EnableTotp($data: EnableTotpInput!) {
  enableTotp(data: $data) {
    id
    isTotpEnabled
  }
}
    `;
export type EnableTotpMutationFn = Apollo.MutationFunction<EnableTotpMutation, EnableTotpMutationVariables>;

/**
 * __useEnableTotpMutation__
 *
 * To run a mutation, you first call `useEnableTotpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnableTotpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enableTotpMutation, { data, loading, error }] = useEnableTotpMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEnableTotpMutation(baseOptions?: Apollo.MutationHookOptions<EnableTotpMutation, EnableTotpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EnableTotpMutation, EnableTotpMutationVariables>(EnableTotpDocument, options);
      }
export type EnableTotpMutationHookResult = ReturnType<typeof useEnableTotpMutation>;
export type EnableTotpMutationResult = Apollo.MutationResult<EnableTotpMutation>;
export type EnableTotpMutationOptions = Apollo.BaseMutationOptions<EnableTotpMutation, EnableTotpMutationVariables>;
export const RemoveProfileAvatarDocument = gql`
    mutation RemoveProfileAvatar {
  removeProfileAvatar {
    id
    avatar
    avatarType
  }
}
    `;
export type RemoveProfileAvatarMutationFn = Apollo.MutationFunction<RemoveProfileAvatarMutation, RemoveProfileAvatarMutationVariables>;

/**
 * __useRemoveProfileAvatarMutation__
 *
 * To run a mutation, you first call `useRemoveProfileAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProfileAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProfileAvatarMutation, { data, loading, error }] = useRemoveProfileAvatarMutation({
 *   variables: {
 *   },
 * });
 */
export function useRemoveProfileAvatarMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProfileAvatarMutation, RemoveProfileAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveProfileAvatarMutation, RemoveProfileAvatarMutationVariables>(RemoveProfileAvatarDocument, options);
      }
export type RemoveProfileAvatarMutationHookResult = ReturnType<typeof useRemoveProfileAvatarMutation>;
export type RemoveProfileAvatarMutationResult = Apollo.MutationResult<RemoveProfileAvatarMutation>;
export type RemoveProfileAvatarMutationOptions = Apollo.BaseMutationOptions<RemoveProfileAvatarMutation, RemoveProfileAvatarMutationVariables>;
export const RemoveSessionDocument = gql`
    mutation RemoveSession($id: String!) {
  removeSession(id: $id) {
    success
    removedSessionId
    userId
  }
}
    `;
export type RemoveSessionMutationFn = Apollo.MutationFunction<RemoveSessionMutation, RemoveSessionMutationVariables>;

/**
 * __useRemoveSessionMutation__
 *
 * To run a mutation, you first call `useRemoveSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSessionMutation, { data, loading, error }] = useRemoveSessionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveSessionMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSessionMutation, RemoveSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSessionMutation, RemoveSessionMutationVariables>(RemoveSessionDocument, options);
      }
export type RemoveSessionMutationHookResult = ReturnType<typeof useRemoveSessionMutation>;
export type RemoveSessionMutationResult = Apollo.MutationResult<RemoveSessionMutation>;
export type RemoveSessionMutationOptions = Apollo.BaseMutationOptions<RemoveSessionMutation, RemoveSessionMutationVariables>;
export const RemoveSocialLinkDocument = gql`
    mutation RemoveSocialLink($id: String!) {
  removeSocialLink(id: $id)
}
    `;
export type RemoveSocialLinkMutationFn = Apollo.MutationFunction<RemoveSocialLinkMutation, RemoveSocialLinkMutationVariables>;

/**
 * __useRemoveSocialLinkMutation__
 *
 * To run a mutation, you first call `useRemoveSocialLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSocialLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSocialLinkMutation, { data, loading, error }] = useRemoveSocialLinkMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveSocialLinkMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSocialLinkMutation, RemoveSocialLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSocialLinkMutation, RemoveSocialLinkMutationVariables>(RemoveSocialLinkDocument, options);
      }
export type RemoveSocialLinkMutationHookResult = ReturnType<typeof useRemoveSocialLinkMutation>;
export type RemoveSocialLinkMutationResult = Apollo.MutationResult<RemoveSocialLinkMutation>;
export type RemoveSocialLinkMutationOptions = Apollo.BaseMutationOptions<RemoveSocialLinkMutation, RemoveSocialLinkMutationVariables>;
export const ReorderSocialLinksDocument = gql`
    mutation ReorderSocialLinks($list: [SocialLinkOrderInput!]!) {
  reorderSocialLinks(list: $list)
}
    `;
export type ReorderSocialLinksMutationFn = Apollo.MutationFunction<ReorderSocialLinksMutation, ReorderSocialLinksMutationVariables>;

/**
 * __useReorderSocialLinksMutation__
 *
 * To run a mutation, you first call `useReorderSocialLinksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReorderSocialLinksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reorderSocialLinksMutation, { data, loading, error }] = useReorderSocialLinksMutation({
 *   variables: {
 *      list: // value for 'list'
 *   },
 * });
 */
export function useReorderSocialLinksMutation(baseOptions?: Apollo.MutationHookOptions<ReorderSocialLinksMutation, ReorderSocialLinksMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReorderSocialLinksMutation, ReorderSocialLinksMutationVariables>(ReorderSocialLinksDocument, options);
      }
export type ReorderSocialLinksMutationHookResult = ReturnType<typeof useReorderSocialLinksMutation>;
export type ReorderSocialLinksMutationResult = Apollo.MutationResult<ReorderSocialLinksMutation>;
export type ReorderSocialLinksMutationOptions = Apollo.BaseMutationOptions<ReorderSocialLinksMutation, ReorderSocialLinksMutationVariables>;
export const UpdateSocialLinkDocument = gql`
    mutation UpdateSocialLink($id: String!, $data: SocialLinkInput!) {
  updateSocialLink(id: $id, data: $data) {
    id
    title
    url
  }
}
    `;
export type UpdateSocialLinkMutationFn = Apollo.MutationFunction<UpdateSocialLinkMutation, UpdateSocialLinkMutationVariables>;

/**
 * __useUpdateSocialLinkMutation__
 *
 * To run a mutation, you first call `useUpdateSocialLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSocialLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSocialLinkMutation, { data, loading, error }] = useUpdateSocialLinkMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateSocialLinkMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSocialLinkMutation, UpdateSocialLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSocialLinkMutation, UpdateSocialLinkMutationVariables>(UpdateSocialLinkDocument, options);
      }
export type UpdateSocialLinkMutationHookResult = ReturnType<typeof useUpdateSocialLinkMutation>;
export type UpdateSocialLinkMutationResult = Apollo.MutationResult<UpdateSocialLinkMutation>;
export type UpdateSocialLinkMutationOptions = Apollo.BaseMutationOptions<UpdateSocialLinkMutation, UpdateSocialLinkMutationVariables>;
export const ProductsDocument = gql`
    query Products($filters: ProductsFilterInput) {
  filters(filters: $filters) {
    items {
      id
      title
      price
      status
      averageRating
      reviewsCount
      images {
        url
      }
      category {
        id
        name
      }
      user {
        username
        displayName
        avatar
      }
      createdAt
    }
    meta {
      total
      page
      limit
      totalPages
    }
  }
}
    `;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
// @ts-ignore
export function useProductsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProductsQuery, ProductsQueryVariables>): Apollo.UseSuspenseQueryResult<ProductsQuery, ProductsQueryVariables>;
export function useProductsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProductsQuery, ProductsQueryVariables>): Apollo.UseSuspenseQueryResult<ProductsQuery | undefined, ProductsQueryVariables>;
export function useProductsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsSuspenseQueryHookResult = ReturnType<typeof useProductsSuspenseQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;
export const AllCategoryDocument = gql`
    query AllCategory {
  allCategory {
    id
    name
    slug
    description
    icon
    parentId
    children {
      id
      name
      slug
      description
    }
  }
}
    `;

/**
 * __useAllCategoryQuery__
 *
 * To run a query within a React component, call `useAllCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllCategoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllCategoryQuery(baseOptions?: Apollo.QueryHookOptions<AllCategoryQuery, AllCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllCategoryQuery, AllCategoryQueryVariables>(AllCategoryDocument, options);
      }
export function useAllCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllCategoryQuery, AllCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllCategoryQuery, AllCategoryQueryVariables>(AllCategoryDocument, options);
        }
// @ts-ignore
export function useAllCategorySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AllCategoryQuery, AllCategoryQueryVariables>): Apollo.UseSuspenseQueryResult<AllCategoryQuery, AllCategoryQueryVariables>;
export function useAllCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AllCategoryQuery, AllCategoryQueryVariables>): Apollo.UseSuspenseQueryResult<AllCategoryQuery | undefined, AllCategoryQueryVariables>;
export function useAllCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AllCategoryQuery, AllCategoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllCategoryQuery, AllCategoryQueryVariables>(AllCategoryDocument, options);
        }
export type AllCategoryQueryHookResult = ReturnType<typeof useAllCategoryQuery>;
export type AllCategoryLazyQueryHookResult = ReturnType<typeof useAllCategoryLazyQuery>;
export type AllCategorySuspenseQueryHookResult = ReturnType<typeof useAllCategorySuspenseQuery>;
export type AllCategoryQueryResult = Apollo.QueryResult<AllCategoryQuery, AllCategoryQueryVariables>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($messageId: String!) {
  deleteMessage(messageId: $messageId)
}
    `;
export type DeleteMessageMutationFn = Apollo.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, options);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const GetConversationsDocument = gql`
    query GetConversations {
  getConversations {
    ...ConversationItemFields
  }
}
    ${ConversationItemFieldsFragmentDoc}`;

/**
 * __useGetConversationsQuery__
 *
 * To run a query within a React component, call `useGetConversationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConversationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConversationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetConversationsQuery(baseOptions?: Apollo.QueryHookOptions<GetConversationsQuery, GetConversationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConversationsQuery, GetConversationsQueryVariables>(GetConversationsDocument, options);
      }
export function useGetConversationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConversationsQuery, GetConversationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConversationsQuery, GetConversationsQueryVariables>(GetConversationsDocument, options);
        }
// @ts-ignore
export function useGetConversationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetConversationsQuery, GetConversationsQueryVariables>): Apollo.UseSuspenseQueryResult<GetConversationsQuery, GetConversationsQueryVariables>;
export function useGetConversationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetConversationsQuery, GetConversationsQueryVariables>): Apollo.UseSuspenseQueryResult<GetConversationsQuery | undefined, GetConversationsQueryVariables>;
export function useGetConversationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetConversationsQuery, GetConversationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetConversationsQuery, GetConversationsQueryVariables>(GetConversationsDocument, options);
        }
export type GetConversationsQueryHookResult = ReturnType<typeof useGetConversationsQuery>;
export type GetConversationsLazyQueryHookResult = ReturnType<typeof useGetConversationsLazyQuery>;
export type GetConversationsSuspenseQueryHookResult = ReturnType<typeof useGetConversationsSuspenseQuery>;
export type GetConversationsQueryResult = Apollo.QueryResult<GetConversationsQuery, GetConversationsQueryVariables>;
export const GetMessagesDocument = gql`
    query GetMessages($conversationId: String!, $pagination: ItemPaginationInput) {
  getMessages(conversationId: $conversationId, pagination: $pagination) {
    ...MessagePageFields
  }
}
    ${MessagePageFieldsFragmentDoc}`;

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetMessagesQuery(baseOptions: Apollo.QueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables> & ({ variables: GetMessagesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
      }
export function useGetMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
        }
// @ts-ignore
export function useGetMessagesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>): Apollo.UseSuspenseQueryResult<GetMessagesQuery, GetMessagesQueryVariables>;
export function useGetMessagesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>): Apollo.UseSuspenseQueryResult<GetMessagesQuery | undefined, GetMessagesQueryVariables>;
export function useGetMessagesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
        }
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>;
export type GetMessagesLazyQueryHookResult = ReturnType<typeof useGetMessagesLazyQuery>;
export type GetMessagesSuspenseQueryHookResult = ReturnType<typeof useGetMessagesSuspenseQuery>;
export type GetMessagesQueryResult = Apollo.QueryResult<GetMessagesQuery, GetMessagesQueryVariables>;
export const GetUnreadCountDocument = gql`
    query GetUnreadCount($conversationId: String!) {
  getUnreadCount(conversationId: $conversationId)
}
    `;

/**
 * __useGetUnreadCountQuery__
 *
 * To run a query within a React component, call `useGetUnreadCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnreadCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnreadCountQuery({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useGetUnreadCountQuery(baseOptions: Apollo.QueryHookOptions<GetUnreadCountQuery, GetUnreadCountQueryVariables> & ({ variables: GetUnreadCountQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUnreadCountQuery, GetUnreadCountQueryVariables>(GetUnreadCountDocument, options);
      }
export function useGetUnreadCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUnreadCountQuery, GetUnreadCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUnreadCountQuery, GetUnreadCountQueryVariables>(GetUnreadCountDocument, options);
        }
// @ts-ignore
export function useGetUnreadCountSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUnreadCountQuery, GetUnreadCountQueryVariables>): Apollo.UseSuspenseQueryResult<GetUnreadCountQuery, GetUnreadCountQueryVariables>;
export function useGetUnreadCountSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUnreadCountQuery, GetUnreadCountQueryVariables>): Apollo.UseSuspenseQueryResult<GetUnreadCountQuery | undefined, GetUnreadCountQueryVariables>;
export function useGetUnreadCountSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUnreadCountQuery, GetUnreadCountQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUnreadCountQuery, GetUnreadCountQueryVariables>(GetUnreadCountDocument, options);
        }
export type GetUnreadCountQueryHookResult = ReturnType<typeof useGetUnreadCountQuery>;
export type GetUnreadCountLazyQueryHookResult = ReturnType<typeof useGetUnreadCountLazyQuery>;
export type GetUnreadCountSuspenseQueryHookResult = ReturnType<typeof useGetUnreadCountSuspenseQuery>;
export type GetUnreadCountQueryResult = Apollo.QueryResult<GetUnreadCountQuery, GetUnreadCountQueryVariables>;
export const OnlineUsersDocument = gql`
    query OnlineUsers {
  onlineUsers
}
    `;

/**
 * __useOnlineUsersQuery__
 *
 * To run a query within a React component, call `useOnlineUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useOnlineUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnlineUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useOnlineUsersQuery(baseOptions?: Apollo.QueryHookOptions<OnlineUsersQuery, OnlineUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OnlineUsersQuery, OnlineUsersQueryVariables>(OnlineUsersDocument, options);
      }
export function useOnlineUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OnlineUsersQuery, OnlineUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OnlineUsersQuery, OnlineUsersQueryVariables>(OnlineUsersDocument, options);
        }
// @ts-ignore
export function useOnlineUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OnlineUsersQuery, OnlineUsersQueryVariables>): Apollo.UseSuspenseQueryResult<OnlineUsersQuery, OnlineUsersQueryVariables>;
export function useOnlineUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OnlineUsersQuery, OnlineUsersQueryVariables>): Apollo.UseSuspenseQueryResult<OnlineUsersQuery | undefined, OnlineUsersQueryVariables>;
export function useOnlineUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OnlineUsersQuery, OnlineUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OnlineUsersQuery, OnlineUsersQueryVariables>(OnlineUsersDocument, options);
        }
export type OnlineUsersQueryHookResult = ReturnType<typeof useOnlineUsersQuery>;
export type OnlineUsersLazyQueryHookResult = ReturnType<typeof useOnlineUsersLazyQuery>;
export type OnlineUsersSuspenseQueryHookResult = ReturnType<typeof useOnlineUsersSuspenseQuery>;
export type OnlineUsersQueryResult = Apollo.QueryResult<OnlineUsersQuery, OnlineUsersQueryVariables>;
export const FindMyFollowersDocument = gql`
    query FindMyFollowers($username: String!, $pagination: FollowingsInput) {
  findMyFollowers(username: $username, pagination: $pagination) {
    ...FollowPaginationFields
  }
}
    ${FollowPaginationFieldsFragmentDoc}`;

/**
 * __useFindMyFollowersQuery__
 *
 * To run a query within a React component, call `useFindMyFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMyFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMyFollowersQuery({
 *   variables: {
 *      username: // value for 'username'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useFindMyFollowersQuery(baseOptions: Apollo.QueryHookOptions<FindMyFollowersQuery, FindMyFollowersQueryVariables> & ({ variables: FindMyFollowersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindMyFollowersQuery, FindMyFollowersQueryVariables>(FindMyFollowersDocument, options);
      }
export function useFindMyFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindMyFollowersQuery, FindMyFollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindMyFollowersQuery, FindMyFollowersQueryVariables>(FindMyFollowersDocument, options);
        }
// @ts-ignore
export function useFindMyFollowersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindMyFollowersQuery, FindMyFollowersQueryVariables>): Apollo.UseSuspenseQueryResult<FindMyFollowersQuery, FindMyFollowersQueryVariables>;
export function useFindMyFollowersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindMyFollowersQuery, FindMyFollowersQueryVariables>): Apollo.UseSuspenseQueryResult<FindMyFollowersQuery | undefined, FindMyFollowersQueryVariables>;
export function useFindMyFollowersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindMyFollowersQuery, FindMyFollowersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindMyFollowersQuery, FindMyFollowersQueryVariables>(FindMyFollowersDocument, options);
        }
export type FindMyFollowersQueryHookResult = ReturnType<typeof useFindMyFollowersQuery>;
export type FindMyFollowersLazyQueryHookResult = ReturnType<typeof useFindMyFollowersLazyQuery>;
export type FindMyFollowersSuspenseQueryHookResult = ReturnType<typeof useFindMyFollowersSuspenseQuery>;
export type FindMyFollowersQueryResult = Apollo.QueryResult<FindMyFollowersQuery, FindMyFollowersQueryVariables>;
export const FindMyFollowingsDocument = gql`
    query FindMyFollowings($pagination: FollowingsInput) {
  findMyFollowings(pagination: $pagination) {
    ...FollowPaginationFields
  }
}
    ${FollowPaginationFieldsFragmentDoc}`;

/**
 * __useFindMyFollowingsQuery__
 *
 * To run a query within a React component, call `useFindMyFollowingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMyFollowingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMyFollowingsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useFindMyFollowingsQuery(baseOptions?: Apollo.QueryHookOptions<FindMyFollowingsQuery, FindMyFollowingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindMyFollowingsQuery, FindMyFollowingsQueryVariables>(FindMyFollowingsDocument, options);
      }
export function useFindMyFollowingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindMyFollowingsQuery, FindMyFollowingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindMyFollowingsQuery, FindMyFollowingsQueryVariables>(FindMyFollowingsDocument, options);
        }
// @ts-ignore
export function useFindMyFollowingsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindMyFollowingsQuery, FindMyFollowingsQueryVariables>): Apollo.UseSuspenseQueryResult<FindMyFollowingsQuery, FindMyFollowingsQueryVariables>;
export function useFindMyFollowingsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindMyFollowingsQuery, FindMyFollowingsQueryVariables>): Apollo.UseSuspenseQueryResult<FindMyFollowingsQuery | undefined, FindMyFollowingsQueryVariables>;
export function useFindMyFollowingsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindMyFollowingsQuery, FindMyFollowingsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindMyFollowingsQuery, FindMyFollowingsQueryVariables>(FindMyFollowingsDocument, options);
        }
export type FindMyFollowingsQueryHookResult = ReturnType<typeof useFindMyFollowingsQuery>;
export type FindMyFollowingsLazyQueryHookResult = ReturnType<typeof useFindMyFollowingsLazyQuery>;
export type FindMyFollowingsSuspenseQueryHookResult = ReturnType<typeof useFindMyFollowingsSuspenseQuery>;
export type FindMyFollowingsQueryResult = Apollo.QueryResult<FindMyFollowingsQuery, FindMyFollowingsQueryVariables>;
export const SubscriptionPlansDocument = gql`
    query SubscriptionPlans {
  subscriptionPlans {
    id
    name
    productLimit
    price
  }
}
    `;

/**
 * __useSubscriptionPlansQuery__
 *
 * To run a query within a React component, call `useSubscriptionPlansQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubscriptionPlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscriptionPlansQuery({
 *   variables: {
 *   },
 * });
 */
export function useSubscriptionPlansQuery(baseOptions?: Apollo.QueryHookOptions<SubscriptionPlansQuery, SubscriptionPlansQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubscriptionPlansQuery, SubscriptionPlansQueryVariables>(SubscriptionPlansDocument, options);
      }
export function useSubscriptionPlansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubscriptionPlansQuery, SubscriptionPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubscriptionPlansQuery, SubscriptionPlansQueryVariables>(SubscriptionPlansDocument, options);
        }
// @ts-ignore
export function useSubscriptionPlansSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SubscriptionPlansQuery, SubscriptionPlansQueryVariables>): Apollo.UseSuspenseQueryResult<SubscriptionPlansQuery, SubscriptionPlansQueryVariables>;
export function useSubscriptionPlansSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SubscriptionPlansQuery, SubscriptionPlansQueryVariables>): Apollo.UseSuspenseQueryResult<SubscriptionPlansQuery | undefined, SubscriptionPlansQueryVariables>;
export function useSubscriptionPlansSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SubscriptionPlansQuery, SubscriptionPlansQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SubscriptionPlansQuery, SubscriptionPlansQueryVariables>(SubscriptionPlansDocument, options);
        }
export type SubscriptionPlansQueryHookResult = ReturnType<typeof useSubscriptionPlansQuery>;
export type SubscriptionPlansLazyQueryHookResult = ReturnType<typeof useSubscriptionPlansLazyQuery>;
export type SubscriptionPlansSuspenseQueryHookResult = ReturnType<typeof useSubscriptionPlansSuspenseQuery>;
export type SubscriptionPlansQueryResult = Apollo.QueryResult<SubscriptionPlansQuery, SubscriptionPlansQueryVariables>;
export const GetAllProductsDocument = gql`
    query getAllProducts($filters: ProductsFilterInput) {
  filters(filters: $filters) {
    items {
      id
      title
      slug
      price
      status
      averageRating
      reviewsCount
      images {
        url
      }
      category {
        id
        name
      }
      user {
        username
        displayName
        avatar
      }
      createdAt
    }
    meta {
      total
      page
      limit
      totalPages
    }
  }
}
    `;

/**
 * __useGetAllProductsQuery__
 *
 * To run a query within a React component, call `useGetAllProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProductsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetAllProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllProductsQuery, GetAllProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(GetAllProductsDocument, options);
      }
export function useGetAllProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllProductsQuery, GetAllProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(GetAllProductsDocument, options);
        }
// @ts-ignore
export function useGetAllProductsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllProductsQuery, GetAllProductsQueryVariables>): Apollo.UseSuspenseQueryResult<GetAllProductsQuery, GetAllProductsQueryVariables>;
export function useGetAllProductsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllProductsQuery, GetAllProductsQueryVariables>): Apollo.UseSuspenseQueryResult<GetAllProductsQuery | undefined, GetAllProductsQueryVariables>;
export function useGetAllProductsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllProductsQuery, GetAllProductsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(GetAllProductsDocument, options);
        }
export type GetAllProductsQueryHookResult = ReturnType<typeof useGetAllProductsQuery>;
export type GetAllProductsLazyQueryHookResult = ReturnType<typeof useGetAllProductsLazyQuery>;
export type GetAllProductsSuspenseQueryHookResult = ReturnType<typeof useGetAllProductsSuspenseQuery>;
export type GetAllProductsQueryResult = Apollo.QueryResult<GetAllProductsQuery, GetAllProductsQueryVariables>;
export const GetOneDocument = gql`
    query GetOne($id: String!) {
  getOne(id: $id) {
    id
    title
    slug
    price
    views
    averageRating
    description
    status
    averageRating
    reviewsCount
    createdAt
    images {
      id
      url
      position
    }
    category {
      id
      name
      description
      icon
      isActive
      parentId
      children {
        id
        name
      }
    }
    user {
      id
      username
      displayName
      avatar
      avatarType
    }
    reviews {
      id
      rating
      comment
      createdAt
      user {
        id
        username
        displayName
        avatar
        avatarType
        createdAt
      }
    }
  }
}
    `;

/**
 * __useGetOneQuery__
 *
 * To run a query within a React component, call `useGetOneQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOneQuery(baseOptions: Apollo.QueryHookOptions<GetOneQuery, GetOneQueryVariables> & ({ variables: GetOneQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneQuery, GetOneQueryVariables>(GetOneDocument, options);
      }
export function useGetOneLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneQuery, GetOneQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneQuery, GetOneQueryVariables>(GetOneDocument, options);
        }
// @ts-ignore
export function useGetOneSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetOneQuery, GetOneQueryVariables>): Apollo.UseSuspenseQueryResult<GetOneQuery, GetOneQueryVariables>;
export function useGetOneSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOneQuery, GetOneQueryVariables>): Apollo.UseSuspenseQueryResult<GetOneQuery | undefined, GetOneQueryVariables>;
export function useGetOneSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOneQuery, GetOneQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOneQuery, GetOneQueryVariables>(GetOneDocument, options);
        }
export type GetOneQueryHookResult = ReturnType<typeof useGetOneQuery>;
export type GetOneLazyQueryHookResult = ReturnType<typeof useGetOneLazyQuery>;
export type GetOneSuspenseQueryHookResult = ReturnType<typeof useGetOneSuspenseQuery>;
export type GetOneQueryResult = Apollo.QueryResult<GetOneQuery, GetOneQueryVariables>;
export const GetOneProductStep3Document = gql`
    query GetOneProductStep3($id: String!) {
  getOne(id: $id) {
    id
    title
    slug
    description
    price
    status
    category {
      id
      name
      parentId
      children {
        id
        name
      }
    }
    images {
      id
      url
      position
    }
  }
}
    `;

/**
 * __useGetOneProductStep3Query__
 *
 * To run a query within a React component, call `useGetOneProductStep3Query` and pass it any options that fit your needs.
 * When your component renders, `useGetOneProductStep3Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneProductStep3Query({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOneProductStep3Query(baseOptions: Apollo.QueryHookOptions<GetOneProductStep3Query, GetOneProductStep3QueryVariables> & ({ variables: GetOneProductStep3QueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneProductStep3Query, GetOneProductStep3QueryVariables>(GetOneProductStep3Document, options);
      }
export function useGetOneProductStep3LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneProductStep3Query, GetOneProductStep3QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneProductStep3Query, GetOneProductStep3QueryVariables>(GetOneProductStep3Document, options);
        }
// @ts-ignore
export function useGetOneProductStep3SuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetOneProductStep3Query, GetOneProductStep3QueryVariables>): Apollo.UseSuspenseQueryResult<GetOneProductStep3Query, GetOneProductStep3QueryVariables>;
export function useGetOneProductStep3SuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOneProductStep3Query, GetOneProductStep3QueryVariables>): Apollo.UseSuspenseQueryResult<GetOneProductStep3Query | undefined, GetOneProductStep3QueryVariables>;
export function useGetOneProductStep3SuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOneProductStep3Query, GetOneProductStep3QueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOneProductStep3Query, GetOneProductStep3QueryVariables>(GetOneProductStep3Document, options);
        }
export type GetOneProductStep3QueryHookResult = ReturnType<typeof useGetOneProductStep3Query>;
export type GetOneProductStep3LazyQueryHookResult = ReturnType<typeof useGetOneProductStep3LazyQuery>;
export type GetOneProductStep3SuspenseQueryHookResult = ReturnType<typeof useGetOneProductStep3SuspenseQuery>;
export type GetOneProductStep3QueryResult = Apollo.QueryResult<GetOneProductStep3Query, GetOneProductStep3QueryVariables>;
export const GetUserProductsDocument = gql`
    query GetUserProducts($username: String!, $cursor: String, $take: Int) {
  getUserProducts(username: $username, cursor: $cursor, take: $take) {
    items {
      id
      title
      slug
      price
      images
      createdAt
    }
    nextCursor
    hasMore
  }
}
    `;

/**
 * __useGetUserProductsQuery__
 *
 * To run a query within a React component, call `useGetUserProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProductsQuery({
 *   variables: {
 *      username: // value for 'username'
 *      cursor: // value for 'cursor'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useGetUserProductsQuery(baseOptions: Apollo.QueryHookOptions<GetUserProductsQuery, GetUserProductsQueryVariables> & ({ variables: GetUserProductsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserProductsQuery, GetUserProductsQueryVariables>(GetUserProductsDocument, options);
      }
export function useGetUserProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserProductsQuery, GetUserProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserProductsQuery, GetUserProductsQueryVariables>(GetUserProductsDocument, options);
        }
// @ts-ignore
export function useGetUserProductsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserProductsQuery, GetUserProductsQueryVariables>): Apollo.UseSuspenseQueryResult<GetUserProductsQuery, GetUserProductsQueryVariables>;
export function useGetUserProductsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserProductsQuery, GetUserProductsQueryVariables>): Apollo.UseSuspenseQueryResult<GetUserProductsQuery | undefined, GetUserProductsQueryVariables>;
export function useGetUserProductsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserProductsQuery, GetUserProductsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserProductsQuery, GetUserProductsQueryVariables>(GetUserProductsDocument, options);
        }
export type GetUserProductsQueryHookResult = ReturnType<typeof useGetUserProductsQuery>;
export type GetUserProductsLazyQueryHookResult = ReturnType<typeof useGetUserProductsLazyQuery>;
export type GetUserProductsSuspenseQueryHookResult = ReturnType<typeof useGetUserProductsSuspenseQuery>;
export type GetUserProductsQueryResult = Apollo.QueryResult<GetUserProductsQuery, GetUserProductsQueryVariables>;
export const GetSubscriptionDocument = gql`
    query GetSubscription {
  getSubscription {
    id
    status
    interval
    productUser
    plan {
      id
      name
      price
      limit
    }
    currentPeriodStart
    currentPeriodEnd
  }
}
    `;

/**
 * __useGetSubscriptionQuery__
 *
 * To run a query within a React component, call `useGetSubscriptionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubscriptionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubscriptionQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSubscriptionQuery(baseOptions?: Apollo.QueryHookOptions<GetSubscriptionQuery, GetSubscriptionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubscriptionQuery, GetSubscriptionQueryVariables>(GetSubscriptionDocument, options);
      }
export function useGetSubscriptionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubscriptionQuery, GetSubscriptionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubscriptionQuery, GetSubscriptionQueryVariables>(GetSubscriptionDocument, options);
        }
// @ts-ignore
export function useGetSubscriptionSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSubscriptionQuery, GetSubscriptionQueryVariables>): Apollo.UseSuspenseQueryResult<GetSubscriptionQuery, GetSubscriptionQueryVariables>;
export function useGetSubscriptionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSubscriptionQuery, GetSubscriptionQueryVariables>): Apollo.UseSuspenseQueryResult<GetSubscriptionQuery | undefined, GetSubscriptionQueryVariables>;
export function useGetSubscriptionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSubscriptionQuery, GetSubscriptionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSubscriptionQuery, GetSubscriptionQueryVariables>(GetSubscriptionDocument, options);
        }
export type GetSubscriptionQueryHookResult = ReturnType<typeof useGetSubscriptionQuery>;
export type GetSubscriptionLazyQueryHookResult = ReturnType<typeof useGetSubscriptionLazyQuery>;
export type GetSubscriptionSuspenseQueryHookResult = ReturnType<typeof useGetSubscriptionSuspenseQuery>;
export type GetSubscriptionQueryResult = Apollo.QueryResult<GetSubscriptionQuery, GetSubscriptionQueryVariables>;
export const TransactionsListDocument = gql`
    query TransactionsList($pagination: TransactionsPaginationInput) {
  transactionsList(pagination: $pagination) {
    items {
      id
      orderId
      productTitle
      amount
      currency
      status
      viewerRole
      counterpartyId
      counterpartyUsername
      createdAt
    }
    pagination {
      total
      take
      skip
    }
  }
}
    `;

/**
 * __useTransactionsListQuery__
 *
 * To run a query within a React component, call `useTransactionsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsListQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useTransactionsListQuery(baseOptions?: Apollo.QueryHookOptions<TransactionsListQuery, TransactionsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionsListQuery, TransactionsListQueryVariables>(TransactionsListDocument, options);
      }
export function useTransactionsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionsListQuery, TransactionsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionsListQuery, TransactionsListQueryVariables>(TransactionsListDocument, options);
        }
// @ts-ignore
export function useTransactionsListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TransactionsListQuery, TransactionsListQueryVariables>): Apollo.UseSuspenseQueryResult<TransactionsListQuery, TransactionsListQueryVariables>;
export function useTransactionsListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TransactionsListQuery, TransactionsListQueryVariables>): Apollo.UseSuspenseQueryResult<TransactionsListQuery | undefined, TransactionsListQueryVariables>;
export function useTransactionsListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TransactionsListQuery, TransactionsListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TransactionsListQuery, TransactionsListQueryVariables>(TransactionsListDocument, options);
        }
export type TransactionsListQueryHookResult = ReturnType<typeof useTransactionsListQuery>;
export type TransactionsListLazyQueryHookResult = ReturnType<typeof useTransactionsListLazyQuery>;
export type TransactionsListSuspenseQueryHookResult = ReturnType<typeof useTransactionsListSuspenseQuery>;
export type TransactionsListQueryResult = Apollo.QueryResult<TransactionsListQuery, TransactionsListQueryVariables>;
export const FindCurrentSessionDocument = gql`
    query FindCurrentSession {
  findCurrentSession {
    id
    userId
    createdAt
    metadata {
      ip
      device {
        browser
        os
        type
      }
      location {
        country
        city
        latitude
        longitude
      }
    }
  }
}
    `;

/**
 * __useFindCurrentSessionQuery__
 *
 * To run a query within a React component, call `useFindCurrentSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCurrentSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCurrentSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindCurrentSessionQuery(baseOptions?: Apollo.QueryHookOptions<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>(FindCurrentSessionDocument, options);
      }
export function useFindCurrentSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>(FindCurrentSessionDocument, options);
        }
// @ts-ignore
export function useFindCurrentSessionSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>): Apollo.UseSuspenseQueryResult<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>;
export function useFindCurrentSessionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>): Apollo.UseSuspenseQueryResult<FindCurrentSessionQuery | undefined, FindCurrentSessionQueryVariables>;
export function useFindCurrentSessionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>(FindCurrentSessionDocument, options);
        }
export type FindCurrentSessionQueryHookResult = ReturnType<typeof useFindCurrentSessionQuery>;
export type FindCurrentSessionLazyQueryHookResult = ReturnType<typeof useFindCurrentSessionLazyQuery>;
export type FindCurrentSessionSuspenseQueryHookResult = ReturnType<typeof useFindCurrentSessionSuspenseQuery>;
export type FindCurrentSessionQueryResult = Apollo.QueryResult<FindCurrentSessionQuery, FindCurrentSessionQueryVariables>;
export const FindNotificationsByUserDocument = gql`
    query FindNotificationsByUser($pagination: PaginationInput) {
  findNotificationsByUser(pagination: $pagination) {
    items {
      id
      type
      isRead
      createdAt
      entityId
      actor {
        username
        avatar
        avatarType
      }
    }
    total
  }
}
    `;

/**
 * __useFindNotificationsByUserQuery__
 *
 * To run a query within a React component, call `useFindNotificationsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindNotificationsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindNotificationsByUserQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useFindNotificationsByUserQuery(baseOptions?: Apollo.QueryHookOptions<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>(FindNotificationsByUserDocument, options);
      }
export function useFindNotificationsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>(FindNotificationsByUserDocument, options);
        }
// @ts-ignore
export function useFindNotificationsByUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>): Apollo.UseSuspenseQueryResult<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>;
export function useFindNotificationsByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>): Apollo.UseSuspenseQueryResult<FindNotificationsByUserQuery | undefined, FindNotificationsByUserQueryVariables>;
export function useFindNotificationsByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>(FindNotificationsByUserDocument, options);
        }
export type FindNotificationsByUserQueryHookResult = ReturnType<typeof useFindNotificationsByUserQuery>;
export type FindNotificationsByUserLazyQueryHookResult = ReturnType<typeof useFindNotificationsByUserLazyQuery>;
export type FindNotificationsByUserSuspenseQueryHookResult = ReturnType<typeof useFindNotificationsByUserSuspenseQuery>;
export type FindNotificationsByUserQueryResult = Apollo.QueryResult<FindNotificationsByUserQuery, FindNotificationsByUserQueryVariables>;
export const FindProfileDocument = gql`
    query FindProfile {
  findProfile {
    id
    username
    displayName
    email
    avatar
    avatarType
    bio
    isTotpEnabled
    isOnline
  }
}
    `;

/**
 * __useFindProfileQuery__
 *
 * To run a query within a React component, call `useFindProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindProfileQuery(baseOptions?: Apollo.QueryHookOptions<FindProfileQuery, FindProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProfileQuery, FindProfileQueryVariables>(FindProfileDocument, options);
      }
export function useFindProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProfileQuery, FindProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProfileQuery, FindProfileQueryVariables>(FindProfileDocument, options);
        }
// @ts-ignore
export function useFindProfileSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindProfileQuery, FindProfileQueryVariables>): Apollo.UseSuspenseQueryResult<FindProfileQuery, FindProfileQueryVariables>;
export function useFindProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindProfileQuery, FindProfileQueryVariables>): Apollo.UseSuspenseQueryResult<FindProfileQuery | undefined, FindProfileQueryVariables>;
export function useFindProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindProfileQuery, FindProfileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindProfileQuery, FindProfileQueryVariables>(FindProfileDocument, options);
        }
export type FindProfileQueryHookResult = ReturnType<typeof useFindProfileQuery>;
export type FindProfileLazyQueryHookResult = ReturnType<typeof useFindProfileLazyQuery>;
export type FindProfileSuspenseQueryHookResult = ReturnType<typeof useFindProfileSuspenseQuery>;
export type FindProfileQueryResult = Apollo.QueryResult<FindProfileQuery, FindProfileQueryVariables>;
export const FindSessionsByUserDocument = gql`
    query FindSessionsByUser {
  findSessionsByUser {
    id
    userId
    createdAt
    metadata {
      device {
        browser
        os
        type
      }
      location {
        country
        city
        latitude
        longitude
      }
      ip
    }
  }
}
    `;

/**
 * __useFindSessionsByUserQuery__
 *
 * To run a query within a React component, call `useFindSessionsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSessionsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSessionsByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindSessionsByUserQuery(baseOptions?: Apollo.QueryHookOptions<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>(FindSessionsByUserDocument, options);
      }
export function useFindSessionsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>(FindSessionsByUserDocument, options);
        }
// @ts-ignore
export function useFindSessionsByUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>): Apollo.UseSuspenseQueryResult<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>;
export function useFindSessionsByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>): Apollo.UseSuspenseQueryResult<FindSessionsByUserQuery | undefined, FindSessionsByUserQueryVariables>;
export function useFindSessionsByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>(FindSessionsByUserDocument, options);
        }
export type FindSessionsByUserQueryHookResult = ReturnType<typeof useFindSessionsByUserQuery>;
export type FindSessionsByUserLazyQueryHookResult = ReturnType<typeof useFindSessionsByUserLazyQuery>;
export type FindSessionsByUserSuspenseQueryHookResult = ReturnType<typeof useFindSessionsByUserSuspenseQuery>;
export type FindSessionsByUserQueryResult = Apollo.QueryResult<FindSessionsByUserQuery, FindSessionsByUserQueryVariables>;
export const SocialLinksDocument = gql`
    query SocialLinks($username: String!) {
  socialLinks(username: $username) {
    id
    url
    title
    position
  }
}
    `;

/**
 * __useSocialLinksQuery__
 *
 * To run a query within a React component, call `useSocialLinksQuery` and pass it any options that fit your needs.
 * When your component renders, `useSocialLinksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSocialLinksQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useSocialLinksQuery(baseOptions: Apollo.QueryHookOptions<SocialLinksQuery, SocialLinksQueryVariables> & ({ variables: SocialLinksQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SocialLinksQuery, SocialLinksQueryVariables>(SocialLinksDocument, options);
      }
export function useSocialLinksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SocialLinksQuery, SocialLinksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SocialLinksQuery, SocialLinksQueryVariables>(SocialLinksDocument, options);
        }
// @ts-ignore
export function useSocialLinksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SocialLinksQuery, SocialLinksQueryVariables>): Apollo.UseSuspenseQueryResult<SocialLinksQuery, SocialLinksQueryVariables>;
export function useSocialLinksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SocialLinksQuery, SocialLinksQueryVariables>): Apollo.UseSuspenseQueryResult<SocialLinksQuery | undefined, SocialLinksQueryVariables>;
export function useSocialLinksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SocialLinksQuery, SocialLinksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SocialLinksQuery, SocialLinksQueryVariables>(SocialLinksDocument, options);
        }
export type SocialLinksQueryHookResult = ReturnType<typeof useSocialLinksQuery>;
export type SocialLinksLazyQueryHookResult = ReturnType<typeof useSocialLinksLazyQuery>;
export type SocialLinksSuspenseQueryHookResult = ReturnType<typeof useSocialLinksSuspenseQuery>;
export type SocialLinksQueryResult = Apollo.QueryResult<SocialLinksQuery, SocialLinksQueryVariables>;
export const FindUnreadNotificationsCountDocument = gql`
    query FindUnreadNotificationsCount {
  findUnreadNotificationCount
}
    `;

/**
 * __useFindUnreadNotificationsCountQuery__
 *
 * To run a query within a React component, call `useFindUnreadNotificationsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUnreadNotificationsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUnreadNotificationsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindUnreadNotificationsCountQuery(baseOptions?: Apollo.QueryHookOptions<FindUnreadNotificationsCountQuery, FindUnreadNotificationsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUnreadNotificationsCountQuery, FindUnreadNotificationsCountQueryVariables>(FindUnreadNotificationsCountDocument, options);
      }
export function useFindUnreadNotificationsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUnreadNotificationsCountQuery, FindUnreadNotificationsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUnreadNotificationsCountQuery, FindUnreadNotificationsCountQueryVariables>(FindUnreadNotificationsCountDocument, options);
        }
// @ts-ignore
export function useFindUnreadNotificationsCountSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindUnreadNotificationsCountQuery, FindUnreadNotificationsCountQueryVariables>): Apollo.UseSuspenseQueryResult<FindUnreadNotificationsCountQuery, FindUnreadNotificationsCountQueryVariables>;
export function useFindUnreadNotificationsCountSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindUnreadNotificationsCountQuery, FindUnreadNotificationsCountQueryVariables>): Apollo.UseSuspenseQueryResult<FindUnreadNotificationsCountQuery | undefined, FindUnreadNotificationsCountQueryVariables>;
export function useFindUnreadNotificationsCountSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindUnreadNotificationsCountQuery, FindUnreadNotificationsCountQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindUnreadNotificationsCountQuery, FindUnreadNotificationsCountQueryVariables>(FindUnreadNotificationsCountDocument, options);
        }
export type FindUnreadNotificationsCountQueryHookResult = ReturnType<typeof useFindUnreadNotificationsCountQuery>;
export type FindUnreadNotificationsCountLazyQueryHookResult = ReturnType<typeof useFindUnreadNotificationsCountLazyQuery>;
export type FindUnreadNotificationsCountSuspenseQueryHookResult = ReturnType<typeof useFindUnreadNotificationsCountSuspenseQuery>;
export type FindUnreadNotificationsCountQueryResult = Apollo.QueryResult<FindUnreadNotificationsCountQuery, FindUnreadNotificationsCountQueryVariables>;
export const GenerateTotpSecretDocument = gql`
    query GenerateTotpSecret {
  generateTotpSecret {
    qrcodeUrl
    secret
  }
}
    `;

/**
 * __useGenerateTotpSecretQuery__
 *
 * To run a query within a React component, call `useGenerateTotpSecretQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenerateTotpSecretQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenerateTotpSecretQuery({
 *   variables: {
 *   },
 * });
 */
export function useGenerateTotpSecretQuery(baseOptions?: Apollo.QueryHookOptions<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>(GenerateTotpSecretDocument, options);
      }
export function useGenerateTotpSecretLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>(GenerateTotpSecretDocument, options);
        }
// @ts-ignore
export function useGenerateTotpSecretSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>): Apollo.UseSuspenseQueryResult<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>;
export function useGenerateTotpSecretSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>): Apollo.UseSuspenseQueryResult<GenerateTotpSecretQuery | undefined, GenerateTotpSecretQueryVariables>;
export function useGenerateTotpSecretSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>(GenerateTotpSecretDocument, options);
        }
export type GenerateTotpSecretQueryHookResult = ReturnType<typeof useGenerateTotpSecretQuery>;
export type GenerateTotpSecretLazyQueryHookResult = ReturnType<typeof useGenerateTotpSecretLazyQuery>;
export type GenerateTotpSecretSuspenseQueryHookResult = ReturnType<typeof useGenerateTotpSecretSuspenseQuery>;
export type GenerateTotpSecretQueryResult = Apollo.QueryResult<GenerateTotpSecretQuery, GenerateTotpSecretQueryVariables>;
export const GetBlockUserDocument = gql`
    query GetBlockUser($pagination: BlockUserInput!) {
  getBlockUser(pagination: $pagination) {
    items {
      id
      username
      displayName
      avatar
      avatarType
      createdAt
    }
    total
  }
}
    `;

/**
 * __useGetBlockUserQuery__
 *
 * To run a query within a React component, call `useGetBlockUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlockUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlockUserQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetBlockUserQuery(baseOptions: Apollo.QueryHookOptions<GetBlockUserQuery, GetBlockUserQueryVariables> & ({ variables: GetBlockUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBlockUserQuery, GetBlockUserQueryVariables>(GetBlockUserDocument, options);
      }
export function useGetBlockUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBlockUserQuery, GetBlockUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBlockUserQuery, GetBlockUserQueryVariables>(GetBlockUserDocument, options);
        }
// @ts-ignore
export function useGetBlockUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBlockUserQuery, GetBlockUserQueryVariables>): Apollo.UseSuspenseQueryResult<GetBlockUserQuery, GetBlockUserQueryVariables>;
export function useGetBlockUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBlockUserQuery, GetBlockUserQueryVariables>): Apollo.UseSuspenseQueryResult<GetBlockUserQuery | undefined, GetBlockUserQueryVariables>;
export function useGetBlockUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBlockUserQuery, GetBlockUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBlockUserQuery, GetBlockUserQueryVariables>(GetBlockUserDocument, options);
        }
export type GetBlockUserQueryHookResult = ReturnType<typeof useGetBlockUserQuery>;
export type GetBlockUserLazyQueryHookResult = ReturnType<typeof useGetBlockUserLazyQuery>;
export type GetBlockUserSuspenseQueryHookResult = ReturnType<typeof useGetBlockUserSuspenseQuery>;
export type GetBlockUserQueryResult = Apollo.QueryResult<GetBlockUserQuery, GetBlockUserQueryVariables>;
export const PublicProfileDocument = gql`
    query PublicProfile($username: String!) {
  publicProfile(username: $username) {
    id
    username
    displayName
    avatar
    avatarType
    bio
    createdAt
    isOnline
    isFollowedByCurrentUser
  }
}
    `;

/**
 * __usePublicProfileQuery__
 *
 * To run a query within a React component, call `usePublicProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicProfileQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function usePublicProfileQuery(baseOptions: Apollo.QueryHookOptions<PublicProfileQuery, PublicProfileQueryVariables> & ({ variables: PublicProfileQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PublicProfileQuery, PublicProfileQueryVariables>(PublicProfileDocument, options);
      }
export function usePublicProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PublicProfileQuery, PublicProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PublicProfileQuery, PublicProfileQueryVariables>(PublicProfileDocument, options);
        }
// @ts-ignore
export function usePublicProfileSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PublicProfileQuery, PublicProfileQueryVariables>): Apollo.UseSuspenseQueryResult<PublicProfileQuery, PublicProfileQueryVariables>;
export function usePublicProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PublicProfileQuery, PublicProfileQueryVariables>): Apollo.UseSuspenseQueryResult<PublicProfileQuery | undefined, PublicProfileQueryVariables>;
export function usePublicProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PublicProfileQuery, PublicProfileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PublicProfileQuery, PublicProfileQueryVariables>(PublicProfileDocument, options);
        }
export type PublicProfileQueryHookResult = ReturnType<typeof usePublicProfileQuery>;
export type PublicProfileLazyQueryHookResult = ReturnType<typeof usePublicProfileLazyQuery>;
export type PublicProfileSuspenseQueryHookResult = ReturnType<typeof usePublicProfileSuspenseQuery>;
export type PublicProfileQueryResult = Apollo.QueryResult<PublicProfileQuery, PublicProfileQueryVariables>;
export const UnblockUserDocument = gql`
    mutation UnblockUser($blockedId: String!) {
  unblockUser(blockedId: $blockedId)
}
    `;
export type UnblockUserMutationFn = Apollo.MutationFunction<UnblockUserMutation, UnblockUserMutationVariables>;

/**
 * __useUnblockUserMutation__
 *
 * To run a mutation, you first call `useUnblockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnblockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unblockUserMutation, { data, loading, error }] = useUnblockUserMutation({
 *   variables: {
 *      blockedId: // value for 'blockedId'
 *   },
 * });
 */
export function useUnblockUserMutation(baseOptions?: Apollo.MutationHookOptions<UnblockUserMutation, UnblockUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnblockUserMutation, UnblockUserMutationVariables>(UnblockUserDocument, options);
      }
export type UnblockUserMutationHookResult = ReturnType<typeof useUnblockUserMutation>;
export type UnblockUserMutationResult = Apollo.MutationResult<UnblockUserMutation>;
export type UnblockUserMutationOptions = Apollo.BaseMutationOptions<UnblockUserMutation, UnblockUserMutationVariables>;
export const ChatChangeDocument = gql`
    subscription ChatChange {
  chatChange {
    type
    conversationId
    lastMessage {
      id
      content
      conversationId
      createdAt
      updatedAt
      deleted
      type
      sender {
        id
        username
        avatar
        avatarType
        isOnline
      }
    }
    participant {
      id
      username
      avatar
      avatarType
      isOnline
    }
    unreadCount
  }
}
    `;

/**
 * __useChatChangeSubscription__
 *
 * To run a query within a React component, call `useChatChangeSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChatChangeSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatChangeSubscription({
 *   variables: {
 *   },
 * });
 */
export function useChatChangeSubscription(baseOptions?: Apollo.SubscriptionHookOptions<ChatChangeSubscription, ChatChangeSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ChatChangeSubscription, ChatChangeSubscriptionVariables>(ChatChangeDocument, options);
      }
export type ChatChangeSubscriptionHookResult = ReturnType<typeof useChatChangeSubscription>;
export type ChatChangeSubscriptionResult = Apollo.SubscriptionResult<ChatChangeSubscription>;
export const MessageChangeDocument = gql`
    subscription MessageChange($conversationId: String!) {
  messageChange(conversationId: $conversationId) {
    ...MessageFields
  }
}
    ${MessageFieldsFragmentDoc}`;

/**
 * __useMessageChangeSubscription__
 *
 * To run a query within a React component, call `useMessageChangeSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageChangeSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageChangeSubscription({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useMessageChangeSubscription(baseOptions: Apollo.SubscriptionHookOptions<MessageChangeSubscription, MessageChangeSubscriptionVariables> & ({ variables: MessageChangeSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MessageChangeSubscription, MessageChangeSubscriptionVariables>(MessageChangeDocument, options);
      }
export type MessageChangeSubscriptionHookResult = ReturnType<typeof useMessageChangeSubscription>;
export type MessageChangeSubscriptionResult = Apollo.SubscriptionResult<MessageChangeSubscription>;
export const NotificationCreatedDocument = gql`
    subscription NotificationCreated($userId: String!) {
  notificationCreated(userId: $userId) {
    id
    type
    actor {
      username
      avatar
    }
  }
}
    `;

/**
 * __useNotificationCreatedSubscription__
 *
 * To run a query within a React component, call `useNotificationCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNotificationCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationCreatedSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useNotificationCreatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<NotificationCreatedSubscription, NotificationCreatedSubscriptionVariables> & ({ variables: NotificationCreatedSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NotificationCreatedSubscription, NotificationCreatedSubscriptionVariables>(NotificationCreatedDocument, options);
      }
export type NotificationCreatedSubscriptionHookResult = ReturnType<typeof useNotificationCreatedSubscription>;
export type NotificationCreatedSubscriptionResult = Apollo.SubscriptionResult<NotificationCreatedSubscription>;