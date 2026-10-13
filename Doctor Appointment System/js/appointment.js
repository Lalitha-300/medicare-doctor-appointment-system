// ========================================
// APPOINTMENT PAGE
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const doctorSelect =
            document.getElementById("doctor");

        const appointmentForm =
            document.getElementById("appointmentForm");

        const dateInput =
            document.getElementById("appointmentDate");


        // ========================================
        // LOAD DOCTORS INTO DROPDOWN
        // ========================================

        doctors.forEach(function (doctor) {

            const option =
                document.createElement("option");

            option.value = doctor.id;

            option.textContent =
                doctor.name +
                " - " +
                doctor.specialization +
                " - ₹" +
                doctor.fee;


            doctorSelect.appendChild(option);

        });


        // ========================================
        // SELECT DOCTOR FROM DOCTORS PAGE
        // ========================================

        const selectedDoctor =
            localStorage.getItem("selectedDoctor");


        if (selectedDoctor) {

            doctorSelect.value =
                selectedDoctor;

        }


        // ========================================
        // SET MINIMUM DATE
        // ========================================

        const today =
            new Date().toISOString().split("T")[0];


        dateInput.min = today;


        // ========================================
        // FORM SUBMISSION
        // ========================================

        appointmentForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                bookAppointment();

            }
        );

    }
);



// ========================================
// BOOK APPOINTMENT FUNCTION
// ========================================

function bookAppointment() {


    // ========================================
    // GET FORM VALUES
    // ========================================

    const doctorId =
        document.getElementById("doctor").value;

    const patientName =
        document.getElementById("patientName").value.trim();

    const age =
        document.getElementById("age").value;

    const gender =
        document.getElementById("gender").value;

    const phone =
        document.getElementById("phone").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const date =
        document.getElementById("appointmentDate").value;

    const time =
        document.getElementById("appointmentTime").value;

    const reason =
        document.getElementById("reason").value.trim();



    // ========================================
    // BASIC VALIDATION
    // ========================================

    if (
        !doctorId ||
        !patientName ||
        !age ||
        !gender ||
        !phone ||
        !date ||
        !time ||
        !reason
    ) {

        showError(
            "Please fill in all required fields."
        );

        return;
    }



    // ========================================
    // PATIENT NAME VALIDATION
    // ========================================

    const namePattern =
        /^[A-Za-z\s.]+$/;


    if (!namePattern.test(patientName)) {

        showError(
            "Please enter a valid patient name."
        );

        return;
    }



    // ========================================
    // PHONE VALIDATION
    // ========================================

    const phonePattern =
        /^[0-9]{10}$/;


    if (!phonePattern.test(phone)) {

        showError(
            "Please enter a valid 10-digit phone number."
        );

        return;
    }



    // ========================================
    // AGE VALIDATION
    // ========================================

    const numericAge =
        Number(age);


    if (
        numericAge < 1 ||
        numericAge > 120
    ) {

        showError(
            "Age must be between 1 and 120."
        );

        return;
    }



    // ========================================
    // DATE VALIDATION
    // ========================================

    const today =
        new Date().toISOString().split("T")[0];


    if (date < today) {

        showError(
            "Please select today or a future date."
        );

        return;
    }



    // ========================================
    // FIND SELECTED DOCTOR
    // ========================================

    const doctor =
        doctors.find(function (doctor) {

            return doctor.id ==
                Number(doctorId);

        });


    if (!doctor) {

        showError(
            "Please select a valid doctor."
        );

        return;
    }



    // ========================================
    // GET EXISTING APPOINTMENTS
    // ========================================

    const appointments =
        getAppointments();



    // ========================================
    // CHECK DUPLICATE TIME SLOT
    // ========================================

    const alreadyBooked =
        appointments.some(function (appointment) {

            return (
                appointment.doctorId ==
                    Number(doctorId)

                &&

                appointment.date === date

                &&

                appointment.time === time

                &&

                appointment.status === "Confirmed"
            );

        });


    if (alreadyBooked) {

        showError(
            "This time slot is already booked. Please select another time."
        );

        return;
    }



    // ========================================
    // CREATE APPOINTMENT OBJECT
    // ========================================

    const appointment = {

        id: generateAppointmentId(),

        doctorId: doctor.id,

        doctorName: doctor.name,

        specialization:
            doctor.specialization,

        fee: doctor.fee,

        patientName: patientName,

        age: numericAge,

        gender: gender,

        phone: phone,

        email: email,

        date: date,

        time: time,

        reason: reason,

        status: "Confirmed"

    };



    // ========================================
    // ADD APPOINTMENT
    // ========================================

    appointments.push(appointment);



    // ========================================
    // SAVE TO LOCAL STORAGE
    // ========================================

    saveAppointments(appointments);



    // ========================================
    // REMOVE SELECTED DOCTOR
    // ========================================

    localStorage.removeItem(
        "selectedDoctor"
    );



    // ========================================
    // SHOW SUCCESS MESSAGE
    // ========================================

    showSuccess(
        "Appointment booked successfully! Redirecting..."
    );



    // ========================================
    // REDIRECT
    // ========================================

    setTimeout(
        function () {

            window.location.href =
                "appointments.html";

        },
        1500
    );

}



// ========================================
// SHOW ERROR MESSAGE
// ========================================

function showError(message) {

    const formMessage =
        document.getElementById("formMessage");


    formMessage.innerText =
        message;


    formMessage.className =
        "form-message error-message";


    formMessage.style.display =
        "block";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



// ========================================
// SHOW SUCCESS MESSAGE
// ========================================

function showSuccess(message) {

    const formMessage =
        document.getElementById("formMessage");


    formMessage.innerText =
        message;


    formMessage.className =
        "form-message success-message";


    formMessage.style.display =
        "block";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}