const modelName = 'Dashboards';

const dashboardController = (repository) => {
  const getDashboardData = async (req, res) => {
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
    getDashboardData
  };
};

module.exports = dashboardController;