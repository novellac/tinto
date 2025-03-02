export const tinaField = <T extends Record<string, any> | undefined | null>(
  object: T,
  property?: keyof Omit<NonNullable<T>, '__typename' | '_sys'>,
  index?: number
): string => {
  if (!object || !object._content_source) return '';

  const queryId = object._content_source.queryId;
  const path = object._content_source.path ? [...object._content_source.path] : [];

  if (property) {
    path.push(property);
    if (typeof index === 'number') {
      path.push(index);
    }
  }

  return [queryId, path.join('.')].join('---');
};

