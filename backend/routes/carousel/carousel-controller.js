const fs = require('fs');

const modelName = 'Slides';

const carouselController = (repository) => {
  const addSlide = async (req, res) => {
    console.log('Files: ', req.files);
    const slideData = {
      ...req.body,
      webImage: req.files['web'][0].filename,
      mobileImage: req.files['mobile'][0].filename
    };
    return repository.create({ modelName, newObject: slideData })
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

  const editSlide = async (req, res) => {
    let slideData = req.body;
    if(req.files && ((req.files['web'] && req.files['web'][0]) || (req.files['mobile'] && req.files['mobile'][0]))) {
      return repository.find({ modelName, options: {
        _id: slideData._id 
      }}).then((respons) => {
        if(req.files['web'] && req.files['web'][0]) {
          slideData = {
            ...slideData,
            webImage: req.files['web'][0].filename
          };
          deleteFile(respons[0].webImage, () => {});
        }
        if(req.files['mobile'] && req.files['mobile'][0]) {
          slideData = {
            ...slideData,
            mobileImage: req.files['mobile'][0].filename
          };
          deleteFile(respons[0].mobileImage, () => {});
        }
        updateSlide(req, res, slideData)
      });
    } else {
      updateSlide(req, res, slideData)
    }
  };

  const removeSlide = async (req, res) => {
    return repository.find({ modelName, options: {
      _id: req.params.id 
    }}).then((respons) => {
      console.log('res: ', respons);
      deleteFile(respons[0].webImage, () => {});
      deleteFile(respons[0].mobileImage, () => {});
      return repository.remove({ modelName, record: {
        _id: req.params.id 
      }})
        .then((response) => {
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
  };

  const getSlides = async (req, res) => {
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

  const updateSlide = (req, res, slideData) => {
    return repository.update({ modelName, updatedRecord: slideData })
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
  }

  const deleteFile = (id, cb) => {
    fs.unlink('uploads/' + id, cb)
  }

  return {
    addSlide,
    editSlide,
    removeSlide,
    getSlides
  };
};

module.exports = carouselController;
