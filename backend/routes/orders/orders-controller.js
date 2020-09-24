const modelName = 'Orders';
const mailer = require('../../services/mailer')();

const ordersController = (repository) => {
  const addOrder = async (req, res) => {
    const orderData = req.body;
    return repository.create({ modelName, newObject: orderData })
      .then((response) => {
        if (response.ok !== 0) {
          res.status(200).send(response._doc);
          mailer.sendOrderMail(response._doc);
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

  const removeOrder = async (req, res) => {
    const orderData = req.body;
    return repository.remove({ modelName, record: orderData })
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

  const getOrders = async (req, res) => {
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
    addOrder,
    removeOrder,
    getOrders
  };
};

module.exports = ordersController;