const parseDate = (dateString) => {
    const [day, monthName, year, time] = dateString.split(' ');

    const months = { January: 0, February: 1, March: 2, April: 3, May: 4, June: 5, July: 6, August: 7, September: 8, October: 9, November: 10, December: 11, }

    const [hours, minutes] = time.split(':');

    return new Date(
        parseInt(year),
        months[monthName],
        parseInt(day),
        parseInt(hours),
        parseInt(minutes));
}

const SortingUtil = {
    parseDate,
}

export default SortingUtil