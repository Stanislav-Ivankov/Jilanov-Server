const modelName = 'FooterLinks';

const footerLinkController = (repository) => {
  const addFooterLink = async (req, res) => {
    const footerLinkData = req.body;
    return repository.create({ modelName, newObject: footerLinkData })
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

  const editFooterLink = async (req, res) => {
    const footerLinkData = req.body;
    return repository.update({ modelName, updatedRecord: footerLinkData })
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

  const removeFooterLink = async (req, res) => {
    const footerLinkData = req.body;
    return repository.remove({ modelName, record: footerLinkData })
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

  const getFooterLinks = async (req, res) => {
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

  return {
    addFooterLink,
    editFooterLink,
    removeFooterLink,
    getFooterLinks
  };
};

module.exports = footerLinkController;