export function formatData() {

    const date = new Date();
    const dateFormat = date.toLocaleString('pt-br', { dateStyle: 'full' })

    return dateFormat
}