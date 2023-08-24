const barCtx = document.getElementById('barChart').getContext('2d');
const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');


document.addEventListener('DOMContentLoaded', () => {

    fetch('http://localhost:3000/products/chart/API')
    .then(response =>{
        if(!response.ok) throw new Error('Não foi possivel trazer os dados')

        return response.json();
    })
    .then(products =>{
        
        const labels = products.map(product => product.name);
        const quantity = products.map(product => product.quantity);
        const price = products.map(products => products.price)
        
        
        // Gráfico Torta
        new Chart(barCtx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'quantidade',
                    data: quantity,
                    backgroundColor: returnColors(),
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
                    backgroundColor: returnColors(),
                    borderWidth: 1.5
                }]
            }
        });
    })
    .catch(err =>console.error(err))
})




function returnColors() {
    const colors = [
        'rgba(255, 99, 132, 0.8)', // Vermelho
        'rgba(54, 162, 235, 0.8)', // Azul
        'rgba(255, 206, 86, 0.8)', // Amarelo
        'rgba(75, 192, 192, 0.8)', // Verde
        'rgba(153, 102, 255, 0.8)', // Roxo
        'rgba(255, 159, 64, 0.8)' // Laranja
    ];
    return colors
}


