const Comment = require('../databases/comment');

module.exports = {
    addNewComment: async (commentData)=>{
        const commentRes = await Comment.create(commentData);
        return commentRes;
    },
    getAllComment: async ()=>{
        const comments =await Comment.find({}).exec();
        console.log("comment list: ", comments);
        return comments;
    }
}