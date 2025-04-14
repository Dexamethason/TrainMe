<template>
  <div class="container mt-4">
    <h1 class="mb-4">Tryb podopiecznego</h1>
    
    <!-- Zakładki dla różnych funkcji -->
    <ul class="nav nav-tabs mb-4">
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'add' }" href="#" @click.prevent="activeTab = 'add'">Dodaj trening</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'history' }" href="#" @click.prevent="activeTab = 'history'">Historia treningów</a>
      </li>
    </ul>
    
    <!-- Formularz dodawania treningu -->
    <div v-if="activeTab === 'add'" class="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title">Dodaj nowy trening</h5>
        <form @submit.prevent="saveWorkout">
          <div class="mb-3">
            <label for="workoutDate" class="form-label">Data treningu</label>
            <input type="date" class="form-control" id="workoutDate" v-model="workout.date" required>
          </div>
          
          <div class="mb-3">
            <h5>Ćwiczenia</h5>
            <div v-for="(exercise, index) in workout.exercises" :key="index" class="card mb-3 border-light shadow-sm">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-4 mb-2">
                    <label class="form-label">Nazwa ćwiczenia</label>
                    <select class="form-select" v-model="exercise.name" required>
                      <option value="" disabled>Wybierz ćwiczenie</option>
                      <option v-for="ex in availableExercises" :key="ex" :value="ex">{{ ex }}</option>
                    </select>
                  </div>
                  <div class="col-md-2 mb-2">
                    <label class="form-label">Obciążenie (kg)</label>
                    <input type="number" class="form-control" v-model="exercise.weight" min="0" step="0.5" required>
                  </div>
                  <div class="col-md-2 mb-2">
                    <label class="form-label">Powtórzenia</label>
                    <input type="number" class="form-control" v-model="exercise.reps" min="1" required>
                  </div>
                  <div class="col-md-2 mb-2">
                    <label class="form-label">Serie</label>
                    <input type="number" class="form-control" v-model="exercise.sets" min="1" required>
                  </div>
                  <div class="col-md-2 d-flex align-items-end mb-2">
                    <button type="button" class="btn btn-danger" @click="removeExercise(index)">
                      <i class="bi bi-trash"></i> Usuń
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button type="button" class="btn btn-secondary" @click="addExercise">
              <i class="bi bi-plus-circle"></i> Dodaj ćwiczenie
            </button>
          </div>
          
          <button type="submit" class="btn btn-primary mt-3">
            <i class="bi bi-save"></i> Zapisz trening
          </button>
        </form>
      </div>
    </div>
    
    <!-- Historia treningów -->
    <div v-if="activeTab === 'history'" class="row">
      <div class="col-md-4">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white">
            <h5 class="mb-0">Daty treningów</h5>
          </div>
          <div class="card-body">
            <div v-if="workouts.length === 0" class="alert alert-info">
              Brak zapisanych treningów.
            </div>
            <div v-else class="list-group">
              <button 
                v-for="workout in workouts" 
                :key="workout.id"
                class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                :class="{ active: selectedWorkout && selectedWorkout.id === workout.id }"
                @click="selectWorkout(workout)"
              >
                <span>{{ formatDate(workout.date) }}</span>
                <i class="bi bi-calendar-check"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-md-8">
        <div v-if="selectedWorkout" class="card shadow-sm">
          <div class="card-header bg-success text-white d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Trening z dnia {{ formatDate(selectedWorkout.date) }}</h5>
            <button class="btn btn-sm btn-light" @click="editSelectedWorkout" v-if="!isEditing">
              <i class="bi bi-pencil"></i> Edytuj
            </button>
            <div v-else>
              <button class="btn btn-sm btn-success me-2" @click="saveEditedWorkout">
                <i class="bi bi-check-lg"></i> Zapisz
              </button>
              <button class="btn btn-sm btn-light" @click="cancelEditing">
                <i class="bi bi-x-lg"></i> Anuluj
              </button>
            </div>
          </div>
          <div class="card-body">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Ćwiczenie</th>
                  <th>Obciążenie (kg)</th>
                  <th>Powtórzenia</th>
                  <th>Serie</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(exercise, index) in editingWorkout.exercises" :key="index">
                  <td>
                    <select v-if="isEditing" class="form-select" v-model="editingWorkout.exercises[index].name" required>
                      <option v-for="ex in availableExercises" :key="ex" :value="ex">{{ ex }}</option>
                    </select>
                    <span v-else>{{ exercise.name }}</span>
                  </td>
                  <td>
                    <input v-if="isEditing" type="number" class="form-control" v-model="editingWorkout.exercises[index].weight" min="0" step="0.5" required>
                    <span v-else>{{ exercise.weight }}</span>
                  </td>
                  <td>
                    <input v-if="isEditing" type="number" class="form-control" v-model="editingWorkout.exercises[index].reps" min="1" required>
                    <span v-else>{{ exercise.reps }}</span>
                  </td>
                  <td>
                    <input v-if="isEditing" type="number" class="form-control" v-model="editingWorkout.exercises[index].sets" min="1" required>
                    <span v-else>{{ exercise.sets }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div v-else class="card shadow-sm">
          <div class="card-body text-center">
            <p class="mb-0">Wybierz datę treningu z listy po lewej stronie</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="mt-3">
      <router-link to="/" class="btn btn-outline-secondary">
        <i class="bi bi-house"></i> Powrót do strony głównej
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Stan komponentu
const activeTab = ref('add'); // Domyślnie aktywna zakładka dodawania treningu
const workouts = ref([]);
const selectedWorkout = ref(null);
const isEditing = ref(false);
const editingWorkout = ref(null);

// Lista dostępnych ćwiczeń
const availableExercises = [
  'Wyciskanie hantli na ławce poziomej (klatka piersiowa/ barki/triceps)',
  'RDL (Tylnia taśma ud, pośladek)',
  'Wiosłowanie wyciąg poziomo (Plecy- mięsień najszerszy i czworoboczny)',
  'Pompki ( Klatka piersiowa/ przód barki/triceps)',
  'Odwrócony butterfly (tył barku)',
  'Wykroki (przód uda, pośladki)',
  'Wiosłowanie wyciąg górny (plecy- mięsień najszerszy i oby)',
  'Przysiady hack squat (przód uda i pośladek)- do wstawiania mój filmik',
  'Wyciskanie na maszynie ze skosem dodatnim (klatka piersiowa, barki, triceps)',
  'Wiosłowanie hantlem w oparciu o ławkę (plecy- mięsień najszerszy i czworoboczny)',
  'Wznosy bokiem (bok barku)',
  'Uginanie ud siedząc (tył uda- mięsień dwugłowy)'
];

// Model danych treningu
const workout = ref({
  date: new Date().toISOString().substr(0, 10),
  exercises: []
});

// Formatowanie daty
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('pl-PL', options);
}

