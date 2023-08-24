
export const isInputEmpty = (elements, err) => {

    for (let item in elements) {
        if (elements[item] === ''){
            err.push('Os campos não podem estar vazios!')
            break
        }
    }
}

export const validName = (element, err) => {
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(element.nome) || !nameRegex.test(element.sobrenome)) {
        err.push('Os campos de nome e sobrenome devem conter apenas letras maiúsculas e minúsculas!');
    }
}








    

