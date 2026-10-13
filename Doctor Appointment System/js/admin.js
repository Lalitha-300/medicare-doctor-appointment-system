// ========================================
// ADMIN DASHBOARD
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayAdminData();

    }
);



// ========================================
// DISPLAY ADMIN DATA
// ========================================

function displayAdminData() {

    const appointments =
        getAppointments();


    const totalElement =
        document.getElementById(
            "totalAppointments"
        );


    const confirmedElement =
        document.getElementById(
            "confirmedAppointments"
        );


    const cancelledElement =
        document.getElementById(
            "cancelledAppointments"
        );


    // ========================================
    // CALCULATE COUNTS
    // ========================================

    const total =
        appointments.length;


    const confirmed =
        appointments.filter(
            function (appointment) {

                return appointment.status ===
                    "Confirmed";

            }
        ).length;


    const cancelled =
        appointments.filter(
            function (appointment) {

                return appointment.status ===
                    "Cancelled";

            }
        ).length;



    // ========================================
    // DISPLAY COUNTS
    // ========================================

    totalElement.innerText =
        total;


    confirmedElement.innerText =
        confirmed;


    cancelledElement.innerText =
        cancelled;



    // ========================================
    // DISPLAY TABLE
    // ========================================

    displayAdminTable(
        appointments
    );

}



// ========================================
// DISPLAY ADMIN TABLE
// ========================================

function displayAdminTable(appointments) {

    const tableBody =
        document.getElementById(
            "adminAppointmentTable"
        );


    tableBody.innerHTML = "";



    // ========================================
    // NO APPOINTMENTS
    // ========================================

    if (appointments.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="8"
                    class="no-admin-data"
                >

                    No appointments found.

                </td>

            </tr>

        `;

        return;
    }



    // ========================================
    // CREATE TABLE ROWS
    // ========================================

    appointments.forEach(
        function (appointment) {


            const row =
                document.createElement("tr");


            // ==================================
            // STATUS CLASS
            // ==================================

            let statusClass =
                "admin-status-confirmed";


            if (
                appointment.status ===
                "Cancelled"
            ) {

                statusClass =
                    "admin-status-cancelled";

            }



            // ==================================
            // ACTION BUTTON
            // ==================================

            let actionHTML = "";


            if (
                appointment.status ===
                "Confirmed"
            ) {

                actionHTML = `

                    <button
                        class="admin-cancel-button"
                        onclick="cancelFromAdmin('${appointment.id}')"
                    >
                        Cancel
                    </button>

                `;

            } else {

                actionHTML = `

                    <span class="admin-no-action">
                        --
                    </span>

                `;

            }



            // ==================================
            // ROW CONTENT
            // ==================================

            row.innerHTML = `

                <td>
                    <span class="appointment-id">
                        ${appointment.id}
                    </span>
                </td>


                <td>
                    <strong>
                        ${appointment.patientName}
                    </strong>
                </td>


                <td>

                    ${appointment.doctorName}

                    <small class="table-specialization">
                        ${appointment.specialization}
                    </small>

                </td>


                <td>
                    ${formatAdminDate(appointment.date)}
                </td>


                <td>
                    ${appointment.time}
                </td>


                <td>
                    ${appointment.phone}
                </td>


                <td>

                    <span
                        class="${statusClass}"
                    >
                        ${appointment.status}
                    </span>

                </td>


                <td>

                    ${actionHTML}

                </td>

            `;


            tableBody.appendChild(row);

        }
    );

}



// ========================================
// SEARCH AND FILTER
// ========================================

function filterAdminAppointments() {


    const searchInput =
        document.getElementById(
            "adminSearch"
        );


    const statusFilter =
        document.getElementById(
            "adminStatusFilter"
        );


    const searchValue =
        searchInput.value
            .toLowerCase()
            .trim();


    const statusValue =
        statusFilter.value;



    // Get all appointments
    const appointments =
        getAppointments();



    // ========================================
    // FILTER
    // ========================================

    const filteredAppointments =
        appointments.filter(
            function (appointment) {


                const patientName =
                    appointment.patientName
                        .toLowerCase();


                const doctorName =
                    appointment.doctorName
                        .toLowerCase();


                const specialization =
                    appointment.specialization
                        .toLowerCase();



                // Search condition
                const matchesSearch =

                    patientName.includes(
                        searchValue
                    )

                    ||

                    doctorName.includes(
                        searchValue
                    )

                    ||

                    specialization.includes(
                        searchValue
                    );



                // Status condition
                const matchesStatus =

                    statusValue === "all"

                    ||

                    appointment.status ===
                        statusValue;



                return (
                    matchesSearch &&
                    matchesStatus
                );

            }
        );



    // Display filtered data
    displayAdminTable(
        filteredAppointments
    );

}



// ========================================
// CANCEL FROM ADMIN
// ========================================

function cancelFromAdmin(id) {


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



    // Save data
    saveAppointments(
        appointments
    );



    // Refresh dashboard
    displayAdminData();

}



// ========================================
// FORMAT DATE
// ========================================

function formatAdminDate(dateString) {

    const date =
        new Date(
            dateString + "T00:00:00"
        );


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );

}