let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
}


const url = "http://localhost:8000/api/jobs";



window.onload = () => {
    getJob().then(result => {
        render(result);
    });


    document.getElementById("form").addEventListener("submit", createJobForm);
}

async function getJob() {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headersList
        });

        if (!response.ok) {
            return [];
        }

        const result = await response.json();
        console.log(result);
        return result;
    } catch {

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

    } catch {

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
    const container = document.getElementById("container");
    container.innerHTML = "";
    console.log(jobs);

    jobs.forEach(job => {
        const card = document.createElement("div");
        card.className = "card";

        const title = document.createElement("h3");
        title.textContent = job.jobTitle;

        const company = document.createElement("p");
        company.textContent = `Företag: ${job.companyName}`;

        const date = document.createElement("p");
        date.className = "date";
        date.textContent = `Sista ansökningsdag: ${job.endDate}`;

        const desc = document.createElement("p");
        desc.textContent = job.description;

        card.appendChild(title);
        card.appendChild(company);
        card.appendChild(date);
        card.appendChild(desc);

        container.appendChild(card);
    });
}