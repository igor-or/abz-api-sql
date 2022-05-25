const queryString = require('query-string');

exports.paginate = entityService => {
    return async (req, res, next) => {
        const PAGE_SIZE = 6;

        const page = +req.query.page || 1;
        const offset = +req.query.offset;
        const count = +req.query.count || PAGE_SIZE;

        const skip = offset ? offset : (page - 1) * count;

        const entities = await entityService.getAll(skip, count);
        const totalEntities = await entityService.count();

        const totalPages = Math.ceil(totalEntities / count);

        if (page > totalPages || offset >= totalEntities) {
            const error = new Error('Page not found');
            return next(error);
        }

        let prevPageQuery, nextPageQuery;
        if (!isNaN(offset)) {
            if (offset >= count) {
                prevPageQuery = { offset: offset - count, count };
            }
            if (offset < totalEntities - count) {
                nextPageQuery = { offset: offset + count, count };
            }
        } else {
            if (page !== 1) {
                prevPageQuery = { page: page - 1, count };
            }

            if (page < totalPages) {
                nextPageQuery = { page: page + 1, count };
            }
        }

        const baseUrl = req.protocol + '://' + req.get('host') + req.baseUrl;
        const prevPageUrl = prevPageQuery
            ? baseUrl + '?' + queryString.stringify(prevPageQuery)
            : null;
        const nextPageUrl = nextPageQuery
            ? baseUrl + '?' + queryString.stringify(nextPageQuery)
            : null;

        return {
            success: true,
            total_pages: totalPages,
            ['total_' + entityService.entity_name]: totalEntities,
            count,
            [!isNaN(offset) ? 'offset' : 'page']: !isNaN(offset)
                ? offset
                : page,
            links: {
                next_url: nextPageUrl,
                prev_url: prevPageUrl,
            },
            [entityService.entity_name]: entities,
        };
    };
};
