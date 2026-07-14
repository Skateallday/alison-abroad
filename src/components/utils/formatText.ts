export const capitaliseFirstLetter = (value: string): string => {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const formatLocationName = (value: string): string => {
  return value
    .split('-')
    .map(capitaliseFirstLetter)
    .join(' ');
};