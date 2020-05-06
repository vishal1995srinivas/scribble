const { forwardTo } = require('prisma-binding');
const Query = {
	posts: forwardTo('db')
};

module.exports = Query;
