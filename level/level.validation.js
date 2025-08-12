const Joi = require("joi");

const positionSchema = Joi.object({
  x: Joi.number().required(),
  y: Joi.number().required()
});

exports.levelSchema = Joi.object({
  level: Joi.array().items(
    Joi.object({
      level: Joi.number().required().messages({
        "any.required": "Level number is required"
      }),
      data: Joi.object({
        width: Joi.number().required(),
        height: Joi.number().required(),
        tiles: Joi.array().items(
          Joi.object({
            position: positionSchema,
            tileIndex: Joi.number().required(),
            tilemapType: Joi.number().required(),
            rotation: Joi.number().required(),
            flipX: Joi.boolean().required(),
            flipY: Joi.boolean().required()
          })
        ),
        prefabs: Joi.array().items(
          Joi.object({
            position: positionSchema,
            prefabIndex: Joi.number().required(),
            size: Joi.object({
              x: Joi.number().required(),
              y: Joi.number().required()
            }),
            rotation: Joi.number().required()
          })
        ),
        patrolPoints: Joi.array().items(positionSchema),
        selectedBackgroundIndex: Joi.number().required(),
        playerSpawn: positionSchema
      }).required()
    })
  ).required()
});
