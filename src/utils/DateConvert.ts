const monthMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

export function dateConvert (date: string | undefined) {

    if(!date) {
        return;
    }
    const dateArray: string[] = date.split('-');
    
    return `${monthMap[+dateArray[1] - 1]} ${dateArray[0]}`

}