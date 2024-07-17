new Vue({
    el: '#app',
    data: {
        plants: [],
        searchQuery: ''
    },
    computed: {
        filteredPlants() {
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
                    this.$nextTick(() => {
                        this.addEventListeners();
                    });
                });
        },
        addEventListeners() {
            document.querySelectorAll('.plant img').forEach(img => {
                img.addEventListener('click', this.handleImageClick);
                img.addEventListener('mouseover', this.handleImageMouseOver);
                img.addEventListener('mouseout', this.handleImageMouseOut);
            });
        },
        handleImageClick(event) {
            console.log(event.target.alt);
        },
        handleImageMouseOver(event) {
            event.target.style.borderColor = 'red';
            event.target.style.borderWidth = '2px';
            event.target.style.borderStyle = 'solid';
        },
        handleImageMouseOut(event) {
            event.target.style.borderColor = '';
            event.target.style.borderWidth = '';
            event.target.style.borderStyle = '';
        }
    },
    mounted() {
        this.fetchPlants();
    },
    created() {
        document.getElementById('search').addEventListener('input', event => {
            this.searchQuery = event.target.value;
        });
    }
});
