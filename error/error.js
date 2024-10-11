const ERROR_CODES = {
    GETALL_TASKS_ZERO: {
        name: "GETALL_TASKS_ZERO",
        message: "THERE ARE NO TASKS AVAILABE",
        status: 400
    },
    GET_TASKS_ZERO_ID: {
        name: "GET_TASKS_ZERO_ID",
        message: "There are no task for this id",
        status: 400
    }
  };


const errorBuilder = (erro) => {
    const err = new Error();
    const matchedError = ERROR_CODES[erro];
    if (matchedError) {
      err.name = ERROR_CODES[erro].name;
      err.message = ERROR_CODES[erro].message;
      err.status = ERROR_CODES[erro].status;
    } else {
      err.status = 500;
      err.name = erro
      err.message = erro;
    }
    return err;
  };

  const joiValidationError = (error)=>{
        const err = new Error();
        err.status = 400;
        err.message = error
        return err
  }

module.exports = {errorBuilder, joiValidationError}