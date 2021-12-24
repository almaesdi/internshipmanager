<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">

              <slot name="header">
                  <h3>Crear Estudiante</h3>
                  <button class="btn fs-4" @click="$emit('close')"><i class="bi bi-x-square"></i></button>

              </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <form @submit.prevent="formProcessing">
                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-user"></i></span>
                    <input type="text" class="form-control" name="rut" placeholder="Rut" required="required" v-model="student.rut">
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-user"></i></span>
                    <input type="text" class="form-control" name="name" placeholder="Nombre" required="required" v-model="student.name">
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-user"></i></span>
                    <input type="text" class="form-control" name="lastname1" placeholder="Apellido Paterno" required="required" v-model="student.lastname1">
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-user"></i></span>
                    <input type="text" class="form-control" name="lastname2" placeholder="Apellido Materno" required="required" v-model="student.lastname2">
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-user"></i></span>
                    <input type="text" class="form-control" name="gender" placeholder="Sexo" required="required" v-model="student.gender">
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                    <input type="text" class="form-control" name="profession" placeholder="Profesion" required="required" v-model="student.profession">
                  </div>
                </div>

                <div class="form-group">
                  <button type="submit" class="btn btn-success btn-block btn-lg mt-3" >
                    Crear Estudiante
                  </button>
                </div>

                <div class="row justify-content-center">
                  <span v-if="errorMsg" class="error text-danger">{{errorMsg}}</span>
                </div>

              </form>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="btn btn-danger" @click="$emit('close')">
                Cancelar
              </button>
            </slot>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>

import { mapActions } from 'vuex'

export default {
    data (){
        return {
          student : {
            rut:'',
            name:'',
            lastname1:'',
            lastname2:'',
            gender:'',
            profession:'',
          },
            errorMsg: null,
        }
    },
    computed:{

    },
    methods: {
      ...mapActions(['addStudent']),
      formProcessing(){
        this.addStudent(this.student)
        this.$emit('close')
      }

    },
}
</script>

<style scoped>

  .modal-mask {
      position: fixed;
      z-index: 9998;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
      display: table;
      transition: opacity .3s ease;
  }

  .modal-wrapper {
      display: table-cell;
      vertical-align: middle;
  }

  .modal-container {
      width: 60vw;
      min-width: 600px;
      margin: 0px auto;
      padding: 20px 30px;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .3s ease;
      font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
      margin-top: 0;
      color: #42b983;
  }

  .modal-body {
      margin: 20px 0;
  }

  .modal-default-button {
      float: right;
  }

	.form-control {
		min-height: 38px;
		padding-left: 5px;
		box-shadow: none !important;
		border-width: 0 0 1px 0;
		border-radius: 0;
    margin: 5px 0;
	}
	.form-control:focus {
		border-color: #ccc;
	}
	.input-group-addon {
		max-width: 42px;
		text-align: center;
		background: none;
		border-width: 0 0 1px 0;
		padding-left: 5px;
		border-radius: 0;
	}

  /*
  * The following styles are auto-applied to elements with
  * transition="modal" when their visibility is toggled
  * by Vue.js.
  *
  * You can easily play with the modal transition by editing
  * these styles.
  */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
