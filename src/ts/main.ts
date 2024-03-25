//Ladda in DOM innan JS körs
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector("#myModal") as HTMLDivElement; //Container för popup
  const btn = document.querySelector("#myBtn") as HTMLButtonElement; //Knapp för att öppna popup
  const closeBtn = document.querySelector(".close") as HTMLSpanElement; //Kryss för att stänga popup
  const form = document.querySelector(".courseform") as HTMLFormElement;
  const courseListContainer = document.querySelector(".courselist-container") as HTMLDivElement;
  const coursecodeInput = document.querySelector("#coursecode") as HTMLInputElement;
  const coursenameInput = document.querySelector("#coursename") as HTMLInputElement
  const progressionInput = document.querySelector("#progression") as HTMLSelectElement
  const syllabusInput = document.querySelector("#syllabus") as HTMLInputElement
  const deleteBtn = document.querySelector("#deleteBtn") as HTMLButtonElement; //Knapp för att öppna popup

  //Ladda in sparade kurser vid sidladdning
  displayCourses();


  // Kontrollera att modal, btn och span har validerats innan de används
  if (modal && btn && closeBtn) {

    // WÖppna popup när användare trycker på knappen för "lägg till kurs"
    btn.onclick = () => {
      modal.style.display = "block";
    };

    // Stäng popup när användaren trycker på kryss
    closeBtn.onclick = () => {
      modal.style.display = "none";
    };

    // Stäng popup när användaren trycker utanför popupfönstret
    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  };

  //Skapa interface Course
  interface Course {
    coursecode: string;
    coursename: string;
    progression: string;
    syllabus: string;
  };


  //Funktion som lagrar kurs i localStorage
  function addCourse(course: Course): void {
    localStorage.setItem(course.coursecode, JSON.stringify(course));
    displayCourses();
  };

  //Funktion för att ladda sparade kurser från localStorage
  function loadCourses(): void {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)!;
      const course = JSON.parse(localStorage.getItem(key)!) as Course;
      displayCourse(course);
    }
  };

  //Funktion som skriver ut enskild kurs till DOM
  function displayCourse(course: Course): void {
    const courseElement = document.createElement("div");
    courseElement.innerHTML = `
    <div class="course">
      <h3>${course.coursename}</h3>
      <p><strong>Kurskod:</strong> ${course.coursecode}</p>
                <p><strong>Progression:</strong> ${course.progression}</p>
                <p><strong>Länk till kursplan:</strong> <a href="${course.syllabus}">${course.syllabus}</a></p>
                <a href="#" class="edit" data-coursecode="${course.coursecode}">Ändra</a>
                <a href="#" class="delete" data-coursecode="${course.coursecode}">Ta bort</a>
                </div>`;
    courseListContainer.appendChild(courseElement);
    editCourse();
    deleteCourse();
  }

  //Funktion för att visa samtiga sparade kurser
  function displayCourses(): void {
    courseListContainer.innerHTML = "";
    loadCourses();
  }

  //Funktion för att ändra enskild post i formuläret
function editCourse(): void {
  const editLinks = document.querySelectorAll(".edit");
  editLinks.forEach((editLink) => {
    editLink.addEventListener("click", (event) => {
      event.preventDefault();
      const editLink = event.currentTarget as HTMLElement;
      const courseCode = editLink.dataset.coursecode!;
      const course = JSON.parse(localStorage.getItem(courseCode)!);
      //Fyll i formulärfälten med datan för kursen
      coursecodeInput.value = course.coursecode;
      coursenameInput.value = course.coursename;
      progressionInput.value = course.progression;
      syllabusInput.value = course.syllabus;
      //Visa popupen igen
      modal.style.display ="block";
    });
  });
};

//Funktion för att radera enskild kurs
function deleteCourse(): void {
  const deleteLinks = document.querySelectorAll(".delete");
  deleteLinks.forEach((deleteLink) => {
    deleteLink.addEventListener("click", (event) => {
      event.preventDefault();
      const deleteLink = event.currentTarget as HTMLElement;
      const courseCode = deleteLink.dataset.coursecode!;
      localStorage.removeItem(courseCode);
      deleteLink.parentElement?.remove();
    });
  });
};

  //Eventlyssnare som lägger till ny kurs vid klick på submit-knapp
  form.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    const course: Course = {
      coursecode: coursecodeInput.value,
      coursename: coursenameInput.value,
      progression: progressionInput.value,
      syllabus: syllabusInput.value
    };

    addCourse(course); //Lägg till kurs till LocalStorage och uppdatera listan
    modal.style.display = "none"; // Dölj popup
    form.reset(); //Återställ formulär
    console.log(localStorage)
  });

  //Eventlyssnare som raderar kurslistan vid klick på knapp
  deleteBtn.addEventListener("click", (event: Event) => {

    localStorage.clear();
    courseListContainer.innerHTML = "";
  });


});


