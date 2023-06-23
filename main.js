/*
 * Your program must print string with the number of years and months and the total number of days between the dates.
 * Dates are provided in dd.mm.yyyy format.
 * You are not allowed to plug in JS libraries such as moment.js or date-fns directly into the code. All code need to be written in this file.
 * 
 * Result must be shown as a string in years, months and total days. If years or months are 0, then it should not be displayed in the output.
 *
 * Example:
 * Input: ['01.01.2000', '01.01.2016']
 * Output:
 * '16 years, total 5844 days'
 *
 * Example 2:
 * Input: ['01.11.2015', '01.02.2017']
 *
 * Output:
 * '1 year, 3 months, total 458 days'
*/
const dates = [
	['01.01.2000', '01.01.2016'],
	['01.01.2016', '01.08.2016'],
	['01.11.2015', '01.02.2017'],
	['17.12.2016', '16.01.2017'],
	['01.01.2016', '01.01.2016'],
	['28.02.2015', '13.04.2018'],
	['28.01.2015', '28.02.2015'],
	['17.03.2022', '17.03.2023'],
	['17.02.2024', '17.02.2025'],
];

// Receive string of dates one after each other
function outputDate(dates) {
	const stringOfDates = []
	dates.forEach(date => {
		const [firstDate, secondDate] = date

		const TOTAL_MILISECONDS_IN_DAY = 86400000

		const pluralise = (string, value) => {
			if (value > 1) string += "s"

			return string
		}

		const isAfter = (first, last) => {
			const diff = last.getTime() - first.getTime()

			if (diff < 0) {
				return -1
			} else if (diff > 0) {
				return 1
			} else {
				return diff
			}
		}

		const takeDayMonthYear = (date) => {

			let [day, month, year] = date.split(".")

			year = parseInt(year)
			month = parseInt(month)
			day = parseInt(day)

			return new Date(year, month, day)
		}

		const getDifferencesBetweenTwoYears = (start, end) => {
			const startDate = new Date(start)
			const endDate = new Date(end)

			const difference = endDate.getFullYear() - startDate.getFullYear()
			endDate.setFullYear(endDate.getFullYear() - difference)

			const lastYearNotFull = isAfter(startDate, endDate) === -1
			const result = difference - lastYearNotFull

			return result
		}
		const getDifferencesBetweenTwoMonths = (start, end) => {
			const startDate = new Date(start)
			const endDate = new Date(end)

			const differenceInYears = endDate.getFullYear() - startDate.getFullYear()
			const differenceInMonths = endDate.getMonth() - startDate.getMonth()

			const difference = differenceInYears * 12 + differenceInMonths

			endDate.setMonth(endDate.getMonth() - difference)

			const lastMonthNotFull = isAfter(startDate, endDate) === -1
			const result = difference - lastMonthNotFull

			return result % 12
		}

		const startDate = takeDayMonthYear(firstDate)
		const endDate = takeDayMonthYear(secondDate)


		let resultDateString = ""

		const yearDiff = getDifferencesBetweenTwoYears(startDate, endDate)

		if (yearDiff > 0) {
			resultDateString += `${yearDiff} ${pluralise("year", yearDiff)}, `
		}

		const monthDiff = getDifferencesBetweenTwoMonths(startDate, endDate)

		if (monthDiff > 0) {
			resultDateString += `${monthDiff} ${pluralise("month", monthDiff)}, `
		}

		const differenceBetweenTwoDays = Math.round((endDate.getTime() - startDate.getTime()) / TOTAL_MILISECONDS_IN_DAY)

		resultDateString += `total ${differenceBetweenTwoDays} days`

		stringOfDates.push(resultDateString)


	});
	return stringOfDates;
}

console.log(outputDate(dates))
