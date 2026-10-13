// ========================================
// DOCTOR DATA
// ========================================

const doctors = [

    {
        id: 1,
        name: "Dr. Ananya Rao",
        specialization: "Cardiologist",
        experience: "10 Years",
        fee: 500,
        education: "MBBS, MD Cardiology",
        availability: "Mon - Fri",
        icon: "❤️"
    },

    {
        id: 2,
        name: "Dr. Rahul Kumar",
        specialization: "Dermatologist",
        experience: "8 Years",
        fee: 400,
        education: "MBBS, MD Dermatology",
        availability: "Mon - Sat",
        icon: "🧴"
    },

    {
        id: 3,
        name: "Dr. Priya Sharma",
        specialization: "Neurologist",
        experience: "12 Years",
        fee: 700,
        education: "MBBS, DM Neurology",
        availability: "Tue - Sat",
        icon: "🧠"
    },

    {
        id: 4,
        name: "Dr. Arjun Reddy",
        specialization: "Pediatrician",
        experience: "7 Years",
        fee: 450,
        education: "MBBS, MD Pediatrics",
        availability: "Mon - Fri",
        icon: "👶"
    }

];


// ========================================
// DISPLAY DOCTORS
// ========================================

function displayDoctors(list) {

    const container = document.getElementById("doctorContainer");
    const noDoctors = document.getElementById("noDoctors");
    const doctorCount = document.getElementById("doctorCount");

    // Clear previous cards
    container.innerHTML = "";


    // If no doctors are found
    if (list.length === 0) {

        noDoctors.style.display = "block";

        doctorCount.innerText = "0 doctors found";

        return;
    }


    // Hide no doctors message
    noDoctors.style.display = "none";


    // Display number of doctors
    doctorCount.innerText =
        list.length +
        (list.length === 1 ? " doctor found" : " doctors found");


    // Create doctor cards
    list.forEach(function (doctor) {

        const card = document.createElement("div");

        card.className = "doctor-card";


        card.innerHTML = `

            <div class="doctor-icon">
                ${doctor.icon}
            </div>

            <div class="doctor-info">

                <h2>${doctor.name}</h2>

                <p class="doctor-specialization">
                    ${doctor.specialization}
                </p>

                <p>
                    <strong>Experience:</strong>
                    ${doctor.experience}
                </p>

                <p>
                    <strong>Education:</strong>
                    ${doctor.education}
                </p>

                <p>
                    <strong>Available:</strong>
                    ${doctor.availability}
                </p>

                <p class="doctor-fee">
                    Consultation Fee:
                    <span>₹${doctor.fee}</span>
                </p>

            </div>


            <div class="doctor-card-bottom">

                <button
                    class="book-doctor-button"
                    onclick="bookDoctor(${doctor.id})"
                >
                    Book Appointment
                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


// ========================================
// SEARCH DOCTORS
// ========================================

function searchDoctors() {

    const searchInput =
        document.getElementById("searchDoctor");

    const searchValue =
        searchInput.value.toLowerCase().trim();


    const filterValue =
        document.getElementById("specializationFilter").value;


    const filteredDoctors = doctors.filter(function (doctor) {

        const doctorName =
            doctor.name.toLowerCase();

        const specialization =
            doctor.specialization.toLowerCase();


        const matchesSearch =
            doctorName.includes(searchValue) ||
            specialization.includes(searchValue);


        const matchesFilter =
            filterValue === "all" ||
            doctor.specialization === filterValue;


        return matchesSearch && matchesFilter;

    });


    displayDoctors(filteredDoctors);

}


// ========================================
// FILTER BY SPECIALIZATION
// ========================================

function filterDoctors() {

    const filterValue =
        document.getElementById("specializationFilter").value;


    const searchInput =
        document.getElementById("searchDoctor");

    const searchValue =
        searchInput.value.toLowerCase().trim();


    const filteredDoctors = doctors.filter(function (doctor) {

        const doctorName =
            doctor.name.toLowerCase();

        const specialization =
            doctor.specialization.toLowerCase();


        const matchesSearch =
            doctorName.includes(searchValue) ||
            specialization.includes(searchValue);


        const matchesFilter =
            filterValue === "all" ||
            doctor.specialization === filterValue;


        return matchesSearch && matchesFilter;

    });


    displayDoctors(filteredDoctors);

}


// ========================================
// BOOK APPOINTMENT
// ========================================

function bookDoctor(id) {

    // Save selected doctor ID
    localStorage.setItem(
        "selectedDoctor",
        id
    );


    // Open appointment page
    window.location.href =
        "appointment.html";

}


// ========================================
// DISPLAY ALL DOCTORS WHEN PAGE LOADS
// ========================================

displayDoctors(doctors);