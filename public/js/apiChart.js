const barCtx = document.getElementById('barChart').getContext('2d');
const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
const container = document.querySelector('.container-canvas');
const warning = document.querySelector('.alert')
document.addEventListener('DOMContentLoaded', () => {

    fetch('http://localhost:3000/products/chart/API')
    .then(response =>{
        if(!response.ok) throw new Error('Não foi possivel trazer os dados')

        return response.json();
    })
    .then(products =>{
        if(products.length === 0){

            container.style.display = 'none'

            const notification = alertIsEmpty();
            warning.append(notification);
        }else{
            warning.style.display = 'none'
        }


        const labels = products.map(product => product.name);
        const quantity = products.map(product => product.quantity);
        const price = products.map(products => products.price)
        const cores = products.reduce((acc, item)=>{
            acc.push(geraCor());
            return acc;
        },[])
        
        
        // Gráfico Torta
        new Chart(barCtx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'quantidade',
                    data: quantity,
                    backgroundColor: cores,
                    borderWidth: 1.5
                }]
            },
            options: {
                scales: {
                    y: {beginAtZero: true}
                }
            }
        });
        
        // Gráfico de Rosquinha
        new Chart(doughnutCtx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: 'preço',
                    data: price,
                    backgroundColor: cores,
                    borderWidth: 1.5
                }]
            }
        });
    })
    .catch(err =>console.error(err))
})






function geraCor(){
    const red = Math.floor(Math.random() * 256)
    const blue = Math.floor(Math.random() * 256)
    const green = Math.floor(Math.random() * 256)

    const rgb = (`rgb(${red}, ${blue}, ${green})`)

    return rgb;
}


function alertIsEmpty(){
    const p = document.createElement('p');

    p.innerHTML = `Cadastre um produto, a lista está vazia!!!`

    return p;





}