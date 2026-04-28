export const DATABASE_ID = 'b658d2e8-7a82-424c-aa32-98f937b9418f';
export const ALLOWED_GENRES = ['fiction', 'nonfiction', 'poetry'] as const;
export type FavoriteGenre = typeof ALLOWED_GENRES[number];
