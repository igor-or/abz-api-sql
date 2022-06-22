const queryString = require('query-string');

exports.paginate = async (paginatedReq, entityService) => {
    const PAGE_SIZE = 6;

    const page = +paginatedReq.query.page || 1;
    const offset = +paginatedReq.query.offset;
    const count = +paginatedReq.query.count || PAGE_SIZE;

    const skip = offset ? offset : (page - 1) * count;

    const entities = await entityService.getAll(skip, count);
    const totalEntities = await entityService.count();

    if (totalEntities === 0) {
        return {
            success: true,
            total_pages: 0,
            ['total_' + entityService.entityName]: 0,
            count,
            [!isNaN(offset) ? 'offset' : 'page']: !isNaN(offset)
                ? offset
                : page,
            links: {
                next_url: null,
                prev_url: null,
            },
            [entityService.entityName]: entities,
        };
    }

    const totalPages = Math.ceil(totalEntities / count);

    if (page > totalPages || offset >= totalEntities) {
        const error = new Error('Page not found');
        error.statusCode = 404;
        console.log('in err');
        throw error;
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

    const baseUrl =
        // paginatedReq.protocol
        'https://' + paginatedReq.get('host') + paginatedReq.baseUrl;

    const prevPageUrl = prevPageQuery
        ? baseUrl + '?' + queryString.stringify(prevPageQuery)
        : null;
    const nextPageUrl = nextPageQuery
        ? baseUrl + '?' + queryString.stringify(nextPageQuery)
        : null;

    return {
        success: true,
        total_pages: totalPages,
        ['total_' + entityService.entityName]: totalEntities,
        count,
        [!isNaN(offset) ? 'offset' : 'page']: !isNaN(offset) ? offset : page,
        links: {
            next_url: nextPageUrl,
            prev_url: prevPageUrl,
        },
        [entityService.entityName]: entities,
    };
};
