const { ObjectID } = require('mongodb');
const fs = require('fs');

const modelName = 'Products';

const productController = (repository) => {
  const addProduct = async (req, res) => {
    const productData = {
      ...req.body,
      images: req.files.map((el) => el.filename)
    };
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
    return repository.find({ modelName, options: {
      _id: req.params.id 
    }}).then((respons) => {
      if(respons[0].images && req.body.images && (respons[0].images.length !== req.body.images.length)) {
        for(let outerCounter = 0; outerCounter < respons[0].images.length; outerCounter++) {
          if(req.body.images.indexOf(respons[0].images[outerCounter]) === -1) {
            fs.unlink('uploads/' + respons[0].images[outerCounter], () => {});
          }
        }
      }
      const productData = {
        ...req.body,
        images: [
          ...(req.body.images || []),
          ...req.files.map((el) => el.filename)
        ]
      };
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
    })
  };

  const removeProduct = async (req, res) => {
    const productData = req.body;
    return repository.find({ modelName, options: {
      _id: req.params.id 
    }}).then((respons) => {
      console.log('Respons: ', respons)
      deleteFiles(respons[0].images, () => {
        return repository.remove({ modelName, record: {
          _id: req.params.id 
        }})
          .then((response) => {
            console.log('Response: ', response)
            if (response.ok !== 0 && response.deletedCount > 0) {
              res.status(200).send({
                deletedCount: response.deletedCount
              });
            } else {
              res.status(400).send(
                {
                  error: response
                }
              );
            }
          }).catch(error => console.log(error));
      });  
    })
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
    let query = { modelName };
    if(req.query.ids) {
      query.options = { 
        _id: {
          $in: JSON.parse(req.query.ids).map((id) => { return ObjectID(id); }) 
        }
      };
    }
    console.log('query: ', query);
    return repository.find(query)
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
    let query = { modelName, options: {
      category: req.params.category 
    }};
    if(req.query.sortBy) {
      switch(req.query.sortBy) {
        case 'promotions':
          query.options.promotion = true;
          break;
        case 'newProducts':
          query.options.newProduct = true;
          break;
      }
    }
    if(req.query.minPrice && req.query.maxPrice) {
      query.options.price = { $gte: +req.query.minPrice, $lte: +req.query.maxPrice };
    } else if(req.query.minPrice) {
      query.options.price = { $gte: +req.query.minPrice };
    } else if(req.query.maxPrice) {
      query.options.price = { $lte: +req.query.maxPrice };
    }
    return repository.find(query)
      .then((response) => {
        if (response.ok !== 0) {
          if(req.query.sortBy === 'priceDesc') {
            res.status(200).send(response.sort((a, b) => a.index - b.index).sort((a, b) => parseFloat(b.price) - parseFloat(a.price)));
          } else {
            res.status(200).send(response.sort((a, b) => a.index - b.index).sort((a, b) => parseFloat(a.price) - parseFloat(b.price)));
          }
        } else {
          res.status(400).send(
            {
              error: response
            }
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getProduct = async (req, res) => {
    if(req.query.url) {
      getProductByUrl(req, res);
    }
    if(req.query.id) {
      getProductById(req, res);
    }
  };

  const getProductByUrl = async (req, res) => {
    return repository.find({ modelName, options: {
      url: req.query.url 
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

  const getProductById = async (req, res) => {
    return repository.find({ modelName, options: {
      id: req.query.id
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

  const deleteFiles = (ids, cb) => {
    if(!ids.length) {
      cb();
      return;
    }
    for(let counter = 0; counter < ids.length; counter++) {
      if(counter === ids.length - 1) {
        fs.unlink('uploads/' + ids[counter], cb);
      } else {
        fs.unlink('uploads/' + ids[counter], () => {});
      }
    }
  }

  return {
    addProduct,
    editProduct,
    removeProduct,
    getProducts,
    getProductsByCategory,
    getProduct
  };
};

module.exports = productController;