//Ladda in DOM innan JS körs
document.addEventListener("DOMContentLoaded", function () {
    var modal = document.querySelector("#myModal"); //Container för popup
    var btn = document.querySelector("#myBtn"); //Knapp för att öppna popup
    var closeBtn = document.querySelector(".close"); //Kryss för att stänga popup
    var form = document.querySelector(".courseform");
    var courseListContainer = document.querySelector(".courselist-container");
    var coursecodeInput = document.querySelector("#coursecode");
    var coursenameInput = document.querySelector("#coursename");
    var progressionInput = document.querySelector("#progression");
    var syllabusInput = document.querySelector("#syllabus");
    var deleteBtn = document.querySelector("#deleteBtn"); //Knapp för att öppna popup
    //Ladda in sparade kurser vid sidladdning
    displayCourses();
    // Kontrollera att modal, btn och span har validerats innan de används
    if (modal && btn && closeBtn) {
        // WÖppna popup när användare trycker på knappen för "lägg till kurs"
        btn.onclick = function () {
            modal.style.display = "block";
        };
        // Stäng popup när användaren trycker på kryss
        closeBtn.onclick = function () {
            modal.style.display = "none";
        };
        // Stäng popup när användaren trycker utanför popupfönstret
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };
    }
    ;
    ;
    //Funktion som lagrar kurs i localStorage
    function addCourse(course) {
        localStorage.setItem(course.coursecode, JSON.stringify(course));
        displayCourses();
    }
    ;
    //Funktion för att ladda sparade kurser från localStorage
    function loadCourses() {
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var course = JSON.parse(localStorage.getItem(key));
            displayCourse(course);
        }
    }
    ;
    //Funktion som skriver ut enskild kurs till DOM
    function displayCourse(course) {
        var courseElement = document.createElement("div");
        courseElement.innerHTML = "\n    <div class=\"course\">\n      <h3>".concat(course.coursename, "</h3>\n      <p><strong>Kurskod:</strong> ").concat(course.coursecode, "</p>\n                <p><strong>Progression:</strong> ").concat(course.progression, "</p>\n                <p><strong>L\u00E4nk till kursplan:</strong> <a href=\"").concat(course.syllabus, "\">").concat(course.syllabus, "</a></p>\n                <a href=\"#\" class=\"edit\" data-coursecode=\"").concat(course.coursecode, "\">\u00C4ndra</a>\n                <a href=\"#\" class=\"delete\" data-coursecode=\"").concat(course.coursecode, "\">Ta bort</a>\n                </div>");
        courseListContainer.appendChild(courseElement);
        editCourse();
        deleteCourse();
    }
    //Funktion för att visa samtiga sparade kurser
    function displayCourses() {
        courseListContainer.innerHTML = "";
        loadCourses();
    }
    //Funktion för att ändra enskild post i formuläret
    function editCourse() {
        var editLinks = document.querySelectorAll(".edit");
        editLinks.forEach(function (editLink) {
            editLink.addEventListener("click", function (event) {
                event.preventDefault();
                var editLink = event.currentTarget;
                var courseCode = editLink.dataset.coursecode;
                var course = JSON.parse(localStorage.getItem(courseCode));
                //Fyll i formulärfälten med datan för kursen
                coursecodeInput.value = course.coursecode;
                coursenameInput.value = course.coursename;
                progressionInput.value = course.progression;
                syllabusInput.value = course.syllabus;
                //Visa popupen igen
                modal.style.display = "block";
            });
        });
    }
    ;
    //Funktion för att radera enskild kurs
    function deleteCourse() {
        var deleteLinks = document.querySelectorAll(".delete");
        deleteLinks.forEach(function (deleteLink) {
            deleteLink.addEventListener("click", function (event) {
                var _a;
                event.preventDefault();
                var deleteLink = event.currentTarget;
                var courseCode = deleteLink.dataset.coursecode;
                localStorage.removeItem(courseCode);
                (_a = deleteLink.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
            });
        });
    }
    ;
    //Eventlyssnare som lägger till ny kurs vid klick på submit-knapp
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var course = {
            coursecode: coursecodeInput.value,
            coursename: coursenameInput.value,
            progression: progressionInput.value,
            syllabus: syllabusInput.value
        };
        addCourse(course); //Lägg till kurs till LocalStorage och uppdatera listan
        modal.style.display = "none"; // Dölj popup
        form.reset(); //Återställ formulär
        console.log(localStorage);
    });
    //Eventlyssnare som raderar kurslistan vid klick på knapp
    deleteBtn.addEventListener("click", function (event) {
        localStorage.clear();
        courseListContainer.innerHTML = "";
    });
});
