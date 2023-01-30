import React,{useEffect,useState} from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

function AvailableMeals() {
    const[meals,setMeals]=useState([]);
    //In the useEffect we are not using async await as there can be a clean up function that need to be tun synchronusly.
    useEffect(()=>{
        const fetchMeals=async ()=>{
            const response=await fetch('https://react-http-practice-a4548-default-rtdb.firebaseio.com/meals.json');
            const responseData=await response.json();
            const loadedMeals=[];
            for(const key in responseData){
                 loadedMeals.push({
                    id:key,
                    name:responseData[key].name,
                    description:responseData[key].description,
                    price:responseData[key].price
                 });
            }

            setMeals(loadedMeals);
        }
        fetchMeals();
    },[]);


    const mealsList = meals.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />);
    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals