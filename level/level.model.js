const mongoose = require("mongoose");

const levelSchema = new mongoose.Schema({
  level: [
    {
      level: { type: Number, required: true , unique : true },
      data: {
        width: { type: Number, required: true },
        height: { type: Number, required: true },

        // Tiles in the map
        tiles: [
          {
            position: {
              x: { type: Number, required: true },
              y: { type: Number, required: true }
            },
            tileIndex: { type: Number, required: true },
            tilemapType: { type: Number, required: true },
            rotation: { type: Number, required: true },
            flipX: { type: Boolean, required: true },
            flipY: { type: Boolean, required: true }
          }
        ],

        // Prefabs like enemies, obstacles, objects
        prefabs: [
          {
            position: {
              x: { type: Number, required: true },
              y: { type: Number, required: true }
            },
            prefabIndex: { type: Number, required: true },
            size: {
              x: { type: Number, required: true },
              y: { type: Number, required: true }
            },
            rotation: { type: Number, required: true }
          }
        ],

        // Patrol points for AI
        patrolPoints: [
          {
            x: { type: Number, required: true },
            y: { type: Number, required: true }
          }
        ],

        selectedBackgroundIndex: { type: Number, required: true },

        // Player spawn position
        playerSpawn: {
          x: { type: Number, required: true },
          y: { type: Number, required: true }
        }
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Level", levelSchema);
