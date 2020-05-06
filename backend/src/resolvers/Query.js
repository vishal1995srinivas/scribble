const { forwardTo } = require('prisma-binding');
const Query = {
	posts: forwardTo('db'),
	postsConnection: forwardTo('db'),
	likesesConnection: forwardTo('db'),
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
	},
	likeses(parent, args, ctx, info) {
		if (!ctx.request.userId) {
			return null;
		}
		// console.log(args.where.post.id);
		return ctx.db.query.likeses(
			{
				where: { post: { id: args.where.post.id }, user: { id: ctx.request.userId } }
			},
			info
		);
	}
};

module.exports = Query;
