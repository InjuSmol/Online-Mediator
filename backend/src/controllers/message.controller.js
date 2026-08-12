import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

import {
  getReceiverSocketId,
  io,
} from "../lib/socket.js";

/*
 * GET SIDEBAR CONVERSATIONS
 */
export const getConversationsForSidebar = async (
  req,
  res
) => {
  try {
    const loggedInUserId = req.user._id;

    const conversations =
      await Conversation.find({
        participants: loggedInUserId,
      })
        .populate({
          path: "participants",
          select:
            "_id fullName email phone profilePic",
        })
        .sort({
          updatedAt: -1,
        });

    const result = conversations.map(
      (conversation) => {
        const otherUser =
          conversation.participants.find(
            (participant) =>
              participant._id.toString() !==
              loggedInUserId.toString()
          );

        return {
          _id: conversation._id,

          status: conversation.status,

          createdBy: conversation.createdBy,

          createdAt: conversation.createdAt,
          updatedAt: conversation.updatedAt,

          user: otherUser,
        };
      }
    );

    res.status(200).json(result);
  } catch (error) {
    console.error(
      "Error in getConversationsForSidebar:",
      error.message
    );

    res.status(500).json({
      error: "Internal server error",
    });
  }
};

/*
 * GET MESSAGES FROM ONE CONVERSATION
 */
export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const myId = req.user._id;

    const conversation =
      await Conversation.findOne({
        _id: conversationId,
        participants: myId,
      });

    if (!conversation) {
      return res.status(403).json({
        message:
          "You do not have access to this conversation",
      });
    }

    const messages = await Message.find({
      conversationId: conversation._id,
    }).sort({
      createdAt: 1,
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log(
      "Error in getMessages controller:",
      error.message
    );

    res.status(500).json({
      error: "Internal server error",
    });
  }
};

/*
 * SEND MESSAGE
 */
export const sendMessage = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const { text, image } = req.body;

    const senderId = req.user._id;

    if (!text && !image) {
      return res.status(400).json({
        message: "Message cannot be empty",
      });
    }

    const conversation =
      await Conversation.findOne({
        _id: conversationId,
        participants: senderId,
      });

    if (!conversation) {
      return res.status(403).json({
        message:
          "You do not have access to this conversation",
      });
    }

    if (conversation.status !== "active") {
      return res.status(403).json({
        message:
          "This conversation is no longer active",
      });
    }

    const receiverId =
      conversation.participants.find(
        (participantId) =>
          participantId.toString() !==
          senderId.toString()
      );

    if (!receiverId) {
      return res.status(400).json({
        message:
          "Conversation does not have a valid receiver",
      });
    }

    let imageUrl = "";

    const newMessage = new Message({
      conversationId: conversation._id,

      senderId,
      receiverId,

      text,
      image: imageUrl,
    });

    await newMessage.save();

    conversation.updatedAt = new Date();
    await conversation.save();

    const receiverSocketId =
      getReceiverSocketId(
        receiverId.toString()
      );

    if (receiverSocketId) {
      io.to(receiverSocketId).emit(
        "newMessage",
        newMessage
      );
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(
      "Error in sendMessage controller:",
      error.message
    );

    res.status(500).json({
      error: "Internal server error",
    });
  }
};
