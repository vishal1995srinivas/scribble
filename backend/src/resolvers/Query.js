const { forwardTo } = require('prisma-binding');
const Query = {
	posts: forwardTo('db'),
	postsConnection: forwardTo('db')
};

module.exports = Query;
