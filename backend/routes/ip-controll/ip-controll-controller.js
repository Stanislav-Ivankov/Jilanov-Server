const modelName = 'WhitelistIPS';

const ipControllerController = (repository) => {
  const validateID = async (req, res) => {
    return repository.find({ modelName })
      .then((response) => {
        const ip = req.headers['x-forwarded-for'] || 
          req.connection.remoteAddress || 
          req.socket.remoteAddress ||
          (req.connection.socket ? req.connection.socket.remoteAddress : null);
        debugger;
        if ((response.ok !== 0) && response.filter((el) => el.ip.includes(ip))) {
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
    validateID
  };
};

module.exports = ipControllerController;