// ========================================
// MY APPOINTMENTS PAGE
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayAppointments();

    }
);



// ========================================
// DISPLAY APPOINTMENTS
// ========================================

function displayAppointments() {

    const appointmentList =
        document.getElementById("appointmentList");

    const noAppointments =
        document.getElementById("noAppointments");

    const appointmentSummary =
        document.getElementById("appointmentSummary");


    // Get appointments from LocalStorage
    const appointments =
        getAppointments();


    // Clear previous content
    appointmentList.innerHTML = "";

    appointmentSummary.innerHTML = "";



    // ========================================
    // NO APPOINTMENTS
    // ========================================

    if (appointments.length === 0) {

        noAppointments.style.display =
            "block";

        appointmentSummary.style.display =
            "none";

        return;
    }


    // Hide no appointment message
    noAppointments.style.display =
        "none";


    // Show summary
    appointmentSummary.style.display =
        "grid";



    // ========================================
    // COUNT APPOINTMENTS
    // ========================================

    const totalAppointments =
        appointments.length;


    const confirmedAppointments =
        appointments.filter(function (appointment) {

            return appointment.status ===
                "Confirmed";

        }).length;


    const cancelledAppointments =
        appointments.filter(function (appointment) {

            return appointment.status ===
                "Cancelled";

        }).length;



    // ========================================
    // DISPLAY SUMMARY
    // ========================================

    appointmentSummary.innerHTML = `

        <div class="appointment-summary-card">

            <div class="summary-icon">
                📋
            </div>

            <div>

                <h3>
                    Total
                </h3>

                <p>
                    ${totalAppointments}
                </p>

            </div>

        </div>


        <div class="appointment-summary-card">

            <div class="summary-icon">
                ✅
            </div>

            <div>

                <h3>
                    Confirmed
                </h3>

                <p>
                    ${confirmedAppointments}
                </p>

            </div>

        </div>


        <div class="appointment-summary-card">

            <div class="summary-icon">
                ❌
            </div>

            <div>

                <h3>
                    Cancelled
                </h3>

                <p>
                    ${cancelledAppointments}
                </p>

            </div>

        </div>

    `;



    // ========================================
    // DISPLAY EACH APPOINTMENT
    // ========================================

    appointments.forEach(function (appointment) {


        const card =
            document.createElement("div");


        card.className =
            "appointment-card";


        // Determine status class
        let statusClass =
            "status-confirmed";


        if (appointment.status === "Cancelled") {

            statusClass =
                "status-cancelled";

        }



        // ====================================
        // APPOINTMENT CARD
        // ====================================

        card.innerHTML = `

            <div class="appointment-card-header">

                <div>

                    <h2>
                        ${appointment.doctorName}
                    </h2>

                    <p class="appointment-specialization">
                        ${appointment.specialization}
                    </p>

                </div>


                <span
                    class="${statusClass}"
                >
                    ${appointment.status}
                </span>

            </div>



            <div class="appointment-details">


                <!-- Doctor -->

                <div class="appointment-detail">

                    <span class="detail-icon">
                        👨‍⚕️
                    </span>

                    <div>

                        <small>
                            Doctor
                        </small>

                        <strong>
                            ${appointment.doctorName}
                        </strong>

                    </div>

                </div>



                <!-- Patient -->

                <div class="appointment-detail">

                    <span class="detail-icon">
                        👤
                    </span>

                    <div>

                        <small>
                            Patient
                        </small>

                        <strong>
                            ${appointment.patientName}
                        </strong>

                    </div>

                </div>



                <!-- Date -->

                <div class="appointment-detail">

                    <span class="detail-icon">
                        📅
                    </span>

                    <div>

                        <small>
                            Date
                        </small>

                        <strong>
                            ${formatDate(appointment.date)}
                        </strong>

                    </div>

                </div>



                <!-- Time -->

                <div class="appointment-detail">

                    <span class="detail-icon">
                        ⏰
                    </span>

                    <div>

                        <small>
                            Time
                        </small>

                        <strong>
                            ${appointment.time}
                        </strong>

                    </div>

                </div>



                <!-- Phone -->

                <div class="appointment-detail">

                    <span class="detail-icon">
                        📱
                    </span>

                    <div>

                        <small>
                            Phone
                        </small>

                        <strong>
                            ${appointment.phone}
                        </strong>

                    </div>

                </div>



                <!-- Consultation Fee -->

                <div class="appointment-detail">

                    <span class="detail-icon">
                        💰
                    </span>

                    <div>

                        <small>
                            Consultation Fee
                        </small>

                        <strong>
                            ₹${appointment.fee}
                        </strong>

                    </div>

                </div>


            </div>



            <!-- =================================
                 ADDITIONAL INFORMATION
            ================================== -->

            <div class="appointment-extra">


                <p>

                    <strong>
                        Appointment ID:
                    </strong>

                    ${appointment.id}

                </p>


                <p>

                    <strong>
                        Age:
                    </strong>

                    ${appointment.age}

                </p>


                <p>

                    <strong>
                        Gender:
                    </strong>

                    ${appointment.gender}

                </p>


                ${
                    appointment.email
                    ?
                    `
                    <p>

                        <strong>
                            Email:
                        </strong>

                        ${appointment.email}

                    </p>
                    `
                    :
                    ""
                }


                <p>

                    <strong>
                        Reason:
                    </strong>

                    ${appointment.reason}

                </p>


            </div>



            <!-- =================================
                 ACTION BUTTON
            ================================== -->

            <div class="appointment-actions">

                ${
                    appointment.status === "Confirmed"

                    ?

                    `
                    <button
                        class="cancel-button"
                        onclick="cancelAppointment('${appointment.id}')"
                    >
                        Cancel Appointment
                    </button>
                    `

                    :

                    `
                    <span class="cancelled-note">
                        This appointment has been cancelled.
                    </span>
                    `
                }

            </div>

        `;


        appointmentList.appendChild(card);

    });

}



// ========================================
// FORMAT DATE
// ========================================

function formatDate(dateString) {

    const date =
        new Date(dateString + "T00:00:00");


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );

}



// ========================================
// CANCEL APPOINTMENT
// ========================================

function cancelAppointment(id) {


    const confirmation =
        confirm(
            "Are you sure you want to cancel this appointment?"
        );


    if (!confirmation) {

        return;

    }



    // Get appointments
    const appointments =
        getAppointments();



    // Find appointment
    const appointment =
        appointments.find(
            function (appointment) {

                return appointment.id === id;

            }
        );


    if (!appointment) {

        alert(
            "Appointment not found."
        );

        return;

    }



    // Change status
    appointment.status =
        "Cancelled";



    // Save updated appointments
    saveAppointments(
        appointments
    );



    // Refresh page content
    displayAppointments();

}