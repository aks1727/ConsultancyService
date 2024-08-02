import {parse} from 'date-fns'
const parseDateToUTC = (dateString, formatString= 'dd/MM/yyyy') => {
    const parsedDate = parse(dateString, formatString, new Date());
    return new Date(Date.UTC(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate()));
};

export default parseDateToUTC;