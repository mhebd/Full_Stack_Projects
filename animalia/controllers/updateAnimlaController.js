const asyncErr = require('./../util/asyncErr');
const errHandler = require('./../util/errHandler');
const Animal = require('./../models/Animal');

/**
 * @GET Render update animal page
 */
exports.renderUpdateAnimal = asyncErr(async (req, res, next) => {
  const id = req.params.id;
  const animal = await Animal.findById(id);
  res.render('updateAnimal', { user: req.user, animal: animal });
});

/**
 * @POST Update a animal
 */
exports.updateAnimal = asyncErr(async (req, res, next) => {
  const id = req.params.id;
  const animal = await Animal.findById(id);

  const name = req.body.name;
  const scientific_name = req.body.s_name;
  const max_height = req.body.max_height;
  const max_height_unit = req.body.max_height_unit;
  const min_height = req.body.min_height;
  const min_height_unit = req.body.min_height_unit;
  const max_length = req.body.max_length;
  const max_length_unit = req.body.max_length_unit;
  const min_length = req.body.min_length;
  const min_length_unit = req.body.max_length_unit;
  const max_weight = req.body.max_weight;
  const max_weight_unit = req.body.max_weight_unit;
  const min_weight = req.body.min_weight;
  const min_weight_unit = req.body.max_weight_unit;
  const max_age = req.body.max_age;
  const max_age_unit = req.body.max_age_unit;
  const category = req.body.type;
  const living_area = req.body.living_area;
  const details = req.body.details;

  let cover_image = animal.cover_image;
  if (req.files.cover_image) {
    cover_image = req.files.cover_image[0].filename;
  }

  let images = animal.images;
  if (req.files.images) {
    req.files.images.forEach((image) => {
      images.push(image.filename);
    });
  }

  const user_id = animal.user_id;

  const updateAnimal = await Animal.findByIdAndUpdate(
    id,
    {
      name,
      scientific_name,
      max_height,
      max_height_unit,
      min_height,
      min_height_unit,
      max_length,
      max_length_unit,
      min_length,
      min_length_unit,
      max_weight,
      max_weight_unit,
      min_weight,
      min_weight_unit,
      max_age,
      max_age_unit,
      category,
      living_area,
      cover_image,
      images,
      details,
      user_id,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.redirect('/animals');
});
