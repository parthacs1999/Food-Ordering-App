import classes from './Checkout.module.css';
import { useRef,useState } from 'react';

const isEmpty=val=>val.trim()==='';
const isFiveChars=val=>val.trim().length===5;
const Checkout = (props) => {

    const [formInputsValidity,setFormInputsValidity] =useState({
        name:true,
        street:true,
        city:true,
        postalCode:true
    })

    const nameInputRef=useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef=useRef();

    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName=nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const PostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid=!isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalCodeIsValid = !isFiveChars(PostalCode);

        setFormInputsValidity({
            name:enteredNameIsValid,
            street:enteredStreetIsValid,
            city:enteredCityIsValid,
            postalCode:enteredPostalCodeIsValid
        });

        const formIsValid=enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid;
        if(!formIsValid){
            return;
        }

        //submit cart data
    };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={`${classes.control} ${formInputsValidity.name?'':classes.invalid}`}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef}/>
                {!formInputsValidity.name && <p>Please enter a valid name.</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef}/>
                {!formInputsValidity.street && <p>Please enter a valid street name.</p>}
            </div>
            <div className={`${classes.control} ${!formInputsValidity.postalCode ? '' : classes.invalid}`}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalCodeInputRef}/>
                {formInputsValidity.postalCode && <p>Please enter a valid postal code.</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef}/>
                {!formInputsValidity.city && <p>Please enter a valid city name.</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;