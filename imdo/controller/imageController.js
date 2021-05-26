const asyncErr = require('./../util/asyncErr');
const errHandler = require('./../util/errHandler');
const Image = require('./../models/Image');

/**
 *@GET Get all images
 */

exports.getAllImage = asyncErr(async (req, res, next) => {
  const images = await Image.find();
  res.status(200).json({
    success: true,
    user : req.user + " err",
    count: images.length,
    data: images,
  });
});

/**
 * @POST post a new image
 */

exports.createImage = asyncErr(async (req, res, next) => {
  const { image, details } = req.body;
  const newImage = await Image.create({ image, details });

  res.status(201).json({
    success: true,
    data: newImage,
  });
});

/**
 *@GET Get a image
 */

exports.getImage = asyncErr(async (req, res, next) => {
  const image = await Image.findById(req.params.id);

  if (!image) {
    return next(
      new errHandler(`Resorce can't find of this id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: image,
  });
});

/**
 *@PUT Update a image
 */

exports.updateImage = asyncErr(async (req, res, next) => {
  const updatedImage = await Image.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedImage) {
    return next(
      new errHandler(`Resorce can't find of this id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: updatedImage,
  });
});

/**
 *@DELETE Delete a image
 */

exports.deleteImage = asyncErr(async (req, res, next) => {
  const deletedImage = await Image.findByIdAndDelete(req.params.id);

  if (!deletedImage) {
    return next(
      new errHandler(`Resorce can't find of this id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: [],
  });
});
