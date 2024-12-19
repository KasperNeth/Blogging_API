const SearchQuery = (query) => {
  const { title, tags, author, page, limit, sortBy, order } = query;

  const filter = {};
  if (title) filter.title = { $regex: title, $options: "i" };
  if (tags) filter.tags = { $in: tags.split(",") },{ $options: "i" };
  if (author) filter["author.username"] = { $regex: author, $options: "i" };

  const pagination = {
    page: parseInt(page) || 1,
    limit: parseInt(limit) || 20,
  };

  const sorting = {
    [sortBy || "createdAt"]: parseInt(order) || -1,
  };

  return { filter, pagination, sorting };
};


module.exports = { SearchQuery };  