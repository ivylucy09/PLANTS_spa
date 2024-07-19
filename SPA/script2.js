new Vue({
    el: '#app',
    data: {
        plants: [],
        searchQuery: '',
        currentRoute: 'home',
        newPlantName: '',
        newPlantScientificName: '',
        aboutText: 'Welcome to the Botanical Plants application. This app provides information about various botanical plants including their common names, scientific names, families, and synonyms.',
        dropdownOpen: false,
        aboutDropdownOpen: false
    },
    computed: {
        filteredPlants() {
            if (!this.searchQuery) {
                return this.plants;
            }
            return this.plants.filter(plant =>
                plant.common_name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    methods: {
        fetchPlants() {
            fetch('http://localhost:3000/data')
                .then(response => response.json())
                .then(data => {
                    this.plants = data;
                });
        },
        searchPlants() {
            this.filteredPlants;
        },
        addPlant() {
            const newPlant = {
                common_name: this.newPlantName,
                scientific_name: this.newPlantScientificName,
                image_url: 'path_to_default_image.jpg' // Use default image if none is uploaded
            };
            fetch('http://localhost:3000/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPlant)
            })
            .then(response => response.json())
            .then(data => {
                this.plants.push(data);
                this.newPlantName = '';
                this.newPlantScientificName = '';
            });
        },
        editPlant(plant) {
            const updatedPlant = {
                ...plant,
                common_name: prompt('Enter new common name:', plant.common_name),
                scientific_name: prompt('Enter new scientific name:', plant.scientific_name)
            };
            fetch(`http://localhost:3000/data/${plant.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedPlant)
            })
            .then(response => response.json())
            .then(data => {
                const index = this.plants.findIndex(p => p.id === plant.id);
                this.$set(this.plants, index, data);
            });
        },
        deletePlant(id) {
            fetch(`http://localhost:3000/data/${id}`, {
                method: 'DELETE'
            })
            .then(() => {
                this.plants = this.plants.filter(plant => plant.id !== id);
            });
        },
        setRoute(route) {
            this.currentRoute = route;
            this.dropdownOpen = false;
            this.aboutDropdownOpen = false; // Close "Learn More" dropdown when navigating
        },
        toggleDropdown() {
            this.dropdownOpen = !this.dropdownOpen;
        },
        toggleAboutDropdown() {
            this.aboutDropdownOpen = !this.aboutDropdownOpen;
        },
        saveAboutText() {
            // Save aboutText to local storage or a server if needed
            alert('About Us text saved!');
        }
    },
    mounted() {
        this.fetchPlants();
    }
});
