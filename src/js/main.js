let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
}


const url = "http://localhost:8000/api/jobs";



window.onload = () => {
    getJob().then(result => {
        render(result);
    });


    document.getElementById("form").addEventListener("submit", createJobForm); //FÅR FELEMEDDELANDE OM ATT DET ÄR NULL
}

//hämta jobb
async function getJob() {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headersList
        });

        if (!response.ok) {
            throw new Error(`Ett HTTP-fel har inträffat: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch(error) {
        console.log("Ett  fel har uppstått vid hämtning av jobb:", error);
        return [];
    }
}

//lägg til ltry-catch, lägg till utifall fail
async function createJob(companyName, jobTitle, endDate, description) {
    try {
            let jobs = {
                companyName,
                jobTitle,
                endDate,
                description
            }
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jobs),
        });



        const data = await response.json();
        console.log(data);
    } catch(error) {
        console.log(error);
    }
}

async function deleteJob(id) {
    try {
        const response = await fetch(url + `/${id}`, {
            method: "DELETE",
            headers: headersList
        });

        return response.ok;

    } catch(error) {
        console.log("Det uppstod ett fel vid borttagning av jobb: ", error);
    }
}

function createJobForm(event) {
    event.preventDefault(); 
   
    const companyName = document.getElementById("companyName").value;
    const jobTitle = document.getElementById("jobTitle").value;
    const endDate = document.getElementById("endDate").value;
    const description = document.getElementById("description").value;

    createJob(companyName, jobTitle, endDate, description);
}  

function render(jobs) {
    const containerEl = document.getElementById("container");
    containerEl .innerHTML = "";
    console.log(jobs);

    jobs.forEach(job => {
        //article
        const articleEl = document.createElement("article");

        //jobbtitel
        const jobTitleEl = document.createElement("h2");
        jobTitleEl.textContent = job.job_title;

        //företagsnamn
        const companyNameTitleEl = document.createElement("h3");
        companyNameTitleEl.innerHTML = "<b>Företagsnamn: </b>";
        const companyNameEl = document.createElement("p");

        companyNameEl.textContent = job.company_name;

        //slutdatum
        const endDateTitleEl = document.createElement("h3");
        endDateTitleEl.innerHTML = "<b>Slutdatum: </b>";

        const endDateEl = document.createElement("p");
        endDateEl.textContent = job.end_date;

        //beskrivning
        const descTitleEl = document.createElement("h3");
        descTitleEl.innerHTML = `<b>Beskrivning:</b>`

        const descEl = document.createElement("p");
        descEl.textContent = job.description;

        //radbrytning
        const lineBreakEl = document.createElement("br");

        //ta bort-knapp
        const deleteButtonEl = document.createElement("button");
        deleteButtonEl.textContent = "Ta bort jobb";

        //ta bort jobb vid klick och sedan uppdatera listan
        deleteButtonEl.onclick = () => {
            deleteJob(job.id).then(() => {
                getJob().then(render);
            });
        }

        //lägger till allt till 
        articleEl.appendChild(jobTitleEl);
        articleEl.appendChild(companyNameTitleEl);
        articleEl.appendChild(companyNameEl);
        articleEl.appendChild(endDateTitleEl);
        articleEl.appendChild(endDateEl);
        articleEl.appendChild(descTitleEl);
        articleEl.appendChild(lineBreakEl);
        articleEl.appendChild(descEl);
        articleEl.appendChild(deleteButtonEl);

        containerEl.appendChild(articleEl);
    });
}