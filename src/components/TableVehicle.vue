<template>
    <!-- Tabla de vehículos -->
    <v-table>
        <!-- Encabezados -->
        <thead class="!bg-[#D9D9D9] !text-[#444444] !font-poppins">
            <tr>
                <th class="!text-left !w-[80px]">
                    {{ $t('vehicles.table.brand') }}
                </th>
                <th class="!text-left !w-[100px]">
                    {{ $t('vehicles.table.model') }}
                </th>
                <th class="!text-left !w-[150px]">
                    {{ $t('vehicles.table.description') }}
                </th>
                <th class="!text-left !w-[80px]">
                    {{ $t('vehicles.table.initialYear') }}
                </th>
                <th class="!text-left !w-[80px]">
                    {{ $t('vehicles.table.finalYear') }}
                </th>
                <th class="!text-left !w-[120px]">
                    {{ $t('vehicles.table.driverType') }}
                </th>
                <th class="!text-left !w-[120px]">
                    {{ $t('vehicles.table.fuel') }}
                </th>
                <th class="!text-left !w-[120px]">
                    {{ $t('vehicles.table.engine') }}
                </th>
                <th class="!text-left !w-[80px]">
                    {{ $t('vehicles.table.catalog') }}
                </th>
            </tr>
        </thead>

        <!-- Contenido de la tabla -->
        <tbody class="!font-poppins">
            <!-- Elementos de la tabla -->
            <tr
                v-for="item in filas"
                :key="item.linkageTargetId"
            >
                <!-- Marca -->
                <td>{{ brand }}</td>

                <!-- Modelo -->
                <td>{{ model }}</td>

                <!-- Descripción -->
                <td>{{ item.description }}</td>

                <!-- Año inicio -->
                <td>{{ item.beginYearMonth }}</td>

                <!-- Año fin -->
                <td>{{ item.endYearMonth }}</td>

                <!-- Tipo de tracción -->
                <td>{{ item.driveType }}</td>

                <!-- Tipo de combustible -->
                <td>{{ item.fuelType }}</td>

                <!-- Motor -->
                <td>{{ item.horsePowerTo }}</td>

                <!-- Acciones -->
                <td
                    class="!p-[10px]"
                >
                    <!-- Botón de navegación al articulo -->
                    <ButtonGeneral 
                        variante="outlined"
                        class="!font-poppins !font-normal !text-lg !w-[170px]
                        !h-[40px] !rounded-[8px] !normal-case !text-[#FF4338]"
                        :label="$t('buttons.catalogo')"
                        @click="navigateToArticles(item.linkageTargetId, item.description)"
                    />
                </td>
            </tr>
        </tbody>
    </v-table>
</template>

<script setup>
import ButtonGeneral from './ButtonGeneral.vue';

import { useRouter } from 'vue-router';
const router = useRouter()

// Propiedades que se le comparten al componente
const props = defineProps({
    filas: {
        type: Array,
        default: () => []
    },
    brand: {
        type: String
    },
    idBrand: {
        type: Number
    },
    model: {
        type: String
    },
    idModel: {
        type: Number
    }
})

// Función para navegar a los artículos del vehículo seleccionado
function navigateToArticles(id, description) {
    router.push({ name: 'vehicles-articles', params: { brand: props.brand, idBrand: props.idBrand, model: props.model, idModel: props.idModel, car: description, idCar: id } });
}
</script>