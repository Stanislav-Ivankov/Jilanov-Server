const modelName = 'Messages';
const mailer = require('../../services/mailer')();

const messagesController = (repository) => {
  const addMessage = async (req, res) => {
    const messageData = req.body;
    return repository.create({ modelName, newObject: messageData })
      .then((response) => {
        if (response.ok !== 0) {
          res.status(200).send(response._doc);
          mailer.sendMessageMail(response._doc);
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

  const removeMessage = async (req, res) => {
    const messageData = req.body;
    return repository.remove({ modelName, record: messageData })
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

  const getMessages = async (req, res) => {
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
    addMessage,
    removeMessage,
    getMessages
  };
};

module.exports = messagesController;