export function mapProductToListItem(product: any) {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    status: product.status,
    slug: product.slug,
    averageRating: product.averageRating ?? 0,
    reviewsCount: product.reviewsCount ?? 0,

    images: product.images?.map((img: any) => ({
      url: img.url,
    })) ?? [],

    category: product.category
      ? {
        id: product.category.id,
        name: product.category.name,
      }
      : null,

    user: {
      id: product.user.id,
      username: product.user.username,
      displayName: product.user.displayName,
      avatar: product.user.avatar,
    },

    createdAt: product.createdAt,
  };
}
