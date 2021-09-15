module.exports = app => {
  function existsOrError(value, msg) {
    if (!value) throw msg;
    if (Array.isArray(value) && value.length === 0) throw msg;
    if (typeof value === 'string' && !value.trim()) throw msg;
  }
  
  function notExistsOrError(value, msg) {
    try {
      existsOrError(value, msg)
    } catch(msg) {
      return;
    }
    throw msg;
  }
  
  function equalsOrError(valueA, valueB, msg) {
    if (valueA !== valueB) throw msg;
  }

  function ageVerification(value, msg) {
    if (!value || value < 18) throw msg;
    if (typeof value === 'int' && !value.trim()) throw msg;
  }

  function strongPassword(value, msg) {
    if (!value) throw msg;
    if (Array.isArray(value) && value.length === 0) throw msg;
    if (typeof value === 'string' && !value.trim()) throw msg;
    if (value.length < 6) throw msg;
  }

  return {
    existsOrError,
    notExistsOrError,
    ageVerification,
    strongPassword,
    equalsOrError,
  }
}
