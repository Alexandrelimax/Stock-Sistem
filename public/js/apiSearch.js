const sortByName = document.querySelector('#sortByName')
const sortByPrice = document.querySelector('#sortByPrice')
const sortByCategory = document.querySelector('#sortByCategory')
const sortByDate = document.querySelector('#sortByDate')
const tbody = document.querySelector('.table tbody');
const thead = document.querySelector('.table thead');
const inputSearch = document.querySelector('.search-input input')

sortByName.addEventListener('click', (event) => {
    event.preventDefault();

    fetch('http://localhost:3000/products/search/API', { method: 'GET' })
        .then(response => {
            if (!response.ok) throw new Error('Não foi possível trazer os dados');

            return response.json();
        })
        .then(data => {
            const object = data.sort((elementA, elementB) => {
                return elementA.name.localeCompare(elementB.name);
            });

            tbody.innerHTML = '';
            thead.innerHTML = '';
            reset_thead()
            object.forEach((element, index) => {
                insertContent(element, index);

            });
        })
        .catch(err => console.error('Error fetch' + err));
});


sortByPrice.addEventListener('click', (event) => {
    event.preventDefault();

    fetch('http://localhost:3000/products/search/API', { method: 'GET' })
        .then(response => {
            if (!response.ok) throw new Error('Não foi possível trazer os dados');

            return response.json();
        })
        .then(data => {
            const products = data.sort((elementA, elementB) => {
                return elementA.price - elementB.price;
            })
            tbody.innerHTML = '';
            thead.innerHTML = '';
            reset_thead();
            products.forEach((element, index) => {
                insertContent(element, index);
            });
        })
        .catch(err => console.error(err));
})


sortByCategory.addEventListener('click', (event) => {
    event.preventDefault();

    fetch('http://localhost:3000/products/search/API', { method: 'GET' })
        .then(response => {
            if (!response.ok) throw new Error('Não foi possível trazer os dados')

            return response.json();
        })
        .then(data => {
            const categories = new Map();

            data.forEach(item => {
                item.category.forEach(category => {
                    if (!categories.has(category)) {
                        categories.set(category, []);
                    }
                    categories.get(category).push({ ...item });
                });

            });
            tbody.innerHTML = '';
            thead.innerHTML = '';

            console.log(categories);
            theadCategory();
            let index = 1;
            for (const [category, list] of categories) {
                for (const item of list) {
                    const { name: product } = item;
                    categoriesList(category, product, index);
                    index++;
                }
            }
        })
        .catch(err => console.error(err));
})


sortByDate.addEventListener('click', (event) => {
    event.preventDefault();

    fetch('http://localhost:3000/products/search/API', { method: 'GET' })
        .then(response => {
            if (!response.ok) throw new Error('Não foi possível trazer os dados')

            return response.json();
        })
        .then(data => {
            const stack = [...data].reverse()

            tbody.innerHTML = '';
            thead.innerHTML = '';
            reset_thead();
            stack.forEach((element, index) => {
                insertContent(element, index);
            });
        })
        .catch(err => console.error(err));
})

inputSearch.addEventListener('input', (event) => {
    event.preventDefault();

    const queryInput = inputSearch.value

    fetch(`http://localhost:3000/products/search/input?search=${queryInput}`, { method: 'GET' })
        .then(response => {
            if (!response.ok) throw new Error('Nao foi possivel trazer os dados');

            return response.json();
        })
        .then(data => {
            tbody.innerHTML = '';
            thead.innerHTML = '';
            reset_thead();
            data.forEach((element, index) => {
                insertContent(element, index);
            })
        })
        .catch(err => console.error(err));
})

function theadCategory() {
    const row_thead = document.createElement('tr');
    row_thead.innerHTML = `
                            <th scope="col">#</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Produto</th>`

    thead.append(row_thead);
}


function reset_thead() {
    const row_thead = document.createElement('tr');
    row_thead.innerHTML = `
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Preco</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Fornecedor</th>
                            <th scope="col">Quantidade</th>`

    thead.append(row_thead);
}


function categoriesList(category, product, index) {
    console.log(product);
    const row_tbody = document.createElement('tr');
    row_tbody.innerHTML = ` <th>${index}</td>
                            <td>${category}</td>
                            <td>${product}</td>`
    tbody.append(row_tbody);


}


function insertContent(element, index) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <th scope="row">${index + 1}</th>
    <td>${element.name}</td>
    <td>R$ ${element.price}</td>
    <td>
        <select class="categorySelect">
        ${element.category.map(category => `<option>${category}</option>`).join('')}
    </select>
    </td>
    <td>
        <select class="categorySelect">
        ${element.supplier.map(supplier => `<option>${supplier}</option>`).join('')}
    </select>
    </td>
    <td>${element.quantity}</td>
    `;
    tbody.append(tr);
}