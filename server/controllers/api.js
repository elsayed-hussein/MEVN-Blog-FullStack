module.exports = class API {
  // fetch all posts
  static async fetchAllPost(req, res) {
    res.send("Fetch All Posts..!");
  }
  // fetch post by id
  static async fetchPostByID(req, res) {
    res.send("Fetch Post By ID ..!");
  }
  // Create a Post
  static async createPost(req, res) {
    res.send("Create A Post ..!");
  }
  // Update a Post
  static async updatePost(req, res) {
    res.send("Update A Post ..!");
  }
  // Delete a Post
  static async deletePost(req, res) {
    res.send("Delete A Post ..!");
  }
};
