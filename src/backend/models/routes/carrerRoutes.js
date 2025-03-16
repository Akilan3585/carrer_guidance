const express = require("express");
const router = express.Router();
const CareerPath = require("../models/CareerPath");
const Skill = require("../models/Skill");

// Get all career paths
router.get("/", async (req, res) => {
  try {
    const careers = await CareerPath.find().populate("skills");
    res.status(200).json(careers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch career paths" });
  }
});

// Get a specific career path by ID
router.get("/:id", async (req, res) => {
  try {
    const career = await CareerPath.findById(req.params.id).populate("skills");
    if (!career) return res.status(404).json({ message: "Career not found" });
    res.status(200).json(career);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving career path" });
  }
});

// Create a new career path
router.post("/", async (req, res) => {
  try {
    const { title, description, skills } = req.body;
    const newCareer = new CareerPath({ title, description, skills });
    await newCareer.save();
    res.status(201).json(newCareer);
  } catch (error) {
    res.status(500).json({ error: "Error creating career path" });
  }
});

// Get all skills
router.get("/skills/all", async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch skills" });
  }
});

// Add a new skill
router.post("/skills", async (req, res) => {
  try {
    const { name, difficulty } = req.body;
    const newSkill = new Skill({ name, difficulty });
    await newSkill.save();
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ error: "Error adding skill" });
  }
});

module.exports = router;
