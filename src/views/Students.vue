<template>
    <div class="container">

        <!--Ventana Modal-->
        <NewStudentDialog v-if="showNewStudentForm" @close="showNewStudentForm = false"></NewStudentDialog>
        <EditStudentDialog v-if="showEditStudentForm" @close="showEditStudentForm = false" :editStudentDetails="editStudentDetails"></EditStudentDialog>

        <div class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" v-model="search">
            <button class="btn btn-success w-25" @click="showNewStudentForm = true"><i class="bi bi-clipboard-plus"></i> Crear Estudiante</button>
        </div>
        <table class="table table-striped table-hover align-middle">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Rut</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido Paterno</th>
                <th scope="col">Apellido Materno</th>
                <th scope="col">Sexo</th>
                <th scope="col">Especialidad</th>
                <th scope="col">Opciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="student in filteredStudents" :key="student.id">
                    <td>{{student.id}}</td>
                    <td>{{student.rut}}</td>
                    <td>{{student.name}}</td>
                    <td>{{student.lastname1}}</td>
                    <td>{{student.lastname2}}</td>
                    <td>{{student.gender}}</td>
                    <td>{{student.profession}}</td>
                    <td> 
                        <button class="btn btn-outline-success mx-1" @click="editStudent(student)"><i class="bi bi-pencil-square"></i> Editar</button>
                        <button class="btn btn-outline-danger mx-1" @click="deleteStudent(student.id)"><i class="bi bi-trash"></i> Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

import NewStudentDialog from '@/components/NewStudentDialog.vue'
import EditStudentDialog from '@/components/EditStudentDialog.vue'
import { mapState,mapActions } from 'vuex'

    export default {
        components: {
            NewStudentDialog,
            EditStudentDialog
        },
        data: () => ({
            search: "",
            showNewStudentForm: false,
            showEditStudentForm: false,
            editStudentDetails: {},
        }),
        computed:{
            ...mapState(['students']),
            filteredStudents () {
                return this.students.filter((data) =>  JSON.stringify(data).toLowerCase().indexOf(this.search.toLowerCase()) !== -1)
            }
        },
        mounted(){
            this.getStudentsFromFile();
        },
        methods: {
            ...mapActions(['getStudentsFromFile','deleteStudent']),
            editStudent(student){
                this.editStudentDetails = student
                this.showEditStudentForm = true
            }
        }
    }
</script>

<style scoped>

</style>