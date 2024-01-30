const { capitalizeFirstLetter } = require('./helper');

/* eslint-disable max-len */
const isFloat = (n) => {
  return Number(n) === n && n % 1 !== 0;
};

exports.pagination = async (body, model, searchColumn = 'name', filter = {}, populate = false) => {
  try {
    let limit = typeof body.perPage === 'undefined' ? 10 : body.perPage;
    let page = typeof body.page === 'undefined' ? 1 : body.page;
    let keyword = typeof body.keyword === 'undefined' ? false : body.keyword;
    let sort = typeof body.sort === 'undefined' ? 'date_desc' : body.sort;

    let search = filter;
    if (keyword) {
      search['$or'] = [
        {
          [searchColumn]: { $regex: keyword },
        },
        {
          [searchColumn]: { $regex: capitalizeFirstLetter(keyword) },
        },
        {
          [searchColumn]: { $regex: keyword.toUpperCase() },
        },
      ];
    }
    let sortBy = { createdAt: -1 };
    if (sort === 'date_asc') {
      sortBy = { createdAt: 1 };
    } else if (sort === 'title_desc') {
      sortBy = { [searchColumn]: -1 };
    } else if (sort === 'title_asc') {
      sortBy = { [searchColumn]: 1 };
    }
    let list = [];
    let total = await model.find(search).countDocuments();
    let skips = limit * (page - 1);
    let lists = [];

    if (populate) {
      lists = await model.find(search).populate(populate).sort(sortBy).skip(skips).limit(limit).lean().exec();
    } else {
      lists = await model.find(search).sort(sortBy).skip(skips).limit(limit).lean().exec();
    }

    let totalPages = parseInt(total) / limit;
    list.push({
      pages: isFloat(totalPages) ? parseInt(totalPages + 1) : totalPages,
      total: total,
      currentPage: page,
      lists,
    });

    return list;
  } catch (err) {
    return [];
  }
};

exports.webParam = (param, type) => {
  switch (type) {
    case 'int':
      return param ? parseInt(param) : undefined;
    case 'string':
      return param ? param.toString() : undefined;
    case 'float':
      return param ? parseFloat(param) : undefined;
    case 'bool':
      return param ? Boolean(param) : undefined;
    default:
      return undefined;
  }
};