// Dodawanie nowego ćwiczenia do formularza
function addExercise() {
  workout.value.exercises.push({
    name: '',
    weight: 0,
    reps: 0,
    sets: 0
  });
}

// Usuwanie ćwiczenia z formularza
function removeExercise(index) {
  workout.value.exercises.splice(index, 1);
}

// Zapisywanie treningu
function saveWorkout() {
  if (workout.value.exercises.length === 0) {
    alert('Dodaj przynajmniej jedno ćwiczenie!');
    return;
  }
  
  // Sprawdź czy wszystkie pola są wypełnione
  for (const exercise of workout.value.exercises) {
    if (!exercise.name || exercise.reps <= 0 || exercise.sets <= 0) {
      alert('Wypełnij wszystkie pola dla każdego ćwiczenia!');
      return;
    }
  }
  
  // Pobierz istniejące dane treningowe z localStorage
  let savedWorkouts = JSON.parse(localStorage.getItem('workouts') || '[]');
  
  // Dodaj nowy trening
  savedWorkouts.push({
    id: Date.now(),
    date: workout.value.date,
    exercises: [...workout.value.exercises]
  });
  
  // Zapisz zaktualizowane dane
  localStorage.setItem('workouts', JSON.stringify(savedWorkouts));
  
  // Zaktualizuj listę treningów
  loadWorkouts();
  
  // Resetuj formularz
  workout.value = {
    date: new Date().toISOString().substr(0, 10),
    exercises: []
  };
  addExercise();
  
  alert('Trening został zapisany!');
  
  // Przełącz na zakładkę historii
  activeTab.value = 'history';
}

// Wybór treningu do wyświetlenia
function selectWorkout(workout) {
  selectedWorkout.value = workout;
  // Stwórz kopię do edycji
  editingWorkout.value = JSON.parse(JSON.stringify(workout));
  isEditing.value = false;
}

// Rozpoczęcie edycji treningu
function editSelectedWorkout() {
  isEditing.value = true;
}

// Zapisanie edytowanego treningu
function saveEditedWorkout() {
  // Sprawdź czy wszystkie pola są wypełnione
  for (const exercise of editingWorkout.value.exercises) {
    if (!exercise.name || exercise.reps <= 0 || exercise.sets <= 0) {
      alert('Wypełnij wszystkie pola dla każdego ćwiczenia!');
      return;
    }
  }
  
  // Pobierz istniejące dane treningowe z localStorage
  let savedWorkouts = JSON.parse(localStorage.getItem('workouts') || '[]');
  
  // Znajdź indeks edytowanego treningu
  const index = savedWorkouts.findIndex(w => w.id === editingWorkout.value.id);
  
  if (index !== -1) {
    // Zaktualizuj trening
    savedWorkouts[index] = editingWorkout.value;
    
    // Zapisz zaktualizowane dane
    localStorage.setItem('workouts', JSON.stringify(savedWorkouts));
    
    // Zaktualizuj listę treningów
    loadWorkouts();
    
    // Zaktualizuj wybrany trening
    selectedWorkout.value = editingWorkout.value;
    
    // Wyłącz tryb edycji
    isEditing.value = false;
    
    alert('Trening został zaktualizowany!');
  }
}

// Anulowanie edycji treningu
function cancelEditing() {
  // Przywróć oryginalny trening
  editingWorkout.value = JSON.parse(JSON.stringify(selectedWorkout.value));
  isEditing.value = false;
}

// Ładowanie treningów z localStorage
function loadWorkouts() {
  const savedWorkouts = JSON.parse(localStorage.getItem('workouts') || '[]');
  workouts.value = savedWorkouts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Automatycznie wybierz najnowszy trening, jeśli istnieje i nie ma wybranego
  if (workouts.value.length > 0 && !selectedWorkout.value) {
    selectWorkout(workouts.value[0]);
  }
}

// Inicjalizacja komponentu
onMounted(() => {
  // Dodaj domyślne ćwiczenie przy ładowaniu komponentu
  if (workout.value.exercises.length === 0) {
    addExercise();
  }
  
  // Załaduj treningi
  loadWorkouts();
});
</script>