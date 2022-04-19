const Post = require("../models/posts");
const fs = require("fs");

module.exports = class API {
  // fetch all posts
  static async fetchAllPost(req, res) {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
    // res.send("Fetch All Posts..!");
  }
  // fetch post by id
  static async fetchPostByID(req, res) {
    const id = req.params.id;
    try {
      const post = await Post.findById(id);
      res.status(200).json(post);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
    // res.send("Fetch Post By ID ..!");
  }
  // Create a Post
  static async createPost(req, res) {
    const post = req.body;
    const imageName = req.file.filename;
    post.image = imageName;
    try {
      await Post.create(post);
      res.status(201).json({ message: "Post Created Successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
    // res.send("Create A Post ..!");
  }
  // Update a Post
  static async updatePost(req, res) {
    const id = req.params.id;
    let new_image = "";
    if (req.file) {
      new_image = req.file.filename;
      try {
        fs.unlinkSync("./uploads/" + req.body.old_image);
      } catch (err) {
        console.log(err);
      }
    } else {
      new_image = req.body.old_image;
    }
    const newPost = req.body;
    newPost.image = new_image;
    try {
      await Post.findByIdAndUpdate(id, newPost);
      res.status(210).json({ message: "Post Updated Successfully" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }

    // res.send("Update A Post ..!");
  }
  // Delete a Post
  static async deletePost(req, res) {
    try {
      const id = req.params.id;
      const result = await Post.findByIdAndDelete(id);
      if (result.image != "") {
        try {
          fs.unlinkSync("./uploads/" + result.image);
        } catch (err) {
          console.log(err);
        }
      }
      res.status(200).json({ message: "Post Deleted Successfully" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
    // res.send("Delete A Post ..!");
  }
};
