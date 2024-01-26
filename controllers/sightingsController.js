const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, commentModel, categoryModel) {
    super(model);
    this.commentModel = commentModel;
    this.categoryModel = categoryModel;
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId, {
        include: this.categoryModel,
      });
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //create new sighting
  async add(req, res) {
    const { date, location, notes, selectedCategoryIds } = req.body;
    console.log(`category`, selectedCategoryIds);
    console.log(`id`, selectedCategoryIds);
    try {
      const newSighting = await this.model.create({
        date: new Date(date),
        location: location,
        notes: notes,
      });
      //retrieve selected categories
      if (selectedCategoryIds) {
        const selectedCategories = await this.categoryModel.findAll({
          where: {
            id: selectedCategoryIds,
          },
        });
        //associated new sighting with selected categories
        await newSighting.setCategories(selectedCategories);
      }

      return res.json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //retrieve all comments for specific sighting
  async getComment(req, res) {
    const { sightingId } = req.params;
    console.log(sightingId);
    try {
      const comments = await this.commentModel.findAll({
        where: {
          sightingId: Number(sightingId),
        },
      });
      return res.json(comments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //create comment for specific sighting
  async addComment(req, res) {
    const { sightingId } = req.params;
    const { content } = req.body;
    console.log(sightingId);
    console.log(content);

    try {
      const newComment = await this.commentModel.create({
        content: content,
        sightingId: sightingId,
      });

      return res.json(newComment);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
