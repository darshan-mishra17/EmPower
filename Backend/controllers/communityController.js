const CommunityPost = require('../models/CommunityPost');

const createPost = async (req, res) => {
  const { content } = req.body;
  try {
    const post = new CommunityPost({
      authorId: req.user.id,
      role: req.user.role,
      content,
    });
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await CommunityPost.find().populate('authorId', 'name').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const addReply = async (req, res) => {
  const { content } = req.body;
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.replies.push({
      userId: req.user.id,
      content,
    });
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { createPost, getPosts, addReply };
