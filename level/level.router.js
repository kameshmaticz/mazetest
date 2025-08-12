const express = require("express");
const router = express.Router();
const { createLevel, updateLevel, getLevels, getLevelById } = require("./level.controller");

/**
 * @route POST /api/levels
 * @desc Create a new level
 * @body {
 *   level: [
 *     {
 *       level: Number,  // Required - Level number
 *       data: {
 *         width: Number,  // Required - Level width
 *         height: Number, // Required - Level height
 *         tiles: [ { position: {x, y}, tileIndex, tilemapType, rotation, flipX, flipY } ],
 *         prefabs: [ { position: {x, y}, prefabIndex, size: {x, y}, rotation } ],
 *         patrolPoints: [ {x, y} ],
 *         selectedBackgroundIndex: Number, // Required
 *         playerSpawn: { x, y } // Required
 *       }
 *     }
 *   ]
 * }
 */
router.post("/", createLevel);

/**
 * @route PUT /api/levels/:id
 * @desc Update an existing level
 * @body same as POST /api/levels
 */
router.put("/:id", updateLevel);


/**
 * @route GET /api/levels
 * @desc Get all levels or filter by ?level=number
 */
router.get("/", getLevels);

/**
 * @route GET /api/levels/:id
 * @desc Get level by MongoDB ID
 */
router.get("/:id", getLevelById);


module.exports = router;
