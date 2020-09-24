const modelName = 'Products';

const productController = (repository) => {
  const addProduct = async (req, res) => {
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

  const editProduct = async (req, res) => {
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

  const removeProduct = async (req, res) => {
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

  const getProducts = async (req, res) => {
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

  const getProductsByCategory = async (req, res) => {
    return repository.find({ modelName, options: {
      category: req.params.category 
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
    addProduct,
    editProduct,
    removeProduct,
    getProducts,
    getProductsByCategory
  };
};

module.exports = productController;