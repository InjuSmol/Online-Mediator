import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";

import {
  getMessages,
  getConversationsForSidebar,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

/*
 * Get only conversations belonging to
 * the logged-in user.
 */
router.get(
  "/conversations",
  protectRoute,
  getConversationsForSidebar
);

/*
 * Get messages from one conversation.
 */
router.get(
  "/:conversationId",
  protectRoute,
  getMessages
);

/*
 * Send a message to one conversation.
 */
router.post(
  "/send/:conversationId",
  protectRoute,
  sendMessage
);

export default router;
