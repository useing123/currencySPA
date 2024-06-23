<template>
  <div>
    <h1>Official Exchange Rates</h1>
    <input type="text" v-model="date" @change="fetchRates" placeholder="день.месяц.год" />
    <div class="card-container">
      <div v-for="item in paginatedRates" :key="item.title" class="card">
        <div class="card-header">
          <strong>{{ item.fullname }}</strong> ({{ item.title }})
        </div>
        <div class="card-body">
          <p>Rate: {{ item.description }}</p>
          <img v-if="item.countryFlag" :src="item.countryFlag" alt="Country Flag" />
          <span v-if="item.countryCode && countryCodeToIcon[item.countryCode]">
            <i class="icon" :class="countryCodeToIcon[item.countryCode]"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Предыдущая</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Следующая</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rates: [],
      date: '23.06.2023',
      currentPage: 1,
      itemsPerPage: 6,
      countryCodeToIcon: {
        KZ: 'fas fa-flag' // Пример иконки для Казахстана
        // Добавьте другие страны и соответствующие им иконки
      }
    }
  },
  computed: {
    paginatedRates() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      return this.rates.slice(startIndex, startIndex + this.itemsPerPage)
    },
    totalPages() {
      return Math.ceil(this.rates.length / this.itemsPerPage)
    }
  },
  mounted() {
    this.fetchRates()
  },
  methods: {
    fetchRates() {
      const [day, month, year] = this.date.split('.')
      const formattedDate = `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`
      fetch(`https://nationalbank.kz/rss/get_rates.cfm?fdate=${formattedDate}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.text()
        })
        .then((data) => {
          const parser = new DOMParser()
          const xmlDoc = parser.parseFromString(data, 'text/xml')
          const items = xmlDoc.querySelectorAll('item')
          const rates = []
          items.forEach((item) => {
            rates.push({
              fullname: item.querySelector('fullname').textContent,
              title: item.querySelector('title').textContent,
              description: item.querySelector('description').textContent,
              countryFlag: item.querySelector('countryflag')
                ? item.querySelector('countryflag').textContent
                : null,
              countryCode: item.querySelector('countrycode')
                ? item.querySelector('countrycode').textContent
                : null
            })
          })
          this.rates = rates
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  color: #333;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  font-weight: bold;
}

.card-body {
  margin-top: 10px;
}

.card-body img {
  max-width: 50px;
}

.pagination {
  margin-top: 20px;
}

.pagination button {
  padding: 5px 10px;
  margin-right: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.icon {
  margin-left: 5px;
}
</style>
