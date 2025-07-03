<template>
    {{ selectedChart }}
    <button @click="() => { selectedChart = 'bar' }">Chart 1</button>
    <button @click="() => { selectedChart = 'a' }">Chart 2</button>
        <div class="card">
            <Chart v-if="selectedChart == 'bar'" type="bar" :data="chartData" :options="chartOptions" class="h-[30rem]" :height="450"  />
        </div>
</template>
    
    <script setup>
    import { ref, onMounted, reactive } from "vue";
    import Chart from 'primevue/chart';

    
    
    
    onMounted(() => {
        chartData.value = setChartData();
        chartOptions.value = setChartOptions();
    });
    
    const chartData = ref();
    const chartOptions = ref();
    
    const setChartData = () => {
        const documentStyle = getComputedStyle(document.documentElement);
    
        return {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Product Sales',
                    backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
                    borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'Service Sales',
                    backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
                    borderColor: documentStyle.getPropertyValue('--p-gray-500'),
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };
    };
    const setChartOptions = () => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
        const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');
    
        return {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    let selectedChart = ref('bar')
    </script>
    