const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(model) {
    super(model);
  }

  //create new category
  async addCategory(req, res) {
    const { name } = req.body;
    console.log(name);
    try {
      const [category, created] = await this.model.findOrCreate({
        where: { name: name },
      });

      return res.json(category);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = CategoriesController;
