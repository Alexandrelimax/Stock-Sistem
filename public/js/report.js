import { formatData } from "../../../utils/dateFormat.js";

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header-report');

    const date = formatData();

    const paragrafo = document.createElement('p')
    paragrafo.innerHTML = date;

    
    header.appendChild(paragrafo)
})








