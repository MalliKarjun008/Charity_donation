export const formatDate = (dateString) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    date: "2-digit",
    month: "short",
    year: "numeric",
  });
};
