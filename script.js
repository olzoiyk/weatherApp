// Button click event
document.getElementById("searchBtn").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value;
    const apiKey = "639d55cf5bafc8c15ab0ae64dad512f0";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            const weatherDiv = document.getElementById("weatherResult");
            weatherDiv.style.display = "block";

            const cityName = data.name;
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            weatherDiv.innerHTML = `
        <h3>📍 ${cityName}</h3>
        <p>🌡️ Temperature: ${temperature}°C</p>
        <p>☁️ Weather: ${description}</p>
        <img src="${iconUrl}" alt="${description}">
    `;
        })

        .catch(error => {
            console.error("Error fetching weather:", error);
        });
});

// Enter key activates the button
document.getElementById("cityInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        document.getElementById("searchBtn").click();
    }
});

const cityInput = document.getElementById("cityInput");
const suggestions = document.getElementById("suggestions");

cityInput.addEventListener("input", () => {
    const query = cityInput.value.trim();

    if (query.length < 2) {
        suggestions.innerHTML = ""; // Clear suggestions if query too short
        return; // <-- Important to stop here
    }

    const apiKey = "ceef78debamsh04f46e08c3f543ep1f29f7jsn68647727180f";
    // Correct endpoint for city autocomplete:
    const apiUrl = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&limit=5&sort=-population`;

    fetch(apiUrl, {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com"
        }
    })
        .then(response => response.json())
        .then(data => {
            suggestions.innerHTML = ""; // Clear suggestions
            const cities = data.data;

            cities.forEach(city => {
                const li = document.createElement("li");
                li.textContent = `${city.city}, ${city.countryCode}`; // fixed template literal
                li.addEventListener("click", () => {
                    cityInput.value = city.city;
                    suggestions.innerHTML = ""; // Clear suggestions after selection
                });
                suggestions.appendChild(li);
            });
        })
        .catch(err => {
            console.error("Error fetching city data:", err);
            suggestions.innerHTML = "";
        });
});

// Hide suggestions if user clicks outside
document.addEventListener("click", (e) => {
    if (e.target !== cityInput) {
        suggestions.innerHTML = "";
    }
});
