import Studio from "../models/Studio.js";

// Get all studios
export const getStudios = async (req, res) => {
  try {
    const studios = await Studio.findAll();
    res.json(studios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get studio by ID
export const getStudioById = async (req, res) => {
  try {
    const studio = await Studio.findByPk(req.params.id);
    if (!studio) return res.status(404).json({ message: "Studio not found" });
    res.json(studio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new studio
export const createStudio = async (req, res) => {
  try {
    const { studio_name, total_seats, rows, seats_per_row } = req.body;
    const studio = await Studio.create({ studio_name, total_seats, rows, seats_per_row });
    res.status(201).json({ message: "Studio created", studio_id: studio.studio_id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update studio
export const updateStudio = async (req, res) => {
  try {
    const { studio_name, total_seats, rows, seats_per_row } = req.body;
    const studio = await Studio.findByPk(req.params.id);
    if (!studio) return res.status(404).json({ message: "Studio not found" });
    await studio.update({ studio_name, total_seats, rows, seats_per_row });
    res.json({ message: "Studio updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete studio
export const deleteStudio = async (req, res) => {
  try {
    const studio = await Studio.findByPk(req.params.id);
    if (!studio) return res.status(404).json({ message: "Studio not found" });
    await studio.destroy();
    res.json({ message: "Studio deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};