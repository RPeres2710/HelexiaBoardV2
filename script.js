const locations = [
    { name: "Alto Paraná", lat: -23.1286, lng: -52.3136 },
    { name: "Bacuri", lat: -19.058, lng: -51.191 },
    { name: "Barro Branco", lat: -19.058, lng: -51.192 },
    { name: "Caatinga 01", lat: -4.1833, lng: -38.1333 },
    { name: "Caatinga 02", lat: -4.1333, lng: -38.2667 },
    { name: "Caatinga 15", lat: -4.8333, lng: -37.7833 },
    { name: "Caatinga 23", lat: -4.1833, lng: -38.1333 },
    { name: "Cassilândia", lat: -19.1178, lng: -51.7333 },
    { name: "Cidade Gaúcha", lat: -23.3772, lng: -52.9439 },
    { name: "Euclides da Cunha", lat: -22.5547, lng: -52.5928 },
    { name: "Iguaraçu", lat: -23.1944, lng: -51.8233 },
    { name: "Loanda", lat: -22.9239, lng: -53.1361 },
    { name: "Munhoz de Melo", lat: -23.1489, lng: -51.7725 },
    { name: "Nova Esperança", lat: -23.1842, lng: -52.2031 },
    { name: "Paraíso das Águas", lat: -19.0225, lng: -53.0114 },
    { name: "Paranaíba", lat: -19.6742, lng: -51.1908 },
    { name: "Pequi 1", lat: -16.8317, lng: -49.3278 },
    { name: "Pequi 2", lat: -16.9583, lng: -49.3033 },
    { name: "Pinheiros 03", lat: -22.1044, lng: -49.4383 },
    { name: "Pinheiros 07", lat: -21.2608, lng: -50.6444 },
    { name: "Pipa 01 e 02", lat: -5.4583, lng: -37.5192 },
    { name: "Pres. Venceslau", lat: -21.8767, lng: -51.8442 },
    { name: "Rolim de Moura 1 e 2", lat: -11.7275, lng: -61.7858 },
    { name: "São Jerônimo 1", lat: -29.9608, lng: -51.725 },
    { name: "Serra do Mar 03", lat: -22.7417, lng: -45.1244 },
    { name: "Serra do Mar 04", lat: -22.5761, lng: -44.9636 },
    { name: "Serra do Mar 06", lat: -23.0992, lng: -45.7072 },
    { name: "Serra do Mar 07 e 26", lat: -22.7417, lng: -45.1244 },
    { name: "Taquarituba 1 e 2", lat: -23.5289, lng: -49.2456 }
];

const map = L.map('map').setView([-15.7801, -47.9292], 4); 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

let markers = [];

locations.forEach(location => {
    const marker = L.circleMarker([location.lat, location.lng], {
        radius: 10, // Aumentando o tamanho do pin
        color: "#00897b", // Cor Helexia
        fillColor: "#00897b",
        fillOpacity: 1
    }).addTo(map);

    markers.push({ marker, name: location.name, lat: location.lat, lng: location.lng });

    // Ao passar o mouse, muda a cor do pin
    marker.on('mouseover', function () {
        this.setStyle({ fillColor: "#ffcc00", color: "#ffcc00" });
        this.bindTooltip(location.name, { permanent: false, direction: "top" }).openTooltip();
    });

    // Ao tirar o mouse, volta à cor original
    marker.on('mouseout', function () {
        this.setStyle({ fillColor: "#00897b", color: "#00897b" });
    });

    // Ao clicar, abre o painel lateral e dá zoom
    marker.on('click', function () {
        document.getElementById("info-panel").style.display = "block";
        document.getElementById("location-title").innerText = location.name;
        map.setView([location.lat, location.lng], 10);
    });
});

// Caixa de pesquisa
document.getElementById("search-btn").addEventListener("click", function () {
    const searchTerm = document.getElementById("search-box").value.toLowerCase();
    const foundLocation = markers.find(loc => loc.name.toLowerCase().includes(searchTerm));

    if (foundLocation) {
        map.setView([foundLocation.lat, foundLocation.lng], 10); // Zoom no local
        foundLocation.marker.setStyle({ fillColor: "#ffcc00", color: "#ffcc00" }); // Destaque no pin
        document.getElementById("location-title").innerText = foundLocation.name;
        document.getElementById("info-panel").style.display = "block"; // Abre painel lateral
    } else {
        alert("Local não encontrado!");
    }
});

// Botão para fechar o painel lateral
document.getElementById("close-panel").addEventListener("click", function () {
    document.getElementById("info-panel").style.display = "none";
});
