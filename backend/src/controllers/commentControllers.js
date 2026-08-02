import Comment from "../models/comment.js"

export const addComment = async (req, res) => {
    try {
        const { content } = req.body;
        const { videoId } = req.params;

        if (!content) {
            return res.status(400).json({
                message: "comment cannot be empty"
            });
        }

        const newComment = await Comment.create({
            content,
            video: videoId,
            owner: req.user.id,
        });

        const populatedComment = await Comment.findById(newComment._id)
            .populate("owner", "username avatar");

        return res.status(201).json({
            message: "comment added successfully",
            comment: populatedComment
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "failed to add the comment"
        });
    }
};

export const getVideoComments = async (req,res)=>{

   try{
    const {videoId} = req.params;

    const comments = await Comment.find({
        video: videoId
    }).populate("owner", "username avatar")
        .sort({ createdAt: -1 });

        return res.status(200).json({
            comments
        })
    }

    catch(error){
        console.log(error);

        return res.status(500).json({
            message : "failed to fetch the comments"
        })
    }
}

export const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({
                message: "comment cannot be empty"
            });
        }

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                message: "comment not found"
            });
        }

        if (comment.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You cannot update this comment"
            });
        }

        comment.content = content;

        await comment.save();

        const updatedComment = await Comment.findById(comment._id)
            .populate("owner", "username avatar");

        return res.status(200).json({
            message: "Successfully updated the comment",
            comment: updatedComment
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to update the comment"
        });
    }
};
export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                message: "Cannot find the comment"
            });
        }

        if (comment.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You cannot delete this comment"
            });
        }

        await Comment.findByIdAndDelete(commentId);

        return res.status(200).json({
            message: "Successfully deleted the comment"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to delete the comment"
        });
    }
};