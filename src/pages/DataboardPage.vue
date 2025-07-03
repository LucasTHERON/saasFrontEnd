<script>

import Chart from 'primevue/chart';
import pdf from "../files/Déclaration de revenus 2024.pdf";
import txt from "../files/hello.txt";
import img from "../assets/chart_types.png";

export default {
    components: {
        Chart
    },
    data(){
        return{
            barData: {
                labels: ['January', 'February', 'March'],
                datasets: [{ data: [40, 20, 12] }]
            },
            barOptions: {
                responsive: true
            },
            pieData: {
                labels: ['A', 'B', 'C'],
                datasets: [{ data: [540, 325, 702]}]
            },
            lineData: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{ data: [38, 20, 18, 15, 28, 33, 25] }]
            },
            src: '../files/Déclaration de revenus 2024.pdf',
            pdf: pdf,
            txt: txt,
            img: img
        }
    },
    methods: {
       
    },
}
</script>
<template>
<br><br><br>

    <div class="card">
        <Chart type="bar" :data="barData" :options="barOptions" class="h-[30rem]" :height="200"  />
    </div>
    <div class="card">
        <Chart type="pie" :data="pieData" class="w-full md:w-[30rem]"/>
    </div>
    <div class="card">
        <Chart type="line" :data="lineData" class="h-[30rem]" :height="200"  />
    </div>
    <div>
        <img src="../assets/chart_types.png">
    </div>

    <div>
        <embed style="width: 100%; height: 80vh;" scrolling="true" :src="pdf" />
    </div>
    <div style="overflow: hidden">
        <img :src="img" />
        <embed style="" scrolling="true" :src="img" />

    </div>
    <div>
        <embed  scrolling="true" :src="txt" />
    </div>
</template>

<!-- <script setup>
import { ref, onMounted } from "vue";
import Chart from 'primevue/chart';

import { Bar } from 'vue-chartjs'


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
                label: 'My First dataset',
                backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
                borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: 'My Second dataset',
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
} -->
