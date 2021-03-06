const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, makeANiceEmail } = require('../mail');
const Mutations = {
	async signup(parent, args, ctx, info) {
		// lowercase their email
		args.email = args.email.toLowerCase();
		// hash their password
		const password = await bcrypt.hash(args.password, 10);
		// create the user in the database
		const user = await ctx.db.mutation.createUser(
			{
				data: {
					...args,
					password,
					permissions: { set: [ 'USER' ] }
				}
			},
			info
		);
		// create the JWT token for them
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
		// We set the jwt as a cookie on the response
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
		});
		// Finalllllly we return the user to the browser
		return user;
	},
	async signin(parent, { email, password }, ctx, info) {
		// 1. check if there is a user with that email
		const user = await ctx.db.query.user({ where: { email } });
		if (!user) {
			throw new Error(`No such user found for email ${email}`);
		}
		// 2. Check if their password is correct
		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			throw new Error('Invalid Password!');
		}
		// 3. generate the JWT Token
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
		// 4. Set the cookie with the token
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365
		});
		// 5. Return the user
		console.log(token);
		return user;
	},
	signout(parent, args, ctx, info) {
		ctx.response.clearCookie('token');
		return { message: 'Goodbye!' };
	},
	async requestReset(parent, args, ctx, info) {
		// 1. Check if this is a real user
		const user = await ctx.db.query.user({ where: { email: args.email } });
		if (!user) {
			throw new Error(`No such user found for email ${args.email}`);
		}
		// 2. Set a reset token and expiry on that user
		const randomBytesPromiseified = promisify(randomBytes);
		const resetToken = (await randomBytesPromiseified(20)).toString('hex');
		const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
		const res = await ctx.db.mutation.updateUser({
			where: { email: args.email },
			data: { resetToken, resetTokenExpiry }
		});
		// 3. Email them that reset token
		const mailRes = await transport.sendMail({
			from: 'vs@gmail.com',
			to: user.email,
			subject: 'Your Password Reset Token',
			html: makeANiceEmail(`Your Password Reset Token is here!
      \n\n
      <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click Here to Reset</a>`)
		});

		// 4. Return the message
		return { message: 'Thanks!' };
	},
	async resetPassword(parent, args, ctx, info) {
		// 1. check if the passwords match
		if (args.password !== args.confirmPassword) {
			throw new Error("Yo Passwords don't match!");
		}
		// 2. check if its a legit reset token
		// 3. Check if its expired
		const [ user ] = await ctx.db.query.users({
			where: {
				resetToken: args.resetToken,
				resetTokenExpiry_gte: Date.now() - 3600000
			}
		});
		if (!user) {
			throw new Error('This token is either invalid or expired!');
		}
		// 4. Hash their new password
		const password = await bcrypt.hash(args.password, 10);
		// 5. Save the new password to the user and remove old resetToken fields
		const updatedUser = await ctx.db.mutation.updateUser({
			where: { email: user.email },
			data: {
				password,
				resetToken: null,
				resetTokenExpiry: null
			}
		});
		// 6. Generate JWT
		const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
		// 7. Set the JWT cookie
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365
		});
		// 8. return the new user
		return updatedUser;
	},
	async createPost(parent, args, ctx, info) {
		if (!ctx.request.userId) {
			throw new Error('You must be logged in to do that!');
		}
		const post = await ctx.db.mutation.createPost(
			{
				data: {
					// This is how to create a relationship between the post and the User
					user: {
						connect: {
							id: ctx.request.userId
						}
					},
					...args
				}
			},
			info
		);

		//console.log(post);

		return post;
	},
	updatePost(parent, args, ctx, info) {
		// first take a copy of the updates
		const updates = { ...args };
		// remove the ID from the updates
		delete updates.id;
		// run the update method
		return ctx.db.mutation.updatePost(
			{
				data: updates,
				where: {
					id: args.id
				}
			},
			info
		);
	},
	async deletePost(parent, args, ctx, info) {
		const where = { id: args.id };
		// 1. find the post
		const post = await ctx.db.query.post({ where }, `{ id title user { id }}`);
		// 2. Check if they own that post, or have the permissions
		const ownsPost = post.user.id === ctx.request.userId;
		const hasPermissions = ctx.request.user.permissions.some((permission) =>
			[ 'ADMIN', 'POSTDELETE' ].includes(permission)
		);
		if (!ownsPost && !hasPermissions) {
			throw new Error("You don't have permission to do that!");
		}

		// 3. Delete it!
		return ctx.db.mutation.deletePost({ where }, info);
	},
	async createLikes(parent, args, ctx, info) {
		//Check whether they are logged in
		if (!ctx.request.userId) {
			throw new Error('You must be logged in to do that!');
		}
		//Check the user already liked. if yes ->Throw error.
		const LikedBefore = await ctx.db.query.likeses({
			where: {
				post: {
					id: args.post
				},
				user: {
					id: ctx.request.userId
				}
			}
		});
		if (LikedBefore.length > 0) {
			throw new Error('You cannot like twice buddy!');
		}
		//Add Like
		const like = await ctx.db.mutation.createLikes({
			data: {
				user: {
					connect: {
						id: ctx.request.userId
					}
				},
				post: {
					connect: {
						id: args.post
					}
				}
			}
		});
		return like;
	}
};
module.exports = Mutations;
