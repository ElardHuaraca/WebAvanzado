module.exports.calculateAge = function age(date) {
    var today = new Date()
    var birthday = new Date(date)
    var edad = today.getFullYear() - birthday.getFullYear();
    var verify = today.getMonth() - birthday.getMonth();
    if (verify < 0 || (verify === 0 & today.getDate < birthday.getDate())) {
        edad--;
    }
    return edad;
}