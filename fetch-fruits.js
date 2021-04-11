const fetchFruit = async(name,timeout) => {
    await new Promise(resolve => setTimeout(resolve, timeout)); //delay
    switch(name) {
        case 'peach':
            return '🍑'
        case 'lemon':
            return '🍋'
        case 'mango':
            return '🥭'
        case 'banana':
            return '🍌'
        default:
            return Promise.reject(new Error('dont got what u looking for'))
    }
  
}

module.exports = {
    fetchFruit
}