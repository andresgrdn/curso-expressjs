const isValidEmail = (email) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
};

const isValidName = (name) => {
    return typeof name === "string" && name.length >= 3;
};

const isUniqueId = (id, users) => {
    return !users.some((user) => user.id === id);
};

const isNumericId = (id) => {
    return typeof id === "number";
};

const validateUniqueUser = (user, users) => {
    const { id } = user;
    const validation = validateUser(user, users);
    if (!validation.isValid) {
        return { isValid: false, error: validation.error };
    }
    if (!isUniqueId(id, users)) {
        return { isValid: false, error: "El id debe ser único." };
    }
    return { isValid: true };
};

const validateUser = (user) => {
    const { name, email, id } = user;
    if (!isValidName(name)) {
        return {
            isValid: false,
            error: "El nombre debe tener al menos 3 caracteres.",
        };
    }
    if (!isValidEmail(email)) {
        return {
            isValid: false,
            error: "El correo electrónico no es valido.",
        };
    }
    if (!isNumericId(id)) {
        return {
            isValid: false,
            error: "El id debe ser numérico.",
        };
    }
    return { isValid: true };
};

module.exports = {
    isUniqueId,
    isNumericId,
    isValidEmail,
    isValidName,
    validateUser,
    validateUniqueUser,
};
