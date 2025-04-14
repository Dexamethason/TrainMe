<template>
  <div class="container mt-4">
    <h1 class="mb-4">Tryb trenera</h1>
    
    <div v-if="workouts.length === 0" class="alert alert-info shadow-sm">
      <i class="bi bi-info-circle me-2"></i> Brak zapisanych treningów. Poproś podopiecznego o dodanie treningów.
    </div>
    
    <div v-else class="row">
      <div class="col-md-4">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white">
            <h5 class="mb-0"><i class="bi bi-calendar3 me-2"></i>Daty treningów</h5>
          </div>
          <div class="card-body">
            <div class="list-group">
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
          <div class="card-header bg-success text-white">
            <h5 class="mb-0"><i class="bi bi-clipboard-check me-2"></i>Trening z dnia {{ formatDate(selectedWorkout.date) }}</h5>
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
                <tr v-for="(exercise, index) in selectedWorkout.exercises" :key="index">
                  <td>{{ exercise.name }}</td>
                  <td>{{ exercise.weight }}</td>
                  <td>{{ exercise.reps }}</td>
                  <td>{{ exercise.sets }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div v-else class="card shadow-sm">
          <div class="card-body text-center">
            <p class="mb-0"><i class="bi bi-arrow-left-circle me-2"></i>Wybierz datę treningu z listy po lewej stronie</p>
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
import { ref, onMounted } from 'vue';

// Stan komponentu
const workouts = ref([]);
const selectedWorkout = ref(null);

// Formatowanie daty
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('pl-PL', options);
}

// Wybór treningu do wyświetlenia
function selectWorkout(workout) {
  selectedWorkout.value = workout;
}

// Pobieranie danych treningowych przy montowaniu komponentu
onMounted(() => {
  const savedWorkouts = JSON.parse(localStorage.getItem('workouts') || '[]');
  workouts.value = savedWorkouts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Automatycznie wybierz najnowszy trening, jeśli istnieje
  if (workouts.value.length > 0) {
    selectedWorkout.value = workouts.value[0];
  }
});
</script>