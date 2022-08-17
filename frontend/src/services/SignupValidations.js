import Validations from "./Validations";

export default class SignupValidations {
    constructor(email, password){
        this.email = email;
        this.password = password;
    }
    checkValidations() {
        let errors = [];

        //email
        if (!Validations.checkEmail(this.email)){
            errors["email"] = "Email Invalide";
        }

        //password
        if (!Validations.minLength(this.password,6)){
            errors["password"] = "Le mot de passe doit contenir au moins 6 caractères";
        }
        return errors;

    }
}