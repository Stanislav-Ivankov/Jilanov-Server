const modelName = 'Filters';

const filtersController = (repository) => {
  const addFilter = async (req, res) => {
    const productData = req.body;
    return repository.create({ modelName, newObject: productData })
      .then((response) => {
        if (response.ok !== 0) {
          res.status(200).send(response._doc);
        } else {
          res.status(400).send(
            {
              error: response
            }
          );
        }
      })
      .catch(error => console.log(error));
  };

  const editFilter = async (req, res) => {
    const productData = req.body;
    return repository.update({ modelName, updatedRecord: productData })
      .then((response) => {
        if (response.ok !== 0) {
          res.status(200).send(response._doc);
        } else {
          res.status(400).send(
            {
              error: response
            }
          );
        }
      })
      .catch(error => console.log(error));
  };

  const removeFilter = async (req, res) => {
    const productData = req.body;
    return repository.remove({ modelName, record: productData })
      .then((response) => {
        if (response.ok !== 0) {
          res.status(200).send(response._doc);
        } else {
          res.status(400).send(
            {
              error: response
            }
          );
        }
      }).catch(error => console.log(error));
  };

  const getFilters = async (req, res) => {
    return repository.find({ modelName })
      .then((response) => {
        if (response.ok !== 0) {
          res.status(200).send(response);
        } else {
          res.status(400).send(
            {
              error: response
            }
          );
        }
      })
      .catch(error => console.log(error));
  };

  const getFiltersByCategory = async (req, res) => {
    return repository.find({ modelName, options: {
      categoryList: req.params.category
    }})
      .then((response) => {
        if (response.ok !== 0) {
          res.status(200).send(response);
        } else {
          res.status(400).send(
            {
              error: response
            }
          );
        }
      })
      .catch(error => console.log(error));
  };

  return {
    addFilter,
    editFilter,
    removeFilter,
    getFilters,
    getFiltersByCategory
  };
};

module.exports = filtersController;