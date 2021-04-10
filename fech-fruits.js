const getFruit = (fruit) => {
    switch(fruit) {
        case 'peach':
            return '🍑'
        case 'lemon':
            return '🍋'
        case 'mango':
            return '🥭'
        case 'banana':
            return '🍌'
        default:
            return 'dont got what ur looking for'
    }
} 
const fetchFruit = (param)=>{
    return Promise.resolve(param)
}
module.exports = {
    fetchFruit
}