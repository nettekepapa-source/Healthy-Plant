const photoInput = document.getElementById('plantPhoto');
const preview = document.getElementById('photoPreview');
const uploadSymbol = document.getElementById('uploadSymbol');
const uploadTitle = document.getElementById('uploadTitle');
const uploadHint = document.getElementById('uploadHint');
const form = document.getElementById('plantForm');
const result = document.getElementById('result');

photoInput.addEventListener('change', () => {
  const file = photoInput.files && photoInput.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) { alert('Selecciona un archivo de imagen.'); return; }
  const reader = new FileReader();
  reader.onload = e => {
    preview.src = e.target.result;
    preview.hidden = false;
    uploadSymbol.hidden = true;
    uploadTitle.textContent = file.name;
    uploadHint.textContent = 'Fotografía cargada correctamente';
  };
  reader.readAsDataURL(file);
});

const plants = {
  monstera: {name:'Monstera deliciosa', common:'Costilla de Adán', light:'Luz indirecta brillante', water:'Riega cuando los primeros 2–3 cm del sustrato estén secos.', soil:'Sustrato aireado y con buen drenaje.'},
  sansevieria: {name:'Dracaena trifasciata', common:'Lengua de suegra', light:'Luz indirecta; tolera poca luz', water:'Deja secar completamente el sustrato antes de regar.', soil:'Mezcla para cactus o sustrato muy drenante.'},
  pothos: {name:'Epipremnum aureum', common:'Potus', light:'Luz indirecta media o brillante', water:'Riega cuando la capa superior del sustrato esté seca.', soil:'Sustrato ligero con buen drenaje.'},
  suculenta: {name:'Suculenta', common:'Suculenta (identificación general)', light:'Mucha luz; aclimata gradualmente al sol directo', water:'Riega a fondo y espera a que el sustrato se seque por completo.', soil:'Sustrato mineral o mezcla especial para suculentas.'},
  aloe: {name:'Aloe vera', common:'Sábila', light:'Luz brillante y algunas horas de sol suave', water:'Riega solo cuando el sustrato esté completamente seco.', soil:'Sustrato arenoso y maceta con orificios.'}
};
const symptoms = {
  sana: ['Estado visual reportado: sin señales preocupantes.','Mantén una rutina de observación y evita cambios bruscos de ubicación.'],
  amarillas: ['Posible causa: exceso de riego, drenaje deficiente o falta de nutrientes.','Revisa la humedad y las raíces; retira hojas muy dañadas con tijeras limpias.'],
  manchas: ['Posible causa: quemadura solar, hongos o plagas; depende del aspecto de las manchas.','Aísla la planta si sospechas plagas, evita mojar las hojas y revisa el envés.'],
  marchita: ['Posible causa: falta o exceso de agua, calor o daño en raíces.','Comprueba la humedad del sustrato antes de regar; revisa que la maceta drene.'],
  secas: ['Posible causa: baja humedad, riego irregular, acumulación de sales o sol intenso.','Revisa la exposición y la frecuencia de riego; evita fertilizar en exceso.']
};
form.addEventListener('submit', e => {
  e.preventDefault();
  const key = document.getElementById('species').value;
  if (!key) return;
  const plant = plants[key];
  const advice = symptoms[document.getElementById('symptom').value];
  result.innerHTML = `<h3>🌱 ${plant.common}</h3><p><strong>Nombre científico:</strong> ${plant.name}</p><p><strong>Estado orientativo</strong></p><ul><li>${advice[0]}</li><li>${advice[1]}</li></ul><p><strong>Guía de cuidados</strong></p><ul><li><strong>Luz:</strong> ${plant.light}.</li><li><strong>Riego:</strong> ${plant.water}</li><li><strong>Sustrato:</strong> ${plant.soil}</li></ul><p><em>Esta orientación es educativa y no sustituye una evaluación experta. La especie fue seleccionada manualmente para la demostración; la foto no se analiza con IA.</em></p>`;
  result.hidden = false;
  result.scrollIntoView({behavior:'smooth',block:'nearest'});
});

let deferredPrompt;
const installBtn = document.getElementById('installBtn');
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault(); deferredPrompt = event; installBtn.hidden = false;
});
installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; installBtn.hidden = true;
});
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(console.error));
