// Initialisation de la carte

const map = L.map('map').setView([46.6, 2.4], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Liste des chantiers

const projects = [
  {
    name: "Broyage pelle mécanique 5T & 8T",
    location: "Eyguerande (Corrèze)",
    lat: 45.6624,
    lng: 2.4525,
    description: "Évaluation de l'impact au sol de deux pelles forestières de 5T et 8T, respectivement équipe d'un gyro et d'un broyeur."
  },
  {
    name: "Broyage Valtra T174",
    location: "Compiègne (L'Oise)",
    lat: 49.3696,
    lng: 2.8488,
    description: "Évaluation de l'impact au sol pour un broyeur de 2T équipé sur un Valtra T174."
  },
    {
    name: "Automoteur FAE broyeur BL1/PM - 125 RCU 55",
    location: "Champvans (Jura)",
    lat: 47.0896,
    lng: 5.3970,
    description: "Évaluation de l'impact au sol pour un Automoteur FAE équippé BL1/PM - 125 RCU 55 sur une opération d'entretien des cloisonnements sylvicoles."
  },
      {
    name: "Étude de la divagation des engins",
    location: "Hautecour (Savoie)",
    lat: 45.5208,
    lng: 6.5374,
    description: "Modalité : 0"
  },
        {
    name: "Étude de divagation des engins",
    location: "Fontainebleau (Seine-et-Marne)",
    lat: 48.4304,
    lng: 2.6613,
    description: "Modalité : 3"
  }
];

const markers = [];

// Création des marqueurs
function addProject(project) {

  const marker = L.marker([project.lat, project.lng]).addTo(map);

  marker.bindPopup(`
    <div style="min-width:180px">
      <strong>${project.name}</strong>
      <p>${project.location}</p>
      <p>${project.description}</p>
    </div>
  `);

  markers.push(marker);

  // Ajout dans la liste
  const item = document.createElement('div');
  item.className = 'project-item';

  const title = document.createElement('strong');
  title.textContent = project.name;

  const location = document.createElement('span');
  location.textContent = project.location;

  item.append(title, location);

  item.addEventListener('click', () => {
    map.flyTo([project.lat, project.lng], 9);
    marker.openPopup();
  });

  document.getElementById('projectList').appendChild(item);
}

// Affichage des chantiers existants
projects.forEach(addProject);

// AJOUT D'UN POINT SUR LA CARTE
// Un clic sur la carte permet de créer un nouveau chantier.

map.on('click', function(e) {

  const name = prompt("Nom du nouveau chantier :");

  if (!name || !name.trim()) return;

  const location = prompt("Ville ou région :") || "France";

  const description = prompt("Description du chantier :") || "";

  const newProject = {
    name: name.trim(),
    location: location,
    lat: e.latlng.lat,
    lng: e.latlng.lng,
    description: description
  };

  addProject(newProject);

  alert("Le chantier a été ajouté à la carte !");

});