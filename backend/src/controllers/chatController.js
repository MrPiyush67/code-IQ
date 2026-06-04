import { chatClient } from "../lib/Stream.js";

export const getStreamToken = async (req, res) => {
  try {
    //user clerkId from stream ( not mongodb _id ) , because in stream it clerkId
    const token = chatClient.createToken(req.user.clerkId);

    res.status(200).json({
      token,
      userId: req.user.cherkId,
      userName: req.user.name,
      userImage: req.user.image,
    });
  } catch (error) {
    console.error('error in getStreamToken controller:', error.message);
    res.status(500).json({ message: 'internal server error' });
  }
};
