const { isEmpty } = require('../Utilities');

function validateEmail(email) {
  const emailPattern =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (isEmpty(email)) {
    return {
      isInvalid: true,
      errorMessage: 'Please provide email address',
    };
  } else if (!emailPattern.test(email)) {
    return {
      isInvalid: true,
      errorMessage: 'Please provide valid email address',
    };
  } else {
    return {
      isInvalid: false,
      errorMessage: '',
    };
  }
}

function validatePassword(password) {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;

  if (isEmpty(password)) {
    return {
      isInvalid: true,
      errorMessage: 'Please provide a password',
    };
  } else if (!passwordPattern.test(password)) {
    return {
      isInvalid: true,
      errorMessage: 'Please provide valid password',
    };
  } else {
    return {
      isInvalid: false,
      errorMessage: '',
    };
  }
}

function validateStringField(fieldValue, fieldName) {
  if (isEmpty(fieldValue)) {
    return {
      isInValid: true,
      errorMessage: `${fieldName} is not provided`,
    };
  } else {
    return {
      isInValid: false,
      errorMessage: '',
    };
  }
}

function validatePrice(price) {
  const convertedPrice = +price;

  if (isEmpty(price)) {
    return {
      isInvalid: true,
      errorMessage: 'please provide a price',
    };
  } else if (convertedPrice <= 0) {
    return {
      isInvalid: true,
      errorMessage: 'Price should be greater than zero',
    };
  } else {
    return {
      isInvalid: false,
      errorMessage: '',
    };
  }
}

function validateQuantity(quantity) {
  const convertedQuantity = +quantity;

  if (quantity === '' || quantity === undefined || quantity === null) {
    return {
      isInvalid: true,
      errorMessage: 'quantity is not provided',
    };
  } else if (convertedQuantity <= 0) {
    return {
      isInvalid: true,
      errorMessage: 'quantity is less than 1',
    };
  } else if (convertedQuantity > 100000) {
    return {
      isInvalid: true,
      errorMessage: 'quantity is greater than 100000',
    };
  } else {
    return {
      isInvalid: false,
      errorMessage: '',
    };
  }
}

module.exports = {
  validateEmail,
  validatePassword,
  validateStringField,
  validatePrice,
  validateQuantity,
};
