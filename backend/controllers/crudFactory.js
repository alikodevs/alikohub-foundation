function createCrudController(Model, options = {}) {
  const {
    order = [['createdAt', 'DESC']],
    createDefaults = null,
    searchable = [],
  } = options;

  const list = async (req, res) => {
    try {
      const where = { ...(req.listWhere || {}) };

      for (const key of searchable) {
        if (req.query[key]) where[key] = req.query[key];
      }

      const rows = await Model.findAll({ where, order });
      return res.json({ data: rows });
    } catch (err) {
      console.error(`${Model.name} list error:`, err.message);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  const getOne = async (req, res) => {
    try {
      const row = await Model.findByPk(req.params.id);
      if (!row) return res.status(404).json({ message: 'Not found' });
      return res.json({ data: row });
    } catch (err) {
      console.error(`${Model.name} get error:`, err.message);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  const create = async (req, res) => {
    try {
      const payload = {
        ...req.body,
        ...(createDefaults ? createDefaults(req) : {}),
      };
      const row = await Model.create(payload);
      return res.status(201).json({ data: row });
    } catch (err) {
      console.error(`${Model.name} create error:`, err.message);
      return res.status(500).json({ message: err.message || 'Server error' });
    }
  };

  const update = async (req, res) => {
    try {
      const row = await Model.findByPk(req.params.id);
      if (!row) return res.status(404).json({ message: 'Not found' });
      await row.update(req.body);
      return res.json({ data: row });
    } catch (err) {
      console.error(`${Model.name} update error:`, err.message);
      return res.status(500).json({ message: err.message || 'Server error' });
    }
  };

  const remove = async (req, res) => {
    try {
      const row = await Model.findByPk(req.params.id);
      if (!row) return res.status(404).json({ message: 'Not found' });
      await row.destroy();
      return res.json({ message: 'Deleted' });
    } catch (err) {
      console.error(`${Model.name} delete error:`, err.message);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  return { list, getOne, create, update, remove };
}

module.exports = { createCrudController };
