
export const isInputEmpty = (elements) => {

    for (let item in elements) {
        if (elements[item] == '') return true
    }
    
}

export const invalidName = (first_name, last_name) => {

    const nameRegex = /^[A-Za-z]+$/;

    if (!nameRegex.test(first_name) || !nameRegex.test(last_name)) {
        return true
    }
    return false;
}










