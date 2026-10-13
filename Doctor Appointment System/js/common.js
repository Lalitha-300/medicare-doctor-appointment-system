// ====================================
// GET APPOINTMENTS FROM LOCAL STORAGE
// ====================================

function getAppointments() {

    const appointments =
        localStorage.getItem("appointments");


    if (appointments) {

        return JSON.parse(appointments);

    }


    return [];

}



// ====================================
// SAVE APPOINTMENTS
// ====================================

function saveAppointments(appointments) {

    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );

}



// ====================================
// CREATE APPOINTMENT ID
// ====================================

function generateAppointmentId() {

    return "APT" +
        Date.now();

}