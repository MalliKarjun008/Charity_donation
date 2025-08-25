class ApiFeatures {
  constructor(query, queryStr, searchFields = []) {
    this.query = query;
    this.queryStr = queryStr;
    this.searchFields = searchFields;
  }

  filter() {
    // Create a copy of the query string
    const queryObj = { ...this.queryStr };

    // Remove fields that are not part of filtering
    const excludedFields = ["page", "sort", "limit", "fields", "search"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Handle comparison operators
    const finalQuery = {};
    for (const [key, value] of Object.entries(queryObj)) {
      // Check if the key contains a comparison operator (e.g., price[gte])
      const operatorMatch = key.match(/\[(\w+)\]/);
      if (operatorMatch) {
        // Extract the field name (e.g., 'price') and operator (e.g., 'gte')
        const field = key.split("[")[0];
        const operator = operatorMatch[1];

        // Create nested structure for MongoDB query
        finalQuery[field] = { ...finalQuery[field], [`$${operator}`]: value };
      } else {
        // Non-operator fields are added directly
        finalQuery[key] = value;
      }
    }

    this.query = this.query.find(finalQuery);
    return this;
  }

  // Example of additional methods for chaining
  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    const page = parseInt(this.queryStr.page, 10) || 1;
    const limit = parseInt(this.queryStr.limit, 10) || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
  search() {
    if (this.queryStr.search) {
      const searchTerm = this.queryStr.search;
      const searchConditions = this.searchFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: "i" },
      }));

      this.query = this.query.find({
        $or: searchConditions,
      });
    }
    return this;
  }
}

module.exports = ApiFeatures;
