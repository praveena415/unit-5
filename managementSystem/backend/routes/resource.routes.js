import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { getResources, createResource, updateResource, deleteResource } from '../controllers/resource.controller.js';

const router = express.Router();

router.route('/')
  .get(protect, getResources)
  .post(protect, authorizeRoles('admin', 'moderator'), createResource);

router.route('/:id')
  .put(protect, authorizeRoles('admin', 'moderator'), updateResource)
  .delete(protect, authorizeRoles('admin'), deleteResource);

export default router;
