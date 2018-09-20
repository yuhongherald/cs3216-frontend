class Helpers {

    static dateConvert(str) {
        return str.substring(0, 16).replace("T", " ");
    }


    static isPast(d1) {
        let today = new Date();
        return d1.getTime() >= today.getTime();
    }

    static isToday(d1) {
        let today = new Date();
        return d1.toJSON().slice(0, 10) === today.toJSON().slice(0, 10);
    }

    static isInWeek(d) {
        let daysInWeek = [];
        let today = new Date();
        for (let i = 0; i < 7; i++) {
            let newDay = new Date(today.setDate(today.getDate() - 1));
            daysInWeek.push(newDay.toJSON().slice(0, 10));
            if (newDay.getDay() === 1) {
                break;
            }
        }

        for (let i = 0; i < 7; i++) {
            let newDay = new Date(today.setDate(today.getDate() + 1));

            daysInWeek.push(newDay.toJSON().slice(0, 10));
            if (newDay.getDay() === 0) {
                break;
            }
        }

        return daysInWeek.includes(d.toJSON().slice(0, 10))
    }

    static isInMonth(d) {
        let today = new Date();
        return d.getMonth() === today.getMonth()
    }

}

export default Helpers;