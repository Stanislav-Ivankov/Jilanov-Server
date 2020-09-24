const modelName = 'SubCategories';

const subCategoriesController = (repository) => {
  const addSubCategory = async (req, res) => {
    const categoryData = req.body;
    return repository.create({ modelName, newObject: categoryData })
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

  const editSubCategory = async (req, res) => {
    const categoryData = req.body;
    return repository.update({ modelName, updatedRecord: categoryData })
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

  const removeSubCategory = async (req, res) => {
    const categoryData = req.body;
    return repository.remove({ modelName, record: {
      _id: req.params.id 
    }})
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

  const getSubCategories = async (req, res) => {
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

  const getSubCategoriesByCategory = async (req, res) => {
    return repository.find({ modelName, options: {
      category: req.query.category
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
    addSubCategory,
    editSubCategory,
    removeSubCategory,
    getSubCategories,
    getSubCategoriesByCategory
  };
};

module.exports = subCategoriesController;