const catchAsync = require("../utils/catchAsync");
const ApiFeatures = require("../utils/api_features");

exports.getAllFactory = (Model, options = {}) => {
  return catchAsync(async (req, res, next) => {
    // 1. base query with default filter
    let query = Model.find(options.defaultFilter || {});

    // 2. apply API features
    const api_features = new ApiFeatures(
      query,
      req.query,
      options.searchFields || []
    )
      .filter()
      .limitFields()
      .paginate()
      .sort()
      .search();

    // 3. populating multiple fields
    if (options.populate) {
      if (Array.isArray(options.populate)) {
        // multiple population paths
        options.populate.forEach((populateOpt) => {
          api_features.query = api_features.query.populate(populateOpt);
        });
      } else {
        // Single population path
        api_features.query = api_features.query.populate(options.populate);
      }
    }

    // 4. Execute the query
    const data = await api_features.query;

    // 5. Send the response
    res.status(200).json({
      status: "success",
      length: data.length,
      data,
    });
  });
};
