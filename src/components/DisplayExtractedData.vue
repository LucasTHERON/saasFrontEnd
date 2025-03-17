<script>
import { computed, ref, watch } from 'vue'


export default {
    props: {
        extractedData: Array
    },
    data(){
        return{
            name: '',
            error: '',
            success: '',
            imported_file: 'aa',
            dataDepth: 0,
            dataIndex: 0,
            dataArray: [],
        }
    },
    setup(){
    },
    methods: {
        displayExtractedData(){
            console.log(this.extractedData)
            console.log("_____")
            this.extractedData.forEach( obj => {
                console.log(obj)
                for (const [key, value] of Object.entries(obj)) {
                    console.log(`${key}: ${value}`);
                }
            })
        },

        ZsetNodeDepth(object, depth=1){
            for(let key in object){
                if(depth > this.dataDepth){ 
                    this.dataDepth = depth; 
                    }
                if (object.hasOwnProperty(key)) {
                    let element = object[key];
                    let type = typeof (element);
                    if (type === 'object') {
                        this.setNodeDepth(element, depth + 1);
                    }
                }
            }
        },
        ZprepareExtractedData(object, depth=1){
            for(let key in object){
                if (object.hasOwnProperty(key)) {
                    let element = object[key];
                    let type = typeof (element);
                    this.dataIndex++
                    this.dataArray.push({
                        value: key,
                        class: 'key',
                        x: depth,
                        y: this.dataIndex
                    }) 

                    if (type === 'object') {
                        this.prepareExtractedData(element, depth + 1);
                    }else{
                        this.dataArray.push({
                            value: element,
                            class: 'value',
                            x: depth + 1,
                            y: this.dataIndex
                        }) 
                    }
                }
            }
        },
        ZdisplayExtractedData(){
            const extractedDataDiv = document.querySelector("#extractedData")
            const gridContainer = document.createElement('div')
            console.log('On doit boucler sur ' + this.dataDepth + ' en horizontal et ' + this.dataIndex + ' en vertical')
            gridContainer.classList.add('wrapper')
            gridContainer.style.display = "grid"
            gridContainer.style.gridTemplateColumns = "repeat(" + this.dataDepth + ")";
            gridContainer.style.gridGap = "1px 3px"

            for(let y = 1; y <= this.dataIndex; y++){
                for(let x = 1; x <= this.dataDepth + 1; x++){
                    let div = document.createElement('div');
                    div.classList.add('cell');
                    div.style.gridColumn = x
                    div.classList.add('col' + x);
                    div.style.gridRow = y
                    div.classList.add('row' + y);
                    gridContainer.appendChild(div)
                }
            }
            
            extractedDataDiv.appendChild(gridContainer)
            
            for(let key in this.dataArray){
                let el = this.dataArray[key]
                let cell = document.querySelector('.row' + el.y + '.col' + el.x)
                cell.classList.add('hasData')
                cell.classList.add(el.class)
                cell.textContent = el.value;
            }

        },
        ZsetEvents(){
            let inputs = document.querySelectorAll('#extractedData .hasData');
            inputs.forEach(el => {
                el.addEventListener("dblclick", () => { 
                    console.log(el)
                    const input = document.createElement("input")
                    input.value = el.textContent
                    input.classList.add('updateDataInput')
                    el.appendChild(input)
                });
            })
        }
    },
    mounted() {
        if(this.extractedData){
            // this.prepareExtractedData(this.extractedData)
            // this.setNodeDepth(this.extractedData)
            // this.displayExtractedData()
            // this.setEvents()
            console.log(this.extractedData)
        }
    }
}
</script>

<template>

<div style="border: 1px solid grey; padding: 20px 30px;">
    <button @click="displayExtractedData">Log extracted data</button>
    <div id="extractedData"></div>
    

    <p v-if="success">
        {{ success }}
    </p>

    <p v-if="error">
        {{ error }}
    </p>
</div>


</template>

<style>
#extractedData{
    text-align: left;
    overflow: hidden;
    font-size: 14px;
}

#extractedData .wrapper{
    width: fit-content;
}

#extractedData .wrapper div{
    padding: 2px 10px;
    font-weight: 200;
}

#extractedData .hasData{
    text-align: left;
    width: fit-content;
}

#extractedData .wrapper .key{
    border-bottom: 1px solid #272727;
    font-weight: 600;
    text-transform: capitalize;
}

#extractedData .wrapper div{
    
}


#extractedData .hasData{
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Standard */
}



#extractedData .hasData:hover{
    cursor: pointer;
}

.isRed{color: red;}
.isBlue{color: blue;}

.dataNode .key{
    font-weight: 500;
    text-transform: capitalize;
}

.dataNode .value{
    font-weight: 200
}

.uploadSection .p-fileupload-content{
    min-height: 450px;
}
</style>