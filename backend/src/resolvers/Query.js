const { forwardTo } = require('prisma-binding');
const Query = {
	posts: forwardTo('db'),
	postsConnection: forwardTo('db'),
	post: forwardTo('db'),
	me(parent, args, ctx, info) {
		// check if there is a current user ID
		if (!ctx.request.userId) {
			return null;
		}
		return ctx.db.query.user(
			{
				where: { id: ctx.request.userId }
			},
			info
		);
	}
};

module.exports = Query;
