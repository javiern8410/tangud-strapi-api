"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const comments = await strapi.services.comment.find(ctx.query);
    return comments.map((comment) => {
      delete comment.postId;
      const { id, content, createdAt, userId } = comment;
      return {
        id,
        createdAt,
        content,
        user: {
          id: userId.id,
          username: userId.username,
          firstName: userId.firstName,
          lastName: userId.lastName,
          avatar: userId.avatar,
        },
      };
    });
  },
};
