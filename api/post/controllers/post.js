"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const getComments = async (postId) => {
  const comments = await strapi.services.comment.find({
    post_id: postId,
  });

  if (comments && comments.length > 0) {
    return comments.map((comment) => {
      const { id, content, createdAt, user_id } = comment;
      return {
        id,
        content,
        createdAt,
        user: {
          id: user_id.id,
          username: user_id.username,
          first_name: user_id.first_name,
          last_name: user_id.last_name,
          avatar: user_id.avatar,
        },
      };
    });
  }
  return [];
};

const getReactions = async (postId) => {
  const reactions = await strapi.services.reaction.find({
    post_id: postId,
  });

  if (reactions && reactions.length > 0) {
    return reactions.map((reaction) => {
      const { id, type, createdAt, user_id } = reaction;
      return {
        id,
        type,
        createdAt,
        user: {
          id: user_id.id,
          username: user_id.username,
          first_name: user_id.first_name,
          last_name: user_id.last_name,
        },
      };
    });
  }
  return [];
};

const postMapper = async (posts) => {
  if (posts && posts.length > 0) {
    return await Promise.all(
      posts.map(async (post) => {
        delete post.created_by;
        delete post.updated_by;
        const { user, ...restOfPost } = post;

        return {
          ...restOfPost,
          comments: await getComments(post.id),
          reactions: await getReactions(post.id),
          user: {
            id: user.id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            avatar: user.avatar,
          },
        };
      })
    );
  }
  return [];
};

module.exports = {
  async find(ctx) {
    const posts = await strapi.services.post.find(ctx.query);
    const mappedPost = await postMapper(posts);
    return mappedPost;
  },

  async findOne(ctx) {
    const post = await strapi.services.post.findOne({ id: ctx.params.id });
    const { user, created_by, updated_by, ...restOfPost } = post;

    return {
      ...restOfPost,
      comments: await getComments(post.id),
      reactions: await getReactions(post.id),
      user: {
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar: user.avatar,
      },
    };
  },
};
