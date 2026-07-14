import config from '../../config';

export const getImageUrl = (src: string): string => {
  return `${config.apiUrl}/images/${src}`;
};

export const getOptimisedImageUrl = (
  src: string,
  width = 248
): string => {
  return `${getImageUrl(src)}?w=${width}&fit=crop&auto=format`;
};