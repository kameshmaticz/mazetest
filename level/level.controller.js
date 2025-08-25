const Level = require("./level.model");
const { levelSchema } = require("./level.validation");

// Create Level
exports.createLevel = async (req, res) => {
  try {
    const { error } = levelSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ errors: error.details.map(e => e.message) });
    }

    const level = new Level(req.body);
    await level.save();
    res.status(201).json({ message: "Level created successfully", level });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Level by ID
exports.updateLevel = async (req, res) => {
  try {
    const { error } = levelSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ errors: error.details.map(e => e.message) });
    }

    const updatedLevel = await Level.findByIdAndUpdate(req.params.id , req.body, {
      new: true
    });

    if (!updatedLevel) {
      return res.status(404).json({ error: "Level not found" });
    }

    res.json({ message: "Level updated successfully", updatedLevel });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.updateLevel = async (req, res) => {
//   try {
//     const updateOps = {};

//     // ✅ Update whole arrays if provided
//     if (req.body.prefabs) {
//       updateOps["level.0.data.prefabs"] = req.body.prefabs;
//     }
//     if (req.body.tiles) {
//       updateOps["level.0.data.tiles"] = req.body.tiles;
//     }
//     if (req.body.patrolPoints) {
//       updateOps["level.0.data.patrolPoints"] = req.body.patrolPoints;
//     }

//     // ✅ Update playerSpawn.x / playerSpawn.y if provided
//     if (req.body.playerSpawn?.x !== undefined) {
//       updateOps["level.0.data.playerSpawn.x"] = req.body.playerSpawn.x;
//     }
//     if (req.body.playerSpawn?.y !== undefined) {
//       updateOps["level.0.data.playerSpawn.y"] = req.body.playerSpawn.y;
//     }

//     // ✅ Update a specific prefab by index
//     if (req.body.prefabIndex !== undefined && req.body.prefabData) {
//       updateOps[`level.0.data.prefabs.${req.body.prefabIndex}`] = req.body.prefabData;
//     }

//     // ✅ Update a specific tile by index
//     if (req.body.tileIndex !== undefined && req.body.tileData) {
//       updateOps[`level.0.data.tiles.${req.body.tileIndex}`] = req.body.tileData;
//     }

//     // ✅ Update a specific patrol point by index
//     if (req.body.patrolIndex !== undefined && req.body.patrolData) {
//       updateOps[`level.0.data.patrolPoints.${req.body.patrolIndex}`] = req.body.patrolData;
//     }

//     const updatedLevel = await Level.findByIdAndUpdate(
//       req.params.id,
//       { $set: updateOps },
//       { new: true, runValidators: true }
//     );

//     if (!updatedLevel) {
//       return res.status(404).json({ error: "Level not found" });
//     }

//     res.json({ message: "Level updated successfully", updatedLevel });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };



// Get level(s)
exports.getLevels = async (req, res) => {
    try {
      const { level } = req.query;
  
      let query = {};
      if (level) {
        query["level.level"] = Number(level); // Match nested "level" field inside array
      }
  
      const levels = await Level.find(query);
  
      if (!levels || levels.length === 0) {
        return res.status(404).json({ error: "No levels found" });
      }
  
      res.json(levels);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Get single level by ID
  exports.getLevelById = async (req, res) => {
    try {
      const level = await Level.findById(req.params.id);
  
      if (!level) {
        return res.status(404).json({ error: "Level not found" });
      }
  
      res.json(level);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  
