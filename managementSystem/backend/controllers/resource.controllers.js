import Resource from '../models/resource.model.js';

export const getResources = async (req, res) => {
  const resources = await Resource.find();
  res.json(resources);
};

export const createResource = async (req, res) => {
  const resource = await Resource.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json(resource);
};

export const updateResource = async (req, res) => {
  const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(resource);
};

export const deleteResource = async (req, res) => {
  await Resource.findByIdAndDelete(req.params.id);
  res.json({ message: 'Resource deleted' });
};
