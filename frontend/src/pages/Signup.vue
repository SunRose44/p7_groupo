
<template>
<div class="row">
  <div class="col-md-6 offset-md-3">
<div>
  <div>
    <h3>S'inscrire </h3>
    <hr/>
    </div>
  <form @submit.prevent="onSignup()">
    <div class="form-group">
      <label> Email </label>
      <input type ="text" class="form-control" v-model.trim="email"/>
         <div class="error" v-if="errors.email">{{errors.email}}</div>
      </div>
       <div class="form-group">
      <label> Mot de passe </label>
      <input type ="password" class="form-control" v-model.trim="password"/>
       <div class="error" v-if="errors.password">{{errors.password}}</div>
      </div>
      <div class ="my-3">
        <button type="submit" class="btn btn-primary">Inscription</button>
        </div>
  </form>
 </div>
 </div>
</div>
</template>

<script>
import SignupValidations from "../services/SignupValidations";
import {mapActions} from 'vuex';
import SIGNUP_ACTION from '../store/storeconstants';
export default {
  data() {
    return {
      email:"",
      password:"",
      errors:[]
    };
  },

  methods:{
    ...mapActions("auth", {
      signup: SIGNUP_ACTION
    }),
    onSignup() {
          let validations = new SignupValidations(this.email,this.password,);
    this.errors = validations.checkValidations();
    if ("email"in this.errors || "password" in this.errors) {
      return false;
    }
    //signup registration
    },
  },


};
</script>