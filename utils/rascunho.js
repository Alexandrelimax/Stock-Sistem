const links = document.querySelectorAll('.links')
const functions = [sortByName, sortByPrice, sortByCategory, sortByDate]
const tbody = document.querySelector('.table tbody');


links.forEach((link, index) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/products/search/API', { method: 'GET' })
            .then(response => {
                // if (!response.ok) throw new Error('Não foi possível trazer os dados');

                return response.json();
            })
            .then(data => {
                const products = functions[index](data);
                
                tbody.innerHTML = '';

                products.forEach((element, i) => {
                    insertContent(element, i)
                })
            })
            .catch(err => console.error(err))
    })
})

function sortByName(array) {

    const sortedElements = array.sort((elementA, elementB) => {
        return elementA.name.localeCompare(elementB.name)
    })
    return sortedElements;
}


function sortByPrice(array) {
    const sortedElements = array.sort((elementA, elementB) => {
        return elementA.name - elementB.name
    })
    return sortedElements;
}


function sortByCategory(array) {
    const sortedElements = array.sort((elementA, elementB) => {
        return elementA.name.localeCompare(elementB.name)
    })
    return sortedElements;
}


function sortByDate(array) {
    const sortedElements = array.sort((elementA, elementB) => {
        return elementA.name.localeCompare(elementB.name)
    })
    return sortedElements;
}
