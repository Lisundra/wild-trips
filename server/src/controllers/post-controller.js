const { Post } = require('../../db/models');

module.exports = {
  getAllPosts: async (_, res) => {
    try {
      const posts = await Post.findAll();
      res.json(posts);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },

  createPost: async (req, res) => {
    const { title, text } = req.body;
    try {
      const post = await Post.create({ title, text });
      res.json(post);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },

  deletePost: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Post.destroy({ where: { id } });

      if (result) {
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  },
};
